import { test, expect } from "@playwright/test";

test.describe("Portfolio Nexus - E2E Core Journeys (AAA Standards)", () => {
  test.beforeEach(async ({ page }) => {
    // Garante que o teste roda em viewport desktop limpa
    await page.setViewportSize({ width: 1280, height: 800 });
  });

  test("Teste 1: Chaveamento dos 3 idiomas (EN ➔ PT ➔ ES) e verificação do texto no DOM", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Verifica se a página inicial carregou e se o switcher de idiomas está visível
    const languageSwitcher = page.locator('div[role="group"]');
    await expect(languageSwitcher).toBeVisible();

    // 1. Alterna para Português (PT)
    const ptButton = page.getByRole("button", { name: /Português/i });
    await ptButton.click();

    // Valida que o atributo lang do HTML atualizou para pt-BR
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");

    // Valida texto traduzido em português no DOM
    const heroExplorePt = page.getByRole("button", { name: "Explorar Projetos" });
    await expect(heroExplorePt).toBeVisible();

    // 2. Alterna para Espanhol (ES)
    const esButton = page.getByRole("button", { name: /Español/i });
    await esButton.click();

    // Valida que o atributo lang do HTML atualizou para es
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    // Valida texto traduzido em espanhol no DOM
    const heroExploreEs = page.getByRole("button", { name: "Explorar Trabajos" });
    await expect(heroExploreEs).toBeVisible();

    // 3. Alterna para Inglês (EN)
    const enButton = page.getByRole("button", { name: /English/i });
    await enButton.click();

    // Valida que o atributo lang do HTML atualizou para en
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    // Valida texto traduzido em inglês no DOM
    const heroExploreEn = page.getByRole("button", { name: "Explore Work" });
    await expect(heroExploreEn).toBeVisible();
  });

  test("Teste 2: Preenchimento do formulário de contato e verificação do link mailto:", async ({
    page,
  }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });

    // Localiza os campos do DirectContactForm
    const nameInput = page.locator('input[type="text"]').first();
    const subjectInput = page.locator('input[type="text"]').nth(1);
    const messageTextarea = page.locator("textarea");

    // Preenche com dados de teste
    await nameInput.fill("Recrutador Tech");
    await subjectInput.fill("Oportunidade Engenheiro Sênior");
    await messageTextarea.fill(
      "Olá Vanderlei, vimos seu portfólio Nexus e gostaríamos de agendar uma conversa."
    );

    // Localiza o botão 'Open Email Client' (link mailto:)
    const mailtoLink = page.locator('a[href^="mailto:vanderleividor1@gmail.com"]');
    await expect(mailtoLink).toBeVisible();

    // Obtém o href gerado dinamicamente e valida os parâmetros codificados
    const href = await mailtoLink.getAttribute("href");
    expect(href).toContain("mailto:vanderleividor1@gmail.com");
    expect(href).toContain("Oportunidade");
    expect(href).toContain("Recrutador");
  });

  test("Teste 3: Navegação da Home até a página /projects/music-player", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Rola até a seção de projetos ou clica diretamente no card do Music Player
    const musicPlayerCard = page.locator('a[href="/projects/music-player"]');
    await expect(musicPlayerCard).toBeVisible();

    // Clica no card e aguarda a transição de rota
    await musicPlayerCard.click();

    // Valida que a URL mudou para /projects/music-player
    await expect(page).toHaveURL(/\/projects\/music-player/);

    // Valida a presença do título do projeto renderizado na página interna
    const projectHeading = page.getByRole("heading", { name: "Music Player" });
    await expect(projectHeading).toBeVisible();
  });
});
