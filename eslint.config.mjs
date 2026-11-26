import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["playwright-report/", "test-results/", "_site/"]),
  {
    files: ["**/*.{js,mjs}"],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
  {
    // Browser code shipped to visitors (classic <script defer>, not a module).
    files: ["script.js"],
    languageOptions: { sourceType: "script", globals: globals.browser },
  },
]);
