// POST /api/unlock  { password, next }  ->  sets the unlock cookie.
import { COOKIE_NAME, COOKIE_MAX_AGE, tokenFor, safeEqual, safeNext } from '../lib/case-study-auth.js';

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers }
  });

export default {
  async fetch(request) {
    if (request.method !== 'POST') return json({ error: 'method' }, 405, { Allow: 'POST' });

    const real = process.env.CASE_STUDY_PASSWORD;
    if (!real) return json({ error: 'not_configured' }, 503);

    let body = {};
    try { body = await request.json(); } catch { /* empty or bad body */ }
    const attempt = typeof body.password === 'string' ? body.password.slice(0, 200) : '';

    const [given, expected] = await Promise.all([tokenFor(attempt), tokenFor(real)]);
    if (!attempt || !safeEqual(given, expected)) {
      await new Promise((r) => setTimeout(r, 700)); // slow down guessing
      return json({ error: 'wrong_password' }, 401);
    }

    const cookie = `${COOKIE_NAME}=${expected}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;
    return json({ ok: true, next: safeNext(body.next) }, 200, { 'Set-Cookie': cookie });
  }
};
