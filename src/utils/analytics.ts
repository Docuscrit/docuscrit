import { getAbsoluteUrl, type SitePageMetadata } from "../content/site";

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
const ANALYTICS_DISABLED = import.meta.env.VITE_DISABLE_ANALYTICS === "true";
const ATTRIBUTION_STORAGE_KEY = "docuscrit_attribution";

const shouldLoadAnalytics =
  import.meta.env.PROD &&
  !ANALYTICS_DISABLED &&
  typeof GA4_MEASUREMENT_ID === "string" &&
  /^G-[A-Z0-9]+$/.test(GA4_MEASUREMENT_ID);

export type AnalyticsEventName =
  | "page_view"
  | "product_view"
  | "product_cta_click"
  | "demo_form_start"
  | "demo_form_submit"
  | "demo_form_error"
  | "resource_open"
  | "navigation_click"
  | "email_fallback_click";

export type AnalyticsParameters = Record<string, string | number | boolean | undefined>;

export type AttributionData = {
  landing_page: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
};

const emptyAttribution: AttributionData = {
  landing_page: "",
  referrer: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  gclid: "",
};

export function ensureGoogleAnalyticsScript() {
  if (!shouldLoadAnalytics || !GA4_MEASUREMENT_ID || typeof document === "undefined") {
    return false;
  }

  if (!document.querySelector<HTMLScriptElement>(`script[data-ga4-id="${GA4_MEASUREMENT_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
    script.dataset.ga4Id = GA4_MEASUREMENT_ID;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtagShim(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  if (!window.__docuscritGaInitialized) {
    window.gtag("js", new Date());
    window.gtag("config", GA4_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
    });
    window.__docuscritGaInitialized = true;
  }

  return true;
}

export function trackEvent(name: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (!ensureGoogleAnalyticsScript()) {
    return;
  }

  window.gtag?.("event", name, parameters);
}

export function trackPageView(route: SitePageMetadata) {
  trackEvent("page_view", {
    page_title: route.title,
    page_location: getAbsoluteUrl(route.path === "/404" ? window.location.pathname : route.path),
    page_path: route.path === "/404" ? window.location.pathname : route.path,
  });
}

function readStoredAttribution(): AttributionData {
  if (typeof window === "undefined") {
    return emptyAttribution;
  }

  try {
    const stored = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return stored ? { ...emptyAttribution, ...(JSON.parse(stored) as Partial<AttributionData>) } : emptyAttribution;
  } catch {
    return emptyAttribution;
  }
}

export function getAttributionData(): AttributionData {
  if (typeof window === "undefined") {
    return emptyAttribution;
  }

  const stored = readStoredAttribution();
  const query = new URLSearchParams(window.location.search);
  const current: AttributionData = {
    landing_page: stored.landing_page || `${window.location.pathname}${window.location.search}`,
    referrer: stored.referrer || document.referrer,
    utm_source: query.get("utm_source") || stored.utm_source,
    utm_medium: query.get("utm_medium") || stored.utm_medium,
    utm_campaign: query.get("utm_campaign") || stored.utm_campaign,
    utm_term: query.get("utm_term") || stored.utm_term,
    utm_content: query.get("utm_content") || stored.utm_content,
    gclid: query.get("gclid") || stored.gclid,
  };

  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Attribution is still returned when storage is unavailable.
  }

  return current;
}
