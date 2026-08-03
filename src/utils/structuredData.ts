import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  getAbsoluteUrl,
  getBreadcrumbItems,
  type SitePageMetadata,
} from "../content/site";
import { CONTACT_EMAIL, CONTACT_PHONE_TEL } from "./contact";

export function buildStructuredData(route: SitePageMetadata) {
  const canonicalUrl = getAbsoluteUrl(route.path);
  const breadcrumbItems = getBreadcrumbItems(route);
  const isProductRoute = route.featureList && route.featureList.length > 0;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/docuscrit-app-icon.svg`,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_TEL,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": route.pageType ?? "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      ...(route.keywords?.length ? { keywords: route.keywords.join(", ") } : {}),
      ...(route.audience?.length
        ? {
            audience: route.audience.map((audience) => ({
              "@type": "Audience",
              audienceType: audience,
            })),
          }
        : {}),
    },
  ];

  if (route.path === "/") {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: route.description,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      featureList: route.featureList,
      audience: route.audience?.map((audience) => ({ "@type": "Audience", audienceType: audience })),
    });
  } else if (isProductRoute) {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": `${canonicalUrl}#software`,
      name: route.breadcrumbName ?? route.title.replace(" | DocuScrit", ""),
      applicationSuite: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: route.description,
      url: canonicalUrl,
      publisher: { "@id": `${SITE_URL}/#organization` },
      featureList: route.featureList,
      audience: route.audience?.map((audience) => ({ "@type": "Audience", audienceType: audience })),
    });
  }

  if (route.path !== "/404") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
