import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright";

const siteUrl = process.env.SITE_URL ?? "http://localhost:5173/";
const outputDir = resolve(process.env.CAPTURE_DIR ?? "review/output");
const executablePath = process.env.CHROMIUM_PATH;

const routes = [
  { name: "home", path: "/" },
  { name: "resources", path: "/resources" },
  { name: "demo", path: "/demo" },
  { name: "privacy", path: "/privacy" },
  { name: "terms", path: "/terms" },
];

const viewports = [
  { name: "desktop-1920", width: 1920, height: 1400 },
  { name: "desktop-1440", width: 1440, height: 1200 },
  { name: "tablet-1024", width: 1024, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
];

async function scrollThroughPage(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolveDelay) => window.setTimeout(resolveDelay, ms));
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const step = Math.max(220, Math.round(window.innerHeight * 0.65));

    for (let y = 0; y <= maxY; y += step) {
      window.scrollTo(0, y);
      await delay(80);
    }

    window.scrollTo(0, maxY);
    await delay(160);
    window.scrollTo(0, 0);
    await delay(200);
  });
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const report = [];

for (const route of routes) {
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });

    const consoleMessages = [];
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        consoleMessages.push({ type: message.type(), text: message.text() });
      }
    });

    const url = new URL(route.path, siteUrl).toString();
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await scrollThroughPage(page);
    await page.screenshot({ path: resolve(outputDir, `${route.name}-${viewport.name}.png`), fullPage: true });

    const metrics = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      const overflowing = [...document.querySelectorAll("*")]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName,
            className: typeof element.className === "string" ? element.className : "",
            id: element.id,
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 80),
          };
        })
        .filter((element) => element.right > window.innerWidth + 1 || element.left < -1)
        .slice(0, 30);

      const sections = [...document.querySelectorAll("section")].map((section) => ({
        id: section.id,
        className: typeof section.className === "string" ? section.className : "",
        heading: section.querySelector("h1,h2")?.textContent?.trim().replace(/\s+/g, " ") ?? "",
        top: Math.round(section.getBoundingClientRect().top),
        height: Math.round(section.getBoundingClientRect().height),
      }));

      const hiddenRevealTargets = [...document.querySelectorAll("[data-reveal]")]
        .map((element) => {
          const style = window.getComputedStyle(element);
          return {
            tag: element.tagName,
            className: typeof element.className === "string" ? element.className : "",
            reveal: element.getAttribute("data-reveal"),
            opacity: Number.parseFloat(style.opacity),
            visibility: style.visibility,
            heading: element.querySelector("h1,h2,h3")?.textContent?.trim().replace(/\s+/g, " ") ?? "",
          };
        })
        .filter((element) => element.visibility === "hidden" || element.opacity < 0.2);

      const bodyText = document.body.textContent ?? "";
      const placeholderMatches = [
        "Sample Community HOA",
        "Current 90-day sample",
        "Previous 30-day sample",
        "Earlier 30-day sample",
        "Sample property record",
        "Sample Owner",
        "Sample scan-status workflow",
        "Sarah",
        "Ridgeview",
        "John Smith",
        "Oak Ridge",
      ].filter((needle) => bodyText.includes(needle));

      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
        h1Count: document.querySelectorAll("h1").length,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        scrollWidth: html.scrollWidth,
        bodyScrollWidth: body.scrollWidth,
        pageHeight: html.scrollHeight,
        overflowing,
        sections,
        hiddenRevealTargets,
        placeholderMatches,
      };
    });

    report.push({ route: route.path, viewport: viewport.name, consoleMessages, ...metrics });
    console.log(`--- ${route.name} / ${viewport.name} ---`);
    console.log(JSON.stringify({ ...metrics, consoleMessages }, null, 2));
    await page.close();
  }
}

await writeFile(resolve(outputDir, "capture-report.json"), JSON.stringify(report, null, 2));
await browser.close();
