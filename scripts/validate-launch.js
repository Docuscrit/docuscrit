import { readFileSync, existsSync } from "node:fs";
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
assert(existsSync(join(root, "public/_redirects")), "static hosting redirect fallback is missing");
assert(existsSync(join(root, "public/_headers")), "security headers file is missing");
assert(existsSync(join(root, ".env.example")), ".env.example is missing");

assertIncludes("index.html", '<link rel="canonical" href="https://docuscrit.com/"', "index.html is missing a canonical URL");
assertIncludes("index.html", 'property="og:image" content="https://docuscrit.com/brand/docuscrit-og-card.png"', "index.html is missing the absolute OG image");
assertIncludes("index.html", 'name="twitter:card" content="summary_large_image"', "index.html is missing Twitter card metadata");
assertIncludes("index.html", '<link rel="manifest" href="/site.webmanifest"', "index.html is missing the web manifest link");
assertIncludes("public/robots.txt", "Sitemap: https://docuscrit.com/sitemap.xml", "robots.txt does not reference the sitemap");
assertIncludes("public/_redirects", "/* /index.html 200", "_redirects does not contain the SPA fallback rule");
assertIncludes("public/_headers", "Content-Security-Policy", "_headers is missing a CSP");
assertIncludes("public/_headers", "X-Content-Type-Options: nosniff", "_headers is missing nosniff");
assertIncludes("public/_headers", "X-Frame-Options: DENY", "_headers is missing anti-clickjacking headers");
assertIncludes("src/hooks/useDocumentMetadata.ts", "application/ld+json", "route metadata hook is missing JSON-LD output");
assertIncludes("src/app/App.tsx", "useDocumentMetadata", "App is not applying route metadata");
assertIncludes("src/app/App.tsx", "useAnalytics", "App is not applying analytics hook");
assertIncludes("src/hooks/useAnalytics.ts", "import.meta.env.PROD", "analytics must be gated to production builds");
assertIncludes("src/hooks/useAnalytics.ts", "VITE_DISABLE_ANALYTICS", "analytics disable flag is not wired");
assertIncludes(".env.example", "VITE_DISABLE_ANALYTICS=false", ".env.example is missing the analytics disable flag");
assertIncludes("src/hooks/useRevealAnimations.ts", "REVEAL_SAFETY_TIMEOUT_MS", "reveal animations need a safety timeout");
assertIncludes("src/styles/modules/motion.css", "reveal-pending", "motion styles must use reveal-pending instead of hiding all reveal targets");
assertIncludes("src/utils/contact.ts", "information@docuscrit.com", "contact email is not updated to the production address");
assertIncludes("src/utils/contact.ts", "(833) 362-6382", "contact phone is not updated to the production number");
assertIncludes("src/utils/formspree.ts", "VITE_FORM_ENDPOINT", "Formspree endpoint env var is not wired");
assertIncludes(".env.example", "VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID", ".env.example is missing the Formspree endpoint");
assertIncludes(".env.example", "VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX", ".env.example is missing the GA4 measurement ID");

const sitemap = read("public/sitemap.xml");
for (const route of requiredRoutes) {
  assert(sitemap.includes(`<loc>${route}</loc>`), `sitemap.xml is missing ${route}`);
}

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
  for (const outputPath of routeOutputPaths) {
    assert(existsSync(join(root, outputPath)), `${outputPath} is missing; run npm run build to generate static route entry files`);
  }

  for (const route of Object.values(siteData.routes)) {
    const outputPaths = route.path === "/" ? ["dist/index.html"] : [`dist${route.path}/index.html`, `dist${route.path}.html`];

    for (const outputPath of outputPaths) {
      const html = read(outputPath);
      assert(html.includes(`<title>${route.title}</title>`), `${outputPath} has the wrong title`);
      assert(html.includes(`<link rel="canonical" href="${siteData.siteUrl}${route.path}"`), `${outputPath} has the wrong canonical URL`);
      assert(html.includes('id="docuscrit-structured-data"'), `${outputPath} is missing structured data`);
      assert(!html.includes("hello@docuscrit.com"), `${outputPath} still contains old contact email`);
    }
  }
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

