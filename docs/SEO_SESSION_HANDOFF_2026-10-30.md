# Royal Tach SEO — Session Handoff (2026-10-30)

## Current status confirmed by owner screenshots
- Production URL: https://myagencysite.vercel.app/
- GitHub repository: zarishg/royaltach, default branch main.
- Google Search Console URL-prefix property ownership verified (green check, 'You are a verified owner').
- Google Search Console sitemap.xml submitted successfully (green success notification).
- Google URL Inspection of homepage showed 'URL is on Google' and 'Page is indexed'.
- Search Performance, 3 months, displayed 'No data'; site is recently launched. This is not evidence of an SEO penalty.
- Verification file public/googled33dfc4a5856fa32.html committed to main, commit d8b0cb2345b4b68c028963f70cd2a3f732fdf1a6.

## Existing work
- Safety branch: seo/safe-audit-2026-10-30
- Draft PR: https://github.com/zarishg/royaltach/pull/1
- docs/SEO_SAFE_AUDIT_2026-10-30.md — preliminary audit/strategy.
- scripts/check-seo.mjs — read-only SEO consistency script, NOT yet executed/validated.
- Verification file also present on safety branch.
- Do not merge entire PR without checking its exact diff, build and deployment safety.

## Locked requirements
- Preserve homepage design, animations, images, visible content and functionality unless separately approved.
- No fabricated testimonials, project results, office locations, certifications, client claims, black-hat SEO or mass doorway pages.
- Prioritize legitimate international leads from USA, UK, Canada, Saudi Arabia and UAE/Dubai.
- Test code before production deployment; no unnecessary changes.
- User prefers short, step-by-step Urdu instructions and wants assistant to manage technical details.

## Next session procedure
1. Review latest main and draft PR diff; confirm no unintended changes and build safety.
2. Check actual live robots.txt, sitemap.xml, canonical, metadata, structured data, asset responses and links.
3. Run npm run build and node scripts/check-seo.mjs in a test environment; fix only confirmed defects in safe branch.
4. Audit mobile/desktop Core Web Vitals, accessibility, performance, image optimization and contact conversion path.
5. Research qualified service keywords for USA/UK/Canada/UAE/Saudi, propose truthful service landing pages only with approval.
6. Establish Google Analytics 4 and conversion events only after necessary user access and privacy checks.
7. Monitor Search Console indexing, sitemap status and performance as data accumulates; no need to request indexing for already indexed homepage.

## Current pause
Owner requested all progress locked and work resumed in next session. Do not start further changes automatically until owner resumes.
