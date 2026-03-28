# Fifth Ace Website

A bilingual portfolio website for **Fifth Ace**, focused on cybersecurity, penetration testing, and IT support services.

This project was built with plain HTML, CSS, and JavaScript as a lightweight business landing page and portfolio piece. It is designed to present services clearly, look modern, and remain easy to deploy as a static website.

![Fifth Ace logo](./logo.jpeg)

## About The Project

This website works as an online brand presence for Fifth Ace and as part of a GitHub portfolio documenting practical frontend work.

It includes:

- a hero section with the main value proposition,
- service presentation cards,
- experience and qualifications sections,
- a simple three-step work process,
- a contact call-to-action,
- social media links.

The site supports both **Polish** and **English** content.

For the Polish description, see [README.pl.md](./README.pl.md).

## Features

- responsive layout for desktop and mobile,
- `PL / EN` language switcher,
- instant text switching without page reload,
- selected language saved in `localStorage`,
- reveal-on-scroll animations using `IntersectionObserver`,
- logo fallback if the image fails to load,
- direct email call-to-action,
- YouTube and Instagram links.

## Tech Stack

- `HTML5`
- `CSS3`
- `Vanilla JavaScript`
- `Google Fonts` (`Manrope`, `Orbitron`)

## Project Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── logo.jpeg
├── README.md
└── README.pl.md
```

## Running Locally

Clone the repository:

```bash
git clone <your-repository-url>
```

Open the project folder:

```bash
cd fifth-ace-website
```

Then either open `index.html` directly in a browser or start a simple local server:

```bash
python3 -m http.server 8000
```

After that, visit `http://localhost:8000`.

## GitHub Pages Deployment

Because this is a static website, it is a very good fit for **GitHub Pages**. This matters for a portfolio because it lets you show both:

- the source code in the repository,
- the live published website under a public GitHub-hosted URL.

That improves your portfolio because a recruiter, client, or collaborator can quickly verify:

- how you structure frontend code,
- how you write documentation,
- that you can publish a working site,
- that the project is not only designed, but also deployed.

### How to publish on GitHub Pages

1. Push this project to a GitHub repository.
2. Make sure `index.html` is in the root of the repository.
3. Open the repository on GitHub.
4. Go to `Settings` -> `Pages`.
5. In `Build and deployment`, choose:
   `Source: Deploy from a branch`
6. Select:
   `Branch: main`
   `Folder: / (root)`
7. Save the settings.
8. Wait a moment for GitHub to publish the site.

Your website will then be available at:

```text
https://your-username.github.io/your-repository-name/
```

If you want, you can also add that live URL near the top of this README once the page is online.

## Why This Helps In A Portfolio

If GitHub is part of your professional documentation, a strong README does more than describe files. It shows:

- what the project is for,
- what skills were used,
- how the site works,
- how someone can run or review it,
- how the work was delivered in a real publishable form.

In practice, this makes the repository look more complete and more professional than a repo with code only.

## Site Content

- hero section with the main brand message,
- `Core Services` section,
- `Services Available Right Now` section,
- `Experience and Qualifications` section,
- `How We Work` section,
- contact section with `fifthace@gmx.com`,
- footer with social links.

## Possible Next Improvements

- add a contact form,
- add SEO metadata such as Open Graph tags,
- add a custom domain for GitHub Pages,
- move translations into separate files,
- add analytics or visitor tracking,
- include screenshots in the README.

## Contact

- email: `fifthace@gmx.com`
- YouTube: [@FifthAce-sec](https://www.youtube.com/@FifthAce-sec)
- Instagram: [fifthace.sec](https://www.instagram.com/fifthace.sec/)
