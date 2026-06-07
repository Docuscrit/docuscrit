import siteData from "./site-data.json";

export const SITE_URL = siteData.siteUrl;
export const SITE_NAME = siteData.siteName;
export const SITE_TAGLINE = siteData.siteTagline;
export const SITE_DESCRIPTION = siteData.siteDescription;
export const SITE_SOCIAL_IMAGE = `${SITE_URL}${siteData.socialImagePath}`;

export type SiteRoutePath = "/" | "/demo" | "/resources" | "/privacy" | "/terms";

export type SitePageMetadata = {
  path: SiteRoutePath;
  title: string;
  description: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  priority?: string;
  changefreq?: string;
};

export const SITE_ROUTES = siteData.routes as Record<SiteRoutePath, SitePageMetadata>;
export const SITEMAP_ROUTES = Object.values(SITE_ROUTES).map((route) => route.path);

export function normalizeSitePath(pathname: string): SiteRoutePath {
  const withoutTrailingSlash = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (withoutTrailingSlash in SITE_ROUTES) {
    return withoutTrailingSlash as SiteRoutePath;
  }

  return "/";
}

export function getAbsoluteUrl(path: string = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function getBreadcrumbItems(route: SitePageMetadata) {
  const items = [{ name: "Home", url: getAbsoluteUrl("/") }];

  if (route.path !== "/") {
    items.push({ name: route.title.replace(" | DocuScrit", ""), url: getAbsoluteUrl(route.path) });
  }

  return items;
}
