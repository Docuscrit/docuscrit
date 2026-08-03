import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = join(root, "dist");
const serverDir = join(root, "dist-server");
const siteData = JSON.parse(readFileSync(join(root, "src/content/site-data.json"), "utf8"));
const baseHtml = readFileSync(join(distDir, "index.html"), "utf8");
const socialImage = `${siteData.siteUrl}${siteData.socialImagePath}`;
const serverEntryFile = ["entry-server.js", "entry-server.mjs"]
  .map((file) => join(serverDir, file))
  .find((file) => existsSync(file)) ??
  readdirSync(serverDir)
    .filter((file) => /^entry-server\.(?:js|mjs)$/.test(file))
    .map((file) => join(serverDir, file))[0];

if (!serverEntryFile) {
  throw new Error("The SSR build did not produce an entry-server bundle.");
}

const serverEntry = await import(pathToFileURL(serverEntryFile).href);

function absoluteUrl(path) {
  return `${siteData.siteUrl}${path}`;
}

function routeOutputPaths(path) {
  if (path === "/") {
    return [join(distDir, "index.html")];
  }

  const cleanPath = path.slice(1);
  return [join(distDir, cleanPath, "index.html"), join(distDir, `${cleanPath}.html`)];
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function replaceMeta(html, attribute, key, content) {
  const escaped = escapeAttribute(content);
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*/?>|<meta\\s+${attribute}="${key}"[^>]*?content="[^"]*"[^>]*?>`,
    "s",
  );
  const tag = `<meta ${attribute}="${key}" content="${escaped}" />`;

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function replaceCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeAttribute(href)}" />`;
  const pattern = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?/;

  if (pattern.test(html)) {
    return html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, tag);
  }

  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertStructuredData(html, structuredData) {
  const safeJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");
  const tag = `<script type="application/ld+json" id="docuscrit-structured-data">${safeJson}</script>`;

  if (html.includes('id="docuscrit-structured-data"')) {
    return html.replace(
      /<script type="application\/ld\+json" id="docuscrit-structured-data">[\s\S]*?<\/script>/,
      tag,
    );
  }

  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function injectAppMarkup(html, markup) {
  const rootPattern = /<div id="root"><\/div>/;

  if (!rootPattern.test(html)) {
    throw new Error("The client build does not contain an empty #root element for prerendering.");
  }

  return html.replace(rootPattern, `<div id="root">${markup}</div>`);
}

function renderHtml(route, pathname = route.path) {
  const canonicalPath = route.path === "/404" ? pathname : route.path;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const markup = serverEntry.render(pathname);
  const structuredData = serverEntry.getStructuredDataForPath(pathname);
  let html = injectAppMarkup(baseHtml, markup);

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(route.title)}</title>`);
  html = replaceCanonical(html, canonicalUrl);
  html = replaceMeta(html, "name", "description", route.description);
  html = replaceMeta(html, "name", "robots", route.noindex ? "noindex, nofollow" : "index, follow");
  html = replaceMeta(html, "name", "keywords", route.keywords?.join(", ") ?? "");
  html = replaceMeta(html, "property", "og:site_name", siteData.siteName);
  html = replaceMeta(html, "property", "og:title", route.title);
  html = replaceMeta(html, "property", "og:description", route.description);
  html = replaceMeta(html, "property", "og:type", route.ogType ?? "website");
  html = replaceMeta(html, "property", "og:url", canonicalUrl);
  html = replaceMeta(html, "property", "og:image", socialImage);
  html = replaceMeta(html, "property", "og:image:width", "1200");
  html = replaceMeta(html, "property", "og:image:height", "630");
  html = replaceMeta(html, "property", "og:image:alt", "DocuScrit compliance workflow platform");
  html = replaceMeta(html, "name", "twitter:card", "summary_large_image");
  html = replaceMeta(html, "name", "twitter:title", route.title);
  html = replaceMeta(html, "name", "twitter:description", route.description);
  html = replaceMeta(html, "name", "twitter:image", socialImage);
  html = upsertStructuredData(html, structuredData);

  return html;
}

for (const route of Object.values(siteData.routes)) {
  const html = renderHtml(route);

  for (const outputPath of routeOutputPaths(route.path)) {
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, html);
  }
}

const notFoundRoute = {
  path: "/404",
  title: "Page Not Found | DocuScrit",
  description: "The requested DocuScrit page could not be found.",
  ogType: "website",
  noindex: true,
  keywords: [],
};
writeFileSync(join(distDir, "404.html"), renderHtml(notFoundRoute, "/404"));

rmSync(serverDir, { recursive: true, force: true });
console.log(`Prerendered ${Object.keys(siteData.routes).length} routes plus 404.html.`);
