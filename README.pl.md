# Fifth Ace Website

Statyczna strona internetowa marki **Fifth Ace**, prezentująca ofertę z obszaru cyberbezpieczeństwa, testów penetracyjnych oraz wsparcia IT dla firm i klientów indywidualnych.

Projekt został zbudowany w czystym HTML, CSS i JavaScript, dzięki czemu jest lekki, szybki i prosty we wdrożeniu jako landing page lub strona firmowa.

![Fifth Ace logo](./logo.jpeg)

## O projekcie

Strona pełni rolę nowoczesnej wizytówki online dla Fifth Ace. Zawiera sekcje prezentujące:

- główną ofertę usług,
- doświadczenie i kompetencje,
- proces współpracy,
- dane kontaktowe,
- linki do kanałów społecznościowych.

Witryna została przygotowana w dwóch wersjach językowych: **polskiej** i **angielskiej**.

## Najważniejsze funkcje

- responsywny layout dopasowany do desktopu i urządzeń mobilnych,
- przełącznik języka `PL / EN`,
- dynamiczna podmiana treści bez przeładowania strony,
- zapamiętywanie wybranego języka w `localStorage`,
- animacje wejścia sekcji przy scrollowaniu z użyciem `IntersectionObserver`,
- fallback dla logo, jeśli obraz nie zostanie wczytany,
- sekcja kontaktowa z bezpośrednim linkiem `mailto`,
- integracja z profilami YouTube i Instagram.

## Stack technologiczny

- `HTML5`
- `CSS3`
- `Vanilla JavaScript`
- `Google Fonts` (`Manrope`, `Orbitron`)

## Struktura projektu

```text
.
├── index.html
├── styles.css
├── script.js
├── logo.jpeg
├── README.md
└── README.pl.md
```

## Uruchomienie lokalne

Ponieważ jest to strona statyczna, projekt można uruchomić bardzo prosto:

1. Sklonuj repozytorium:

```bash
git clone <adres-repozytorium>
```

2. Przejdź do katalogu projektu:

```bash
cd fifth-ace-website
```

3. Otwórz plik `index.html` w przeglądarce

albo uruchom prosty serwer lokalny, na przykład:

```bash
python3 -m http.server 8000
```

Następnie wejdź na adres `http://localhost:8000`.

## Wdrożenie

Projekt nadaje się do wdrożenia jako statyczna strona na platformach takich jak:

- GitHub Pages
- Netlify
- Vercel

Nie wymaga procesu buildowania ani dodatkowych zależności.

## Co zawiera strona

- `Hero section` z głównym komunikatem marki,
- sekcję `Kluczowe usługi`,
- sekcję `Usługi dostępne od ręki`,
- sekcję `Doświadczenie i kwalifikacje`,
- sekcję `Jak pracujemy`,
- sekcję kontaktową z adresem `fifthace@gmx.com`,
- stopkę z linkami społecznościowymi.

## Możliwe dalsze rozwinięcia

- dodanie formularza kontaktowego,
- podpięcie analityki,
- rozbudowa SEO o Open Graph i social preview,
- wydzielenie treści tłumaczeń do osobnych plików,
- dodanie CMS lub panelu do edycji treści.

## Kontakt

W sprawie współpracy lub rozwoju projektu:

- e-mail: `fifthace@gmx.com`
- YouTube: [@FifthAce-sec](https://www.youtube.com/@FifthAce-sec)
- Instagram: [fifthace.sec](https://www.instagram.com/fifthace.sec/)
