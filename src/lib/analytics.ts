// src/lib/analytics.ts

type TrackingState = { allowed?: boolean; host?: string; measurementId?: string };

let warnedHost: string | null = null;

export const getTrackingState = (): TrackingState | null => {
  if (typeof window === "undefined") return null;
  return (window as any).__wolfimTracking || null;
};

export const isTrackingEnabled = (): boolean => {
  const state = getTrackingState();
  // Sin bootstrap (o con bootstrap en host no permitido) no se envía nada:
  // cero hits fuera de la allowlist.
  return state?.allowed === true;
};

const warnBlockedHost = (eventName: string) => {
  const host = getTrackingState()?.host || "desconocido";
  if (warnedHost === host) return;
  warnedHost = host;
  console.warn(
    `[Analytics] Host fuera de allowlist (${host}). Eventos bloqueados, no se enviaron hits. Último: ${eventName}`
  );
};

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === "undefined") return;

  if (!isTrackingEnabled()) {
    warnBlockedHost(eventName);
    return;
  }

  {
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
