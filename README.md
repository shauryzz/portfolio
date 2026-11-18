# Shaurya Agnihotri — Portfolio

**Websites built to convert.**

A personal portfolio for my work as a Shopify and full-stack developer. This website is itself a demonstration of my approach to web development: expressive interfaces, purposeful motion, practical functionality and attention to detail.

## What I do

- **Shopify development:** Custom Liquid themes, reusable sections, product and collection pages, store integrations and shopping experiences.
- **Conversion optimization:** Landing pages, clearer purchase journeys, mobile-first layouts and data-informed improvements.
- **Web development:** Responsive business websites and applications across React, Next.js and WordPress.
- **Full-stack engineering:** Application interfaces, API integrations, authentication and data handling.
- **Performance and usability:** Maintainable code, SEO-friendly structure and accessible interactions.

## Inside the website

The portfolio brings these capabilities together through a procedural 3D hero, an adaptive navigation system, an interactive solutions showcase and an expandable technical index. A typography-led About section and a project enquiry form complete the experience.

The storefront, checkout and data explorer demonstrations run locally in the browser. They illustrate development concepts rather than representing previous client projects, live stores or measured conversion results.

## Built with

| Technology | Role |
| --- | --- |
| React | Component architecture and interactive state |
| Vite | Development server and production bundling |
| Three.js / React Three Fiber | Procedural 3D scene and real-time rendering |
| CSS / Tailwind CSS | Responsive layouts, typography and motion |
| Web3Forms | Contact form submission and email delivery |

## Run locally

```bash
npm install
npm run dev
```

Open the local URL displayed in the terminal (typically `http://localhost:5173`).

To create and preview a production build:

```bash
npm run build
npm run preview
```

To run the configured lint checks:

```bash
npm run lint
```

## Project structure

```text
public/                 Static assets and local fonts
src/
  components/           Cinematic scene and contact form
  constants/
    portfolio.js        Profile, services, skills and contact configuration
  sections/             Hero, navigation, solutions and profile sections
  App.jsx               Application layout
  index.css             Global design system and responsive styling
  main.jsx              React entry point
index.html              Document metadata and entry page
```

## Contact configuration

Create a `.env.local` file at the project root (beside `package.json`):

```dotenv
VITE_CONTACT_EMAIL=
VITE_GITHUB_URL=
VITE_FIVERR_URL=
VITE_WEB3FORMS_ACCESS_KEY=
```

Fill in the public contact email, full profile URLs and valid Web3Forms access key. Restart the Vite development server after editing this file. Local environment files are excluded from Git. For Vercel, set the same four variables in the project's Environment Variables settings and deploy again. Verify actual form delivery before publishing.

Vite embeds `VITE_` values in the browser bundle. Web3Forms access keys are designed for public client-side use; they are not secret API credentials. Never put private API credentials or server secrets in these variables.

Shaurya Agnihotri · Shopify & full-stack developer
