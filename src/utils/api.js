const API_BASE_ENV = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL;
// runtime shim: window.__HCM_API_BASE__ may be set by index.html fetch-rewrite
const RUNTIME_BASE = typeof window !== 'undefined' ? window.__HCM_API_BASE__ : undefined;

// Dynamic fallback: prefer VITE_API_URL, then runtime shim, then try a sensible dev fallback
// that uses the current host with port 3000 when running in the browser. This avoids a
// hard-coded literal in source and lets deployments set VITE_API_URL (recommended).
let DEV_FALLBACK = '';
if (typeof window !== 'undefined' && window.location) {
  try {
    // Use same protocol and hostname, but backend commonly runs on port 3000 in dev.
    DEV_FALLBACK = `${window.location.protocol}//${window.location.hostname}:3000`;
  } catch (e) {
    DEV_FALLBACK = '';
  }
}

export const API_BASE = API_BASE_ENV || RUNTIME_BASE || DEV_FALLBACK || '';

function buildUrl(path) {
  if (!path) return API_BASE;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = API_BASE.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export async function apiFetch(path, options = {}) {
  const url = buildUrl(path);
  const opts = { method: 'GET', ...options };

  // If body is FormData, let fetch set headers
  if (opts.body && !(opts.body instanceof FormData)) {
    opts.headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (typeof opts.body !== 'string') opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, opts);
  const contentType = res.headers.get('content-type') || '';
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`Request failed ${res.status} ${res.statusText}` + (text ? ` - ${text}` : ''));
    err.status = res.status;
    throw err;
  }
  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

export default apiFetch;
