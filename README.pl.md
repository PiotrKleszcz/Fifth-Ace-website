# Fifth Ace Website

Dwujęzyczna strona firmowa **Fifth Ace** z prawdziwym backendem do kont klientów, logowania i publikowania opinii.

![Fifth Ace logo](./logo.jpeg)

## Co się zmieniło

Projekt nie jest już wyłącznie statycznym landing page'em.

Teraz zawiera:

- backend WSGI w Pythonie,
- bazę `SQLite` dla użytkowników, sesji i opinii,
- bezpieczne hashowanie haseł przez `PBKDF2-HMAC-SHA256`,
- sesje w ciasteczku `HttpOnly` z `SameSite=Strict`,
- rejestrację i logowanie klientów,
- formularz opinii zapisujący dane po stronie serwera zamiast w `localStorage`.

Frontend nadal zachowuje wersję `PL / EN` i dotychczasowy wygląd strony.

## Stack technologiczny

- `HTML5`
- `CSS3`
- `Vanilla JavaScript`
- `Python 3`
- `SQLite`

Projekt nie wymaga zewnętrznych paczek Pythona.

## Struktura projektu

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

## Uruchomienie lokalne

Uruchom serwer aplikacji:

```bash
python3 app.py
```

Następnie wejdź na adres:

```text
http://127.0.0.1:8000
```

Przy pierwszym uruchomieniu aplikacja sama utworzy bazę danych w:

```text
data/fifth_ace.db
```

## Zmienne środowiskowe

Opcjonalne ustawienia:

- `PORT` - port lokalnego serwera, domyślnie `8000`
- `FIFTH_ACE_DB_PATH` - własna ścieżka do bazy `SQLite`
- `FIFTH_ACE_SESSION_TTL_SECONDS` - czas życia sesji w sekundach
- `FIFTH_ACE_PBKDF2_ITERATIONS` - koszt hashowania haseł

## Endpointy API

- `GET /api/health`
- `GET /api/session`
- `POST /api/register`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/reviews`
- `POST /api/reviews`

## Wdrożenie

Ta wersja wymaga hostingu z obsługą Pythona. **GitHub Pages już się do tego nie nadaje**, bo logowanie i zapis do bazy wymagają działającego serwera.

Przykładowe miejsca do wdrożenia:

- PythonAnywhere
- Render
- Railway
- Fly.io
- VPS z `gunicorn`, `uwsgi` albo innym serwerem WSGI

Dla hostingu WSGI użyj:

```python
from app import application
```

albo wskaż plik `wsgi.py`.

## Zaimplementowane podstawy bezpieczeństwa

- hasła są hashowane zamiast przechowywane jawnie,
- sesje są przechowywane po stronie serwera w bazie danych,
- ciasteczko logowania jest `HttpOnly`,
- polityka ciasteczka to `SameSite=Strict`,
- dane wejściowe do rejestracji, logowania i opinii są walidowane,
- endpoint dodawania opinii jest chroniony i wymaga zalogowania.

## Ważna uwaga

W środowisku produkcyjnym pod HTTPS ciasteczko sesji będzie automatycznie oznaczane jako `Secure`, jeśli aplikacja działa przez HTTPS albo stoi za proxy przekazującym nagłówek `X-Forwarded-Proto: https`.

## Kontakt

- e-mail: `fifthace@gmx.com`
- YouTube: [@FifthAce-sec](https://www.youtube.com/@FifthAce-sec)
- Instagram: [fifthace.sec](https://www.instagram.com/fifthace.sec/)
