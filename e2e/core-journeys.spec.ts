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

    const nameInput = page.locator("#contact-name");
    const subjectInput = page.locator("#contact-subject");
    const messageInput = page.locator("#contact-message");

    await expect(nameInput).toBeVisible();
    await nameInput.click();
    await nameInput.fill("Recrutador Tech");

    await subjectInput.click();
    await subjectInput.fill("Oportunidade Engenheiro Senior");

    await messageInput.click();
    await messageInput.fill(
      "Ola Vanderlei, vimos seu portfolio Nexus e gostariamos de agendar uma conversa."
    );

    const mailtoLink = page.locator('a[href^="mailto:vanderleividor1@gmail.com"]');
    await expect(mailtoLink).toBeVisible();
    await expect(mailtoLink).toHaveAttribute("href", /Oportunidade%20Engenheiro%20Senior/);
    await expect(mailtoLink).toHaveAttribute("href", /Recrutador%20Tech/);
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

  test("shows a complete recruiter summary on every case study", async ({ page }) => {
    const projectSlugs = [
      "music-player",
      "saas-data-control",
      "english-tutor",
      "portfolio-nexus",
    ];

    for (const slug of projectSlugs) {
      await page.goto(withBasePath(`/projects/${slug}`), { waitUntil: "domcontentloaded" });

      const summary = page.locator(`[data-case-study-summary="${slug}"]`);
      await expect(summary).toBeVisible();
      await expect(summary.getByRole("heading", { name: "Case study at a glance" })).toBeVisible();

      for (const label of ["Role", "Stack", "Challenge", "Key decision", "Evidence", "Result", "Status"]) {
        await expect(summary.getByText(label, { exact: true })).toBeVisible();
      }
    }
  });

  test("connects every case study to architecture, trade-offs and next steps", async ({ page }) => {
    const projectSlugs = [
      "music-player",
      "saas-data-control",
      "english-tutor",
      "portfolio-nexus",
    ];

    for (const slug of projectSlugs) {
      await page.goto(withBasePath(`/projects/${slug}`), { waitUntil: "domcontentloaded" });

      const summary = page.locator(`[data-case-study-summary="${slug}"]`);
      const technicalProofLink = summary.getByRole("link", { name: "Explore technical proof" });
      await expect(technicalProofLink).toHaveAttribute("href", `#${slug}-technical-proof`);
      await technicalProofLink.click();

      const technicalProof = page.locator(`[data-case-study-technical-proof="${slug}"]`);
      await expect(technicalProof).toBeVisible();
      await expect(technicalProof.getByRole("heading", { name: "Architecture flow" })).toBeVisible();
      await expect(technicalProof.getByRole("heading", { name: "Trade-offs" })).toBeVisible();
      await expect(
        technicalProof.getByRole("heading", { name: /Next (validation|release) steps/ })
      ).toBeVisible();
      await expect(technicalProof.locator("ol").first().locator("li")).toHaveCount(4);
      await expect(technicalProof.locator("article")).toHaveCount(3);
      await expect(technicalProof.locator("ol").nth(1).locator("li")).toHaveCount(3);
    }

    const portfolioProof = page.locator('[data-case-study-technical-proof="portfolio-nexus"]');

    await page.locator('button[lang="pt-BR"]').click();
    await expect(portfolioProof.getByRole("heading", { name: "Fluxo de arquitetura" })).toBeVisible();
    await expect(portfolioProof.getByRole("heading", { name: "Próximos passos de release" })).toBeVisible();

    await page.locator('button[lang="es"]').click();
    await expect(portfolioProof.getByRole("heading", { name: "Flujo de arquitectura" })).toBeVisible();
    await expect(portfolioProof.getByRole("heading", { name: "Próximos pasos de release" })).toBeVisible();
  });

  test("validates resume preview in new tab, direct download and toast feedback", async ({ page }) => {
    await page.goto(withBasePath("/"), { waitUntil: "domcontentloaded" });

    // Preview link in new tab
    const previewLink = page.locator('a[title*="Resume (PDF)"]');
    await expect(previewLink).toBeVisible();
    await expect(previewLink).toHaveAttribute("target", "_blank");
    await expect(previewLink).toHaveAttribute("href", withBasePath("/resume-en.pdf"));

    // Direct download button & toast feedback
    const downloadBtn = page.locator('a[download="Vanderlei_Vidor_Resume.pdf"]');
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toHaveAttribute("href", withBasePath("/resume-en.pdf"));

    // Click direct download and verify refined visual toast
    await downloadBtn.click();
    const toast = page.locator('[role="status"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("Resume download started");
  });
});
