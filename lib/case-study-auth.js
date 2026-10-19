// Shared by middleware.js and api/unlock.js.
// The password lives in the CASE_STUDY_PASSWORD environment variable on Vercel,
// never in this repo. The cookie holds an HMAC derived from the password, so
// changing the password signs everyone out.

export const COOKIE_NAME = 'jwfn_cs';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const enc = new TextEncoder();

function toBase64Url(buf) {
  let s = '';
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Token for a given password. Same input, same token. */
export async function tokenFor(password) {
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  return toBase64Url(await crypto.subtle.sign('HMAC', key, enc.encode('jwfn-case-studies-v1')));
}

/** Constant-time string compare. */
export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function readCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > -1 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

/** True when the request carries a valid unlock cookie. Fails closed if no password is set. */
export async function isUnlocked(request, password) {
  if (!password) return false;
  const cookie = readCookie(request, COOKIE_NAME);
  if (!cookie) return false;
  return safeEqual(cookie, await tokenFor(password));
}

/** Only allow redirects back into the case studies on this site. */
export function safeNext(value) {
  return typeof value === 'string' && /^\/work\/[a-z0-9-]+\/?$/.test(value) ? value : '/#work';
}
