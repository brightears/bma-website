// Plain module (no 'use client') so the server locale layout can read the
// string. A constant exported from a client module reaches server code as a
// client reference, not as its value.

export const COOKIE_CONSENT_STORAGE_KEY = 'cookie_consent_v2'; // 'necessary' | 'analytics'
export const LEGACY_COOKIE_CONSENT_KEY = 'cookie_consent'; // 'accepted' | 'rejected'

/**
 * Runs in <head> before the first paint. When a choice is already stored it
 * marks <html>, and globals.css hides the server-rendered banner, so returning
 * visitors never see it flash. First-time visitors get the banner in the
 * server HTML, painted with the page instead of 700 ms after hydration (it
 * used to arrive late and become the home page's LCP element on mobile).
 */
export const COOKIE_CHOICE_HEAD_SCRIPT = `try{var s=localStorage.getItem("${COOKIE_CONSENT_STORAGE_KEY}"),l=localStorage.getItem("${LEGACY_COOKIE_CONSENT_KEY}");if(s==="analytics"||s==="necessary"||l==="accepted"||l==="rejected")document.documentElement.setAttribute("data-cookie-choice","")}catch(e){}`;
