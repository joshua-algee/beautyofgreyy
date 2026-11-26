---
paths:
  - "**/*.css"
---

# CSS conventions

- Single stylesheet `style.css`. Design tokens are custom properties on `:root` at the top — use them instead of raw colors.
- Responsive overrides are grouped near the end in `@media (width <= 950px)`, `(width <= 800px)` and `(width <= 600px)` blocks. Add rules to the matching block rather than scattering new media queries.
- Photos are currently CSS `background-image`s with paths relative to the repo root (`images/...`). `tests/smoke.spec.js` fails if any `url(...)` 404s.
- Modern syntax is enforced by Stylelint: `rgb(0 0 0 / 50%)`, range media queries, short hex.
- Check mobile (390px) and desktop (1440px) after layout changes — use `/verify`.
