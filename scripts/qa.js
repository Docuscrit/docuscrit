import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const siteData = JSON.parse(readFileSync(resolve("src/content/site-data.json"), "utf8"));
const siteUrl = process.env.SITE_URL ?? "http://127.0.0.1:4173/";
const outputDir = resolve(process.env.QA_DIR ?? "review/qa");
const executablePath = process.env.CHROMIUM_PATH;
const routes = [...Object.values(siteData.routes).map((route) => route.path), "/404.html"];
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const results = [];
const failures = [];

for (const route of routes) {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    const response = await page.goto(new URL(route, siteUrl).toString(), { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    const audit = await page.evaluate(() => {
      const interactiveSelector = 'a[href], button:not([disabled]), input:not([type="hidden"]), select, textarea';
      const unlabeledFields = [...document.querySelectorAll('input:not([type="hidden"]), select, textarea')]
        .filter((field) => {
          const ariaLabel = field.getAttribute("aria-label");
          const labelledBy = field.getAttribute("aria-labelledby");
          const label = field.id ? document.querySelector(`label[for="${CSS.escape(field.id)}"]`) : field.closest("label");
          return !ariaLabel && !labelledBy && !label;
        })
        .map((field) => `${field.tagName.toLowerCase()}#${field.id || field.name}`);

      const missingImageAlts = [...document.querySelectorAll("img")]
        .filter((image) => !image.hasAttribute("alt"))
        .map((image) => image.currentSrc || image.src);

      const tinyTargets = [...document.querySelectorAll(interactiveSelector)]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            label: (element.getAttribute("aria-label") || element.textContent || element.tagName).trim().slice(0, 80),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            display: style.display,
          };
        })
        .filter((target) => target.display !== "none" && target.width > 0 && target.height > 0)
        .filter((target) => target.width < 24 || target.height < 24)
        .slice(0, 30);

      const hiddenRevealTargets = [...document.querySelectorAll("[data-reveal]")]
        .filter((element) => {
          const style = getComputedStyle(element);
          return style.visibility === "hidden" || Number.parseFloat(style.opacity) < 0.15;
        })
        .map((element) => element.className)
        .slice(0, 20);

      const navigationEntry = performance.getEntriesByType("navigation")[0];
      const resources = performance.getEntriesByType("resource");

      return {
        title: document.title,
        h1Count: document.querySelectorAll("h1").length,
        hasMain: Boolean(document.querySelector("main#main")),
        hasSkipLink: Boolean(document.querySelector('a.skip-link[href="#main"]')),
        horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
        unlabeledFields,
        missingImageAlts,
        tinyTargets,
        hiddenRevealTargets,
        timing: navigationEntry
          ? {
              domContentLoaded: Math.round(navigationEntry.domContentLoadedEventEnd),
              load: Math.round(navigationEntry.loadEventEnd),
            }
          : null,
        resourceCount: resources.length,
        transferSize: Math.round(resources.reduce((total, resource) => total + resource.transferSize, 0) / 1024),
      };
    });

    const item = {
      route,
      viewport: viewport.name,
      status: response?.status() ?? null,
      consoleErrors,
      ...audit,
    };
    results.push(item);

    const prefix = `${route} (${viewport.name})`;
    if (audit.h1Count !== 1) failures.push(`${prefix}: expected one h1, found ${audit.h1Count}`);
    if (!audit.hasMain) failures.push(`${prefix}: main landmark is missing`);
    if (!audit.hasSkipLink) failures.push(`${prefix}: skip link is missing`);
    if (audit.horizontalOverflow > 1) failures.push(`${prefix}: horizontal overflow is ${audit.horizontalOverflow}px`);
    if (audit.unlabeledFields.length) failures.push(`${prefix}: unlabeled fields: ${audit.unlabeledFields.join(", ")}`);
    if (audit.missingImageAlts.length) failures.push(`${prefix}: images missing alt text`);
    if (audit.hiddenRevealTargets.length) failures.push(`${prefix}: reveal targets remained hidden`);
    if (consoleErrors.length) failures.push(`${prefix}: console errors: ${consoleErrors.join(" | ")}`);

    await page.close();
  }
}

await browser.close();
await writeFile(resolve(outputDir, "qa-report.json"), JSON.stringify({ siteUrl, results, failures }, null, 2));

if (failures.length) {
  console.error("Browser QA failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Browser QA passed for ${routes.length} routes at ${viewports.length} viewport sizes.`);
