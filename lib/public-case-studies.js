// Case studies anyone can read without the password.
// Shared by middleware.js (skips the lock) and the home page (hides "Password required").
export const PUBLIC_CASE_STUDIES = ['life-school'];

/** True when the path is a public case study page or its content file. */
export function isPublicPath(pathname) {
  return PUBLIC_CASE_STUDIES.some(
    (slug) => pathname === `/work/${slug}` || pathname === `/work/${slug}/` || pathname === `/content/${slug}.json`
  );
}
