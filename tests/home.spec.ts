import { expect, test } from "@playwright/test";

async function openFilm(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

test("renders only the Phase 1 cinematic film", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await openFilm(page);
  await expect(page.locator(".phase-one-film")).toBeVisible();
  await expect(page.locator(".film-stage")).toBeVisible();
  await expect(page.locator(".animation-diagnostics")).toHaveCount(0);
  await expect(page.locator(".cinematic-nav")).toHaveCount(0);
  await expect(page.locator(".portfolio-scene, .founder-scene, .contact-scene")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("one native-scroll master timeline produces six distinct desktop states", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop cinematic state validation");
  await openFilm(page);
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  expect(maxScroll).toBeGreaterThanOrEqual(6_500);

  const states: Array<{ progress: number; candle: string; universe: string; af: string; name: string }> = [];
  for (const progress of [0, .2, .4, .6, .8, 1]) {
    await page.evaluate((top) => window.scrollTo(0, top), maxScroll * progress);
    await page.waitForTimeout(1_300);
    states.push(await page.evaluate((value) => ({
      progress: value,
      candle: getComputedStyle(document.querySelector(".film-candle")!).transform,
      universe: getComputedStyle(document.querySelector(".data-universe")!).opacity,
      af: getComputedStyle(document.querySelector(".af-film-mark")!).opacity,
      name: getComputedStyle(document.querySelector(".af-film-name")!).opacity,
    }), progress));
  }

  expect(states[0].candle).not.toBe(states[2].candle);
  expect(Number(states[3].universe)).toBeGreaterThan(0);
  expect(Number(states[4].universe)).toBe(1);
  expect(Number(states[5].af)).toBeGreaterThan(.99);
  expect(Number(states[5].name)).toBeGreaterThan(.99);
});

test("reduced motion reveals a readable static identity", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openFilm(page);
  await expect(page.locator(".af-film-mark")).toBeVisible();
  await expect(page.locator(".af-film-name")).toBeVisible();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("responsive fallback has no horizontal overflow", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only validation");
  await openFilm(page);
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
});
