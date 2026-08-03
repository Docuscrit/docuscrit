import siteData from "./site-data.json";

export const SITE_URL = siteData.siteUrl;
export const SITE_NAME = siteData.siteName;
export const SITE_TAGLINE = siteData.siteTagline;
export const SITE_DESCRIPTION = siteData.siteDescription;
export const SITE_SOCIAL_IMAGE = `${SITE_URL}${siteData.socialImagePath}`;

export type SiteRoutePath =
  | "/"
  | "/vendor-coi"
  | "/legal-escalation"
  | "/compliance-risk-visibility"
  | "/security"
  | "/demo"
  | "/resources"
  | "/privacy"
  | "/terms";

export type SitePageMetadata = {
  path: string;
  title: string;
  description: string;
  breadcrumbName?: string;
  keywords?: string[];
  featureList?: string[];
  audience?: string[];
  pageType?: "WebPage" | "CollectionPage" | "ContactPage" | "Article";
  ogType?: "website" | "article";
  noindex?: boolean;
  priority?: string;
  changefreq?: string;
};

export const SITE_ROUTES = siteData.routes as Record<SiteRoutePath, SitePageMetadata>;
export const SITEMAP_ROUTES = Object.values(SITE_ROUTES).map((route) => route.path);

export const NOT_FOUND_ROUTE: SitePageMetadata = {
  path: "/404",
  title: "Page Not Found | DocuScrit",
  description: "The requested DocuScrit page could not be found.",
  breadcrumbName: "Page not found",
  pageType: "WebPage",
  ogType: "website",
  noindex: true,
};

export function normalizePathname(pathname: string) {
  const decoded = (() => {
    try {
      return decodeURI(pathname);
    } catch {
      return pathname;
    }
  })();
  let cleanPath = decoded.split("?")[0].split("#")[0] || "/";

  if (cleanPath === "/index.html") {
    cleanPath = "/";
  } else if (cleanPath.endsWith(".html")) {
    cleanPath = cleanPath.slice(0, -5);
  }

  return cleanPath.length > 1 && cleanPath.endsWith("/") ? cleanPath.slice(0, -1) : cleanPath;
}

export function getSiteRoute(pathname: string): SitePageMetadata | null {
  const normalizedPath = normalizePathname(pathname);
  return normalizedPath in SITE_ROUTES ? SITE_ROUTES[normalizedPath as SiteRoutePath] : null;
}

export function getAbsoluteUrl(path: string = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function getBreadcrumbItems(route: SitePageMetadata) {
  const items = [{ name: "Home", url: getAbsoluteUrl("/") }];

  if (route.path !== "/" && route.path !== "/404") {
    items.push({
      name: route.breadcrumbName ?? route.title.replace(" | DocuScrit", ""),
      url: getAbsoluteUrl(route.path),
    });
  }

  return items;
}
