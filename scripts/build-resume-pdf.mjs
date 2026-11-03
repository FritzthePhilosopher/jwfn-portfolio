// Builds public/Justin-Neely-Resume.pdf from src/pages/resume-data.js,
// in the site's current look (theme.js): paper and ink, Archivo extended
// caps for the name, Anton condensed caps for companies, Instrument Sans
// body, JetBrains Mono labels and dates, coral J mark and rule.
//
//   node scripts/build-resume-pdf.mjs            -> public/Justin-Neely-Resume.pdf
//   node scripts/build-resume-pdf.mjs --html     -> also writes the HTML beside it
//
// Fonts load from Google Fonts. To use local files instead, set
// RESUME_FONT_CSS to a CSS file of @font-face rules; it replaces that request.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { jobs, education, skills } from '../src/pages/resume-data.js';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, 'public/Justin-Neely-Resume.pdf');

const C = {
  paper: '#F6F6F4', ink: '#141414', body: '#3F3F3C', muted: '#86867F',
  border: '#DDDDD7', tint: '#EDEDE9', coral: '#FF7F50', accentText: '#C2401F'
};
const J_PATH = 'M31.85 52.5Q25.53 52.5 21.14 50.92Q16.74 49.34 14.46 45.91Q12.17 42.48 12.17 37.1V36.16H25.82V37.27Q25.82 40.08 27.23 41.28Q28.63 42.48 31.33 42.48Q34.43 42.48 35.87 41.05Q37.3 39.61 37.3 36.22V11.5H51.83V35.81Q51.83 41.66 49.42 45.35Q47.02 49.04 42.57 50.77Q38.12 52.5 31.85 52.5Z';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Small raised ® in names, as on the site.
const name = (s) => esc(s).replace(/®/g, '<sup>®</sup>');

