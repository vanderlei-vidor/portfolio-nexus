import { expect, test } from "@playwright/test";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const withBasePath = (path: string) => `${basePath}${path.startsWith("/") ? path : `/${path}`}` || "/";

test.describe("Portfolio Nexus - E2E Core Journeys", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => localStorage.removeItem("nexus_locale"));
  });

  test("switches between EN, PT and ES content", async ({ page }) => {
    await page.goto(withBasePath("/"), { waitUntil: "domcontentloaded" });

    const languageSwitcher = page.locator('div[role="group"]');
    await expect(languageSwitcher).toBeVisible();

    await page.locator('button[lang="pt-BR"]').click();
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.getByRole("button", { name: "Explorar Cases" })).toBeVisible();

    await page.locator('button[lang="es"]').click();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.getByRole("button", { name: "Explorar Casos" })).toBeVisible();

    await page.locator('button[lang="en"]').click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("button", { name: "Explore Cases" })).toBeVisible();
  });

  test("updates the contact mailto link from form fields", async ({ page }) => {
    await page.goto(withBasePath("/contact"), { waitUntil: "domcontentloaded" });

    await page.locator('input[type="text"]').first().fill("Recrutador Tech");
    await page.locator('input[type="text"]').nth(1).fill("Oportunidade Engenheiro Senior");
    await page.locator("textarea").fill(
      "Ola Vanderlei, vimos seu portfolio Nexus e gostariamos de agendar uma conversa."
    );

    const mailtoLink = page.locator('a[href^="mailto:vanderleividor1@gmail.com"]');
    await expect(mailtoLink).toBeVisible();

    const href = await mailtoLink.getAttribute("href");
    expect(href).toContain("mailto:vanderleividor1@gmail.com");
    expect(decodeURIComponent(href ?? "")).toContain("Oportunidade Engenheiro Senior");
    expect(decodeURIComponent(href ?? "")).toContain("Recrutador Tech");
  });

  test("navigates from home to the Music Player case study", async ({ page }) => {
    await page.goto(withBasePath("/"), { waitUntil: "domcontentloaded" });

    const musicPlayerHref = withBasePath("/projects/music-player/");
    const musicPlayerCard = page.locator(`a[href="${musicPlayerHref}"]`);
    await expect(musicPlayerCard).toBeVisible();

    await musicPlayerCard.click();

    await expect(page).toHaveURL(/\/projects\/music-player\/?$/);
    await expect(page.getByRole("heading", { name: "Music Player" })).toBeVisible();
  });
});
