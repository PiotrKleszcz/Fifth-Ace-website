# Fifth Ace Website

Dwujęzyczna, statyczna strona firmowa **Fifth Ace**, gotowa do publikacji na GitHub Pages.

![Fifth Ace logo](./logo.jpeg)

## Najważniejsze cechy

- statyczny frontend w `HTML`, `CSS` i `Vanilla JavaScript`,
- treści w dwóch językach (`PL / EN`),
- strona główna oraz osobne strony usług,
- sekcja opinii zasilana przez statyczny plik JSON,
- brak backendu, logowania i bazy danych.

## Stack technologiczny

- `HTML5`
- `CSS3`
- `Vanilla JavaScript`
- `JSON`

## Struktura projektu

```text
.
├── data/
│   ├── .gitkeep
│   └── reviews.json
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

Uruchom dowolny serwer statyczny w katalogu projektu. Na przykład:

```bash
python3 -m http.server 8000
```

Następnie otwórz:

```text
http://127.0.0.1:8000
```

## Opinie

Opublikowane opinie znajdują się w pliku [data/reviews.json](./data/reviews.json).

Obsługiwany format:

```json
{
  "reviews": [
    {
      "id": "review-1",
      "authorName": "Anna K.",
      "authorInitials": "AK",
      "service": "securityAudit",
      "rating": 5,
      "comment": {
        "pl": "Krótka opinia po polsku.",
        "en": "Short review in English."
      },
      "updatedAt": "2026-04-22"
    }
  ]
}
```

Uwagi:

- `comment` może być zwykłym stringiem albo obiektem z wersjami `pl` i `en`,
- `service` powinno mieć jedną z wartości: `securityAudit`, `penetrationTest`, `itSupport`, `laptopSecurity`, `cyberHygiene`,
- opinie są sortowane malejąco po dacie.

## Wdrożenie

Ta wersja nadaje się do **GitHub Pages**. Repozytorium zawiera już plik `.nojekyll`, więc możesz opublikować je jako zwykłą stronę statyczną.

## Kontakt

- e-mail: `fifthace@gmx.com`
- YouTube: [@FifthAce-sec](https://www.youtube.com/@FifthAce-sec)
- Instagram: [fifthace.sec](https://www.instagram.com/fifthace.sec/)
