import { useEffect, useRef, useState } from 'react';
import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { colors, outlineText, fluid } from '../theme.js';
import { work } from './work.js';
import { PUBLIC_CASE_STUDIES } from '../../lib/public-case-studies.js';
import { Container, Label, Placeholder, SiteNav, SiteFooter } from '../components/Shared.jsx';

const sectionTop = 'clamp(96px, 12vw, 176px)';
const reduced = '@media (prefers-reduced-motion: reduce)';


// Short work history for the home page; the full version is on /resume.
const previously = [
  ['CarMax', 'Product Designer II, CarMax Auctions. Earlier, contract Product Designer.', 'Feb 2022 – Sep 2026'],
  ['Dynamic Marketing Systems (now Truelio)', 'UX Designer: mobile products for American Airlines, JetBlue and Frontier Airlines, plus tools for flight attendants to track incentives, set goals and monitor progress. Earlier Sr. Digital Designer, HTML Email Developer and Graphic Designer, where I started in 2012.', '2012 – Jan 2022']
];

const about = [
  ['Agency first.', 'I started at Dynamic Marketing Systems (now Truelio), a digital marketing agency, where I did my Barclays and American Airlines work, then moved in-house to product design.'],
  ['Atlanta.', 'Home for more than a decade.']
];


/** Fades and lifts children in once they scroll into view. */
function Reveal({ children, delay = 0, sx }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setShown(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Box
      ref={ref}
      sx={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(16px)',
        transition: `opacity 800ms ease ${delay}ms, transform 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        [reduced]: { opacity: 1, transform: 'none', transition: 'none' },
        ...sx
      }}
    >
      {children}
    </Box>
  );
}

/** Counts up from 0 to `to` the first time it's on screen. */
function CountUp({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return setN(to);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 900);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{String(n).padStart(2, '0')}</span>;
}

function Toggle({ view, setView }) {
  const opt = (v, label) => (
    <Box
      component="button"
      type="button"
      onClick={() => setView(v)}
      aria-pressed={view === v}
      sx={{
        all: 'unset',
        cursor: 'pointer',
        typography: 'label',
        color: view === v ? colors.ink : colors.muted,
        borderBottom: `1px solid ${view === v ? colors.coral : 'transparent'}`,
        pb: '2px',
        transition: 'color 150ms ease, border-color 150ms ease',
        '&:hover': { color: colors.ink },
        '&:focus-visible': { outline: `1px solid ${colors.ink}`, outlineOffset: 4 }
      }}
    >
      {label}
    </Box>
  );
  return (
    <Box role="group" aria-label="Show work as" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {opt('img', 'Images')}
      <Box component="span" aria-hidden="true" sx={{ typography: 'label', color: colors.muted }}>/</Box>
      {opt('txt', 'Index')}
    </Box>
  );
}

const lockNote = (w) => (w.locked ? 'Locked' : PUBLIC_CASE_STUDIES.includes(w.slug) ? 'Open' : 'Password');

// Index columns, mirrored for a left-hander: the story reads left to right,
// and the project's name, number and year anchor on the right edge.
const indexGrid = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 0.9fr 220px' },
  columnGap: '32px',
  rowGap: '16px',
  alignItems: 'start'
};

const beatLabel = { typography: 'caption', color: colors.muted, mb: '8px', display: { md: 'none' } };

/** Text view: each project as problem → move → result. On desktop, the cover follows the cursor. */
function WorkList() {
  const [hover, setHover] = useState(null);
  const preview = useRef(null);
  const onMove = (e) => {
    if (preview.current) preview.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 120}px)`;
  };
  const current = work.find((w) => w.slug === hover);

  return (
    <Box onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <Box sx={{ ...indexGrid, display: { xs: 'none', md: 'grid' }, py: '10px', borderBottom: `1px solid ${colors.ink}`, typography: 'caption', color: colors.muted }}>
        <span>The problem</span>
        <span>The move</span>
        <span>The result</span>
        <Box component="span" sx={{ textAlign: 'right' }}>Project</Box>
      </Box>
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, borderTop: { xs: `1px solid ${colors.ink}`, md: 0 } }}>
        {work.map((w) => (
          <Box component="li" key={w.slug} sx={{ borderBottom: `1px solid ${colors.border}` }}>
            <Box
              component={RouterLink}
              to={w.to}
              onMouseEnter={() => setHover(w.slug)}
              onFocus={() => setHover(null)}
              sx={{
                ...indexGrid,
                py: { xs: '24px', md: '32px' },
                color: colors.ink,
                textDecoration: 'none',
                transition: 'opacity 250ms ease',
                opacity: hover && hover !== w.slug ? 0.28 : 1,
                '& .name, & .arrow': { transition: 'color 200ms ease, transform 250ms ease' },
                '&:hover .name, &:focus-visible .name': { color: colors.accentText },
                '&:hover .arrow, &:focus-visible .arrow': { transform: 'translateX(-6px)' },
                '&:focus-visible': { outline: `1px solid ${colors.ink}`, outlineOffset: 2 }
              }}
            >
              <div>
                <Box sx={beatLabel}>The problem</Box>
                <Box sx={{ typography: 'subtitle1', color: colors.ink, textWrap: 'pretty' }}>{w.problem}</Box>
              </div>
              <div>
                <Box sx={beatLabel}>The move</Box>
                <Box sx={{ display: 'flex', gap: '12px', typography: 'body1', color: colors.body, textWrap: 'pretty' }}>
                  <Box component="span" aria-hidden="true" sx={{ color: colors.accentText, display: { xs: 'none', md: 'inline' } }}>→</Box>
                  <span>{w.move}</span>
                </Box>
              </div>
              <div>
                <Box sx={beatLabel}>The result</Box>
                <Box sx={{ typography: 'stat', color: colors.ink, lineHeight: 0.95 }}>{w.result.big}</Box>
                <Box sx={{ mt: 1, typography: 'body2', color: colors.body, maxWidth: 240 }}>{w.result.text}</Box>
              </div>
              {/* Mirrored meta: anchored right, first on phones */}
              <Box sx={{ order: { xs: -1, md: 0 }, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', pb: { xs: 1, md: 0 }, borderBottom: { xs: `1px solid ${colors.border}`, md: 0 } }}>
                <Box sx={{ typography: 'mono', color: colors.accentText }}>{w.n}</Box>
                <Box className="name" sx={{ typography: 'h4' }}>{w.name}</Box>
                <Box sx={{ typography: 'mono', color: colors.muted }}>{w.tags[0]} · {w.year}</Box>
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'baseline', gap: '8px', typography: 'label' }}>
                  <Box component="span" className="arrow" sx={{ color: colors.accentText }}>←</Box>
                  <span>{w.locked ? 'Unlock' : 'Read'}</span>
                  <Box component="span" sx={{ typography: 'caption', color: colors.muted }}>{lockNote(w)}</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Floating cover, desktop pointers only */}
      <Box
        ref={preview}
        aria-hidden="true"
        sx={{
          position: 'fixed', left: 0, top: 0, zIndex: 20, pointerEvents: 'none',
          width: 320, aspectRatio: '4 / 3', overflow: 'hidden', bgcolor: colors.tint, outline: `2px solid ${colors.coral}`,
          opacity: current ? 1 : 0, transition: 'opacity 200ms ease',
          display: 'none', '@media (hover: hover) and (pointer: fine)': { display: 'block' }
        }}
      >
        {current?.cover && (
          <Box component="img" src={current.cover.src} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: current.focus || 'top', display: 'block' }} />
        )}
      </Box>
    </Box>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <rect x="5" y="11" width="14" height="10" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

// Desktop layout for the image view, on a 12-column grid:
// the first project runs edge to edge, then the rest sit two up,
// same width, same image shape, top-aligned.
function slot(i) {
  if (i === 0) return { cols: '1 / -1', ratio: { xs: '4 / 3', md: '2 / 1' }, offset: 0, feature: true };
  return { cols: 'span 6', ratio: '4 / 3', offset: 0 };
}

/** Image view: big, mixed-shape images with a credit line under each. */
function WorkGrid() {
  return (
    <Box sx={{ maxWidth: 1560, mx: 'auto', px: 'clamp(12px, 2vw, 24px)', boxSizing: 'border-box' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' }, columnGap: 'clamp(12px, 2vw, 24px)', rowGap: { xs: '56px', md: '96px' }, alignItems: 'start' }}>
        {work.map((w, i) => {
          const s = slot(i);
          return (
            <Reveal key={w.slug} delay={s.feature ? 0 : 80} sx={{ gridColumn: { md: s.cols }, mt: { md: s.offset } }}>
              <Box
                component={RouterLink}
                to={w.to}
                sx={{
                  display: 'block', color: colors.ink, textDecoration: 'none',
                  '&:hover img, &:focus-visible img': { transform: 'scale(1.025)' },
                  '&:hover .name, &:focus-visible .name': { color: colors.accentText },
                  '&:hover .arrow, &:focus-visible .arrow': { transform: 'translateX(6px)' },
                  '&:focus-visible': { outline: `1px solid ${colors.ink}`, outlineOffset: 6 }
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden', aspectRatio: s.ratio, bgcolor: colors.tint }}>
                  {w.cover ? (
                    <Box component="img" src={w.cover.src} alt={w.cover.alt} loading={i === 0 ? 'eager' : 'lazy'} sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: w.focus || 'top', display: 'block', transition: 'transform 900ms cubic-bezier(.2,.7,.2,1)' }} />
                  ) : (
                    <Placeholder sx={{ height: '100%' }} />
                  )}
                  {w.locked && (
                    <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', px: 1.5, py: 1, bgcolor: colors.bg, color: colors.ink, typography: 'label' }}>
                        <LockIcon /> Password protected
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Caption, like a film credit: the role on top, the name big underneath */}
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', pt: '18px' }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Box sx={{ typography: 'credit', color: colors.muted, mb: '6px' }}>{w.credit}</Box>
                    <Box component="h3" className="name" sx={{ m: 0, typography: s.feature ? 'h2' : 'h3', transition: 'color 200ms ease' }}>
                      <Box component="span" sx={{ typography: 'mono', color: colors.accentText, mr: 1.5, verticalAlign: 'top' }}>{w.n}</Box>
                      {w.name}
                    </Box>
                  </Box>
                  <Box component="span" sx={{ typography: 'mono', color: colors.muted, whiteSpace: 'nowrap', pb: '4px' }}>{w.year}</Box>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px 24px', mt: '12px' }}>
                  <Box component="p" sx={{ m: 0, maxWidth: 560, typography: 'body2', color: colors.body, textWrap: 'pretty' }}>{w.title}</Box>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '8px', typography: 'label', whiteSpace: 'nowrap' }}>
                    {!w.locked && !PUBLIC_CASE_STUDIES.includes(w.slug) && <Box component="span" sx={{ typography: 'caption', color: colors.muted, mr: 1 }}>Password</Box>}
                    <span>{w.locked ? 'Unlock' : 'Read'}</span>
                    <Box component="span" className="arrow" sx={{ color: colors.accentText, transition: 'transform 250ms ease' }}>→</Box>
                  </Box>
                </Box>
              </Box>
            </Reveal>
          );
        })}
      </Box>
    </Box>
  );
}

// "2018–2026" from the project years.
const years = work.flatMap((w) => (w.year.match(/\d{4}/g) || []).map(Number));
const range = `${Math.min(...years)}–${Math.max(...years)}`;

export default function Home() {
  const [view, setView] = useState('img');
  return (
    <Box sx={{ width: '100%', bgcolor: colors.bg, color: colors.ink, typography: 'body1' }}>
      <SiteNav />

      {/* HERO: fills the first screen, statement anchored low */}
      <Container
        id="top"
        sx={{ minHeight: { md: 'calc(100svh - 64px)' }, display: 'flex', flexDirection: 'column', pt: { xs: 4, md: 5 }, pb: { xs: 8, md: 5 } }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: '8px 24px',
            pb: '14px',
            borderBottom: `1px solid ${colors.border}`,
            typography: 'mono',
            color: colors.muted,
            mb: { xs: 8, md: 'auto' }
          }}
        >
          <span>Justin Neely</span>
          <span>Product designer</span>
          <span>Atlanta, GA</span>
          <span>15+ years, enterprise B2B</span>
        </Box>
        <Reveal sx={{ mt: { md: 10 } }}>
          <Box sx={{ mb: 2, typography: 'credit', color: colors.accentText }}>What I do</Box>
        </Reveal>
        <Reveal delay={120}>
          {/* The headline is a full sentence, so it runs a step smaller than the display size. */}
          <Box component="h1" sx={{ m: 0, typography: 'display', fontSize: fluid(30, 80), maxWidth: 1180, textWrap: 'balance' }}>
            I work through <Box component="span" sx={outlineText()}>the messy parts</Box> so the people using the product don’t have to.
          </Box>
        </Reveal>
        <Reveal delay={240}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '24px 48px', alignItems: 'end', mt: 'clamp(40px, 6vw, 72px)' }}>
            <Box component="p" sx={{ m: 0, maxWidth: 460, typography: 'subtitle1', color: colors.body }}>
              15+ years in enterprise B2B design, with experience at Truelio (formerly Dynamic Marketing Systems) and CarMax. Every decision has a reason behind it.
            </Box>
            <Box sx={{ display: 'flex', justifyContent: { md: 'flex-end' }, gap: '32px', typography: 'label' }}>
              <Link href="#about" underline="hover" sx={{ color: colors.ink, textDecorationColor: colors.coral, '&:hover': { color: colors.accentText } }}>Who I am →</Link>
              <Link href="#work" underline="hover" sx={{ color: colors.ink, textDecorationColor: colors.coral, '&:hover': { color: colors.accentText } }}>See the work ↓</Link>
            </Box>
          </Box>
        </Reveal>
        <Box
          aria-hidden="true"
          sx={{
            display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '12px', mt: 6, typography: 'caption', color: colors.muted,
            '& i': { display: 'block', width: 40, height: '1px', bgcolor: colors.coral, transformOrigin: 'left',
              '@keyframes scrollcue': { '0%': { transform: 'scaleX(0)' }, '50%': { transform: 'scaleX(1)' }, '100%': { transform: 'scaleX(0)', transformOrigin: 'right' } },
              animation: 'scrollcue 2.4s ease-in-out infinite', [reduced]: { animation: 'none' } }
          }}
        >
          <i /> Scroll
        </Box>
      </Container>

      {/* WORK: list or grid */}
      <Container id="work" sx={{ pt: { xs: 4, md: 8 } }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <Box component="h2" sx={{ m: 0, typography: 'h1' }}>Selected work</Box>
            <Box sx={{ typography: 'mono', color: colors.muted }}>
              (<Box component="span" sx={{ color: colors.accentText }}><CountUp to={work.length} /></Box> cases · {range})
            </Box>
          </Box>
          <Toggle view={view} setView={setView} />
        </Box>
        {view === 'txt' && <WorkList />}
      </Container>
      {view === 'img' && <Box sx={{ pt: 2 }}><WorkGrid /></Box>}

      {/* ABOUT */}
      <Container id="about" sx={{ pt: sectionTop }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: { xs: 3, md: 6 } }}>
          <Label>About</Label>
          <div>
            <Reveal>
              <Box component="p" sx={{ m: 0, typography: 'h2', maxWidth: 820, textWrap: 'pretty' }}>
                A left-handed human being who happens to design. I start with what matters to the people using the product, then make it visible.
              </Box>
            </Reveal>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: '24px 40px', mt: 5, maxWidth: 820 }}>
              {about.map(([h, p]) => (
                <Box key={h} component="p" sx={{ m: 0, color: colors.body }}>
                  <Box component="strong" sx={{ color: colors.ink, fontWeight: 500 }}>{h}</Box> {p}
                </Box>
              ))}
            </Box>
            
          </div>
        </Box>
      </Container>

      {/* PREVIOUSLY */}
      <Container sx={{ pt: sectionTop }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: { xs: 3, md: 6 } }}>
          <Label>Previously</Label>
          <div>
            <Box sx={{ borderTop: `1px solid ${colors.ink}` }}>
              {previously.map(([co, role, yrs]) => (
                <Box key={co} sx={{ py: 3, borderBottom: `1px solid ${colors.border}` }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '4px 24px' }}>
                    <Box component="h3" sx={{ m: 0, typography: 'h4' }}>{co}</Box>
                    <Box sx={{ typography: 'mono', color: colors.muted }}>{yrs}</Box>
                  </Box>
                  <Box component="p" sx={{ mt: 1.5, mb: 0, maxWidth: 680, typography: 'body2', color: colors.body, textWrap: 'pretty' }}>{role}</Box>
                </Box>
              ))}
            </Box>
            <Link component={RouterLink} to="/resume" underline="hover" sx={{ display: 'inline-block', mt: 3, typography: 'label', color: colors.ink, textDecorationColor: colors.coral, '&:hover': { color: colors.accentText } }}>Full resume →</Link>
          </div>
        </Box>
      </Container>

      <Container sx={{ pt: sectionTop, pb: 4 }}>
        <SiteFooter />
      </Container>
    </Box>
  );
}
