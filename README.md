# Prince Kanani — 3D Portfolio

A premium, interactive 3D personal portfolio for **Prince Kanani** — Assistant Product Manager at Honest IT — built with React, TypeScript and Three.js. It presents product-management thinking, AI-assisted product development, project delivery experience and hands-on technical work (Intallysense, Asset Management, ERP Finance, QR/Barcode systems) as a single personal-brand platform.

## Features

- Interactive 3D environment (particle field, floating geometry, orbiting product-ecosystem hero object) with mouse parallax and scroll response
- 3D Skills Universe — clickable skill constellation — plus a 3D QR cube with scan simulation
- 20+ content sections: About, Experience timeline, Skills, Product lifecycle, Projects with detail modals, ERP/Tally pipeline, Automation, Product Thinking, Agile, Architecture, Achievements, Certifications, Education, Products, GitHub, LinkedIn, Resume, Contact
- Dark/light theme with animated toggle, persisted in `localStorage`
- Custom cursor (fine-pointer devices only), magnetic buttons, tilt cards, glassmorphism, scroll progress bar
- Graceful degradation everywhere: 2D fallback without WebGL, reduced-motion support, placeholder-driven content that hides anything unconfigured — no fake statistics or invented facts
- Live GitHub section (public API) once a username is configured; honest error/empty states otherwise
- SEO: meta/OG/Twitter tags, JSON-LD Person schema, robots.txt, PK monogram favicon
- Performance: lazy-loaded 3D and below-the-fold sections, split vendor chunks, paint-only pipeline animations

## Tech Stack

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · Three.js · React Three Fiber · Drei · Motion (Framer Motion successor) · Lucide icons

## Project Structure

```
src/
  config/siteConfig.ts   # every personal detail in one place
  data/                  # profile, skills, experience, projects, achievements,
                         # certifications, education, products, social, flows, navigation
  types/                 # shared interfaces for all data shapes
  hooks/                 # theme, media queries, WebGL detection, in-view, count-up, active section
  components/
    layout/              # Navigation, Footer, LoadingScreen, ScrollProgress
    three/               # Scene3D, SkillsUniverse3D, QRCube, Fallback2D
    ui/                  # GlassCard, TiltCard, MagneticButton, Modal, StageFlow, DataFlow, …
  sections/              # one file per page section
  styles/index.css       # Tailwind v4 theme tokens, glass/gradient/flow utilities
public/
  resume/                # put Prince-Kanani-Resume.pdf here
  images/                # profile.jpg (optional), og-image.svg
  projects/              # optional project screenshots
```

## Local Development

```bash
npm install
npm run dev      # http://localhost:5173
```

## Environment Variables

Copy `.env.example` to `.env` (never commit `.env`):

| Variable | Purpose |
| --- | --- |
| `VITE_GITHUB_USERNAME` | Enables the live GitHub section and GitHub links |
| `VITE_LINKEDIN_URL` | Enables LinkedIn buttons |
| `VITE_CONTACT_EMAIL` | Enables mailto links + contact-form fallback |
| `VITE_CONTACT_ENDPOINT` | Optional POST endpoint (Formspree/EmailJS/custom) for the contact form |
| `VITE_BASE` | Overrides the production base path (default `/prince-portfolio/`) |

All of these can also be set directly in `src/config/siteConfig.ts`. Anything left as an `[ADD ...]` placeholder is hidden automatically — nothing fake ever renders.

## Build

```bash
npm run build    # type-checks (tsc -b) then builds to dist/
npm run preview  # serve the production build locally
```

## Deployment — GitHub Pages

1. Create a GitHub repository named **`prince-portfolio`** (or change the base in `vite.config.ts` / set `VITE_BASE`).
2. Push this project to the `main` branch.
3. In the repo: **Settings → Pages → Source: GitHub Actions**.
4. The included workflow `.github/workflows/deploy.yml` builds and deploys on every push to `main`. Public config values (`VITE_GITHUB_USERNAME`, etc.) can be set as repository **Variables** so they're baked into the build.
5. Update the canonical URL in `index.html` to the final deployed URL.
6. Note: on a GitHub *project* page, crawlers never read `/prince-portfolio/robots.txt` (the protocol only checks the host root), so submit `sitemap.xml` manually in [Google Search Console](https://search.google.com/search-console) for indexing.

## Customization

- **Personal info / links** — `src/config/siteConfig.ts`
- **About text & stats** — `src/data/profile.ts` (stats only show once real numbers are set)
- **Experience** — add roles to the array in `src/data/experience.ts`
- **Skills** — categories and universe nodes in `src/data/skills.ts`
- **Projects** — `src/data/projects.ts` (optional `image`, `github`, `demo` fields appear when set)
- **Achievements** — `src/data/achievements.ts`
- **Certifications** — `src/data/certifications.ts` (section shows a graceful placeholder until a real one is added)
- **Education** — `src/data/education.ts`
- **Products** — `src/data/products.ts`
- **Resume** — drop the PDF at `public/resume/Prince-Kanani-Resume.pdf`
- **Profile photo** — `public/images/profile.jpg` (abstract PK avatar is used until then)
- **OG image** — replace `public/images/og-image.svg` with a 1200×630 PNG for best social-platform support

## License

Personal portfolio — all rights reserved. Feel free to borrow structural ideas, but please don't republish it as your own profile.
