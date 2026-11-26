---
name: verify
description: Verify a change to the Beautyofgreyy site end to end — runs all deterministic checks, then screenshots affected pages at mobile/tablet/desktop widths for visual review. Use before declaring UI, layout, content or script work done.
argument-hint: "[page.html ...]  (defaults to pages changed in git, else index.html)"
---

# Verify

1. **Deterministic checks** — run `npm run check` (Prettier, ESLint, Stylelint, html-validate, Playwright e2e + axe). If anything fails, fix it and re-run before continuing. For a failing test, read `test-results/**/error-context.md`, not the HTML report.

2. **Pick pages** — use `$ARGUMENTS` if given; otherwise the `*.html` files in `git diff --name-only HEAD` (if only `style.css`/`script.js` changed, use `index.html` plus the pages most affected); otherwise `index.html`.

3. **Serve** — start `npm run serve` in the background (port 4173) unless already running.

4. **Screenshot** each page at 390×844, 768×1024 and 1440×900 with `playwright-cli` (`open`, `resize <w> <h>`, `goto http://localhost:4173/<page>`, `screenshot --full-page --filename .screenshots/<page>-<w>.png`). Then `close` the browser and stop the server.

5. **Review** the screenshots (read the PNGs) for: layout breakage or horizontal overflow, overlapping/clipped text, nav state, contrast, spacing rhythm, and whether the change matches the intent. Note: all photos are currently 0-byte placeholders, so image areas render empty — that is expected, not a regression.

6. **Report** in ≤10 lines: check results (pass/fail counts), pages × widths reviewed, and any visual issues with file:line suggestions. Don't paste raw tool output.
