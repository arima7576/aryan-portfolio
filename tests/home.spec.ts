import { expect, test } from "@playwright/test";

async function openFresh(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

test("renders the complete company narrative without runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await openFresh(page);
  await expect(page).toHaveTitle(/Arima Finance/);
  await expect(page.locator(".candle-system")).toBeVisible();
  await expect(page.getByRole("heading", { name: "What is Arima Finance?" })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Arima Finance Engine" }).last()).toBeAttached();
  await expect(page.getByRole("heading", { name: /Build the Future of/ })).toBeAttached();
  expect(errors).toEqual([]);
});

test("skip, persistent navigation and replay follow the intended lifecycle", async ({ page }) => {
  await openFresh(page);
  await page.getByRole("button", { name: /Skip Intro/ }).click();
  await expect(page.locator(".cinematic-nav")).toHaveClass(/is-visible/);
  await expect(page.locator("#company")).toBeInViewport({ ratio: 0.05 });
  await expect.poll(() => page.evaluate(() => localStorage.getItem("arima-cinematic-complete-v1"))).toBe("true");
  await page.reload();
  await expect(page.getByRole("button", { name: "Replay Experience" })).toBeVisible();
  await page.getByRole("button", { name: "Replay Experience" }).click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("arima-cinematic-complete-v1"))).toBeNull();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("first-time desktop scroll visibly advances and replay recreates the candle timeline", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop scroll-timeline validation");
  await openFresh(page);
  const before = await page.locator(".candle-body").evaluate((node) => getComputedStyle(node).height);
  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(900);
  const after = await page.locator(".candle-body").evaluate((node) => getComputedStyle(node).height);
  expect(parseFloat(after)).toBeGreaterThan(parseFloat(before) + 80);
  await page.getByRole("button", { name: /Skip Intro/ }).click();
  await page.reload();
  await page.getByRole("button", { name: "Replay Experience" }).click();
  await page.mouse.wheel(0, 1100);
  await page.waitForTimeout(900);
  const replayed = await page.locator(".candle-body").evaluate((node) => getComputedStyle(node).height);
  expect(parseFloat(replayed)).toBeGreaterThan(80);
});

test("mobile fallback remains readable without horizontal overflow", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only validation");
  await openFresh(page);
  const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1);
  await expect(page.getByRole("button", { name: /Skip Intro/ })).toBeVisible();
});
