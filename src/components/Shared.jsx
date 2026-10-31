import { useEffect, useRef, useState } from 'react';
import { Box, Chip, Divider, AppBar, Link, ButtonBase } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { colors, stripes, fluid, outlineText } from '../theme.js';
import { RESUME_PDF } from '../pages/resume-data.js';

export const gutter = 'clamp(20px, 5vw, 48px)';

// All type comes from the ramp in theme.js. Use sx={{ typography: '<token>' }}.

export const monoLabel = { typography: 'overline', color: colors.muted };

export const fieldLabel = { typography: 'caption', color: colors.muted };

export const navBtnSx = { typography: 'label', color: colors.ink };

export const navLinkSx = {
  typography: 'label',
  color: colors.ink,
  textDecorationColor: colors.coral,
  '&:hover': { color: colors.accentText }
};

export const monoChipSx = {
  typography: 'caption',
  borderRadius: 0,
  borderColor: colors.border
};

export const coverChipSx = {
  typography: 'caption',
  borderRadius: 0,
  bgcolor: colors.band,
  color: colors.ink
};

// Home page section heading
export const h2Sx = { m: 0, typography: 'h3' };

// Case study section heading
export const h2CaseSx = { m: 0, typography: 'h2' };

// Hero / case study title
export const displaySx = { m: 0, typography: 'display', overflowWrap: 'anywhere' };

