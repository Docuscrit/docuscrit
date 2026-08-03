import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const siteData = JSON.parse(readFileSync(join(root, "src/content/site-data.json"), "utf8"));
const requiredRoutes = Object.values(siteData.routes).map((route) => `${siteData.siteUrl}${route.path}`);
const failures = [];

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function assertIncludes(file, needle, message) {
  assert(read(file).includes(needle), message ?? `${file} is missing ${needle}`);
}

function getPngDimensions(path) {
  const buffer = readFileSync(join(root, path));
  const signature = buffer.subarray(0, 8).toString("hex");

  if (signature !== "89504e470d0a1a0a") {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

assert(existsSync(join(root, "public/robots.txt")), "robots.txt is missing");
assert(existsSync(join(root, "public/sitemap.xml")), "sitemap.xml is missing");
assert(existsSync(join(root, "public/site.webmanifest")), "site.webmanifest is missing");
assert(existsSync(join(root, "public/brand/docuscrit-og-card.png")), "social preview PNG is missing");
assert(existsSync(join(root, "public/_redirects")), "static hosting redirect file is missing");
assert(existsSync(join(root, "public/_headers")), "security headers file is missing");
assert(existsSync(join(root, ".env.example")), ".env.example is missing");
assert(existsSync(join(root, "src/entry-server.tsx")), "SSR entry is missing");
assert(existsSync(join(root, "src/pages/NotFoundPage.tsx")), "404 page is missing");
assert(existsSync(join(root, "scripts/generate-sitemap.js")), "sitemap generator is missing");
assert(existsSync(join(root, "scripts/qa.js")), "browser QA script is missing");

assertIncludes("index.html", '<link rel="canonical" href="https://docuscrit.com/"', "index.html is missing a canonical URL");
assertIncludes("index.html", 'property="og:image" content="https://docuscrit.com/brand/docuscrit-og-card.png"', "index.html is missing the absolute OG image");
assertIncludes("index.html", 'name="twitter:card" content="summary_large_image"', "index.html is missing Twitter card metadata");
assertIncludes("index.html", '<link rel="manifest" href="/site.webmanifest"', "index.html is missing the web manifest link");
assertIncludes("public/robots.txt", "Sitemap: https://docuscrit.com/sitemap.xml", "robots.txt does not reference the sitemap");
assertIncludes("public/_redirects", "/* /404.html 404", "_redirects does not send unknown paths to the 404 page");
assertIncludes("public/_headers", "Content-Security-Policy", "_headers is missing a CSP");
assertIncludes("public/_headers", "X-Content-Type-Options: nosniff", "_headers is missing nosniff");
assertIncludes("public/_headers", "X-Frame-Options: DENY", "_headers is missing anti-clickjacking headers");
assertIncludes("src/hooks/useDocumentMetadata.ts", "buildStructuredData", "route metadata hook is not using shared JSON-LD output");
assertIncludes("src/app/App.tsx", "NotFoundPage", "App does not render a real 404 page");
assertIncludes("src/main.tsx", "hydrateRoot", "client entry is not hydrating prerendered HTML");
assertIncludes("src/entry-server.tsx", "renderToString", "SSR entry is not rendering React markup");
assertIncludes("scripts/postbuild-routes.js", "serverEntry.render", "postbuild route generation is not prerendering route content");
assertIncludes("scripts/postbuild-routes.js", 'writeFileSync(join(distDir, "404.html")', "postbuild route generation is not creating 404.html");
assertIncludes("package.json", '"generate:sitemap"', "package scripts do not include sitemap generation");
assertIncludes("package.json", '"build:ssr"', "package scripts do not include the SSR build");
assertIncludes("package.json", '"qa"', "package scripts do not include browser QA");
assertIncludes("src/utils/analytics.ts", "getAttributionData", "campaign attribution capture is missing");
assertIncludes("src/utils/analytics.ts", "product_cta_click", "analytics event taxonomy is incomplete");
assertIncludes("src/components/forms/DemoRequestForm.tsx", "demo_form_start", "demo form start tracking is missing");
assertIncludes("src/components/forms/DemoRequestForm.tsx", "demo-form__error-summary", "accessible form error summary is missing");
assertIncludes("src/components/forms/DemoRequestForm.tsx", "aria-describedby", "field error descriptions are missing");
assertIncludes("src/utils/formspree.ts", "utm_source", "demo submissions are not preserving campaign attribution");
assertIncludes("src/hooks/useRevealAnimations.ts", "REVEAL_SAFETY_TIMEOUT_MS", "reveal animations need a safety timeout");
assertIncludes("src/styles/components.css", "Consolidated Phase 3 stylesheet", "CSS was not consolidated for Phase 3");
assert(!existsSync(join(root, "src/styles/modules")), "legacy CSS modules directory should be removed after consolidation");
assertIncludes("src/utils/contact.ts", "information@docuscrit.com", "contact email is not updated to the production address");
assertIncludes("src/utils/contact.ts", "(832) 239-9924", "contact phone is not updated to the production number");
assertIncludes("src/utils/formspree.ts", "VITE_FORM_ENDPOINT", "Formspree endpoint env var is not wired");
assertIncludes(".env.example", "VITE_DISABLE_ANALYTICS=false", ".env.example is missing the analytics disable flag");
assertIncludes(".env.example", "VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID", ".env.example is missing the Formspree endpoint");
assertIncludes(".env.example", "VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX", ".env.example is missing the GA4 measurement ID");

const sitemap = read("public/sitemap.xml");
for (const route of requiredRoutes) {
  assert(sitemap.includes(`<loc>${route}</loc>`), `sitemap.xml is missing ${route}`);
}
assert(!sitemap.includes("/404"), "sitemap.xml must not include the 404 page");

const manifest = JSON.parse(read("public/site.webmanifest"));
assert(manifest.name === "DocuScrit", "manifest name should be DocuScrit");
assert(manifest.start_url === "/", "manifest start_url should be /");
assert(Array.isArray(manifest.icons) && manifest.icons.length > 0, "manifest must include at least one icon");

const dimensions = getPngDimensions("public/brand/docuscrit-og-card.png");
assert(dimensions?.width === 1200 && dimensions?.height === 630, "social preview PNG must be 1200x630");

const routeOutputPaths = Object.values(siteData.routes).flatMap((route) =>
  route.path === "/" ? ["dist/index.html"] : [`dist${route.path}/index.html`, `dist${route.path}.html`],
);

if (existsSync(join(root, "dist"))) {
  for (const outputPath of [...routeOutputPaths, "dist/404.html"]) {
    assert(existsSync(join(root, outputPath)), `${outputPath} is missing; run npm run build to generate prerendered routes`);
  }

  for (const route of Object.values(siteData.routes)) {
    const outputPaths = route.path === "/" ? ["dist/index.html"] : [`dist${route.path}/index.html`, `dist${route.path}.html`];

    for (const outputPath of outputPaths) {
      const html = read(outputPath);
      assert(html.includes(`<title>${route.title}</title>`), `${outputPath} has the wrong title`);
      assert(html.includes(`<link rel="canonical" href="${siteData.siteUrl}${route.path}"`), `${outputPath} has the wrong canonical URL`);
      assert(html.includes('id="docuscrit-structured-data"'), `${outputPath} is missing structured data`);
      assert(html.includes('<div id="root"><a class="skip-link"'), `${outputPath} does not contain prerendered React markup`);
      assert(html.includes('<main id="main"'), `${outputPath} is missing prerendered main content`);
      assert(!html.includes('<div id="root"></div>'), `${outputPath} still has an empty app root`);
      assert(!html.includes("hello@docuscrit.com"), `${outputPath} still contains old contact email`);
    }
  }

  const notFoundHtml = read("dist/404.html");
  assert(notFoundHtml.includes("Page Not Found | DocuScrit"), "404.html has the wrong title");
  assert(notFoundHtml.includes('content="noindex, nofollow"'), "404.html must be noindex");
  assert(notFoundHtml.includes("That page is not part of the DocuScrit platform site."), "404.html is missing useful content");

  const assetDir = join(root, "dist/assets");
  const assetFiles = readdirSync(assetDir);
  const cssFiles = assetFiles.filter((file) => file.endsWith(".css"));
  const jsFiles = assetFiles.filter((file) => file.endsWith(".js"));
  const totalCssBytes = cssFiles.reduce((total, file) => total + statSync(join(assetDir, file)).size, 0);
  const totalJsBytes = jsFiles.reduce((total, file) => total + statSync(join(assetDir, file)).size, 0);

  assert(cssFiles.length > 0, "production build did not emit CSS");
  assert(jsFiles.length > 0, "production build did not emit JavaScript");
  assert(totalCssBytes <= 300 * 1024, `production CSS exceeds the 300 KB budget (${Math.round(totalCssBytes / 1024)} KB)`);
  assert(totalJsBytes <= 600 * 1024, `production JavaScript exceeds the 600 KB budget (${Math.round(totalJsBytes / 1024)} KB)`);
}

const forbiddenVisiblePlaceholders = [
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
];

for (const sourcePath of [
  "src/components/home/DashboardPreview.tsx",
  "src/components/home/FeaturePreview.tsx",
  "src/components/home/ProductPanel.tsx",
  "src/components/products/ProductPreview.tsx",
  "src/content/resources.ts",
]) {
  const source = read(sourcePath);
  for (const placeholder of forbiddenVisiblePlaceholders) {
    assert(!source.includes(placeholder), `${sourcePath} still contains placeholder-looking text: ${placeholder}`);
  }
}

if (failures.length > 0) {
  console.error("Launch validation failed:\n");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Launch validation passed.");
