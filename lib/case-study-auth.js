// Shared by middleware.js and api/unlock.js.
// The password lives in the CASE_STUDY_PASSWORD environment variable on Vercel,
// never in this repo.
//
// Unlocking gives a session that lasts SESSION_SECONDS from the moment the
// password is entered. The cookie is "<expiry>.<signature>": the expiry is a
// Unix time in seconds, and the signature is an HMAC of that expiry keyed by
// the password. The server checks both, so a copied or saved cookie stops
// working when it expires, and changing the password signs everyone out.

export const COOKIE_NAME = 'jwfn_cs';
export const SESSION_SECONDS = 30 * 60; // 30 minutes
export const COOKIE_MAX_AGE = SESSION_SECONDS;

const enc = new TextEncoder();

function toBase64Url(buf) {
  let s = '';
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(password, message) {
  if (!password) return ''; // Web Crypto rejects an empty HMAC key
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  return toBase64Url(await crypto.subtle.sign('HMAC', key, enc.encode(message)));
}

/** Token for a given password. Same input, same token. Used to check a password attempt. */
export function tokenFor(password) {
  return hmac(password, 'jwfn-case-studies-v1');
}

/** A new session cookie value that expires SESSION_SECONDS from now. */
export async function issueSession(password, now = Date.now()) {
  const exp = Math.floor(now / 1000) + SESSION_SECONDS;
  return `${exp}.${await hmac(password, `jwfn-case-studies-v2:${exp}`)}`;
}

/** True when a session cookie value is correctly signed and not yet expired. */
export async function isValidSession(value, password, now = Date.now()) {
  if (!password || typeof value !== 'string') return false;
  const m = /^(\d{9,12})\.([A-Za-z0-9_-]+)$/.exec(value);
  if (!m) return false;
  const exp = Number(m[1]);
  const nowSec = now / 1000;
  if (exp <= nowSec || exp > nowSec + SESSION_SECONDS + 60) return false;
  return safeEqual(m[2], await hmac(password, `jwfn-case-studies-v2:${exp}`));
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

/** True when the request carries an unexpired unlock cookie. Fails closed if no password is set. */
export async function isUnlocked(request, password, now = Date.now()) {
  if (!password) return false;
  return isValidSession(readCookie(request, COOKIE_NAME), password, now);
}

/** Only allow redirects back into the case studies on this site. */
export function safeNext(value) {
  return typeof value === 'string' && /^\/work\/[a-z0-9-]+\/?$/.test(value) ? value : '/#work';
}
