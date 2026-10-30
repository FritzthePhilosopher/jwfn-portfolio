import { useEffect, useRef, useState } from 'react';
import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '../theme.js';
import { work } from './work.js';
import { PUBLIC_CASE_STUDIES } from '../../lib/public-case-studies.js';
import { Container, Label, Placeholder, SiteNav, SiteFooter } from '../components/Shared.jsx';

const sectionTop = 'clamp(96px, 12vw, 176px)';
const reduced = '@media (prefers-reduced-motion: reduce)';

const stats = [
  ['15+', 'Years designing enterprise B2B software'],
  ['2', 'Teams: one agency, Truelio (formerly Dynamic Marketing Systems), and one enterprise, CarMax'],
  ['4y 3m', 'Full-time on CarMax Auctions, after six months as a contractor']
];

// Short work history for the home page; the full version is on /resume.
const previously = [
  ['CarMax', 'Product Designer II, CarMax Auctions. Earlier, contract Product Designer.', 'Feb 2022 – Sep 2026'],
  ['Dynamic Marketing Systems (now Truelio)', 'UX Designer: mobile products for American Airlines, JetBlue and Frontier Airlines, plus tools for flight attendants to track incentives, set goals and monitor progress. Earlier Sr. Digital Designer, HTML Email Developer and Graphic Designer, where I started in 2012.', '2012 – Jan 2022']
];

const about = [
  ['Agency first.', 'I started at Dynamic Marketing Systems (now Truelio), a digital marketing agency, where I did my Barclays and American Airlines work, then moved in-house to product design.'],
  ['Atlanta.', 'Home for more than a decade.']
];

// Rows share one grid so the columns line up: no. / name / client & type / year.
const rowGrid = {
  display: 'grid',
  gridTemplateColumns: { xs: '32px 1fr auto', md: '64px 1.4fr 1fr 1fr 120px' },
  alignItems: 'baseline',
  gap: '4px 16px'
};

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
        transition: 'color 150ms ease',
        '&:hover': { color: colors.ink },
        '&:focus-visible': { outline: `1px solid ${colors.ink}`, outlineOffset: 4 }
      }}
    >
      {label}
    </Box>
  );
  return (
    <Box role="group" aria-label="Show work as" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {opt('txt', 'Txt')}
      <Box component="span" aria-hidden="true" sx={{ typography: 'label', color: colors.muted }}>/</Box>
      {opt('img', 'Img')}
    </Box>
  );
}

const lockNote = (w) => (w.locked ? 'Locked' : PUBLIC_CASE_STUDIES.includes(w.slug) ? 'Open' : 'Password');

