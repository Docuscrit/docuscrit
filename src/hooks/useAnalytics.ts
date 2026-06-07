import { useEffect } from "react";
import { getAbsoluteUrl, type SitePageMetadata } from "../content/site";

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
const ANALYTICS_DISABLED = import.meta.env.VITE_DISABLE_ANALYTICS === "true";
const shouldLoadAnalytics =
  import.meta.env.PROD &&
  !ANALYTICS_DISABLED &&
  typeof GA4_MEASUREMENT_ID === "string" &&
  /^G-[A-Z0-9]+$/.test(GA4_MEASUREMENT_ID);

function ensureGoogleAnalyticsScript(measurementId: string) {
  if (document.querySelector<HTMLScriptElement>(`script[data-ga4-id="${measurementId}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.dataset.ga4Id = measurementId;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtagShim(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
    anonymize_ip: true,
  });
}

export function useAnalytics(route: SitePageMetadata) {
  useEffect(() => {
    if (!shouldLoadAnalytics || !GA4_MEASUREMENT_ID) {
      return;
    }

    ensureGoogleAnalyticsScript(GA4_MEASUREMENT_ID);
    window.gtag?.("event", "page_view", {
      page_title: route.title,
      page_location: getAbsoluteUrl(route.path),
      page_path: route.path,
    });
  }, [route]);
}
