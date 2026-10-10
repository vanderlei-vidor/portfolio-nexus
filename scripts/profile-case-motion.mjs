import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const port = process.env.MOTION_PROFILE_PORT ?? "3010";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const origin = `http://127.0.0.1:${port}`;
const baseURL = `${origin}${basePath}`;
const evidencePath = path.join(
  process.cwd(),
  "docs",
  "evidence",
  "portfolio-nexus",
  "motion-profile.json",
);
const routes = [
  "/projects/music-player",
  "/projects/saas-data-control",
  "/projects/english-tutor",
  "/projects/portfolio-nexus",
];

const server = spawn(process.execPath, ["scripts/serve-static.mjs", "out", port], {
  cwd: process.cwd(),
  stdio: ["ignore", "pipe", "pipe"],
});

async function waitForServer() {
  const deadline = Date.now() + 20_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseURL || origin);
      if (response.ok) return;
    } catch {
      // The static server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error(`Static server did not become ready at ${baseURL}`);
}

async function profileRoute(browser, route, reducedMotion) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion,
  });
  const page = await context.newPage();
  const pageErrors = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.addInitScript(() => {
    const metrics = {
      cls: 0,
      clsSessionValue: 0,
      clsSessionStart: 0,
      clsLastEntry: 0,
      layoutShifts: [],
      longTasks: [],
    };
    window.__motionProfile = metrics;
    window.__resetMotionProfile = () => {
      metrics.cls = 0;
      metrics.clsSessionValue = 0;
      metrics.clsSessionStart = 0;
      metrics.clsLastEntry = 0;
      metrics.layoutShifts.length = 0;
      metrics.longTasks.length = 0;
    };

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.hadRecentInput) continue;

        const startsNewSession =
          metrics.clsSessionStart === 0 ||
          entry.startTime - metrics.clsLastEntry > 1_000 ||
          entry.startTime - metrics.clsSessionStart > 5_000;

        if (startsNewSession) {
          metrics.clsSessionValue = entry.value;
          metrics.clsSessionStart = entry.startTime;
        } else {
          metrics.clsSessionValue += entry.value;
        }

        metrics.clsLastEntry = entry.startTime;
        metrics.cls = Math.max(metrics.cls, metrics.clsSessionValue);
        metrics.layoutShifts.push({
          value: Number(entry.value.toFixed(4)),
          sources: (entry.sources ?? []).map((source) => {
            const node = source.node;
            if (!(node instanceof Element)) return "unknown";
            const identifier = node.id ? `#${node.id}` : "";
            const classes = [...node.classList].slice(0, 3).map((name) => `.${name}`).join("");
            return `${node.tagName.toLowerCase()}${identifier}${classes}`;
          }),
        });
      }
    }).observe({ type: "layout-shift", buffered: true });

    if (PerformanceObserver.supportedEntryTypes.includes("longtask")) {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) metrics.longTasks.push(entry.duration);
      }).observe({ type: "longtask" });
    }
  });

  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.__resetMotionProfile());

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const maxScroll = Math.max(0, scrollHeight - 844);
  const steps = Math.min(28, Math.max(1, Math.ceil(maxScroll / 700)));

  for (let step = 0; step <= steps; step += 1) {
    await page.evaluate(
      ({ top }) => window.scrollTo({ top, behavior: "auto" }),
      { top: Math.round((maxScroll * step) / steps) },
    );
    await page.waitForTimeout(90);
  }

  await page.waitForTimeout(300);

  const metrics = await page.evaluate(() => {
    const profile = window.__motionProfile;
    const activeAnimations = document.getAnimations().filter((animation) => animation.playState === "running");
    const transformAnimations = activeAnimations.filter((animation) => {
      const effect = animation.effect;
      if (!(effect instanceof KeyframeEffect)) return false;

      return effect.getKeyframes().some((keyframe) =>
        ["transform", "filter", "translate", "rotate", "scale", "offsetPath"].some(
          (property) => property in keyframe && keyframe[property] !== "none",
        ),
      );
    });

    return {
      cls: Number(profile.cls.toFixed(4)),
      longTaskCount: profile.longTasks.length,
      maxLongTaskMs: Number(Math.max(0, ...profile.longTasks).toFixed(1)),
      activeAnimations: activeAnimations.length,
      activeTransformAnimations: transformAnimations.length,
      activeTransformTargets: [...new Set(transformAnimations.map((animation) => {
        const target = animation.effect instanceof KeyframeEffect ? animation.effect.target : null;
        if (!(target instanceof Element)) return "unknown";
        const identifier = target.id ? `#${target.id}` : "";
        const classes = [...target.classList].slice(0, 3).map((name) => `.${name}`).join("");
        return `${target.tagName.toLowerCase()}${identifier}${classes}`;
      }))].slice(0, 20),
      largestLayoutShifts: [...profile.layoutShifts]
        .sort((left, right) => right.value - left.value)
        .slice(0, 10),
      scrollHeight: document.documentElement.scrollHeight,
    };
  });

  await context.close();

  return { route, reducedMotion, pageErrors, ...metrics };
}

let browser;

try {
  await waitForServer();
  browser = await chromium.launch();

  const results = [];
  for (const reducedMotion of ["no-preference", "reduce"]) {
    for (const route of routes) {
      results.push(await profileRoute(browser, route, reducedMotion));
    }
  }

  const evidence = {
    generatedAt: new Date().toISOString(),
    environment: {
      browser: "Chromium (Playwright)",
      viewport: "390x844",
      build: "Next.js static export",
      basePath,
    },
    thresholds: {
      cls: 0.1,
      longTaskCount: 6,
      maxLongTaskMs: 100,
      pageErrors: 0,
      reducedMotionActiveTransformAnimations: 0,
    },
    results,
  };

  await mkdir(path.dirname(evidencePath), { recursive: true });
  await writeFile(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");

  const failures = results.filter(
    (result) =>
      result.cls > evidence.thresholds.cls ||
      result.longTaskCount > evidence.thresholds.longTaskCount ||
      result.maxLongTaskMs > evidence.thresholds.maxLongTaskMs ||
      result.pageErrors.length > evidence.thresholds.pageErrors ||
      (result.reducedMotion === "reduce" &&
        result.activeTransformAnimations > evidence.thresholds.reducedMotionActiveTransformAnimations),
  );

  console.table(results);
  console.log(`Motion profile saved to ${path.relative(process.cwd(), evidencePath)}`);

  if (failures.length > 0) process.exitCode = 1;
} finally {
  await browser?.close();
  server.kill();
}
