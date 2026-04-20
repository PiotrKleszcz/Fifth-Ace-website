from __future__ import annotations

import hmac
import json
import mimetypes
import os
import posixpath
import re
import secrets
import sqlite3
import sys
from datetime import datetime, timedelta, timezone
from hashlib import pbkdf2_hmac
from http.cookies import SimpleCookie
from pathlib import Path
from typing import Any
from wsgiref.simple_server import make_server


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DB_PATH = Path(os.environ.get("FIFTH_ACE_DB_PATH", DATA_DIR / "fifth_ace.db"))
SESSION_COOKIE_NAME = "fifthace_session"
SESSION_TTL_SECONDS = int(os.environ.get("FIFTH_ACE_SESSION_TTL_SECONDS", 60 * 60 * 24 * 30))
PBKDF2_ITERATIONS = int(os.environ.get("FIFTH_ACE_PBKDF2_ITERATIONS", "310000"))

ALLOWED_STATIC_EXTENSIONS = {
    ".css",
    ".html",
    ".ico",
    ".jpeg",
    ".jpg",
    ".js",
    ".json",
    ".png",
    ".svg",
    ".txt",
    ".webp",
    ".xml",
}
ALLOWED_REVIEW_SERVICES = {
    "securityAudit",
    "penetrationTest",
    "itSupport",
    "laptopSecurity",
    "cyberHygiene",
}
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
PHONE_RE = re.compile(r"^\+?\d{7,15}$")
LEGACY_PUBLIC_BASE_URL = "https://piotrkleszcz.github.io/Fifth-Ace-website"


class HttpError(Exception):
    def __init__(self, status: int, message: str) -> None:
        super().__init__(message)
        self.status = status
        self.message = message


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def utc_timestamp(value: datetime | None = None) -> str:
    dt = value or utc_now()
    return dt.replace(microsecond=0).isoformat().replace("+00:00", "Z")


