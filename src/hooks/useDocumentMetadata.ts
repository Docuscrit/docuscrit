import { useEffect } from "react";
import {
  SITE_NAME,
  SITE_SOCIAL_IMAGE,
  getAbsoluteUrl,
  type SitePageMetadata,
} from "../content/site";
import { buildStructuredData } from "../utils/structuredData";

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

function upsertStructuredData(route: SitePageMetadata) {
  let element = document.head.querySelector<HTMLScriptElement>("#docuscrit-structured-data");

  if (!element) {
    element = document.createElement("script");
    element.id = "docuscrit-structured-data";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(buildStructuredData(route));
}

export function useDocumentMetadata(route: SitePageMetadata) {
  useEffect(() => {
    const canonicalPath = route.path === "/404" ? window.location.pathname : route.path;
    const canonicalUrl = getAbsoluteUrl(canonicalPath);

    document.title = route.title;
    upsertCanonical(canonicalUrl);
    upsertMeta("name", "description", route.description);
    upsertMeta("name", "robots", route.noindex ? "noindex, nofollow" : "index, follow");
    upsertMeta("name", "theme-color", "#06243b");
    upsertMeta("name", "keywords", route.keywords?.join(", ") ?? "");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", route.title);
    upsertMeta("property", "og:description", route.description);
    upsertMeta("property", "og:type", route.ogType ?? "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", SITE_SOCIAL_IMAGE);
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:image:alt", "DocuScrit compliance workflow platform");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", route.title);
    upsertMeta("name", "twitter:description", route.description);
    upsertMeta("name", "twitter:image", SITE_SOCIAL_IMAGE);
    upsertStructuredData(route);
  }, [route]);
}
