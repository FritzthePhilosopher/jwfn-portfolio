import { Box, Chip, Divider, Avatar, AppBar, Link } from '@mui/material';
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

export function SiteNav() {
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 32px' }}>
          <Link component={RouterLink} to="/#work" underline="hover" sx={navLinkSx}>Work</Link>
          <Link component={RouterLink} to="/#about" underline="hover" sx={navLinkSx}>About</Link>
          <Link component={RouterLink} to="/#contact" underline="hover" sx={navLinkSx}>Contact</Link>
        </Box>
      </Container>
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
