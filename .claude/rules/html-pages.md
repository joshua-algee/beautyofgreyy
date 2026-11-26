---
paths:
  - "*.html"
---

# HTML page conventions

- No templates: `<nav class="navbar">` and `<footer>` are copied into every page. A nav or footer change must be applied to **all** pages (`thank-you.html` has a nav but intentionally no footer).
- Each page marks its own nav link `class="active"`; "Book Now" also carries `nav-book`.
- Home uses `<header class="hero">`; other pages use `<header class="sub-hero">` with `.sub-hero-content` (eyebrow + `h1`). Exactly one `h1` per page.
- Every indexable page needs a unique `<title>` ending in `| Beautyofgreyy Photography` and a `meta name="description"`. Non-indexable pages (thank-you) use `meta name="robots" content="noindex"`.
- Scripts: only `script.js` with `defer`. No inline scripts/styles; styling goes in `style.css`.
- Encode `&` as `&amp;`; void elements are self-closed (`<meta ... />`), matching Prettier.
- Adding, renaming or removing a page: update `tests/pages.js` and the nav on every page. `scripts/build.mjs` picks up root `*.html` automatically.
- The booking form contract with `script.js`: `#booking-form` (action = Formspree URL), `#submit-button`, `#form-status`. Changing these ids breaks submission and `tests/booking.spec.js`.
