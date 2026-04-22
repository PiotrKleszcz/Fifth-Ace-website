# Fifth Ace Website

A bilingual static business website for **Fifth Ace**, ready to publish on GitHub Pages.

![Fifth Ace logo](./logo.jpeg)

## Highlights

- static `HTML`, `CSS`, and `Vanilla JavaScript`,
- bilingual content (`PL / EN`),
- landing page plus focused service pages,
- review section powered by a static JSON file,
- no backend, login flow, or database required.

## Tech Stack

- `HTML5`
- `CSS3`
- `Vanilla JavaScript`
- `JSON`

## Project Structure

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

## Local Preview

Run any static server in the project directory. For example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000
```

## Reviews

Published reviews live in [data/reviews.json](./data/reviews.json).

Supported format:

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

Notes:

- `comment` can be either a plain string or an object with `pl` and `en` variants.
- `service` should match one of: `securityAudit`, `penetrationTest`, `itSupport`, `laptopSecurity`, `cyberHygiene`.
- reviews are displayed in descending date order.

## Deployment

This version is suitable for **GitHub Pages**. The repository already includes `.nojekyll`, so you can publish it as a regular static site.

## Contact

- email: `fifthace@gmx.com`
- YouTube: [@FifthAce-sec](https://www.youtube.com/@FifthAce-sec)
- Instagram: [fifthace.sec](https://www.instagram.com/fifthace.sec/)
