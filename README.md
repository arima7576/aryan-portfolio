# Arima Finance Cinematic Experience

The official scroll-driven company experience for Arima Finance. It presents quantitative research, algorithm development, portfolio intelligence, company work and the Arima Finance Engine through a continuous institutional narrative.

## Technology

- Next.js 16 App Router with static export
- React 19 and TypeScript
- Tailwind CSS 4
- GSAP with ScrollTrigger and scoped cleanup through `@gsap/react`
- Framer Motion for viewport-driven project transitions
- Lenis smooth scrolling on capable desktop devices
- CSS, SVG and DOM-based financial visuals; no video or mandatory WebGL payload

## Architecture

```text
app/
├── layout.tsx
├── page.tsx
└── globals.css
components/
├── CinematicExperience.tsx
├── CinematicNavigation.tsx
├── ScrollController.tsx
├── ModularConstruction.tsx
└── scenes/
    ├── IntroScene.tsx
    ├── DataUniverseScene.tsx
    ├── InstitutionScene.tsx
    ├── AFRevealScene.tsx
    ├── CompanyScene.tsx
    ├── LightTransitionScene.tsx
    ├── FounderScene.tsx
    ├── PortfolioScene.tsx
    ├── EngineScene.tsx
    └── ContactScene.tsx
data/
└── portfolio.ts
```

Portfolio content is stored in typed data objects rather than embedded project-card markup. This keeps the catalogue CMS-ready and separates content from scene animation.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

The production build uses `output: "export"` and writes static assets to `out/`.

## Cloudflare configuration

- Build command: `npm run build`
- Output directory: `out`
- Node.js version: 22 or newer

`wrangler.jsonc` also points Workers Static Assets to `./out` for direct Wrangler deployment. The generated `out/` directory is intentionally ignored by Git.

## Experience behavior

- First visit: cinematic introduction with a persistent **Skip Intro** action.
- Completion: reaching Contact stores a local completion flag and reveals the final navigation.
- Returning visit: navigation is immediately available and early scenes use compact presentation.
- Replay: clears the completion flag and returns to the opening scene.
- Mobile: pinned and horizontal sequences are simplified; complex smooth scrolling is disabled.
- Reduced motion: pinned transitions and continuous animations are disabled while all content remains available.

## Public-content safeguards

- Institution names are environmental context only and never imply affiliation or endorsement.
- Client names, transaction terms, private datasets and operational credentials are excluded.
- The public Engine description does not expose proprietary strategy logic or configuration.
- Research status is sourced from external platform records.
- Performance and return claims are not published without validated evidence and context.

## Publication assets still needed

- Publication-approved founder portrait
- Reviewed public CV
- Engine handbook and approved documentation
- Approved research PDFs and case-study visuals
- Verified public LinkedIn profile URL
