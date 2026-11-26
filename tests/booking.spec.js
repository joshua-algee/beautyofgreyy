// @ts-check
import { test, expect } from "@playwright/test";
import { FORMSPREE } from "./pages.js";

/** @param {import('@playwright/test').Page} page */
async function fillRequiredFields(page) {
  await page.getByLabel("Full Name").fill("Test Client");
  await page.getByLabel("Phone").fill("555-555-0100");
  await page.getByLabel("Type of Shoot").selectOption("Portrait");
  await page.getByLabel("Possible Booking Dates").fill("August 20");
}

test.beforeEach(async ({ page }) => {
  await page.goto("/booking.html");
});

test("successful submission posts the form and redirects to thank-you", async ({
  page,
}) => {
  /** @type {import('@playwright/test').Request | undefined} */
  let sent;
  await page.route(FORMSPREE, (route) => {
    sent = route.request();
    return route.fulfill({ status: 200, json: { ok: true } });
  });

  await fillRequiredFields(page);
  await page.getByRole("button", { name: "Send Booking Request" }).click();

  await expect(page).toHaveURL(/thank-you\.html$/);
  expect(sent?.method()).toBe("POST");
  expect(sent?.headers()["accept"]).toBe("application/json");
  expect(sent?.postData()).toContain("Test Client");
});

test("failed submission shows an error and re-enables the button", async ({
  page,
}) => {
  await page.route(FORMSPREE, (route) =>
    route.fulfill({ status: 500, json: {} }),
  );

  await fillRequiredFields(page);
  const button = page.locator("#submit-button");
  await button.click();

  await expect(page.locator("#form-status")).toHaveText(/Something went wrong/);
  await expect(page.locator("#form-status")).toHaveClass(/error/);
  await expect(button).toBeEnabled();
  await expect(button).toHaveText("Send Booking Request");
  await expect(page).toHaveURL(/booking\.html$/);
});

test("required fields block submission when empty", async ({ page }) => {
  let called = false;
  await page.route(FORMSPREE, (route) => {
    called = true;
    return route.fulfill({ status: 200, json: {} });
  });

  await page.getByRole("button", { name: "Send Booking Request" }).click();
  await expect(page).toHaveURL(/booking\.html$/);
  expect(called).toBe(false);
});

test.fixme("form posts to a real Formspree form ID", async ({ page }) => {
  // KNOWN ISSUE: booking.html still uses the YOUR_FORM_ID placeholder.
  // Enable (test.fixme -> test) after setting the real ID.
  await expect(page.locator("#booking-form")).not.toHaveAttribute(
    "action",
    /YOUR_FORM_ID/,
  );
});
