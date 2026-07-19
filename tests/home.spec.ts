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
  expect(maxScroll).toBeGreaterThanOrEqual(33_500);

  const states: Array<{ progress: number; candle: string; universe: string; af: string; name: string }> = [];
  for (const progress of [0, 20 / 500, 40 / 500, 60 / 500, 80 / 500, 100 / 500]) {
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

test("Phase 2 continues through rotation, districts and destination", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop Phase 2 state validation");
  await openFilm(page);
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const seek = async (phase: number) => {
    await page.evaluate((top) => window.scrollTo(0, top), maxScroll * ((100 + phase) / 500));
    await page.waitForTimeout(1_300);
  };

  await seek(25);
  const quarterTurn = await page.locator(".rotation-chamber").evaluate((node) => getComputedStyle(node).transform);
  await seek(35);
  const halfTurn = await page.locator(".rotation-chamber").evaluate((node) => getComputedStyle(node).transform);
  await seek(55);
  const fullTurn = await page.locator(".rotation-chamber").evaluate((node) => getComputedStyle(node).transform);
  expect(new Set([quarterTurn, halfTurn, fullTurn]).size).toBe(3);

  await seek(67);
  await expect(page.getByText("HSBC", { exact: true })).toBeVisible();
  await expect(page.getByText("Barclays", { exact: true })).toBeVisible();
  await seek(82);
  await expect(page.getByText("Bloomberg", { exact: true })).toBeVisible();
  await expect(page.getByText("Nasdaq", { exact: true })).toBeVisible();
  await seek(92);
  await expect(page.getByText("Citadel", { exact: true })).toBeVisible();
  await expect(page.getByText("Jane Street", { exact: true })).toBeVisible();
  await seek(100);
  await expect(page.locator(".arima-destination")).toBeVisible();
  await expect(page.locator(".arima-destination").getByText("ARIMA FINANCE")).toBeVisible();
});

test("Phase 3 enters headquarters and reveals three spatial divisions", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop Phase 3 state validation");
  await openFilm(page);
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const seek = async (position: number) => {
    await page.evaluate((top) => window.scrollTo(0, top), maxScroll * (position / 500));
    await page.waitForTimeout(1_300);
  };

  await seek(214);
  await expect(page.locator(".af-entrance")).toBeVisible();
  await seek(238);
  await expect(page.locator(".intelligence-hall")).toBeVisible();
  await seek(258);
  await expect(page.locator(".core-identity").getByText("ARIMA FINANCE")).toBeVisible();
  await seek(288);
  await expect(page.getByText("Investment Banking & Financial Intelligence", { exact: true })).toBeVisible();
  await expect(page.getByText("Projects & Technology", { exact: true })).toBeVisible();
  await seek(318);
  await expect(page.getByText("AF Portfolio Lab", { exact: true })).toBeVisible();
  await expect(page.locator(".model-disclosure")).toBeVisible();
});

test("Phase 3 closes into a light beam and darkness without revealing later content", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop endpoint validation");
  await openFilm(page);
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  await page.evaluate((top) => window.scrollTo(0, top), maxScroll * (336 / 500));
  await page.waitForTimeout(1_300);
  await expect(page.locator(".founder-transition-beam")).toBeVisible();
  await page.evaluate((top) => window.scrollTo(0, top), maxScroll * (350 / 500));
  await page.waitForTimeout(1_300);
  await expect(page.locator(".phase-three-darkness")).toHaveCSS("opacity", "1");
  await expect(page.locator(".founder-scene, .contact-scene, .cinematic-nav")).toHaveCount(0);
});

test("Phase 4 reveals the Founder story and stops before Projects", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop Founder sequence validation");
  await openFilm(page);
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const seek = async (position: number) => {
    await page.evaluate((top) => window.scrollTo(0, top), maxScroll * (position / 500));
    await page.waitForTimeout(1_300);
  };
  await seek(378);
  await expect(page.locator(".founder-identity h2")).toHaveText("ARYAN HEIDARI");
  await expect(page.locator(".founder-identity h2")).toBeVisible();
  await seek(398);
  await expect(page.getByText("ENGINEERING FOUNDATIONS", { exact: true })).toBeVisible();
  await seek(416);
  await expect(page.getByText("FINANCE & MARKETS", { exact: true })).toBeVisible();
  await seek(434);
  await expect(page.getByRole("heading", { name: "QUANTITATIVE INTELLIGENCE", exact: true })).toBeVisible();
  await seek(450);
  await expect(page.locator(".experience-field").getByText("Bank of England", { exact: true })).toBeVisible();
  await seek(468);
  await expect(page.getByText("Monte Carlo Simulation", { exact: true })).toBeVisible();
  await seek(482);
  await expect(page.getByText("RISK MANAGEMENT CORE", { exact: true })).toBeVisible();
  await seek(496);
  await expect(page.getByText("Building financial systems where research, technology and risk discipline converge.", { exact: true })).toBeVisible();
  await expect(page.locator(".portfolio-scene, .project-panel, .contact-scene, .cinematic-nav")).toHaveCount(0);
});

test("reduced motion reveals the readable static headquarters", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openFilm(page);
  await expect(page.locator(".af-headquarters")).toBeVisible();
  await expect(page.getByText("AF Portfolio Lab", { exact: true })).toBeVisible();
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
