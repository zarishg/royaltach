# Royal Tach — Safe International SEO Audit (2026-10-30)

Status: preliminary source audit. This is a planning document, not a claim of verified live indexing or rankings.

## Scope and safeguards
- Preserve existing homepage design, text, animations, navigation and JavaScript behavior unless separately approved.
- Never invent testimonials, client results, offices, awards, certifications, reviews, or project ownership.
- No mass-generated city/country doorway pages, keyword stuffing, paid-link schemes, or guaranteed rankings.
- Do not merge this branch into main or deploy without explicit approval.

## Confirmed from repository source
- Vite build defined in package.json (`npm run build`).
- `index.html` contains title, description, canonical URL, Open Graph/Twitter tags, JSON-LD and a FAQ section.
- `public/robots.txt` permits crawling and points to `https://myagencysite.vercel.app/sitemap.xml`.
- `public/sitemap.xml` lists only the homepage, appropriate while there is one indexable page; its lastmod is 2026-10-28.
- Current canonical host is `https://myagencysite.vercel.app/`.
- The homepage includes links to client projects and a worldwide service statement.

## Still needs verification
1. Confirm that `https://myagencysite.vercel.app/` is the intended canonical production URL, and whether a branded domain is planned.
2. Test actual HTTP responses for /, /robots.txt, /sitemap.xml, favicon, logo, OG image and project images using a browser or deployment logs. A failed external fetch alone does not establish a 404.
3. Check that the deployed build matches main and Vite copies public assets to dist.
4. Verify Search Console property, ownership, sitemap submission, URL inspection, indexing and coverage; never assume indexed.
5. Verify GA4 ownership and consent/privacy compliance before adding analytics scripts.
6. Run Lighthouse/PageSpeed mobile and desktop; inspect Core Web Vitals, accessibility, image sizes, JS behavior and contact form.
7. Validate JSON-LD against actual visible claims and verify FAQ eligibility before changing it.
8. Review current client/case-study claims and external links with the owner.

## International lead strategy (proposal; not implemented)
- Prioritize commercial-intent queries for AI automation, custom websites, custom software, chatbots, and business systems.
- Research English-language search intent for US, UK, Canada, UAE and Saudi Arabia; consider Arabic only if accurate professional localization is available.
- Publish genuinely differentiated service and case-study pages only after approval, with truthful project evidence and clear contact calls-to-action.
- Measure qualified enquiries (form submissions, WhatsApp/contact clicks) rather than rankings alone.

## Change control
Make minimal, evidence-based code changes on `seo/safe-audit-2026-10-30`; test with `npm run build`; submit a draft PR for review; do not merge or deploy without approval.