const job = (j) => `
  <section class="job">
    <div class="row"><h3>${name(j.co)}</h3><span class="mono muted">${esc(j.yrs)}</span></div>
    ${j.roles.map((r) => `
      <div class="role">
        <div class="role-head"><h4>${esc(r.title)}</h4><span class="mono accent">${esc(r.dates)}</span></div>
        ${r.bullets.length ? `<ul>${r.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
      </div>`).join('')}
  </section>`;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Justin Neely, Resume</title>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wdth,wght@62..125,700..900&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=block" rel="stylesheet">
<style>
  @page { size: Letter; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: ${C.paper}; }
  body { width: 8.5in; height: 11in; padding: 0.5in 0.6in 0.42in; color: ${C.body};
         font: 400 10px/1.55 'Instrument Sans', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact;
         display: flex; flex-direction: column; }
  .mono { font: 400 8px/1.4 'JetBrains Mono', monospace; letter-spacing: 0; white-space: nowrap; }
  .muted { color: ${C.muted}; }
  .accent { color: ${C.accentText}; }
  .eyebrow { font: 400 7.6px/1.4 'JetBrains Mono', monospace; letter-spacing: 0.06em; text-transform: uppercase; color: ${C.muted};
             padding-bottom: 5px; border-bottom: 1px solid ${C.ink}; }

  /* Name block */
  header { display: flex; justify-content: space-between; align-items: center; padding: 4px 0 16px; margin-bottom: 18px; border-bottom: 1.5px solid ${C.ink}; }
  .name { display: flex; align-items: center; gap: 12px; }
  .name svg { width: 34px; height: 34px; flex: none; }
  .title { font: 400 8px/1.4 'JetBrains Mono', monospace; letter-spacing: 0.06em; text-transform: uppercase; color: ${C.accentText}; margin-top: 6px; }
  h1 { font: 900 24px/0.95 'Archivo', sans-serif; font-stretch: 125%; letter-spacing: -0.01em; text-transform: uppercase; color: ${C.ink}; }
  .contact { text-align: right; display: grid; gap: 2px; color: ${C.ink}; }

  .outline { color: transparent; -webkit-text-stroke: 0.75px ${C.ink}; paint-order: stroke fill; }

  /* Columns */
  main { display: grid; grid-template-columns: 1fr 2in; gap: 0 28px; flex: 1; }
  .job { padding: 14px 0 12px; border-bottom: 1px solid ${C.border}; }
  .job:last-child { border-bottom: 0; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  h3 { font: 400 19.5px/1 'Anton', sans-serif; white-space: nowrap; letter-spacing: 0.005em; text-transform: uppercase; color: ${C.ink}; }
  sup { font-size: 0.5em; vertical-align: 0.9em; }
  .role { margin-top: 10px; }
  .role-head { display: flex; align-items: baseline; gap: 9px; }
  h4 { font: 500 10.8px/1.3 'Instrument Sans', sans-serif; color: ${C.ink}; }
  ul { list-style: none; margin-top: 3px; }
  li { position: relative; padding-left: 12px; margin-bottom: 3px; text-wrap: pretty; }
  li::before { content: ''; position: absolute; left: 1px; top: 0.62em; width: 4px; height: 4px; background: ${C.coral}; }

  aside { display: flex; flex-direction: column; gap: 28px; }
  .edu { padding: 11px 0; border-bottom: 1px solid ${C.border}; }
  .edu h4 { font-size: 10.4px; }
  .edu p { color: ${C.body}; }
  .chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 10px; list-style: none; }
  .chips li { padding: 3px 5px 2px; margin: 0; font: 400 7px/1.3 'JetBrains Mono', monospace; letter-spacing: 0.06em; text-transform: uppercase;
              color: ${C.ink}; background: ${C.tint}; border: 1px solid ${C.border}; }
  .chips li::before { display: none; }

  /* Sign-off, as in the site footer */
  footer { border-top: 1.5px solid ${C.coral}; padding-top: 14px; margin-top: 12px; display: flex; justify-content: space-between; align-items: flex-end; }
  .signoff { font: 900 15px/1 'Archivo', sans-serif; font-stretch: 125%; text-transform: uppercase; color: ${C.ink}; }
  .signoff .outline { -webkit-text-stroke-color: ${C.coral}; }
  .foot { text-align: right; display: grid; gap: 2px; }
</style></head>
<body>
  <header>
    <div class="name">
      <svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" fill="${C.coral}"/><path fill="${C.ink}" d="${J_PATH}"/></svg>
      <div><h1>Justin Neely</h1><div class="title">Product designer / Atlanta, GA</div></div>
    </div>
    <div class="contact mono">
      <span>937.266.0092</span><span>justin@jwfn.design</span><span>linkedin.com/in/jwfn</span><span>jwfn.design</span>
    </div>
  </header>

  <main>
    <div>
      <div class="eyebrow">Experience</div>
      ${jobs.map(job).join('')}
    </div>
    <aside>
      <div>
        <div class="eyebrow">Education</div>
        ${education.map(([school, program, dates]) => `
          <div class="edu"><h4>${esc(school)}</h4><p>${esc(program)}</p><div class="mono muted">${esc(dates)}</div></div>`).join('')}
      </div>
      <div>
        <div class="eyebrow">Core skills</div>
        <ul class="chips">${skills.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>
      </div>
    </aside>
  </main>

  <footer>
    <p class="signoff">Left-handed by nature.<br><span class="outline">Designer by profession.</span><br>Curious by habit.</p>
    <div class="foot mono muted"><span>References available upon request.</span><span style="color:${C.ink}">jwfn.design</span></div>
  </footer>
</body></html>`;

if (process.argv.includes('--html')) writeFileSync(OUT.replace(/\.pdf$/, '.html'), html);

const browser = await chromium.launch();
const page = await browser.newPage();
if (process.env.RESUME_FONT_CSS) {
  const css = readFileSync(process.env.RESUME_FONT_CSS, 'utf8');
  await page.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/css', body: css }));
}
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const overflow = await page.evaluate(() => document.body.scrollHeight - document.body.clientHeight);
if (overflow > 0) console.warn(`Warning: content runs ${overflow}px past one page.`);
await page.pdf({ path: OUT, format: 'Letter', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`Wrote ${path.relative(root, OUT)}`);
