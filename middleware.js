// Vercel Routing Middleware: runs on Vercel's servers before anything is sent.
// Locks the case study pages, their content files, and anything in /private.
import { next } from '@vercel/functions';
import { isUnlocked } from './lib/case-study-auth.js';

export const config = {
  matcher: ['/work/:path*', '/content/:path*', '/private/:path*']
};

export default async function middleware(request) {
  if (await isUnlocked(request, process.env.CASE_STUDY_PASSWORD)) {
    return next({ headers: { 'Cache-Control': 'private, no-store' } });
  }

  const url = new URL(request.url);

  // Case study pages: send people to the password page, then back here.
  if (url.pathname.startsWith('/work/')) {
    const unlock = new URL('/unlock', url);
    unlock.searchParams.set('next', url.pathname);
    return Response.redirect(unlock, 307);
  }

  // Content files and private assets: refuse outright.
  return new Response(JSON.stringify({ error: 'locked' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}
