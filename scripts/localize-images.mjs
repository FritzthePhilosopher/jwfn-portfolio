// One-time script: copies the case study images off Webflow into public/images,
// points src/pages/scraped.js at the local copies, and commits the result.
// Run from the project folder:  node scripts/localize-images.mjs
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const MAP = {
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/618b2bb26137612e3a8ba547_Home%20Page%20wireframe.jpg": "/images/life-school/home-page-wireframe.jpg",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5ce17366d0cadb6a2e2d7fd4_User%20Interviews.jpg": "/images/life-school/user-interviews.jpg",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c7ad6a8ced3c77e1de022c2_life-school-Competitive%20Analysis.png": "/images/life-school/life-school-competitive-analysis.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c749ee022531a4922856207_Web%20Comparative%20Analysis.png": "/images/life-school/web-comparative-analysis.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5ce17ef97c5e2f791600a6e0_Personas.jpg": "/images/life-school/personas.jpg",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c7c1d3c9254e9b92cc29827_site-map.png": "/images/life-school/site-map.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c0d978436137d2289dd6664_Wireframes.png": "/images/heal-thy/wireframes.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c0357f1f4cf117618cd2a8d_user%20interview%20Overview-2.png": "/images/heal-thy/user-interview-overview-2.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c0413c990375e170652117d_Competitive%20Analysis.png": "/images/heal-thy/competitive-analysis.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c0bf3a6dff7c4b0e9627734_Card%20Sorting.png": "/images/heal-thy/card-sorting.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c0c615797f12941b35b43ef_Affinity%20Mapping.png": "/images/heal-thy/affinity-mapping.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5b7af60a23fe174b1cf66b74_jwfneely%20Heal%E2%80%A2Thy%20persona%20connie.jpg": "/images/heal-thy/jwfneely-heal-thy-persona-connie.jpg",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c0d3982a90b667054885439_MosCoW%20Method.png": "/images/heal-thy/moscow-method.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c0d952f583e2f033eac39fc_User%20Flow.png": "/images/heal-thy/user-flow.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c0d946336137d70e0dd6124_site%20map.png": "/images/heal-thy/site-map.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5c0d9699583e2f5c97ac3b51_Sketches%20%2B%20Prototypes.png": "/images/heal-thy/sketches-prototypes.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5caae6217177dc8ee6d67539_Hi-Fi%20Comps.jpg": "/images/ohto/hi-fi-comps.jpg",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5caad3eb7177dc68edd64296_OHTO-Current-Site.png": "/images/ohto/ohto-current-site.png",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5caae5c4f8e012cc64e5c3f9_E-Comm%20Site%20Research.jpg": "/images/ohto/e-comm-site-research.jpg",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5caae5ee3be192d3387f8f3f_Competitive%20Analysis.jpg": "/images/ohto/competitive-analysis.jpg",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5caae5fad636b7088960ce74_Sketches.jpg": "/images/ohto/sketches.jpg",
  "https://cdn.prod.website-files.com/5b703dc941c61675b76df11b/5caae6107177dc6a9bd67521_Wireframes.jpg": "/images/ohto/wireframes.jpg"
};

const DATA = "src/pages/scraped.js";
let failed = 0, downloaded = 0, skipped = 0;
for (const [url, local] of Object.entries(MAP)) {
  const dest = path.join("public", local);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) { skipped++; continue; }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    downloaded++;
    console.log("  saved", local);
  } catch (e) {
    failed++;
    console.error("  FAILED", local, "-", e.message);
  }
}
console.log(`\nDownloaded ${downloaded}, already had ${skipped}, failed ${failed}.`);
if (failed) {
  console.error("Nothing else was changed. Check your connection and run the script again.");
  process.exit(1);
}

let src = fs.readFileSync(DATA, "utf8");
let swapped = 0;
for (const [url, local] of Object.entries(MAP)) {
  if (src.includes(url)) { src = src.split(url).join(local); swapped++; }
}
fs.writeFileSync(DATA, src);
console.log(`Pointed ${swapped} image links in ${DATA} at the local copies.`);

try {
  execSync("git add public/images " + DATA, { stdio: "inherit" });
  execSync(`git commit -m "Move case study images off Webflow into the project" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_014o4eAMjMZBckGajgszV1aj"`, { stdio: "inherit" });
  console.log("\nCommitted. Images are now part of the project.");
} catch {
  console.log("\nFiles are in place, but the commit did not run. Commit them yourself with git.");
}
