# CLAUDE.md

Static marketing site for **Beautyofgreyy Photography** (photographer Miranda Grey Yax) at `beautyofgreyy.com`. Plain HTML/CSS/vanilla JS, no framework. The current design is a starting point; the redesign happens on the `redesign` branch. Load the `brand` skill before copy, design or pricing work.

## Commands

- `npm run check`: everything CI runs (lint + tests). Run before saying work is done.
- `npm run lint`: Prettier check, ESLint, Stylelint, html-validate. `npm run format` fixes formatting.
- `npm test`: Playwright e2e + axe accessibility tests (desktop-chromium, mobile-webkit). Starts its own server on :4173.
- `npm run serve`: local server at http://localhost:4173.
- `npm run build`: copies only public site files into `_site/` (an allowlist in `scripts/build.mjs`). This is what gets deployed.
- `/verify`: checks + screenshots at 3 widths. Use it for any visual change.
- Live asset check: `curl -sI https://beautyofgreyy.com/<path>`. Look at `Content-Length` as well as the status code.

An edit hook (`.claude/hooks/format-and-lint.mjs`) Prettier-formats each edited file and lints it. Fix any errors it reports before moving on.

## Architecture

- Pages: `index`, `about`, `pricing`, `commercial`, `portfolio`, `booking`, `thank-you` (`.html`, at the repo root). There are no templates, so nav and footer are duplicated per page. Scoped rules in `.claude/rules/` load automatically when you touch HTML, CSS or tests.
- `style.css`: the only stylesheet. Tokens are on `:root`. Breakpoints are at 950/800/600px near the end. Photos are CSS `background-image`s (`images/...`).
- `script.js` (`defer`, guarded per feature): the mobile nav toggle, and the booking form (POSTs to Formspree via `fetch`, then redirects to `thank-you.html` or shows an error in `#form-status`).
- Tests: `tests/*.spec.js`, with the page inventory in `tests/pages.js`.
- CI/CD: `.github/workflows/ci.yml` runs on PRs and on pushes to `redesign`. `deploy.yml` runs on pushes to `main`: CI, then build, then GitHub Pages. Never edit `CNAME`.

## Known issues (tracked as `test.fixme`)

- Every `.jpg` is a 0-byte placeholder, so photos render empty. Add real photos at the same paths.
- `booking.html` form `action` still uses the `YOUR_FORM_ID` Formspree placeholder.
- There's no favicon, `robots.txt`, `sitemap.xml`, Open Graph tags, structured data or 404 page yet.

## Decisions pending (ask first)

- Whether to move to Eleventy (layouts for nav/footer, `eleventy-img` for AVIF/WebP + `srcset`). Don't start this migration without approval.
