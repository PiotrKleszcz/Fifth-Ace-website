# Fifth Ace Website

A bilingual business website for **Fifth Ace** with a real backend for customer accounts, authentication, and review publishing.

![Fifth Ace logo](./logo.jpeg)

## What Changed

The project is no longer a static-only landing page.

It now includes:

- a Python WSGI backend,
- a SQLite database for users, sessions, and reviews,
- secure password hashing with `PBKDF2-HMAC-SHA256`,
- `HttpOnly` session cookies with `SameSite=Strict`,
- a customer registration and sign-in flow,
- a review form backed by the server instead of `localStorage`.

The website still keeps the existing bilingual frontend (`PL / EN`) and the original visual structure.

## Tech Stack

- `HTML5`
- `CSS3`
- `Vanilla JavaScript`
- `Python 3`
- `SQLite`

No third-party Python packages are required.

## Project Structure

```text
.
├── app.py
├── wsgi.py
├── data/
│   └── .gitkeep
├── index.html
├── styles.css
├── script.js
├── service-pages.js
├── *.html
├── logo.jpeg
├── README.md
└── README.pl.md
```

## Running Locally

Start the application server:

```bash
python3 app.py
```

Then open:

```text
http://127.0.0.1:8000
```

On first run, the app creates the SQLite database automatically in:

```text
data/fifth_ace.db
```

## Environment Variables

Optional settings:

- `PORT` - local server port, default: `8000`
- `FIFTH_ACE_DB_PATH` - custom SQLite database path
- `FIFTH_ACE_SESSION_TTL_SECONDS` - session lifetime in seconds
- `FIFTH_ACE_PBKDF2_ITERATIONS` - password hashing cost

## API Endpoints

- `GET /api/health`
- `GET /api/session`
- `POST /api/register`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/reviews`
- `POST /api/reviews`

## Deployment Notes

This version requires a Python-capable host. It is **not** suitable for GitHub Pages anymore because authentication and database writes need a server runtime.

Good deployment targets:

- PythonAnywhere
- Render
- Railway
- Fly.io
- VPS with `gunicorn`, `uwsgi`, or another WSGI server

For WSGI hosting, use:

```python
from app import application
```

or point the host to `wsgi.py`.

## Security Basics Included

- hashed passwords instead of plain text,
- server-side sessions stored in the database,
- `HttpOnly` authentication cookie,
- `SameSite=Strict` cookie policy,
- input validation for registration, login, and reviews,
- protected API routes for posting reviews.

## Important Note

For production under HTTPS, the session cookie will automatically be marked `Secure` when the app is served over HTTPS or behind a proxy that forwards `X-Forwarded-Proto: https`.

## Contact

- email: `fifthace@gmx.com`
- YouTube: [@FifthAce-sec](https://www.youtube.com/@FifthAce-sec)
- Instagram: [fifthace.sec](https://www.instagram.com/fifthace.sec/)
