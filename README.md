# Aryan Heidari — Arima Finance Portfolio

Static multi-page website for Aryan Heidari and Arima Finance, covering professional
profile, public-safe project work, research records and document availability.

- **Production domain:** <https://arimafinance.xyz>
- **GitHub:** <https://github.com/arima7576/aryan-portfolio>
- **Technology:** semantic HTML, CSS and small dependency-free JavaScript
- **Build step:** none

## Deployment

```text
GitHub main
    ↓
Cloudflare automatic deployment
    ↓
https://arimafinance.xyz
```

Cloudflare Workers serves the repository as static assets. Do not configure a build
command or commit generated output. DNS and nameserver management are outside this
repository.

## Local preview

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>. No package installation or build step is required.

## Structure

```text
.
├── index.html
├── about.html
├── experience.html
├── projects.html
├── projects/
│   ├── arima-finance-engine.html
│   ├── investment-memorandum.html
│   └── artane-presentation.html
├── research.html
├── publications.html
├── downloads.html
├── contact.html
├── assets/
│   ├── icons/
│   ├── images/
│   └── documents/
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
└── CNAME
```

## Configurable public links

Keep these values consistent across every page:

| Purpose | Public value |
|---|---|
| Domain | `https://arimafinance.xyz` |
| Professional email | `aryan.hd@outlook.com` |
| GitHub profile | `https://github.com/arima7576` |
| Engine repository | `https://github.com/arima7576/Arima-Finance-Engine` |
| Engine release | `https://github.com/arima7576/Arima-Finance-Engine/releases/tag/v0.1.0` |
| LinkedIn | Available soon — verified public profile required |
| Primary SSRN record | `https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5127689` |
| CV | Available soon |
| Handbook | Available soon |

Never publish an admin/dashboard URL or a link requiring private account access.

## Updating content

### Add a project

1. Add a page under `projects/` using an existing project page as the structural guide.
2. Add a card to `projects.html`.
3. Add it to the homepage only if it belongs in the four-item Featured Work section.
4. Add a clear publication and confidentiality label.

### Add research

1. Verify the title, author, platform, public URL and publication status.
2. Add the record to `research.html` and `publications.html`.
3. Link a PDF only when the PDF is actually tracked and approved for publication.
4. Do not describe an SSRN working paper or preprint as peer reviewed unless verified.

### Add a PDF

1. Place the reviewed file in the correct `assets/documents/` category.
2. Replace **Available soon** in `downloads.html` only after the path exists.
3. Provide both View and Download actions where the document is locally available.
4. Re-run the confidentiality and link checks below.

## Confidentiality checklist

- [ ] No phone number, private address, immigration or legal information
- [ ] No credentials, account numbers, tokens or private account URLs
- [ ] No private company or client identity without written approval
- [ ] No transaction terms, data-room content or unpublished financial figures
- [ ] No proprietary strategy rules, thresholds, formulas or configuration
- [ ] No confidential employer comments or source documents
- [ ] Every restricted item is visibly labelled
- [ ] All PDFs have been reviewed independently from their filenames

## Deployment checklist

- [ ] `CNAME` contains exactly `arimafinance.xyz`
- [ ] Every canonical and Open Graph URL uses `https://arimafinance.xyz`
- [ ] Local HTML, asset and PDF links resolve
- [ ] Navigation works at desktop and mobile widths
- [ ] Keyboard focus and Escape-to-close navigation work
- [ ] `python3 -m http.server 8000` serves every page
- [ ] `main` is clean and up to date before push

## Publication checklist

- [ ] Claims are supported by public or owner-verified information
- [ ] Research status does not imply unverified peer review
- [ ] Missing content is labelled **Available soon** without a broken link
- [ ] Confidential engagements expose only contribution and methodology
- [ ] Secret and sensitive-content scans return no findings
- [ ] Cloudflare deployment completes after the GitHub push

## Unresolved placeholders

- Verified public LinkedIn profile URL
- Current public CV PDF
- Arima Finance Engine public handbook PDF
- Approved Artane presentation preview, if permission is granted
- Any approved public-safe Investment Memorandum extract
- Additional research record referenced in prior notes, if verified

## Documents still needed from Aryan

- Current public CV
- Public Arima Finance Engine handbook
- Approved research PDFs, where direct downloads are desired
- Approved presentation previews
- Any synthetic or publication-approved case study

Confidential source documents should never be copied into this repository merely to
prepare a public summary.
