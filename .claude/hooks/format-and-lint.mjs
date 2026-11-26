// PostToolUse hook (Edit|Write|MultiEdit): formats the edited file with
// Prettier, then runs the matching linter on that file only.
// Exit 2 feeds lint errors back to Claude so it fixes them immediately.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const bin = (p) => path.join(root, "node_modules", p);

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {
  process.exit(0);
}

const file = input?.tool_input?.file_path;
if (!file || !existsSync(file)) process.exit(0);

const rel = path.relative(root, file);
if (
  rel.startsWith("..") ||
  /^(node_modules|_site|playwright-report|test-results)[\\/]/.test(rel)
) {
  process.exit(0);
}

const ext = path.extname(file).toLowerCase();
const linters = {
  ".js": ["eslint/bin/eslint.js"],
  ".mjs": ["eslint/bin/eslint.js"],
  ".css": ["stylelint/bin/stylelint.mjs"],
  ".html": ["html-validate/bin/html-validate.mjs"],
};
const prettierExts = [
  ".js",
  ".mjs",
  ".css",
  ".html",
  ".json",
  ".md",
  ".yml",
  ".yaml",
];

const run = (script, args) =>
  execFileSync(process.execPath, [bin(script), ...args], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

if (
  prettierExts.includes(ext) &&
  existsSync(bin("prettier/bin/prettier.cjs"))
) {
  try {
    run("prettier/bin/prettier.cjs", ["--write", "--log-level", "warn", rel]);
  } catch {
    // Ignored files or parse errors are surfaced by the linter / `npm run lint`.
  }
}

for (const linter of linters[ext] ?? []) {
  if (!existsSync(bin(linter))) continue;
  try {
    run(linter, [rel]);
  } catch (err) {
    const out = `${err.stdout ?? ""}${err.stderr ?? ""}`.trim();
    process.stderr.write(
      `Lint errors in ${rel} — fix before continuing:\n${out.slice(0, 4000)}\n`,
    );
    process.exit(2);
  }
}
