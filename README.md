# DocuScrit Official Site

Production-ready Vite + React marketing site for the DocuScrit compliance workflow platform.

DocuScrit is positioned as the umbrella brand for:

- Vendor COI Automation
- Legal Escalation & Claim Packet Workflow
- Compliance Risk Visibility

Phase 2 adds dedicated product pages, role-specific messaging, richer interface previews, solution-organized resources, and a security and governance evaluation page.

## Commands

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm run validate:launch
npm run verify
```

`npm run verify` runs the full release check:

```bash
npm run typecheck && npm run lint && npm run build && npm run validate:launch
```

## Build output

The production build is written to `dist/`.

Static route entry files are generated for:

- `/`
- `/vendor-coi`
- `/legal-escalation`
- `/compliance-risk-visibility`
- `/security`
- `/resources`
- `/demo`
- `/privacy`
- `/terms`

Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repo root, unless this folder is nested

## Content structure

Shared product positioning, capabilities, workflows, and role-fit content:

```txt
src/content/products.ts
src/content/audiences.ts
```

Resource and trust content:

```txt
src/content/resources.ts
src/content/trust.ts
```

Reusable product-page components:

```txt
src/components/products/
src/pages/ProductPage.tsx
src/pages/SecurityPage.tsx
```

Route metadata:

```txt
src/content/site-data.json
```

Runtime metadata and JSON-LD updates:

```txt
src/hooks/useDocumentMetadata.ts
```

Static route HTML metadata generation:

```txt
scripts/postbuild-routes.js
```

## Launch-readiness assets

- `public/robots.txt`
- `public/sitemap.xml`
- `public/site.webmanifest`
- `public/brand/docuscrit-og-card.png`
- `public/brand/docuscrit-og-card.svg`

## Visual QA screenshots

Start a preview server, then run the capture script with the preview URL:

```bash
npm run preview
SITE_URL=http://127.0.0.1:4173 npm run capture
```

If Playwright has not downloaded its browser, either run `npx playwright install` or provide a local Chromium path:

```bash
CHROMIUM_PATH=/usr/bin/chromium SITE_URL=http://127.0.0.1:4173 npm run capture
```

Screenshots and the JSON report are written to:

```txt
review/output/
```

## Notes before public launch

- The Privacy Policy and Terms pages should be reviewed by counsel.
- Security, hosting, retention, access-control, and implementation claims should be confirmed against the production environment before publication.
- Product interface values shown in marketing previews are illustrative workflow examples.

## Environment variables

Copy `.env.example` for local development or set these variables in your hosting provider:

- `VITE_FORM_ENDPOINT` — public Formspree endpoint for demo requests.
- `VITE_GA4_MEASUREMENT_ID` — optional GA4 measurement ID for route-level page views.
- `VITE_DISABLE_ANALYTICS` — disables analytics when set to `true`.
