import { useEffect } from "react";
import type { SitePageMetadata } from "../content/site";
import { getAttributionData, trackEvent, trackPageView, type AnalyticsEventName } from "../utils/analytics";

const supportedDelegatedEvents = new Set<AnalyticsEventName>([
  "product_cta_click",
  "resource_open",
  "navigation_click",
  "email_fallback_click",
]);

export function useAnalytics(route: SitePageMetadata) {
  useEffect(() => {
    getAttributionData();
    trackPageView(route);
  }, [route]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;
      const eventName = target?.dataset.analyticsEvent as AnalyticsEventName | undefined;

      if (!target || !eventName || !supportedDelegatedEvents.has(eventName)) {
        return;
      }

      trackEvent(eventName, {
        label: target.dataset.analyticsLabel,
        location: target.dataset.analyticsLocation,
        product: target.dataset.analyticsProduct,
        destination: target instanceof HTMLAnchorElement ? target.href : undefined,
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}
