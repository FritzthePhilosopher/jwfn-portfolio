import { createTheme } from '@mui/material';

// Studio palette: warm off-white paper, near-black ink, hairline rules.
// Coral survives only as a small signal (accentText, the status dot).
export const colors = {
  bg: '#F6F6F4',
  ink: '#141414',
  body: '#3F3F3C',
  muted: '#86867F',
  border: '#DDDDD7',
  tint: '#EDEDE9',
  band: '#E6E6E1',
  accent: '#141414',
  accentText: '#D9481F',
  coral: '#FF7F50',
  onBand: '#141414',
  onBandMuted: '#5E5E58',
  accentOnBand: '#141414',
  bandBorder: '#C9C9C2',
  bandBorderStrong: '#AFAFA7'
};

export const fonts = {
  serif: "'IBM Plex Serif', serif",
  sans: "'Instrument Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace"
};

export const stripes =
  'repeating-linear-gradient(135deg, #E9E9E4 0 14px, #EFEFEB 14px 28px)';

/* ------------------------------------------------------------------
   TYPE RAMP
   One source of truth for every text style on the site.
   Fluid sizes scale linearly from a 375px phone to the 1200px
   container, then hold. Use in any sx prop:  sx={{ typography: 'h2' }}
   or <Typography variant="h2" component="h3">.
   The variant sets the look; `component` sets the HTML tag, so
   heading levels stay correct for screen readers.
   ------------------------------------------------------------------ */

const VW_MIN = 375;
const VW_MAX = 1200;
const rem = (px) => `${+(px / 16).toFixed(4)}rem`;

/** Fluid size: `min`px at 375px wide, `max`px at 1200px and up. */
export function fluid(min, max) {
  const slope = (max - min) / (VW_MAX - VW_MIN);
  const base = min - slope * VW_MIN;
  return `clamp(${rem(min)}, ${rem(base)} + ${+(slope * 100).toFixed(4)}vw, ${rem(max)})`;
}

// [token, family, weight, minPx, maxPx, lineHeight, letterSpacing, role]
// maxPx === minPx means a fixed size.
const RAMP = [
  ['display',   'sans',  500, 40, 96, 1.0,  '-0.04em',  'Hero headline, case study title, contact CTA'],
  ['h1',        'sans',  500, 34, 56, 1.05, '-0.035em', 'Home page section headings'],
  ['h2',        'sans',  500, 28, 44, 1.1,  '-0.03em',  'Case study section headings'],
  ['h3',        'sans',  500, 24, 32, 1.15, '-0.025em', 'Work card titles, sub-section headings'],
  ['h4',        'sans',  500, 20, 24, 1.25, '-0.015em', 'Company names, decision titles, about cards'],
  ['h5',        'sans',  600, 15, 15, 1.2,  '0',        'Nav wordmark'],
  ['h6',        'sans',  500, 17, 17, 1.3,  '-0.01em',  'List row names'],
  ['stat',      'sans',  500, 44, 56, 1,    '-0.04em',  'Big numbers: stats band, results'],
  ['statSm',    'sans',  500, 28, 36, 1.05, '-0.03em',  'Inline metrics, decision numbers'],
  ['quote',     'sans',  400, 22, 30, 1.35, '-0.02em',  'Reflection / pull quote, intro statement'],
  ['subtitle1', 'sans',  400, 18, 21, 1.5,  '-0.005em', 'Lead paragraph under a title'],
  ['subtitle2', 'sans',  500, 16, 16, 1.4,  '0',        'Emphasized values (Role, Client, Year)'],
  ['body1',     'sans',  400, 16, 16, 1.6,  '0',        'Default body copy'],
  ['body2',     'sans',  400, 14, 14, 1.55, '0',        'Card details, stat captions, small copy'],
  ['button',    'sans',  500, 15, 15, 1.25, '0',        'Buttons'],
  ['overline',  'mono',  400, 12, 12, 1.4,  '0.06em',   'Section eyebrows'],
  ['label',     'mono',  400, 12, 12, 1.4,  '0.06em',   'Nav links, list headers'],
  ['caption',   'mono',  400, 11, 11, 1.4,  '0.06em',   'Field labels, chips, figure captions'],
  ['mono',      'mono',  400, 12, 12, 1.5,  '0',        'Dates, index numbers, footer']
];

const UPPERCASE = new Set(['overline', 'label', 'caption']);

/** Ramp as data, for the /type specimen page and documentation. */
export const ramp = RAMP.map(([token, family, weight, min, max, lineHeight, letterSpacing, role]) => ({
  token, family, weight, min, max, lineHeight, letterSpacing, role,
  uppercase: UPPERCASE.has(token)
}));

const variants = Object.fromEntries(
  ramp.map((r) => [
    r.token,
    {
      fontFamily: fonts[r.family],
      fontWeight: r.weight,
      fontSize: r.min === r.max ? rem(r.min) : fluid(r.min, r.max),
      lineHeight: r.lineHeight,
      letterSpacing: r.letterSpacing,
      ...(r.uppercase ? { textTransform: 'uppercase' } : { textTransform: 'none' })
    }
  ])
);

const theme = createTheme({
  palette: {
    primary: { main: colors.accent },
    text: { primary: colors.ink, secondary: colors.muted },
    divider: colors.border,
    background: { default: colors.bg, paper: colors.bg }
  },
  shape: { borderRadius: 2 },
  typography: {
    htmlFontSize: 16,
    fontFamily: fonts.sans,
    fontSize: 16,
    ...variants
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { color: colors.ink, backgroundColor: colors.bg },
        '::selection': { background: colors.ink, color: colors.bg },
        '[id]': { scrollMarginTop: '72px' }
      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          display: 'h1', h1: 'h2', h2: 'h2', h3: 'h3', h4: 'h3', h5: 'div', h6: 'h4',
          stat: 'div', statSm: 'div', quote: 'p',
          subtitle1: 'p', subtitle2: 'div', body1: 'p', body2: 'p',
          overline: 'div', label: 'span', caption: 'span', mono: 'span'
        }
      }
    },
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiChip: { styleOverrides: { root: { borderRadius: 0 } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 0 } } }
  }
});

export default theme;
