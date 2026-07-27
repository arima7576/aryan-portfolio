# Arima Finance Website

Official static website for Arima Finance, an independent quantitative finance and financial technology company.

- Production: <https://arimafinance.xyz>
- Stack: semantic HTML, modern CSS and dependency-free JavaScript
- Deployment: GitHub `main` to Cloudflare
- Build command: none

## Information architecture

```text
Home
├── Company
├── Capabilities
│   ├── Quantitative Research
│   ├── Algorithm Development
│   └── Portfolio & Investment Management
├── Work
│   ├── Arima Finance Engine
│   ├── Investment Memorandum
│   └── Restricted Client Work
├── Research
├── Founder
├── Resources
├── Contact
└── Legal
    ├── Privacy
    └── Terms
```

The architecture is company-first. The founder profile supplies context but is not the centre of the platform. Work cards use an expandable taxonomy for institutional research, trading systems, AI projects, risk systems, quantitative models, client projects, dashboards and automation.

## Local preview

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Content rules

- Do not publish credentials, client data, proprietary thresholds or operational configuration.
- Do not publish a client identity, transaction term, financial figure or source document without explicit approval.
- Do not make performance, track-record or investment-return claims without independently validated evidence and context.
- Keep working-paper and publication status accurate; external records are the source of truth.
- Use **Available soon** rather than linking to a missing or unapproved document.
- Keep Arima Finance company-first and treat founder content as a supporting layer.

## Adding work

1. Create a case-study page under `projects/`.
2. Classify it using one or more approved work categories.
3. State the publication boundary and status.
4. Add the project to `projects.html`; feature it on the homepage only when warranted.
5. Add the page to `sitemap.xml` and validate every local link.

## Public assets still needed

- Publication-approved founder portrait
- Reviewed public CV
- Public Arima Finance Engine handbook
- Approved research PDFs
- Approved presentation or case-study extracts
- Verified public LinkedIn profile URL

## Pre-publication checks

- Confirm `CNAME` contains exactly `arimafinance.xyz`.
- Validate canonical and Open Graph URLs.
- Test every page, asset and fragment from a local HTTP server.
- Test navigation at desktop and mobile widths, including keyboard Escape handling.
- Run a secret, personal-path and large-file scan.
- Verify external links and publication claims.
- Ensure privacy, terms and financial disclaimer remain visible.

Confidential source documents must never be copied into this repository simply to prepare a public summary.
