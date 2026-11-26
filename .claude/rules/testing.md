---
paths:
  - "tests/**"
  - "playwright.config.js"
---

# Test conventions

- Playwright only (no unit-test runner — there's no pure logic worth one). Projects: `desktop-chromium`, `mobile-webkit`. The config starts `http-server` on port 4173 itself.
- `tests/pages.js` is the page inventory; specs loop over it. Keep it in sync with the real pages.
- Never hit Formspree for real: intercept with `page.route(FORMSPREE, ...)`.
- Prefer role/label locators (`getByRole`, `getByLabel`) — they double as accessibility checks.
- Known, not-yet-fixable issues are `test.fixme(...)` with a comment saying what unblocks them. Don't delete them; flip them to `test` when fixed.
- Run a single spec while iterating: `npx playwright test tests/nav.spec.js --project=desktop-chromium`. Failure details are in `test-results/**/error-context.md` (read that, not the HTML report).
- Visual snapshot tests are intentionally absent until real photos and the redesign are settled; when added, generate baselines on Linux (CI or the Playwright Docker image), not Windows.
