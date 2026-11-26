// Prettier owns formatting; Stylelint checks correctness and conventions.
export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: [
    "node_modules/**",
    "playwright-report/**",
    "test-results/**",
    "_site/**",
  ],
  rules: {
    "declaration-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "rule-empty-line-before": null,
    "comment-empty-line-before": null,
    "at-rule-empty-line-before": null,
    // Noisy false positives across unrelated components in one stylesheet.
    "no-descending-specificity": null,
  },
};
