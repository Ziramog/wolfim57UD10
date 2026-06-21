// src/lib/analytics.ts

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    const page_path = window.location.pathname;

    // GA4 gtag.js
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", eventName, {
        page_path,
        ...params,
      });
      console.log(`[GA4] Event Tracked: ${eventName}`, { page_path, ...params });
    } else if (typeof (window as any).dataLayer !== "undefined") {
      // GTM / dataLayer fallback
      (window as any).dataLayer.push({
        event: eventName,
        page_path,
        ...params
      });
      console.log(`[DataLayer] Event Tracked: ${eventName}`, { page_path, ...params });
    } else {
      console.warn("[Analytics] gtag or dataLayer not found. Event not sent.", eventName);
    }
  }
};
