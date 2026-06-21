// src/lib/utm.ts

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const STORAGE_KEY = 'wolfim_utms';

export const captureUTMs = () => {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  let hasUtms = false;
  const currentUtms: Record<string, string> = {};

  UTM_KEYS.forEach((utm) => {
    const value = params.get(utm);
    if (value) {
      currentUtms[utm] = value;
      hasUtms = true;
    }
  });

  if (hasUtms) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUtms));
    console.log('[UTM] captured from URL and saved to localStorage', currentUtms);
  }
};

export const getUTMs = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading UTMs from localStorage', error);
    return {};
  }
};
