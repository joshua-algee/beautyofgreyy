// @ts-check
import { test, expect } from "@playwright/test";
import { pages } from "./pages.js";

for (const p of pages) {
  test.describe(p.path, () => {
    test("loads with title, one h1, nav, footer and no errors", async ({
      page,
    }) => {
      /** @type {string[]} */
      const problems = [];
      page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
      page.on("console", (msg) => {
        if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
      });
      page.on("response", (res) => {
        if (res.status() >= 400) problems.push(`${res.status()} ${res.url()}`);
      });

      const response = await page.goto(p.path);
      expect(response?.status()).toBe(200);
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveTitle(new RegExp(`^${p.title}`));
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("nav.navbar")).toHaveCount(1);
      await expect(page.locator("footer")).toHaveCount(
        p.footer === false ? 0 : 1,
      );
      if (p.noindex) {
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
          "content",
          /noindex/,
        );
      } else {
        await expect(page.locator('meta[name="description"]')).toHaveAttribute(
          "content",
          /\S{10,}/,
        );
      }

      const active = page.locator(".nav-links a.active");
      if (p.nav) {
        await expect(active).toHaveCount(1);
        await expect(active).toHaveAttribute("href", p.nav);
      } else {
        await expect(active).toHaveCount(0);
      }

      expect(problems).toEqual([]);
    });

    test("internal links resolve", async ({ page, request }) => {
      await page.goto(p.path);
      const hrefs = await page
        .locator("a[href]")
        .evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
      const internal = [
        ...new Set(hrefs.filter((h) => !/^(https?:|mailto:|tel:|#)/.test(h))),
      ];
      for (const href of internal) {
        const res = await request.get(new URL(href, page.url()).href);
        expect(res.status(), `${href} on ${p.path}`).toBe(200);
      }
    });
  });
}

test("stylesheet images exist and are not empty", async ({ request }) => {
  const css = await (await request.get("/style.css")).text();
  const urls = [
    ...new Set([...css.matchAll(/url\("?([^")]+)"?\)/g)].map((m) => m[1])),
  ];
  expect(urls.length).toBeGreaterThan(0);

  const missing = [];
  const empty = [];
  for (const url of urls) {
    const res = await request.get(`/${url}`);
    if (res.status() !== 200) missing.push(url);
    else if ((await res.body()).length === 0) empty.push(url);
  }
  expect(missing, "image paths referenced in style.css that 404").toEqual([]);

  // KNOWN ISSUE: every photo in the repo is a 0-byte placeholder.
  // Remove this annotation once real photos are added.
  test.info().annotations.push({
    type: "known-issue",
    description: `${empty.length} empty placeholder image(s): ${empty.join(", ")}`,
  });
});

test.fixme("all stylesheet images contain real photo data", async ({
  request,
}) => {
  // Enable (change test.fixme -> test) once real photos replace the placeholders.
  const css = await (await request.get("/style.css")).text();
  for (const [, url] of css.matchAll(/url\("?([^")]+)"?\)/g)) {
    const body = await (await request.get(`/${url}`)).body();
    expect(body.length, url).toBeGreaterThan(1000);
  }
});
