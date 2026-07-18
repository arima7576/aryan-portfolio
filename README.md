# Aryan Heidari — Personal Portfolio

A static, dependency-free portfolio site for Aryan Heidari (quantitative finance, financial
research, risk management, and the Arima Finance Engine project). Plain HTML5, CSS3, and a
small vanilla-JS file. No build step, no backend, no analytics, no tracking, no cookie banner.

## 1. Local preview

No build tools required.

```bash
# Option A — just open it
open index.html            # macOS
start index.html           # Windows
xdg-open index.html        # Linux

# Option B — simple local server (recommended, avoids any file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 2. File structure

```
/
├── index.html
├── about.html
├── experience.html
├── projects.html
├── projects/
│   └── arima-finance-engine.html
├── research.html
├── publications.html
├── downloads.html
├── contact.html
├── styles.css
├── script.js
├── README.md
├── CNAME                     # placeholder — see "Custom domain" below
├── .gitignore
└── assets/
    ├── images/               # portrait.jpg is included; og-image is a placeholder
    ├── icons/                # favicon-placeholder.svg
    └── documents/
        ├── cv/
        ├── handbook/
        ├── research/
        └── presentations/
```

## 3. How to update content

All page copy lives directly in the HTML files — there is no CMS or data file, by design
(no backend, no build step). Each page shares the same header/nav and footer markup; if you
change the nav, update it in every page (or regenerate — see "Regenerating pages" below).

### Add a project
1. Duplicate `projects/arima-finance-engine.html` as a template for structure (Overview,
   Architecture, Public vs Private Boundary, Limitations, Licence & Risk Notice sections).
2. Add a card for it in `projects.html`.
3. If it should be featured, add a card to the "Featured Work" section of `index.html`.

### Add a research paper / publication
1. Add a `.card` block in `research.html` (and, if relevant, `publications.html`) with:
   title, date, one-paragraph summary, category badge, and links (SSRN / ResearchGate / PDF).
2. Set the confidentiality label badge: `Published`, `Working Paper`, `Public Summary`,
   `Selected Extract`, `Confidential — Not Available`.

### Add a presentation
1. Place the PDF in `assets/documents/presentations/`.
2. Add a row/card with title, category, date, and view/download links in `downloads.html`.

### Add a PDF (CV, handbook, research, presentations)
1. Drop the file into the matching `assets/documents/<type>/` folder.
2. Update the matching row in `downloads.html`: replace the `Available soon` badge with
   `Published`, and change the disabled "View" control into a real link to the file.

### Replace a placeholder
Search the codebase for `Available soon`, `placeholder`, and `pending` — these mark every
spot waiting on real content, a real link, or a real document.

## 4. Deployment

**Do not deploy until the content and confidentiality review below is complete.**

### GitHub Pages
1. Push this repository to GitHub.
2. Repository Settings → Pages → Source: deploy from the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

### Cloudflare Pages
1. Connect the GitHub repository in the Cloudflare Pages dashboard.
2. Build command: none. Output directory: `/` (repository root).
3. Deploy.

### Custom domain
1. Replace the placeholder text inside `CNAME` with your domain (e.g. `aryanheidari.com`) —
   GitHub Pages reads this file automatically.
2. Point your domain's DNS to GitHub Pages / Cloudflare Pages per their instructions.
3. Update the `canonical` and `og:url` meta tags across all pages from
   `https://example.com/PLACEHOLDER-DOMAIN/` to your real domain.

## 5. Confidentiality checklist (run before every publish)

- [ ] No private phone numbers, home address, or immigration information
- [ ] No account numbers or payment details
- [ ] No private client names without explicit permission
- [ ] No proprietary trading rules, formulas, or live operational thresholds
- [ ] No confidential employer material (e.g. named data-room documents, transaction terms)
- [ ] No unpublished financial figures
- [ ] Every non-public work item carries a confidentiality label
- [ ] LinkedIn link is a **public profile URL**, not an admin/dashboard link (see note below)

## 6. Publication checklist

- [ ] Every "Available soon" item is either filled in or intentionally left as-is
- [ ] Every external link (GitHub, SSRN, ResearchGate, LinkedIn) opens the intended page
- [ ] CV and handbook PDFs are the current version
- [ ] Dates, employers, and credentials match the verified CV — nothing invented

## 7. Accessibility checklist

- [ ] Heading order is sequential on every page (h1 → h2 → h3)
- [ ] All images have descriptive alt text
- [ ] Mobile nav is operable by keyboard and screen reader (skip link included)
- [ ] Focus states are visible (test with Tab key)
- [ ] Reduced-motion is respected (the hero pipeline animation halts under
      `prefers-reduced-motion: reduce`)

## 8. Final review checklist

- [ ] Content reviewed from the perspective of: recruiter, quant hiring manager, hedge-fund
      CTO, fintech founder, academic researcher, design reviewer, security reviewer
- [ ] No unsupported claims ("world-class", "leading expert", "guaranteed returns", etc.)
- [ ] No fabricated performance figures or track record claims
- [ ] Mobile layout checked at ~375px width
- [ ] All of the above checklists are complete

---

## Known items still needed from Aryan

**Links**
- A public LinkedIn profile (or company page) URL. The link supplied during this build
  (`linkedin.com/company/111923099/admin/dashboard/...`) is a private admin dashboard, not a
  shareable public page, so it has **not** been published anywhere on the site. The Contact
  page currently shows "Available soon" for LinkedIn.
- A fourth SSRN/DeFi paper link (profile notes four published papers; only two SSRN links and
  one ResearchGate link were supplied).

**Documents**
- CV (PDF) → `assets/documents/cv/`
- Arima Finance Engine Handbook (PDF) → `assets/documents/handbook/`
- Any presentations → `assets/documents/presentations/`
- Any public-safe Investment Memorandum sample → `assets/documents/research/`
- A 1200×630 Open Graph share image → `assets/images/`
- A real favicon (SVG or ICO) → `assets/icons/`

**Verified detail**
- Exact dates for the Arima Finance and Artane Partners roles (currently shown without
  invented dates)
- Undergraduate degree details, if applicable
- Domain name, once chosen (`CNAME` file + canonical/OG URLs)

## Confidentiality note on Artane Partners work

The Artane Partners internship is described only at a generic level — role, sector, and type
of financial-modelling work. Specific engagement names, client identities, and transaction
detail were **intentionally excluded**, since that material belongs to Artane Partners and
its clients, not to this personal site. If Aryan wants richer detail here, it should first be
cleared with Artane Partners for public disclosure.