def ensure_database() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    with sqlite3.connect(DB_PATH) as connection:
        connection.execute("PRAGMA journal_mode=WAL")
        connection.execute("PRAGMA foreign_keys = ON")
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_salt TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                created_at TEXT NOT NULL,
                expires_at TEXT NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                service_key TEXT NOT NULL,
                rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
                comment TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'published' CHECK(status IN ('pending', 'published', 'rejected')),
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                UNIQUE(user_id, service_key),
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
            CREATE INDEX IF NOT EXISTS idx_reviews_status_updated_at ON reviews(status, updated_at DESC);
            """
        )


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def cleanup_expired_sessions(connection: sqlite3.Connection) -> None:
    connection.execute("DELETE FROM sessions WHERE expires_at <= ?", (utc_timestamp(),))


def normalize_email(value: str) -> str:
    return value.strip().lower()


def normalize_phone(value: str) -> str:
    return re.sub(r"[\s()-]+", "", value.strip())


def read_json_body(environ: dict[str, Any], max_bytes: int = 16384) -> dict[str, Any]:
    try:
        content_length = int(environ.get("CONTENT_LENGTH") or "0")
    except ValueError as error:
        raise HttpError(400, "Invalid request body length.") from error

    if content_length < 0:
        raise HttpError(400, "Invalid request body length.")

    if content_length > max_bytes:
        raise HttpError(413, "Request body is too large.")

    body = environ["wsgi.input"].read(content_length) if content_length else b""
    if not body:
        return {}

    try:
        payload = json.loads(body.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise HttpError(400, "Request body must be valid JSON.") from error

    if not isinstance(payload, dict):
        raise HttpError(400, "Request body must be a JSON object.")

    return payload


def validate_registration(payload: dict[str, Any]) -> dict[str, str]:
    first_name = str(payload.get("firstName") or "").strip()
    last_name = str(payload.get("lastName") or "").strip()
    phone = normalize_phone(str(payload.get("phone") or ""))
    email = normalize_email(str(payload.get("email") or ""))
    password = str(payload.get("password") or "")

    if not all((first_name, last_name, phone, email, password)):
        raise HttpError(400, "All registration fields are required.")

    if len(first_name) > 80 or len(last_name) > 80:
        raise HttpError(400, "First name and last name are too long.")

    if not EMAIL_RE.match(email):
        raise HttpError(400, "Email address is invalid.")

    if not PHONE_RE.match(phone):
        raise HttpError(400, "Phone number is invalid.")

    if len(password) < 8 or len(password) > 128:
        raise HttpError(400, "Password must contain between 8 and 128 characters.")

    return {
        "first_name": first_name,
        "last_name": last_name,
        "phone": phone,
        "email": email,
        "password": password,
    }


def validate_login(payload: dict[str, Any]) -> tuple[str, str]:
    email = normalize_email(str(payload.get("email") or ""))
    password = str(payload.get("password") or "")

    if not email or not password:
        raise HttpError(400, "Email and password are required.")

    if not EMAIL_RE.match(email):
        raise HttpError(400, "Email address is invalid.")

    return email, password


def validate_review(payload: dict[str, Any]) -> dict[str, Any]:
    service = str(payload.get("service") or "").strip()
    comment = str(payload.get("comment") or "").strip()

    try:
        rating = int(payload.get("rating"))
    except (TypeError, ValueError) as error:
        raise HttpError(400, "Rating must be a number between 1 and 5.") from error

    if service not in ALLOWED_REVIEW_SERVICES:
        raise HttpError(400, "Selected service is not supported.")

    if rating < 1 or rating > 5:
        raise HttpError(400, "Rating must be a number between 1 and 5.")

    if len(comment) < 30 or len(comment) > 1500:
        raise HttpError(400, "Comment must contain between 30 and 1500 characters.")

    return {"service": service, "rating": rating, "comment": comment}


def hash_password(password: str, salt: bytes | None = None) -> tuple[str, str]:
    resolved_salt = salt or secrets.token_bytes(16)
    digest = pbkdf2_hmac("sha256", password.encode("utf-8"), resolved_salt, PBKDF2_ITERATIONS)
    return resolved_salt.hex(), digest.hex()


def verify_password(password: str, salt_hex: str, digest_hex: str) -> bool:
    salt = bytes.fromhex(salt_hex)
    _, computed_digest = hash_password(password, salt)
    return hmac.compare_digest(computed_digest, digest_hex)


def parse_cookies(environ: dict[str, Any]) -> dict[str, str]:
    cookie = SimpleCookie()
    cookie.load(environ.get("HTTP_COOKIE", ""))
    return {name: morsel.value for name, morsel in cookie.items()}


def cookie_is_secure(environ: dict[str, Any]) -> bool:
    forwarded_proto = environ.get("HTTP_X_FORWARDED_PROTO", "")
    scheme = environ.get("wsgi.url_scheme", "")
    return forwarded_proto == "https" or scheme == "https"


def request_base_url(environ: dict[str, Any]) -> str:
    scheme = "https" if cookie_is_secure(environ) else (environ.get("wsgi.url_scheme") or "http")
    host = environ.get("HTTP_HOST")

    if not host:
        server_name = environ.get("SERVER_NAME", "127.0.0.1")
        server_port = environ.get("SERVER_PORT", "80")
        host = f"{server_name}:{server_port}"

    script_name = (environ.get("SCRIPT_NAME") or "").rstrip("/")
    return f"{scheme}://{host}{script_name}"


def make_session_cookie(session_id: str, environ: dict[str, Any]) -> str:
    expires = utc_now() + timedelta(seconds=SESSION_TTL_SECONDS)
    parts = [
        f"{SESSION_COOKIE_NAME}={session_id}",
        "Path=/",
        "HttpOnly",
        "SameSite=Strict",
        f"Max-Age={SESSION_TTL_SECONDS}",
        f"Expires={expires.strftime('%a, %d %b %Y %H:%M:%S GMT')}",
    ]

    if cookie_is_secure(environ):
        parts.append("Secure")

    return "; ".join(parts)


def make_logout_cookie(environ: dict[str, Any]) -> str:
    parts = [
        f"{SESSION_COOKIE_NAME}=",
        "Path=/",
        "HttpOnly",
        "SameSite=Strict",
        "Max-Age=0",
        "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    ]

    if cookie_is_secure(environ):
        parts.append("Secure")

    return "; ".join(parts)


def create_session(connection: sqlite3.Connection, user_id: int) -> str:
    cleanup_expired_sessions(connection)
    session_id = secrets.token_urlsafe(32)
    connection.execute(
        """
        INSERT INTO sessions (id, user_id, created_at, expires_at)
        VALUES (?, ?, ?, ?)
        """,
        (
            session_id,
            user_id,
            utc_timestamp(),
            utc_timestamp(utc_now() + timedelta(seconds=SESSION_TTL_SECONDS)),
        ),
    )
    return session_id


def get_authenticated_user(environ: dict[str, Any]) -> sqlite3.Row | None:
    session_id = parse_cookies(environ).get(SESSION_COOKIE_NAME)
    if not session_id:
        return None

    with get_connection() as connection:
        cleanup_expired_sessions(connection)
        row = connection.execute(
            """
            SELECT users.*
            FROM sessions
            JOIN users ON users.id = sessions.user_id
            WHERE sessions.id = ? AND sessions.expires_at > ?
            """,
            (session_id, utc_timestamp()),
        ).fetchone()

        if row is None:
            connection.execute("DELETE FROM sessions WHERE id = ?", (session_id,))

        return row


def serialize_user(row: sqlite3.Row) -> dict[str, Any]:
    return {
        "id": row["id"],
        "firstName": row["first_name"],
        "lastName": row["last_name"],
        "email": row["email"],
        "displayName": f"{row['first_name']} {row['last_name'][:1].upper()}.",
    }


def serialize_review(row: sqlite3.Row) -> dict[str, Any]:
    first_name = row["first_name"]
    last_name = row["last_name"]
    initials = f"{first_name[:1]}{last_name[:1]}".upper()

    return {
        "id": row["id"],
        "authorName": f"{first_name} {last_name[:1].upper()}.",
        "authorInitials": initials,
        "service": row["service_key"],
        "rating": row["rating"],
        "comment": row["comment"],
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"],
    }


def json_bytes(payload: dict[str, Any]) -> bytes:
    return json.dumps(payload, ensure_ascii=False).encode("utf-8")


def start_json_response(
    start_response: Any,
    status: int,
    payload: dict[str, Any],
    extra_headers: list[tuple[str, str]] | None = None,
) -> list[bytes]:
    body = json_bytes(payload)
    headers = [
        ("Content-Type", "application/json; charset=utf-8"),
        ("Content-Length", str(len(body))),
        ("Cache-Control", "no-store"),
    ]

    if extra_headers:
        headers.extend(extra_headers)

    start_response(f"{status} {status_reason(status)}", headers)
    return [body]


def text_response(
    start_response: Any,
    status: int,
    body: bytes,
    content_type: str,
    cache_control: str = "public, max-age=3600",
) -> list[bytes]:
    headers = [
        ("Content-Type", content_type),
        ("Content-Length", str(len(body))),
        ("Cache-Control", cache_control),
    ]
    start_response(f"{status} {status_reason(status)}", headers)
    return [body]


def status_reason(status: int) -> str:
    reasons = {
        200: "OK",
        201: "Created",
        204: "No Content",
        400: "Bad Request",
        401: "Unauthorized",
        404: "Not Found",
        405: "Method Not Allowed",
        409: "Conflict",
        413: "Payload Too Large",
        500: "Internal Server Error",
    }
    return reasons.get(status, "OK")


def fetch_reviews() -> list[dict[str, Any]]:
    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT reviews.*, users.first_name, users.last_name
            FROM reviews
            JOIN users ON users.id = reviews.user_id
            WHERE reviews.status = 'published'
            ORDER BY reviews.updated_at DESC
            """
        ).fetchall()

    return [serialize_review(row) for row in rows]


