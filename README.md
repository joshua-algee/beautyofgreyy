# Beautyofgreyy Photography

Website for Beautyofgreyy Photography: [beautyofgreyy.com](https://beautyofgreyy.com).

## Development

Requires Node.js 20+.

```sh
npm ci
npx playwright install chromium webkit   # first time only
npm run serve    # http://localhost:4173
npm run check    # lint + e2e/accessibility tests (same as CI)
npm run format   # auto-format with Prettier
```

Pushing to `main` runs CI, then deploys `_site/` (built by `npm run build`) to GitHub Pages.
