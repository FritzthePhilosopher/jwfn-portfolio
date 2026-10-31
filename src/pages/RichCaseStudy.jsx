import { useEffect, useState } from 'react';
import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '../theme.js';
import { work } from './work.js';
import { Container, SiteNav, SiteFooter, ProjectIndex, fieldLabel } from '../components/Shared.jsx';

const sectionGap = 'clamp(72px, 9vw, 128px)';
const pad = (n) => String(n).padStart(2, '0');

// Wider than the text column, for hero art and the next-project image.
function Wide({ children, sx }) {
  return <Box sx={{ maxWidth: 1560, mx: 'auto', px: 'clamp(12px, 2vw, 24px)', boxSizing: 'border-box', ...sx }}>{children}</Box>;
}

// Label column on the left, content on the right (stacks on phones).
const split = { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '220px 1fr' }, gap: { xs: '16px', md: '48px' } };

const caption = { ...fieldLabel, mt: 1.5, textTransform: 'none', letterSpacing: '0.02em' };

// A row of images, like phone screens or persona cards: { items: [{ src, alt, label }], layout: 'phone' | 'wide', caption }.
function Gallery({ g }) {
  const wide = g.layout === 'wide';
  const n = g.items.length;
  const cols = n <= 6 ? n : Math.ceil(n / 2);
  const grid = wide
    ? { gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }
    : {
        gridTemplateColumns: { xs: `repeat(${Math.min(cols, 2)}, 1fr)`, sm: `repeat(${Math.min(cols, 3)}, 1fr)`, md: `repeat(${cols}, 1fr)` },
        maxWidth: { md: cols * 220 + (cols - 1) * 16 }
      };
  return (
    <Box component="figure" sx={{ m: 0, mt: 5, ...(!wide && { mx: 'auto' }) }}>
      <Box sx={{ display: 'grid', gap: wide ? 3 : 2, alignItems: 'start', mx: wide ? 0 : 'auto', ...grid }}>
        {g.items.map((it) => (
          <div key={it.src}>
            <Box component="img" src={it.src} alt={it.alt} loading="lazy" sx={{ display: 'block', width: '100%', height: 'auto', bgcolor: '#fff' }} />
            {it.label && <Box sx={{ ...caption, mt: 1 }}>{it.label}</Box>}
          </div>
        ))}
      </Box>
      {g.caption && <Box component="figcaption" sx={{ ...caption, textAlign: wide ? 'left' : 'center' }}>{g.caption}</Box>}
    </Box>
  );
}

function Figure({ img, sx }) {
  const [failed, setFailed] = useState(false);
  if (img?.items) return <Gallery g={img} />;
  if (!img || failed) return null;
  // Optional img.maxWidth (px) narrows and centers the figure.
  // Optional img.frameHeight (px) shows a tall image, like a full-page wireframe,
  // in a fixed-height window you scroll inside.
  const picture = (
    <Box component="img" src={img.src} alt={img.alt} loading="lazy" onError={() => setFailed(true)} sx={{ display: 'block', width: '100%', height: 'auto', bgcolor: '#fff' }} />
  );
  return (
    <Box component="figure" sx={{ m: 0, mt: 5, ...(img.maxWidth && { maxWidth: img.maxWidth, mx: 'auto' }), ...sx }}>
      {img.frameHeight ? (
        <Box
          tabIndex={0}
          role="region"
          aria-label={`${img.alt} (scroll to see the full page)`}
          sx={{ height: img.frameHeight, overflowY: 'auto', border: `1px solid ${colors.border}`, bgcolor: '#fff', '&:focus-visible': { outline: `2px solid ${colors.coral}`, outlineOffset: 2 } }}
        >
          {picture}
        </Box>
      ) : picture}
      {img.caption && <Box component="figcaption" sx={caption}>{img.caption}</Box>}
    </Box>
  );
}

