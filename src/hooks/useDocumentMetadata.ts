import { useEffect } from "react";
import {
  SITE_NAME,
  SITE_SOCIAL_IMAGE,
  SITE_URL,
  getAbsoluteUrl,
  getBreadcrumbItems,
  type SitePageMetadata,
} from "../content/site";
import { CONTACT_EMAIL, CONTACT_PHONE_TEL } from "../utils/contact";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertStructuredData(route: SitePageMetadata, canonicalUrl: string) {
  let element = document.head.querySelector<HTMLScriptElement>("#docuscrit-structured-data");

  if (!element) {
    element = document.createElement("script");
    element.id = "docuscrit-structured-data";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  const breadcrumbItems = getBreadcrumbItems(route);

  element.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/docuscrit-app-icon.svg`,
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE_TEL,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: route.title,
        description: route.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      ...(route.path === "/"
        ? [
            {
              "@type": "SoftwareApplication",
              "@id": `${SITE_URL}/#software`,
              name: SITE_NAME,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description: route.description,
              url: SITE_URL,
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      },
    ],
  });
}

export function useDocumentMetadata(route: SitePageMetadata) {
  useEffect(() => {
    const canonicalUrl = getAbsoluteUrl(route.path);

    document.title = route.title;
    upsertCanonical(canonicalUrl);
    upsertMeta("name", "description", route.description);
    upsertMeta("name", "robots", route.noindex ? "noindex, nofollow" : "index, follow");
    upsertMeta("name", "theme-color", "#06243b");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", route.title);
    upsertMeta("property", "og:description", route.description);
    upsertMeta("property", "og:type", route.ogType ?? "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", SITE_SOCIAL_IMAGE);
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:image:alt", "DocuScrit compliance records you can defend");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", route.title);
    upsertMeta("name", "twitter:description", route.description);
    upsertMeta("name", "twitter:image", SITE_SOCIAL_IMAGE);
    upsertStructuredData(route, canonicalUrl);
  }, [route]);
}
