import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const distDir = join(root, "dist");
const siteData = JSON.parse(readFileSync(join(root, "src/content/site-data.json"), "utf8"));
const baseHtml = readFileSync(join(distDir, "index.html"), "utf8");
const socialImage = `${siteData.siteUrl}${siteData.socialImagePath}`;

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

function breadcrumbItems(route) {
  const items = [{ name: "Home", url: absoluteUrl("/") }];

  if (route.path !== "/") {
    items.push({ name: route.title.replace(" | DocuScrit", ""), url: absoluteUrl(route.path) });
  }

  return items;
}

function structuredData(route) {
  const canonicalUrl = absoluteUrl(route.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteData.siteUrl}/#organization`,
        name: siteData.siteName,
        url: siteData.siteUrl,
        logo: `${siteData.siteUrl}/brand/docuscrit-app-icon.svg`,
        email: siteData.contactEmail,
        telephone: siteData.contactPhoneTel,
      },
      {
        "@type": "WebSite",
        "@id": `${siteData.siteUrl}/#website`,
        name: siteData.siteName,
        url: siteData.siteUrl,
        publisher: { "@id": `${siteData.siteUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: route.title,
        description: route.description,
        isPartOf: { "@id": `${siteData.siteUrl}/#website` },
        about: { "@id": `${siteData.siteUrl}/#organization` },
      },
      ...(route.path === "/"
        ? [
            {
              "@type": "SoftwareApplication",
              "@id": `${siteData.siteUrl}/#software`,
              name: siteData.siteName,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description: route.description,
              url: siteData.siteUrl,
              publisher: { "@id": `${siteData.siteUrl}/#organization` },
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems(route).map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      },
    ],
  };
}

function replaceMeta(html, attribute, key, content) {
  const escaped = escapeAttribute(content);
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*/?>|<meta\\s+${attribute}="${key}"[^>]*?content="[^"]*"[^>]*?>`, "s");
  const tag = `<meta ${attribute}="${key}" content="${escaped}" />`;

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function replaceCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeAttribute(href)}" />`;
  return html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, tag);
}

function upsertStructuredData(html, route) {
  const tag = `<script type="application/ld+json" id="docuscrit-structured-data">${JSON.stringify(structuredData(route))}</script>`;

  if (html.includes('id="docuscrit-structured-data"')) {
    return html.replace(/<script type="application\/ld\+json" id="docuscrit-structured-data">[\s\S]*?<\/script>/, tag);
  }

  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderRoute(route) {
  const canonicalUrl = absoluteUrl(route.path);
  let html = baseHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(route.title)}</title>`);
  html = replaceCanonical(html, canonicalUrl);
  html = replaceMeta(html, "name", "description", route.description);
  html = replaceMeta(html, "name", "robots", route.noindex ? "noindex, nofollow" : "index, follow");
  html = replaceMeta(html, "property", "og:site_name", siteData.siteName);
  html = replaceMeta(html, "property", "og:title", route.title);
  html = replaceMeta(html, "property", "og:description", route.description);
  html = replaceMeta(html, "property", "og:type", route.ogType ?? "website");
  html = replaceMeta(html, "property", "og:url", canonicalUrl);
  html = replaceMeta(html, "property", "og:image", socialImage);
  html = replaceMeta(html, "property", "og:image:width", "1200");
  html = replaceMeta(html, "property", "og:image:height", "630");
  html = replaceMeta(html, "property", "og:image:alt", "DocuScrit compliance records you can defend");
  html = replaceMeta(html, "name", "twitter:card", "summary_large_image");
  html = replaceMeta(html, "name", "twitter:title", route.title);
  html = replaceMeta(html, "name", "twitter:description", route.description);
  html = replaceMeta(html, "name", "twitter:image", socialImage);
  html = upsertStructuredData(html, route);

  for (const outputPath of routeOutputPaths(route.path)) {
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, html);
  }
}

for (const route of Object.values(siteData.routes)) {
  renderRoute(route);
}

console.log(`Generated ${Object.keys(siteData.routes).length} static route entry files.`);