export function Container({ children, sx, ...rest }) {
  return (
    <Box
      sx={{ maxWidth: 1200, mx: 'auto', px: gutter, boxSizing: 'border-box', ...sx }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function Label({ children, sx }) {
  return <Box sx={{ ...monoLabel, ...sx }}>{children}</Box>;
}

export function Placeholder({ label, sx }) {
  return (
    <Box
      sx={{
        background: stripes,
        display: 'flex',
        alignItems: 'flex-end',
        p: 2,
        boxSizing: 'border-box',
        ...sx
      }}
    >
      {label && <Chip size="small" label={label} sx={coverChipSx} />}
    </Box>
  );
}

const navItems = [['/', 'Home'], ['/#work', 'Work'], ['/#about', 'About'], ['/resume', 'Resume'], ['/#contact', 'Contact']];

/** Small coral dot with a slow pulse (still for reduced motion). */
export function StatusDot() {
  return (
    <Box
      component="span"
      aria-hidden="true"
      sx={{
        width: 7, height: 7, borderRadius: '50%', bgcolor: colors.coral, flex: 'none',
        '@keyframes pulse': { '0%': { boxShadow: '0 0 0 0 rgba(255,127,80,.55)' }, '70%': { boxShadow: '0 0 0 7px rgba(255,127,80,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(255,127,80,0)' } },
        animation: 'pulse 2.4s ease-out infinite',
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
      }}
    />
  );
}

function ThemeIcon() {
  // A circle, half filled: reads as "light / dark" in either scheme.
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
    </svg>
  );
}

/** Light / dark switch. MUI remembers the choice in localStorage. */
export function ThemeToggle({ sx }) {
  const { mode, setMode } = useColorScheme();
  const isDark = mode === 'dark';
  return (
    <ButtonBase
      onClick={() => setMode(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title="Toggle theme"
      sx={{ ...navLinkSx, gap: '8px', py: '6px', px: '2px', '&:focus-visible': { outline: `1px solid ${colors.ink}`, outlineOffset: 3 }, ...sx }}
    >
      <ThemeIcon />
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </ButtonBase>
  );
}

// Full-screen menu: big numbered links plus the ways to reach me.
const menuContact = [
  ['Email', 'justin@jwfn.design', { href: 'mailto:justin@jwfn.design' }],
  ['LinkedIn', 'in/jwfn ↗', { href: 'https://www.linkedin.com/in/jwfn/', target: '_blank', rel: 'noopener noreferrer' }],
  ['Resume', 'PDF ↓', { href: RESUME_PDF, download: 'Justin-Neely-Resume.pdf' }]
];

/** The coral J square: an extended black J (Archivo), same shapes as public/favicon.svg. */
export function LogoMark({ size = 36, sx }) {
  return (
    <Box component="svg" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" sx={{ flex: 'none', ...sx }}>
      <rect width="64" height="64" fill="#FF7F50" />
      <path fill="#141414" d="M31.85 52.5Q25.53 52.5 21.14 50.92Q16.74 49.34 14.46 45.91Q12.17 42.48 12.17 37.1V36.16H25.82V37.27Q25.82 40.08 27.23 41.28Q28.63 42.48 31.33 42.48Q34.43 42.48 35.87 41.05Q37.3 39.61 37.3 36.22V11.5H51.83V35.81Q51.83 41.66 49.42 45.35Q47.02 49.04 42.57 50.77Q38.12 52.5 31.85 52.5Z" />
    </Box>
  );
}

function MenuButton({ open, onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-expanded={open}
      aria-controls="site-menu"
      sx={{ ...navLinkSx, gap: '10px', py: '6px', px: '2px', justifySelf: 'start', '&:focus-visible': { outline: `1px solid ${colors.ink}`, outlineOffset: 3 } }}
    >
      {/* Two lines that cross into an X when open */}
      <Box component="span" aria-hidden="true" sx={{ position: 'relative', width: 16, height: 10, '& i': { position: 'absolute', left: 0, width: '100%', height: '1.5px', bgcolor: 'currentColor', transition: 'transform 300ms ease, top 300ms ease' } }}>
        <Box component="i" sx={{ top: open ? '4px' : 0, transform: open ? 'rotate(45deg)' : 'none' }} />
        <Box component="i" sx={{ top: open ? '4px' : '8px', transform: open ? 'rotate(-45deg)' : 'none' }} />
      </Box>
      <span>{open ? 'Close' : 'Menu'}</span>
    </ButtonBase>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const firstLink = useRef(null);

  // Close whenever the page or section changes.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => firstLink.current?.focus(), 150);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open]);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: colors.bg, top: 0, color: colors.ink, borderBottom: `1px solid ${open ? 'transparent' : colors.border}`, boxShadow: 'none', transition: 'border-color 200ms ease' }}
      >
        <Container sx={{ width: '100%', py: '16px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '16px' }}>
          <MenuButton open={open} onClick={() => setOpen((o) => !o)} />
          <Box component={RouterLink} to="/" aria-label="Justin Neely, home" sx={{ display: 'flex', alignItems: 'baseline', gap: '10px', color: 'inherit', textDecoration: 'none' }}>
            {/* Phones: the J mark. Wider screens: the wordmark. */}
            <LogoMark sx={{ display: { xs: 'block', sm: 'none' }, alignSelf: 'center' }} />
            <Box component="span" sx={{ typography: 'h5', display: { xs: 'none', sm: 'inline' } }}>Justin Neely</Box>
            <Box component="span" sx={{ typography: 'mono', color: colors.muted, display: { xs: 'none', sm: 'inline' } }}>Product design</Box>
          </Box>
          <Box sx={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '28px' }}>
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: '8px', typography: 'mono', color: colors.muted }}>
              <StatusDot /> Open to roles
            </Box>
            <ThemeToggle />
          </Box>
        </Container>
      </AppBar>

      <Box
        id="site-menu"
        component="nav"
        aria-label="Main"
        aria-hidden={!open}
        sx={{
          position: 'fixed', inset: 0, zIndex: (t) => t.zIndex.appBar - 1,
          bgcolor: colors.bg, color: colors.ink,
          pt: '72px', overflowY: 'auto',
          opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden',
          transition: open ? 'opacity 300ms ease' : 'opacity 250ms ease, visibility 0s linear 250ms',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' }
        }}
      >
        <Container sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6, py: { xs: 4, md: 6 } }}>
          <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, borderTop: `1px solid ${colors.ink}` }}>
            {navItems.map(([to, label], i) => (
              <Box component="li" key={to} sx={{ borderBottom: `1px solid ${colors.border}` }}>
                <Box
                  component={RouterLink}
                  to={to}
                  ref={i === 0 ? firstLink : undefined}
                  onClick={() => {
                    setOpen(false);
                    // Home from the home page: there's no route change, so scroll up ourselves.
                    if (to === '/' && location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  tabIndex={open ? 0 : -1}
                  sx={{
                    display: 'flex', alignItems: 'baseline', gap: { xs: '16px', md: '32px' }, py: { xs: '8px', md: '10px' },
                    color: colors.ink, textDecoration: 'none',
                    opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(12px)',
                    transition: `opacity 500ms ease ${open ? 80 + i * 60 : 0}ms, transform 500ms cubic-bezier(.2,.7,.2,1) ${open ? 80 + i * 60 : 0}ms`,
                    '& .label': { transition: 'transform 300ms cubic-bezier(.2,.7,.2,1), color 200ms ease, -webkit-text-stroke-color 200ms ease' },
                    '&:hover .label, &:focus-visible .label': { transform: 'translateX(12px)', ...outlineText(colors.coral) },
                    '&:focus-visible': { outline: 'none' },
                    '@media (prefers-reduced-motion: reduce)': { transition: 'none', transform: 'none' }
                  }}
                >
                  <Box component="span" sx={{ typography: 'mono', color: colors.accentText, minWidth: 28 }}>{String(i + 1).padStart(2, '0')}</Box>
                  <Box component="span" className="label" sx={{ typography: 'h2', fontSize: fluid(56, 128), lineHeight: 0.88 }}>{label}</Box>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: '24px', opacity: open ? 1 : 0, transition: `opacity 500ms ease ${open ? 360 : 0}ms` }}>
            {menuContact.map(([k, v, props]) => (
              <div key={k}>
                <Box sx={{ typography: 'caption', color: colors.muted, mb: '6px' }}>{k}</Box>
                <Link {...props} tabIndex={open ? 0 : -1} underline="hover" sx={{ typography: 'subtitle2', color: colors.ink, textDecorationColor: colors.coral, '&:hover': { color: colors.accentText } }}>{v}</Link>
              </div>
            ))}
            <div>
              <Box sx={{ typography: 'caption', color: colors.muted, mb: '6px' }}>Right now</Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', typography: 'subtitle2' }}><StatusDot /> Open to product designer roles</Box>
            </div>
          </Box>
        </Container>
      </Box>
    </>
  );
}

const footLink = {
  color: colors.ink,
  textDecoration: 'none',
  backgroundImage: `linear-gradient(${colors.coral}, ${colors.coral})`,
  backgroundSize: '0% 1px',
  backgroundPosition: '0 100%',
  backgroundRepeat: 'no-repeat',
  transition: 'background-size 300ms ease, color 200ms ease',
  '&:hover, &:focus-visible': { backgroundSize: '100% 1px', color: colors.accentText }
};

function FootCol({ title, children }) {
  return (
    <div>
      <Box sx={{ typography: 'caption', color: colors.muted, mb: '14px' }}>{title}</Box>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: '8px', typography: 'body2' }}>
        {children}
      </Box>
    </div>
  );
}

// Set at build time in vite.config.js, so every deploy stamps its own date.
const lastUpdated = new Date(__BUILD_DATE__).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });

