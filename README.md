# Shaurya Agnihotri — Portfolio

**Websites built to convert.**

[Visit the live portfolio](https://shaurya-agnihotri-portfolio.vercel.app/)

## About

A personal portfolio exploring the intersection of web engineering, interaction design and e-commerce. I build responsive websites and applications with an emphasis on usability, performance and the customer journey.

Rather than presenting a gallery of previous client projects, the website demonstrates its capabilities through working interactions and a deliberately crafted visual experience.

## Inside the experience

- **Cinematic hero:** Procedural 3D geometry, animated typography and adaptive rendering quality, with a lightweight fallback and reduced-motion support.
- **Shopify storefront concept:** Interactive product variants, pricing and cart behavior.
- **Conversion-focused design:** A comparison of illustrative checkout journeys and their user experience.
- **Application interface:** A searchable, filterable sample order dataset.
- **Technical index:** Expandable descriptions of frontend, backend, Shopify and development tools.
- **Contact:** A project enquiry form with input validation, basic spam protection and clear submission feedback.

The demonstrations run locally in the browser. They are not live Shopify stores, connected databases, client case studies or measured conversion results.

## Technology

| Technology | Purpose |
| --- | --- |
| React 19 | Components, state and interactions |
| Vite 6 | Development tooling and production bundling |
| Three.js / React Three Fiber | Procedural 3D rendering |
| CSS / Tailwind CSS 4 | Responsive layout, visual system and animation |
| Web3Forms | Project enquiry delivery |
| ESLint | Static code checks |
| Vercel | Deployment |

## Engineering notes

The 3D scene is loaded separately from the main application bundle. Rendering quality adapts to device capabilities and observed performance, with rendering paused when appropriate. The layout includes responsive breakpoints and alternatives to motion-heavy or sticky interactions on smaller screens.

The production entry document includes descriptive metadata, canonical and social sharing tags, structured data and initial HTML content. A sitemap, robots.txt and baseline security headers are included. The application remains a client-rendered React site, rather than a fully server-rendered application.

## Local development

Use a maintained Node.js release compatible with the project's Vite version, and npm.

```bash
git clone https://github.com/shauryzz/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open the local address printed by Vite.

### Contact configuration

Create `.env.local` in the project root if you want to configure the social links or test form delivery with your own Web3Forms account:

```dotenv
VITE_GITHUB_URL=
VITE_FIVERR_URL=
VITE_WEB3FORMS_ACCESS_KEY=
```

The visual experience and demonstrations do not require these variables. The relevant links are omitted when not configured, and the form cannot deliver an enquiry without a valid access key.

Restart the development server after changing environment variables. For deployment, set your own values in Vercel's Environment Variables settings and rebuild.

Local environment files are ignored by Git. All `VITE_` values referenced by the application can be exposed in the browser bundle; do not use them for private API credentials. Use only a Web3Forms key intended for client-side use. No personal contact email is required in the configuration.

### Checks and production build

```bash
npm run lint
npm audit
npm run build
npm run preview
```

The production output is generated in `dist/`. The preview command serves the build locally.

## Project structure

```text
public/                     Fonts, favicon, crawler files and sharing image
src/
  components/
    CinematicScene.jsx      Adaptive 3D rendering
    ContactForm.jsx         Enquiry form and submission logic
  constants/
    portfolio.js            Profile, expertise and public configuration
  sections/
    Hero.jsx                Cinematic introduction
    Navbar.jsx              Adaptive navigation
    Works.jsx               Interactive solutions
    ProfileSections.jsx     About, expertise, contact and footer
  App.jsx                   Application composition
  index.css                 Global styles and responsive rules
  main.jsx                  React entry point
index.html                  Entry document and SEO metadata
vercel.json                 Hosting response headers
```

## Credits and reuse

The original project foundation was a [React portfolio starter by Ali Sanati](https://github.com/Ali-Sanati/awwwards-portfolio). The current portfolio has been substantially reworked with its own branding, content, visual composition and interactive demonstrations.

No new open-source license is granted by this README. Third-party code, fonts and other assets remain subject to their respective rights and terms. Confirm applicable permissions before redistributing or adapting the repository.

## Connect

For development enquiries, use the contact form or Fiverr link on the [live portfolio](https://shaurya-agnihotri-portfolio.vercel.app/).

For technical feedback, use the repository's [Issues](https://github.com/shauryzz/portfolio/issues) section. Please avoid posting credentials or personal information in public issues.