/** Text view: one row per project. On desktop, a cover image follows the cursor. */
function WorkList() {
  const [hover, setHover] = useState(null);
  const preview = useRef(null);
  const onMove = (e) => {
    if (preview.current) preview.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 120}px)`;
  };
  const current = work.find((w) => w.slug === hover);
  return (
    <Box onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <Box sx={{ ...rowGrid, py: '10px', borderBottom: `1px solid ${colors.ink}`, typography: 'caption', color: colors.muted }}>
        <span>No.</span>
        <span>Project</span>
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>Client</Box>
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>Discipline</Box>
        <Box component="span" sx={{ textAlign: 'right' }}>Year</Box>
      </Box>
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {work.map((w) => (
          <Box component="li" key={w.slug} sx={{ borderBottom: `1px solid ${colors.border}` }}>
            <Box
              component={RouterLink}
              to={w.to}
              onMouseEnter={() => setHover(w.slug)}
              onFocus={() => setHover(null)}
              sx={{
                ...rowGrid,
                py: { xs: '18px', md: '26px' },
                color: colors.ink,
                textDecoration: 'none',
                transition: 'opacity 250ms ease',
                // Dim the other rows while one is hovered.
                opacity: hover && hover !== w.slug ? 0.3 : 1,
                '&:focus-visible': { outline: `1px solid ${colors.ink}`, outlineOffset: 2 }
              }}
            >
              <Box component="span" sx={{ typography: 'mono', color: colors.muted }}>{w.n}</Box>
              <Box component="span" sx={{ typography: { xs: 'h4', md: 'h3' } }}>
                {w.name}
                <Box component="span" sx={{ typography: 'caption', color: colors.muted, ml: 1.5, verticalAlign: 'middle' }}>{lockNote(w)}</Box>
              </Box>
              <Box component="span" sx={{ typography: 'body2', color: colors.body, display: { xs: 'none', md: 'block' } }}>{w.tags[0]}</Box>
              <Box component="span" sx={{ typography: 'body2', color: colors.body, display: { xs: 'none', md: 'block' } }}>{w.tags.slice(1).join(', ')}</Box>
              <Box component="span" sx={{ typography: 'mono', color: colors.muted, textAlign: 'right' }}>{w.year}</Box>
              <Box component="span" sx={{ gridColumn: { xs: '2 / -1', md: '2 / 5' }, mt: '6px', typography: 'body2', color: colors.muted, maxWidth: 560 }}>{w.title}</Box>
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
          width: 320, aspectRatio: '4 / 3', overflow: 'hidden', bgcolor: colors.tint,
          opacity: current ? 1 : 0, transition: 'opacity 200ms ease',
          display: 'none', '@media (hover: hover) and (pointer: fine)': { display: 'block' }
        }}
      >
        {current?.cover && (
          <Box component="img" src={current.cover.src} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
        )}
      </Box>
    </Box>
  );
}

/** Image view: covers in a grid with a caption line under each. */
function WorkGrid() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: '48px 24px', pt: 4 }}>
      {work.map((w, i) => (
        <Reveal key={w.slug} delay={i * 80}>
          <Box
            component={RouterLink}
            to={w.to}
            sx={{ display: 'block', color: colors.ink, textDecoration: 'none', '&:hover img': { transform: 'scale(1.04)' }, '&:focus-visible': { outline: `1px solid ${colors.ink}`, outlineOffset: 4 } }}
          >
            <Box sx={{ aspectRatio: '4 / 5', overflow: 'hidden', bgcolor: colors.tint }}>
              {w.cover ? (
                <Box component="img" src={w.cover.src} alt={w.cover.alt} loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 700ms cubic-bezier(.2,.7,.2,1)' }} />
              ) : (
                <Placeholder sx={{ height: '100%' }} />
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: '14px' }}>
              <Box sx={{ typography: 'h6' }}>
                <Box component="span" sx={{ typography: 'mono', color: colors.muted, mr: 1.5 }}>{w.n}</Box>{w.name}
              </Box>
              <Box sx={{ typography: 'mono', color: colors.muted }}>{w.year}</Box>
            </Box>
            <Box sx={{ mt: '4px', typography: 'caption', color: colors.muted }}>{w.tags.join(' · ')} · {lockNote(w)}</Box>
          </Box>
        </Reveal>
      ))}
    </Box>
  );
}

export default function Home() {
  const [view, setView] = useState('txt');
  return (
    <Box sx={{ width: '100%', bgcolor: colors.bg, color: colors.ink, typography: 'body1' }}>
      <SiteNav />

      {/* HERO: fills the first screen, statement anchored low */}
      <Container
        id="top"
        sx={{ minHeight: { md: 'calc(100svh - 64px)' }, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pt: { xs: 8, md: 6 }, pb: { xs: 8, md: 5 } }}
      >
        <Reveal>
          <Label sx={{ mb: 3 }}>What I do</Label>
        </Reveal>
        <Reveal delay={120}>
          <Box component="h1" sx={{ m: 0, typography: 'display', maxWidth: 1100, textWrap: 'balance' }}>
            I turn complex systems into products people can actually use.
          </Box>
        </Reveal>
        <Reveal delay={240}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '24px 48px', alignItems: 'end', mt: 'clamp(40px, 6vw, 72px)' }}>
            <Box component="p" sx={{ m: 0, maxWidth: 460, typography: 'subtitle1', color: colors.body }}>
              15+ years in enterprise B2B design, with experience at Truelio (formerly Dynamic Marketing Systems) and CarMax. Every decision has a reason behind it.
            </Box>
            <Box sx={{ display: 'flex', justifyContent: { md: 'flex-end' }, gap: '32px', typography: 'label' }}>
              <Link href="#about" underline="hover" sx={{ color: colors.ink }}>Who I am →</Link>
              <Link href="#work" underline="hover" sx={{ color: colors.ink }}>See the work ↓</Link>
            </Box>
          </Box>
        </Reveal>
        <Box
          aria-hidden="true"
          sx={{
            display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '12px', mt: 6, typography: 'caption', color: colors.muted,
            '& i': { display: 'block', width: 40, height: '1px', bgcolor: colors.muted, transformOrigin: 'left',
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
              (<CountUp to={work.length} /> cases)
            </Box>
          </Box>
          <Toggle view={view} setView={setView} />
        </Box>
        {view === 'txt' ? <WorkList /> : <WorkGrid />}
      </Container>

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
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: '28px', mt: 7 }}>
              {stats.map(([n, l]) => (
                <Box key={n} sx={{ borderTop: `1px solid ${colors.ink}`, pt: 2 }}>
                  <Box sx={{ typography: 'stat' }}>{n}</Box>
                  <Box sx={{ mt: 1, typography: 'body2', color: colors.body }}>{l}</Box>
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
            <Link component={RouterLink} to="/resume" underline="hover" sx={{ display: 'inline-block', mt: 3, typography: 'label', color: colors.ink }}>Full resume →</Link>
          </div>
        </Box>
      </Container>

      <Container sx={{ pt: sectionTop, pb: 4 }}>
        <SiteFooter />
      </Container>
    </Box>
  );
}
