// @ts-check
import { test, expect } from "@playwright/test";

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("toggle opens and closes the menu with correct ARIA state", async ({
    page,
  }) => {
    await page.goto("/index.html");
    const toggle = page.locator(".nav-toggle");
    const links = page.locator(".nav-links");

    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(links).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveText("✕");
    await expect(links).toBeVisible();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveText("☰");
    await expect(links).toBeHidden();
  });

  test("clicking a link navigates and the menu starts closed", async ({
    page,
  }) => {
    await page.goto("/index.html");
    await page.locator(".nav-toggle").click();
    await page
      .locator(".nav-links")
      .getByRole("link", { name: "About" })
      .click();
    await expect(page).toHaveURL(/about\.html$/);
    await expect(page.locator(".nav-toggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await expect(page.locator(".nav-links")).toBeHidden();
  });
});

test.describe("desktop navigation", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("links are visible and the toggle is hidden", async ({ page }) => {
    await page.goto("/index.html");
    await expect(page.locator(".nav-toggle")).toBeHidden();
    await expect(page.locator(".nav-links")).toBeVisible();
    await expect(page.locator(".nav-links a")).toHaveCount(6);
  });
});
