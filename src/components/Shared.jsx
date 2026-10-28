import { useEffect, useState } from 'react';
import { Box, Chip, Divider, Avatar, AppBar, Link, IconButton, Collapse } from '@mui/material';
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
  borderColor: '#E0B5A6'
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
      sx={{ bgcolor: '#fff', top: 0, color: colors.ink, borderBottom: `1px solid ${colors.border}`, boxShadow: 'none' }}
    >
      <Container
        sx={{ width: '100%', py: '14px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start', gap: '12px 48px' }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', gap: '12px', typography: 'h5', color: 'inherit', textDecoration: 'none' }}
        >
          <Avatar
            variant="square"
            sx={{ bgcolor: colors.band, color: colors.ink, fontFamily: fonts.serif, fontWeight: 700, fontSize: 22 /* logo mark, not part of the ramp */, width: 40, height: 40, borderRadius: 0 }}
          >
            J
          </Avatar>
          <span>Justin Neely</span>
        </Box>
        <Box component="nav" aria-label="Main" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 32px', [mobileNav]: { display: 'none' } }}>
          {navItems.map(([to, label]) => (
            <Link key={to} component={RouterLink} to={to} underline="hover" sx={navLinkSx}>{label}</Link>
          ))}
        </Box>
        <IconButton
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          sx={{ display: 'none', ml: 'auto', mr: -1, color: colors.ink, borderRadius: 0, [mobileNav]: { display: 'inline-flex' } }}
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

export function SiteFooter({ sx }) {
  return (
    <Box sx={sx}>
      <Divider />
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px 24px', pt: '20px', typography: 'mono', color: colors.muted }}
      >
        <span>Justin Neely - 2026</span>
        <span>ATL</span>
      </Box>
    </Box>
  );
}
