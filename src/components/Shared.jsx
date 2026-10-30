import { useEffect, useState } from 'react';
import { Box, Chip, Divider, Avatar, AppBar, Link, IconButton, Collapse, ButtonBase } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { colors, fonts, stripes } from '../theme.js';

export const gutter = 'clamp(20px, 5vw, 48px)';

// All type comes from the ramp in theme.js. Use sx={{ typography: '<token>' }}.

export const monoLabel = { typography: 'overline', color: colors.muted };

export const fieldLabel = { typography: 'caption', color: colors.muted };

export const navBtnSx = { typography: 'label', color: colors.ink };

export const navLinkSx = {
  typography: 'label',
  color: colors.ink,
  '&:hover': { color: colors.accentText }
};

export const monoChipSx = {
  typography: 'caption',
  borderRadius: 0,
  borderColor: colors.chipBorder
};

export const coverChipSx = {
  typography: 'caption',
  borderRadius: 0,
  bgcolor: colors.band,
  color: colors.onBand
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

// At 500px and below, the nav links fold into a hamburger menu.
const mobileNav = '@media (max-width: 500px)';
const navItems = [['/#work', 'Work'], ['/resume', 'Resume'], ['/#about', 'About'], ['/#contact', 'Contact']];

function MenuIcon({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
    </svg>
  );
}

function ThemeIcon() {
  // A circle, half filled: reads as "light / dark" in either scheme.
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
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
      sx={{ ...navLinkSx, gap: '8px', py: '6px', px: '2px', '&:focus-visible': { outline: `2px solid ${colors.ink}`, outlineOffset: 2 }, ...sx }}
    >
      <ThemeIcon />
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </ButtonBase>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    // Close if the window grows past the breakpoint while the menu is open.
    const mq = window.matchMedia('(min-width: 501px)');
    const onWide = (e) => e.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onWide);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: colors.bg, top: 0, color: colors.ink, borderBottom: `1px solid ${colors.border}`, boxShadow: 'none' }}
    >
      <Container
        sx={{ width: '100%', py: '14px', display: 'flex', alignItems: 'center', gap: '12px 32px' }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', gap: '12px', typography: 'h5', color: 'inherit', textDecoration: 'none' }}
        >
          <Avatar
            variant="square"
            sx={{ bgcolor: colors.band, color: colors.onBand, fontFamily: fonts.serif, fontWeight: 700, fontSize: 22 /* logo mark, not part of the ramp */, width: 40, height: 40, borderRadius: 0 }}
          >
            J
          </Avatar>
          <span>Justin Neely</span>
        </Box>
        <Box component="nav" aria-label="Main" sx={{ ml: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 28px', [mobileNav]: { display: 'none' } }}>
          {navItems.map(([to, label]) => (
            <Link key={to} component={RouterLink} to={to} underline="hover" sx={navLinkSx}>{label}</Link>
          ))}
        </Box>
        <ThemeToggle sx={{ [mobileNav]: { ml: 'auto' } }} />
        <IconButton
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          sx={{ display: 'none', mr: -1, color: colors.ink, borderRadius: 0, [mobileNav]: { display: 'inline-flex' } }}
        >
          <MenuIcon open={open} />
        </IconButton>
      </Container>
      <Collapse in={open} timeout={200} unmountOnExit>
        <Box component="nav" id="mobile-menu" aria-label="Main" sx={{ display: 'none', [mobileNav]: { display: 'block' }, borderTop: `1px solid ${colors.border}` }}>
          {navItems.map(([to, label]) => (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              underline="none"
              onClick={() => setOpen(false)}
              sx={{ ...navLinkSx, display: 'block', px: gutter, py: '16px', borderBottom: `1px solid ${colors.border}`, '&:last-of-type': { borderBottom: 0 } }}
            >
              {label}
            </Link>
          ))}
        </Box>
      </Collapse>
    </AppBar>
  );
}

// Set at build time in vite.config.js, so every deploy stamps its own date.
const lastUpdated = new Date(__BUILD_DATE__).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });

export function SiteFooter({ sx }) {
  return (
    <Box sx={sx}>
      <Divider />
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px 24px', pt: '20px', typography: 'mono', color: colors.muted }}
      >
        <span>© Justin Neely 2026</span>
        <span>Last updated {lastUpdated}</span>
        <span>ATL</span>
      </Box>
    </Box>
  );
}

/**
 * Every project as a table row: number, name, tags, year.
 * `current` greys out the case study you're already on.
 */
export function ProjectIndex({ items, current, id = 'index', sx }) {
  return (
    <Box id={id} component="section" aria-labelledby={`${id}-heading`} sx={sx}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2, mb: 2 }}>
        <Box component="h2" id={`${id}-heading`} sx={{ m: 0, ...monoLabel }}>Index</Box>
        <Box sx={{ typography: 'mono', color: colors.muted }}>({String(items.length).padStart(2, '0')})</Box>
      </Box>
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, borderTop: `1.5px solid ${colors.ink}` }}>
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
                  gridTemplateColumns: { xs: '40px 1fr auto', md: '56px 1.2fr 1fr 120px' },
                  alignItems: 'baseline',
                  gap: '4px 16px',
                  py: '16px',
                  color: here ? colors.muted : colors.ink,
                  textDecoration: 'none',
                  transition: 'color 150ms ease, padding 150ms ease',
                  ...(!here && { '&:hover, &:focus-visible': { color: colors.accentText, pl: { md: '8px' } } })
                }}
              >
                <Box component="span" sx={{ typography: 'mono', color: colors.muted }}>{w.n}</Box>
                <Box component="span" sx={{ typography: 'h6' }}>
                  {w.name}{w.locked && <Box component="span" sx={{ typography: 'caption', color: colors.muted, ml: 1 }}>Locked</Box>}
                  {here && <Box component="span" sx={{ typography: 'caption', ml: 1 }}>You're here</Box>}
                </Box>
                <Box component="span" sx={{ typography: 'caption', color: colors.muted, display: { xs: 'none', md: 'block' } }}>{w.tags.join(' · ')}</Box>
                <Box component="span" sx={{ typography: 'mono', color: colors.muted, textAlign: 'right' }}>{w.year}</Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
