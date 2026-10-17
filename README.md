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
