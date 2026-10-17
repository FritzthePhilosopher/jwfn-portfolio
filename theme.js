import { createTheme } from '@mui/material';

export const colors = {
  ink: '#2A1612',
  body: '#5A3B34',
  muted: '#7A5C55',
  border: '#F0D6CC',
  tint: '#FFF1EC',
  band: '#FF7F50',
  accent: '#FF7F50',
  accentText: '#CC4326',
  onBand: '#3B1F18',
  onBandMuted: '#5A2A1E',
  accentOnBand: '#2A1612',
  bandBorder: '#C2512B',
  bandBorderStrong: '#A8431F'
};

export const fonts = {
  serif: "'IBM Plex Serif', serif",
  sans: "'Instrument Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace"
};

export const stripes =
  'repeating-linear-gradient(135deg, #F7DDD3 0 14px, #FBE8E0 14px 28px)';

const theme = createTheme({
  palette: {
    primary: { main: colors.accent },
    text: { primary: colors.ink, secondary: colors.muted },
    divider: colors.border,
    background: { default: '#FFFFFF' }
  },
  shape: { borderRadius: 2 },
  typography: {
    fontFamily: fonts.sans,
    fontSize: 16,
    button: { textTransform: 'none', fontWeight: 600, fontSize: 16 }
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiChip: { styleOverrides: { root: { borderRadius: 0 } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 0 } } }
  }
});

export default theme;
