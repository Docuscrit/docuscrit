import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const siteData = JSON.parse(readFileSync(join(root, "src/content/site-data.json"), "utf8"));
const routes = Object.values(siteData.routes).filter((route) => !route.noindex);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteData.siteUrl}${route.path}</loc>
    <changefreq>${route.changefreq ?? "monthly"}</changefreq>
    <priority>${route.priority ?? "0.5"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`Generated sitemap.xml with ${routes.length} routes.`);
