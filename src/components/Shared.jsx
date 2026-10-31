import { useEffect, useState } from 'react';
import { Box, Chip, Divider, AppBar, Link, IconButton, Collapse } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { colors, stripes } from '../theme.js';
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

// At 500px and below, the nav links fold into a hamburger menu.
const mobileNav = '@media (max-width: 500px)';
const navItems = [['/#work', 'Work'], ['/#about', 'About'], ['/resume', 'Resume'], ['/#contact', 'Contact']];

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
      sx={{ bgcolor: colors.bg, top: 0, color: colors.ink, borderBottom: `1px solid ${colors.border}`, boxShadow: 'none' }}
    >
      <Container
        sx={{ width: '100%', py: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px 32px' }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'baseline', gap: '10px', color: 'inherit', textDecoration: 'none' }}
        >
          <Box component="span" sx={{ typography: 'h5' }}>Justin Neely</Box>
          <Box component="span" sx={{ typography: 'mono', color: colors.muted, display: { xs: 'none', sm: 'inline' } }}>Product designer</Box>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '8px', mx: 'auto', typography: 'mono', color: colors.muted }}>
          <StatusDot /> Open to product designer roles
        </Box>
        <Box component="nav" aria-label="Main" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 28px', [mobileNav]: { display: 'none' } }}>
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

/** Studio footer: contact line, link columns, back to top, and the three-line sign-off. */
export function SiteFooter({ sx }) {
  return (
    <Box component="footer" id="contact" sx={{ borderTop: `2px solid ${colors.coral}`, pt: 'clamp(40px, 6vw, 72px)', ...sx }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.6fr 1fr 1fr 1fr' }, gap: { xs: '40px', md: '32px' } }}>
        <div>
          <Box sx={{ typography: 'caption', color: colors.muted, mb: '14px' }}>Contact</Box>
          <Box sx={{ typography: 'h3', m: 0 }}>If you want to talk.</Box>
          <Link href="mailto:justin@jwfn.design" underline="none" sx={{ ...footLink, display: 'inline-block', mt: 1.5, typography: 'h3', color: colors.accentText, backgroundSize: '100% 2px', '&:hover': { color: colors.ink, backgroundSize: '100% 2px' } }}>
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
        <Box sx={{ typography: 'h2', color: colors.ink }}>
          <div>Left-handed by nature.</div>
          <Box sx={{ color: colors.coralLarge }}>Designer by profession.</Box>
          <div>Human by default.</div>
        </Box>
        <Box sx={{ typography: 'mono', color: colors.muted, textAlign: { md: 'right' } }}>
          <div>© 2026 Justin Neely</div>
          <div>Atlanta, GA</div>
        </Box>
      </Box>
    </Box>
  );
}