def handle_register(environ: dict[str, Any], start_response: Any) -> list[bytes]:
    payload = validate_registration(read_json_body(environ))
    salt_hex, digest_hex = hash_password(payload["password"])

    try:
        with get_connection() as connection:
            cursor = connection.execute(
                """
                INSERT INTO users (first_name, last_name, phone, email, password_salt, password_hash, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    payload["first_name"],
                    payload["last_name"],
                    payload["phone"],
                    payload["email"],
                    salt_hex,
                    digest_hex,
                    utc_timestamp(),
                ),
            )
            session_id = create_session(connection, cursor.lastrowid)
            user = connection.execute("SELECT * FROM users WHERE id = ?", (cursor.lastrowid,)).fetchone()
    except sqlite3.IntegrityError as error:
        raise HttpError(409, "An account with this email address already exists.") from error

    return start_json_response(
        start_response,
        201,
        {"user": serialize_user(user)},
        [("Set-Cookie", make_session_cookie(session_id, environ))],
    )


def handle_login(environ: dict[str, Any], start_response: Any) -> list[bytes]:
    email, password = validate_login(read_json_body(environ))

    with get_connection() as connection:
        cleanup_expired_sessions(connection)
        user = connection.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()

        if user is None or not verify_password(password, user["password_salt"], user["password_hash"]):
            raise HttpError(401, "Incorrect email address or password.")

        session_id = create_session(connection, user["id"])

    return start_json_response(
        start_response,
        200,
        {"user": serialize_user(user)},
        [("Set-Cookie", make_session_cookie(session_id, environ))],
    )


def handle_logout(environ: dict[str, Any], start_response: Any) -> list[bytes]:
    session_id = parse_cookies(environ).get(SESSION_COOKIE_NAME)

    if session_id:
        with get_connection() as connection:
            connection.execute("DELETE FROM sessions WHERE id = ?", (session_id,))

    return start_json_response(
        start_response,
        200,
        {"success": True},
        [("Set-Cookie", make_logout_cookie(environ))],
    )


def handle_session(environ: dict[str, Any], start_response: Any) -> list[bytes]:
    user = get_authenticated_user(environ)
    return start_json_response(
        start_response,
        200,
        {"authenticated": user is not None, "user": serialize_user(user) if user else None},
    )


def handle_reviews_get(start_response: Any) -> list[bytes]:
    return start_json_response(start_response, 200, {"reviews": fetch_reviews()})


def handle_reviews_post(environ: dict[str, Any], start_response: Any) -> list[bytes]:
    user = get_authenticated_user(environ)
    if user is None:
        raise HttpError(401, "You need to sign in before posting a review.")

    payload = validate_review(read_json_body(environ))
    now = utc_timestamp()

    with get_connection() as connection:
        existing = connection.execute(
            "SELECT id, created_at FROM reviews WHERE user_id = ? AND service_key = ?",
            (user["id"], payload["service"]),
        ).fetchone()

        if existing:
            connection.execute(
                """
                UPDATE reviews
                SET rating = ?, comment = ?, status = 'published', updated_at = ?
                WHERE id = ?
                """,
                (payload["rating"], payload["comment"], now, existing["id"]),
            )
            review_id = existing["id"]
            created = False
        else:
            cursor = connection.execute(
                """
                INSERT INTO reviews (user_id, service_key, rating, comment, status, created_at, updated_at)
                VALUES (?, ?, ?, ?, 'published', ?, ?)
                """,
                (user["id"], payload["service"], payload["rating"], payload["comment"], now, now),
            )
            review_id = cursor.lastrowid
            created = True

        row = connection.execute(
            """
            SELECT reviews.*, users.first_name, users.last_name
            FROM reviews
            JOIN users ON users.id = reviews.user_id
            WHERE reviews.id = ?
            """,
            (review_id,),
        ).fetchone()

    return start_json_response(start_response, 200, {"created": created, "review": serialize_review(row)})


def serve_static(environ: dict[str, Any], start_response: Any) -> list[bytes]:
    request_path = environ.get("PATH_INFO", "/") or "/"

    if request_path == "/":
        candidate = BASE_DIR / "index.html"
    else:
        normalized_path = posixpath.normpath(request_path.lstrip("/"))
        if normalized_path.startswith("..") or normalized_path.startswith(".git") or normalized_path.startswith("data"):
            raise HttpError(404, "File not found.")

        candidate = (BASE_DIR / normalized_path).resolve()
        try:
            candidate.relative_to(BASE_DIR)
        except ValueError as error:
            raise HttpError(404, "File not found.") from error

        if candidate.suffix.lower() not in ALLOWED_STATIC_EXTENSIONS:
            raise HttpError(404, "File not found.")

    if not candidate.is_file():
        raise HttpError(404, "File not found.")

    cache_control = "no-store" if candidate.suffix.lower() == ".html" else "public, max-age=3600"

    if candidate.suffix.lower() == ".html":
        body_text = candidate.read_text(encoding="utf-8").replace(
            LEGACY_PUBLIC_BASE_URL, request_base_url(environ)
        )
        body = body_text.encode("utf-8")
        content_type = "text/html; charset=utf-8"
    else:
        body = candidate.read_bytes()
        mime_type, _ = mimetypes.guess_type(candidate.name)
        content_type = mime_type or "application/octet-stream"

    return text_response(start_response, 200, body, content_type, cache_control)


def handle_api(environ: dict[str, Any], start_response: Any) -> list[bytes]:
    method = environ.get("REQUEST_METHOD", "GET").upper()
    path = environ.get("PATH_INFO", "/")

    if method == "OPTIONS":
        start_response(
            "204 No Content",
            [
                ("Allow", "GET, POST, OPTIONS"),
                ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),
                ("Access-Control-Allow-Headers", "Content-Type"),
                ("Content-Length", "0"),
            ],
        )
        return [b""]

    if path == "/api/health" and method == "GET":
        return start_json_response(start_response, 200, {"status": "ok"})

    if path == "/api/session":
        if method != "GET":
            raise HttpError(405, "Method not allowed.")
        return handle_session(environ, start_response)

    if path == "/api/register":
        if method != "POST":
            raise HttpError(405, "Method not allowed.")
        return handle_register(environ, start_response)

    if path == "/api/login":
        if method != "POST":
            raise HttpError(405, "Method not allowed.")
        return handle_login(environ, start_response)

    if path == "/api/logout":
        if method != "POST":
            raise HttpError(405, "Method not allowed.")
        return handle_logout(environ, start_response)

    if path == "/api/reviews":
        if method == "GET":
            return handle_reviews_get(start_response)
        if method == "POST":
            return handle_reviews_post(environ, start_response)
        raise HttpError(405, "Method not allowed.")

    raise HttpError(404, "API endpoint not found.")


def application(environ: dict[str, Any], start_response: Any) -> list[bytes]:
    try:
        if environ.get("PATH_INFO", "").startswith("/api/"):
            return handle_api(environ, start_response)
        return serve_static(environ, start_response)
    except HttpError as error:
        if environ.get("PATH_INFO", "").startswith("/api/"):
            return start_json_response(start_response, error.status, {"error": error.message})
        return text_response(
            start_response,
            error.status,
            error.message.encode("utf-8"),
            "text/plain; charset=utf-8",
            "no-store",
        )
    except Exception as error:  # pragma: no cover - fallback for unexpected issues
        print(f"Unhandled server error: {error}", file=sys.stderr)
        if environ.get("PATH_INFO", "").startswith("/api/"):
            return start_json_response(
                start_response,
                500,
                {"error": "Internal server error. Please try again later."},
            )
        return text_response(
            start_response,
            500,
            b"Internal server error. Please try again later.",
            "text/plain; charset=utf-8",
            "no-store",
        )


def run_dev_server() -> None:
    port = int(os.environ.get("PORT", "8000"))
    with make_server("127.0.0.1", port, application) as server:
        print(f"Fifth Ace backend running on http://127.0.0.1:{port}")
        server.serve_forever()


ensure_database()


if __name__ == "__main__":
    run_dev_server()
