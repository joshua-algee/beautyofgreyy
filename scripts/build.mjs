// Copies the public site into _site/ using an allowlist, so repo-only files
// (CLAUDE.md, configs, tests, package.json) are never published.
import {
  cpSync,
  existsSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";

const OUT = "_site";
const FILES = ["style.css", "script.js", "CNAME", "robots.txt", "sitemap.xml"];
const DIRS = ["images"];
const ROOT_PATTERN = /\.(html|ico|svg|webmanifest)$/;

rmSync(OUT, { recursive: true, force: true });

const files = [
  ...readdirSync(".").filter((f) => ROOT_PATTERN.test(f)),
  ...FILES.filter((f) => existsSync(f)),
];
for (const f of files) cpSync(f, `${OUT}/${f}`);
for (const d of DIRS) cpSync(d, `${OUT}/${d}`, { recursive: true });

// Serve files as-is (no Jekyll processing).
writeFileSync(`${OUT}/.nojekyll`, "");

console.log(`Built ${OUT}/: ${files.length} files + ${DIRS.join(", ")}`);