/** Highlights the contents entry for the section in the middle of the screen. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids.join()]);
  return active;
}

function Contents({ items, active }) {
  return (
    <Box component="nav" aria-label="On this page" sx={{ position: 'sticky', top: 96 }}>
      <Box sx={{ ...fieldLabel, mb: 2 }}>On this page</Box>
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {items.map(({ id, label }, i) => {
          const on = id === active;
          return (
            <li key={id}>
              <Box
                component="a"
                href={`#${id}`}
                aria-current={on ? 'true' : undefined}
                sx={{
                  display: 'flex', alignItems: 'baseline', gap: '10px', py: '5px',
                  typography: 'body2', textDecoration: 'none',
                  color: on ? colors.ink : colors.muted,
                  transition: 'color 200ms ease',
                  '&:hover': { color: colors.ink },
                  '& .n': { color: on ? colors.accentText : colors.muted, transition: 'color 200ms ease' }
                }}
              >
                <Box component="span" className="n" sx={{ typography: 'mono', minWidth: 20 }}>{pad(i + 1)}</Box>
                <span>{label}</span>
                <Box component="span" aria-hidden="true" sx={{ ml: 'auto', width: on ? 16 : 0, height: '1px', bgcolor: colors.coral, alignSelf: 'center', transition: 'width 250ms ease' }} />
              </Box>
            </li>
          );
        })}
      </Box>
    </Box>
  );
}

/** One numbered chapter of the story. */
function Section({ x, n }) {
  return (
    <Box component="section" id={x.id} aria-labelledby={`${x.id}-h`}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '12px', typography: 'overline', color: colors.muted }}>
        <Box component="span" sx={{ color: colors.accentText }}>{pad(n)}</Box>
        <span>{x.label}</span>
      </Box>
      <Box component="h2" id={`${x.id}-h`} sx={{ m: 0, mt: 2, typography: 'h2', maxWidth: 820, textWrap: 'balance' }}>{x.heading}</Box>
      <Box sx={{ maxWidth: 680 }}>
        {(x.paras || []).map((p, i) => <Box key={i} component="p" sx={{ mt: 3, mb: 0, color: colors.body, textWrap: 'pretty' }}>{p}</Box>)}
        {x.bullets && (
          <Box component="ul" sx={{ mt: 3, mb: 0, p: 0, listStyle: 'none', borderTop: `1px solid ${colors.border}` }}>
            {x.bullets.map((b, i) => (
              <Box component="li" key={b} sx={{ display: 'flex', gap: '16px', py: '12px', borderBottom: `1px solid ${colors.border}`, color: colors.body }}>
                <Box component="span" sx={{ typography: 'mono', color: colors.accentText, pt: '3px' }}>{pad(i + 1)}</Box>
                <span>{b}</span>
              </Box>
            ))}
          </Box>
        )}
        {(x.after || []).map((p, i) => <Box key={'a' + i} component="p" sx={{ mt: 3, mb: 0, color: colors.body }}>{p}</Box>)}
      </Box>
      {x.quotes && (
        <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {x.quotes.map((q) => (
            <Box key={q} component="blockquote" sx={{ m: 0, pt: 2, borderTop: `2px solid ${colors.coral}`, typography: 'quote', color: colors.ink }}>
              “{q}”
            </Box>
          ))}
        </Box>
      )}
      <Figure img={x.image} />
      <Figure img={x.image2} />
    </Box>
  );
}

function NextProject({ slug }) {
  const i = work.findIndex((w) => w.slug === slug);
  const next = work[(i + 1) % work.length];
  if (!next || next.slug === slug) return null;
  return (
    <Wide sx={{ mt: sectionGap }}>
      <Box
        component={RouterLink}
        to={next.to}
        sx={{
          display: 'block', color: colors.ink, textDecoration: 'none',
          borderTop: `1px solid ${colors.ink}`, pt: 3,
          '&:hover img, &:focus-visible img': { transform: 'scale(1.02)' },
          '&:hover .name, &:focus-visible .name': { color: colors.accentText },
          '&:hover .arrow, &:focus-visible .arrow': { transform: 'translateX(10px)' },
          '&:focus-visible': { outline: `1px solid ${colors.ink}`, outlineOffset: 6 }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, typography: 'overline', color: colors.muted }}>
          <span>Next project</span>
          <span>{next.n} / {pad(work.length)}</span>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px 24px', mt: 2 }}>
          <Box className="name" sx={{ typography: 'display', transition: 'color 200ms ease' }}>{next.name}</Box>
          <Box className="arrow" aria-hidden="true" sx={{ typography: 'display', color: colors.accentText, transition: 'transform 300ms cubic-bezier(.2,.7,.2,1)' }}>→</Box>
        </Box>
        <Box sx={{ mt: 2, typography: 'credit', color: colors.muted }}>{next.credit} · {next.year}</Box>
        {next.cover && (
          <Box sx={{ mt: 4, overflow: 'hidden', aspectRatio: { xs: '16 / 9', md: '3 / 1' }, bgcolor: colors.tint }}>
            <Box component="img" src={next.cover.src} alt="" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: next.focus || 'top', display: 'block', transition: 'transform 900ms cubic-bezier(.2,.7,.2,1)' }} />
          </Box>
        )}
      </Box>
    </Wide>
  );
}

