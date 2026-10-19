# Justin Neely Portfolio

React + Vite + Material UI. Two routes: `/` (home) and `/work/dealer-registration` (case study).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

Content lives in `src/pages/`. Anything in `[BRACKETS]` is a placeholder to fill in.
Colors, fonts and component styling live in `src/theme.js`.

## Deploy

Hosted on Vercel. `vercel.json` sends every route (like `/work/life-school`) to `index.html`,
so refreshing or sharing a deep link doesn't 404. Pushing to `main` deploys automatically.

Images live in `public/images/<case-study>/` and are served from `/images/...`.
`scripts/localize-images.mjs` was a one-time move of the old Webflow-hosted images.

## Password-protected case studies

Everything under `/work/*` sits behind a password, enforced on Vercel's servers:

- `middleware.js` checks every request to `/work/*`, `/content/*` and `/private/*`.
  Without a valid cookie, pages redirect to `/unlock` and files return 401.
- `api/unlock.js` checks the password and sets a 30-day cookie.
- The password is the `CASE_STUDY_PASSWORD` environment variable in Vercel
  (Project → Settings → Environment Variables). Change it there and redeploy;
  everyone who unlocked before is signed out.
- Case study copy lives in `public/content/<slug>.json`, never in `src/`, so it is
  not in the public JavaScript. Put confidential images in `public/private/`.
- The home page card text (title, problem, outcome, metric) is in `src/pages/cards.js`
  and stays public.

Locally, `npm run dev` skips the password (the middleware only runs on Vercel).
