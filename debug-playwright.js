const { chromium } = require('playwright');
const { spawn } = require('child_process');

const server = spawn('node', ['scripts/serve-static.mjs', 'out', '3000'], {
    cwd: 'c:\\Users\\bibij\\Portfolio Nexus',
    env: { ...process.env, GITHUB_PAGES: 'true', NEXT_PUBLIC_BASE_PATH: '/portfolio-nexus' },
    stdio: 'inherit',
});

setTimeout(async () => {
    try {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        page.on('console', msg => console.log('console:', msg.type(), msg.text()));
        page.on('pageerror', err => console.log('pageerror:', err.message));
        await page.goto('http://127.0.0.1:3000/portfolio-nexus/', { waitUntil: 'networkidle' });
        console.log('page url', page.url());
        console.log('html lang before', await page.locator('html').getAttribute('lang'));
        console.log('buttons', await page.locator('button[lang]').evaluateAll((els) => els.map((el) => ({ lang: el.getAttribute('lang'), text: el.textContent.trim() }))));
        await page.locator('button[lang="pt-BR"]').click();
        await page.waitForTimeout(1000);
        console.log('html lang after', await page.locator('html').getAttribute('lang'));
        console.log('button count', await page.locator('button[lang]').count());
        console.log('body first', (await page.locator('body').innerText()).slice(0, 600));
        await browser.close();
    } catch (e) {
        console.error('outer error', e);
        process.exitCode = 1;
    } finally {
        server.kill('SIGTERM');
    }
}, 2000);