export default function RichCaseStudy({ s, slug }) {
  const index = work.findIndex((w) => w.slug === slug);
  const entry = work[index];

  const contents = [
    ...s.sections.map((x) => ({ id: x.id, label: x.label })),
    ...(s.results ? [{ id: 'results', label: 'Results' }] : []),
    ...(s.nextSteps ? [{ id: 'next', label: 'Next steps' }] : [])
  ];
  const active = useActiveSection(contents.map((c) => c.id));

  useEffect(() => {
    const prev = document.title;
    document.title = `${s.short || s.title.replace(/\.$/, '')} · Justin Neely, Product Designer`;
    return () => { document.title = prev; };
  }, [s]);

  const meta = [
    ['Role', s.role],
    ['Client', s.client],
    ['Year', s.year],
    ['Discipline', s.tags.filter((t) => t !== s.client && t !== s.year).join(', ')]
  ];

  return (
    <Box sx={{ width: '100%', bgcolor: colors.bg, color: colors.ink, typography: 'body1' }}>
      <SiteNav />

      {/* HEADER */}
      <Container sx={{ pt: 'clamp(24px, 4vw, 40px)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, pb: '14px', borderBottom: `1px solid ${colors.border}`, typography: 'mono', color: colors.muted }}>
          <Link component={RouterLink} to="/#work" underline="hover" sx={{ color: colors.muted, textDecorationColor: colors.coral, '&:hover': { color: colors.ink } }}>← All work</Link>
          {entry && <span>Case {entry.n} / {pad(work.length)}</span>}
        </Box>
        {entry && <Box sx={{ mt: 'clamp(48px, 8vw, 112px)', typography: 'credit', color: colors.accentText }}>{entry.credit}</Box>}
        <Box component="h1" sx={{ m: 0, mt: entry ? 2 : 'clamp(48px, 8vw, 112px)', typography: 'display', maxWidth: 1100, overflowWrap: 'anywhere' }}>
          {s.title}
        </Box>
        <Box component="p" sx={{ m: 0, mt: 4, maxWidth: 820, typography: 'quote', color: colors.body, textWrap: 'pretty' }}>{s.subtitle}</Box>

        <Box
          component="dl"
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: `repeat(${meta.length + (s.links.length ? 1 : 0)}, minmax(0, 1fr))` }, gap: '24px', m: 0, mt: 'clamp(48px, 6vw, 72px)', pt: 3, borderTop: `1px solid ${colors.ink}` }}
        >
          {meta.map(([k, v]) => (
            <div key={k}>
              <Box component="dt" sx={{ ...fieldLabel, mb: '6px' }}>{k}</Box>
              <Box component="dd" sx={{ m: 0, typography: 'body2', color: colors.ink }}>{v}</Box>
            </div>
          ))}
          {s.links.length > 0 && (
            <div>
              <Box component="dt" sx={{ ...fieldLabel, mb: '6px' }}>Links</Box>
              {s.links.map(([label, href]) => (
                <Box component="dd" key={label} sx={{ m: 0 }}>
                  <Link href={href} target="_blank" rel="noopener noreferrer" underline="always" sx={{ typography: 'body2', color: colors.ink, textDecorationColor: colors.coral, '&:hover': { color: colors.accentText } }}>{label} ↗</Link>
                </Box>
              ))}
            </div>
          )}
        </Box>
      </Container>

      {/* HERO: the work on a full-width stage */}
      <Wide sx={{ mt: 'clamp(40px, 6vw, 72px)' }}>
        <Box sx={{ bgcolor: colors.tint, px: 'clamp(16px, 5vw, 80px)', py: 'clamp(24px, 6vw, 88px)', '& figure': { mt: 0 } }}>
          <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
            <Figure img={s.hero} />
          </Box>
        </Box>
      </Wide>

      {/* AT A GLANCE */}
      <Container sx={{ pt: sectionGap }}>
        <Box sx={split}>
          <Box sx={{ typography: 'overline', color: colors.accentText }}>At a glance</Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: '32px 40px' }}>
            {Object.entries(s.glance).map(([k, v]) => (
              <Box key={k} sx={{ borderTop: `1px solid ${k === 'Metric' ? colors.coral : colors.border}`, pt: 2 }}>
                <Box sx={{ ...fieldLabel, mb: 1 }}>{k}</Box>
                {k === 'Metric'
                  ? <Box sx={{ typography: 'statSm', color: colors.ink }}>{v}</Box>
                  : <Box sx={{ color: colors.body, textWrap: 'pretty' }}>{v}</Box>}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* THE STORY: sticky contents beside numbered sections */}
      <Container sx={{ pt: sectionGap }}>
        <Box sx={split}>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Contents items={contents} active={active} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: sectionGap, minWidth: 0 }}>
            {s.sections.map((x, i) => <Section key={x.id} x={x} n={i + 1} />)}
          </Box>
        </Box>
      </Container>

      {/* RESULTS */}
      {s.results && (
        <Box id="results" component="section" aria-labelledby="results-h" sx={{ bgcolor: colors.band, color: colors.onBand, mt: sectionGap }}>
          <Container sx={{ py: sectionGap }}>
            <Box sx={split}>
              <Box sx={{ display: 'flex', gap: '12px', typography: 'overline', color: colors.onBandMuted }}>
                <span>{pad(s.sections.length + 1)}</span><span>Results</span>
              </Box>
              <div>
                <Box component="h2" id="results-h" sx={{ m: 0, typography: 'h2' }}>{s.resultsHeading || 'What changed.'}</Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: '32px', mt: 6 }}>
                  {s.results.map(([big, text]) => (
                    <Box key={big} sx={{ borderTop: `1px solid ${colors.onBand}`, pt: 2 }}>
                      <Box sx={{ typography: 'stat', color: colors.accentOnBand }}>{big}</Box>
                      <Box sx={{ mt: '10px', typography: 'body2', color: colors.onBand }}>{text}</Box>
                    </Box>
                  ))}
                </Box>
              </div>
            </Box>
          </Container>
        </Box>
      )}

      {/* NEXT STEPS */}
      {s.nextSteps && (
        <Container id="next" component="section" sx={{ pt: sectionGap }}>
          <Box sx={split}>
            <Box sx={{ display: 'flex', gap: '12px', typography: 'overline', color: colors.muted }}>
              <Box component="span" sx={{ color: colors.accentText }}>{pad(s.sections.length + (s.results ? 2 : 1))}</Box><span>Next steps</span>
            </Box>
            <div>
              <Box component="h2" sx={{ m: 0, typography: 'h2' }}>What I'd do next.</Box>
              <Box component="ul" sx={{ mt: 3, mb: 0, p: 0, listStyle: 'none', maxWidth: 680, borderTop: `1px solid ${colors.border}` }}>
                {s.nextSteps.map((b, i) => (
                  <Box component="li" key={b} sx={{ display: 'flex', gap: '16px', py: '12px', borderBottom: `1px solid ${colors.border}`, color: colors.body }}>
                    <Box component="span" sx={{ typography: 'mono', color: colors.accentText, pt: '3px' }}>{pad(i + 1)}</Box>
                    <span>{b}</span>
                  </Box>
                ))}
              </Box>
            </div>
          </Box>
        </Container>
      )}

      <NextProject slug={slug} />

      <Container sx={{ pt: sectionGap, pb: 4 }}>
        <ProjectIndex items={work} current={slug} />
        <SiteFooter sx={{ mt: 'clamp(64px, 8vw, 112px)' }} />
      </Container>
    </Box>
  );
}