/** Studio footer: contact line, link columns, back to top, and the three-line sign-off. */
export function SiteFooter({ sx }) {
  return (
    <Box component="footer" id="contact" sx={{ borderTop: `2px solid ${colors.coral}`, pt: 'clamp(40px, 6vw, 72px)', ...sx }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.6fr 1fr 1fr 1fr' }, gap: { xs: '40px', md: '32px' } }}>
        <div>
          <Box sx={{ typography: 'caption', color: colors.muted, mb: '14px' }}>Contact</Box>
          <Box sx={{ typography: 'h3', m: 0 }}>If you want to talk.</Box>
          <Link href="mailto:justin@jwfn.design" underline="none" sx={{ ...footLink, display: 'inline-block', mt: 2, typography: 'quote', fontWeight: 500, color: colors.accentText, backgroundSize: '100% 2px', '&:hover': { color: colors.ink, backgroundSize: '100% 2px' } }}>
            justin@jwfn.design
          </Link>
        </div>
        <FootCol title="Elsewhere">
          <li><Link href="https://www.linkedin.com/in/jwfn/" target="_blank" rel="noopener noreferrer" underline="none" sx={footLink}>LinkedIn ↗</Link></li>
          <li><Link href={RESUME_PDF} download="Justin-Neely-Resume.pdf" underline="none" sx={footLink}>Resume (PDF) ↓</Link></li>
        </FootCol>
        <FootCol title="Pages">
          {navItems.map(([to, label]) => (
            <li key={to}><Link component={RouterLink} to={to} underline="none" sx={footLink}>{label}</Link></li>
          ))}
        </FootCol>
        <FootCol title="&nbsp;">
          <li>
            <Link href="#" underline="none" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} sx={footLink}>Back to top ↑</Link>
          </li>
        </FootCol>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px', mt: 'clamp(64px, 10vw, 128px)', pb: '8px' }}>
        <Box sx={{ flex: '1 1 100%', typography: 'h1', fontSize: fluid(26, 58), color: colors.ink }}>
          <div>Left-handed by nature.</div>
          <Box sx={outlineText(colors.coral)}>Designer by profession.</Box>
          <div>Curious by habit.</div>
        </Box>
        <Box sx={{ typography: 'mono', color: colors.muted, textAlign: { md: 'right' } }}>
          <div>© 2026 Justin Neely · Atlanta, GA</div>
          <div>Last updated {lastUpdated}</div>
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Every project as a row: number, name, client, discipline, year.
 * Used at the bottom of each case study; `current` marks the page you're on.
 */
export function ProjectIndex({ items, current, sx }) {
  return (
    <Box component="section" aria-labelledby="index-heading" sx={sx}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2, mb: 2 }}>
        <Box component="h2" id="index-heading" sx={{ m: 0, ...monoLabel }}>Index</Box>
        <Box sx={{ typography: 'mono', color: colors.muted }}>({String(items.length).padStart(2, '0')})</Box>
      </Box>
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, borderTop: `1px solid ${colors.ink}` }}>
        {items.map((w) => {
          const here = w.slug === current;
          return (
            <Box component="li" key={w.slug} sx={{ borderBottom: `1px solid ${colors.border}` }}>
              <Box
                component={here ? 'div' : RouterLink}
                to={here ? undefined : w.to}
                aria-current={here ? 'page' : undefined}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '32px 1fr auto', md: '64px 1.4fr 1fr 1fr 120px' },
                  alignItems: 'baseline',
                  gap: '4px 16px',
                  py: '16px',
                  color: here ? colors.muted : colors.ink,
                  textDecoration: 'none',
                  '& .name': { transition: 'color 150ms ease' },
                  ...(!here && { '&:hover .name, &:focus-visible .name': { color: colors.accentText } })
                }}
              >
                <Box component="span" sx={{ typography: 'mono', color: colors.accentText }}>{w.n}</Box>
                <Box component="span" className="name" sx={{ typography: 'h6' }}>
                  {w.name}
                  {here && <Box component="span" sx={{ typography: 'caption', ml: 1.5 }}>You're here</Box>}
                </Box>
                <Box component="span" sx={{ typography: 'body2', color: colors.body, display: { xs: 'none', md: 'block' } }}>{w.tags[0]}</Box>
                <Box component="span" sx={{ typography: 'body2', color: colors.body, display: { xs: 'none', md: 'block' } }}>{w.tags.slice(1).join(', ')}</Box>
                <Box component="span" sx={{ typography: 'mono', color: colors.muted, textAlign: 'right' }}>{w.year}</Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
