import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

/* ------------------------------------------------------------------
   COLOR
   Studio palette (warm off-white paper, near-black ink, hairline rules)
   with coral as the brand accent, in a light and a dark scheme.
   Components use `colors.ink` etc., which are CSS variables, so the whole
   site flips when the theme toggle sets data-mui-color-scheme on <html>.
   accentText is coral tuned for small text (4.5:1+) in each scheme;
   coralLarge is tuned for big type (3:1+). The coral band keeps dark
   text in both schemes.
   ------------------------------------------------------------------ */
const light = {
  bg: '#F6F6F4',
  ink: '#141414',
  body: '#3F3F3C',
  muted: '#86867F',
  border: '#DDDDD7',
  tint: '#EDEDE9',
  stripeA: '#E9E9E4',
  stripeB: '#EFEFEB',
  band: '#FF7F50',
  accent: '#FF7F50',
  accentText: '#C2401F',
  coral: '#FF7F50',
  coralTint: '#FFE3D8',
  coralLarge: '#EC6236',
  onBand: '#3B1F18',
  onBandMuted: '#5A2A1E',
  accentOnBand: '#2A1612',
  bandBorder: '#C2512B',
  bandBorderStrong: '#A8431F'
};

const dark = {
  ...light,
  bg: '#131312',
  ink: '#F2F1EC',
  body: '#C9C8C1',
  muted: '#8F8E87',
  border: '#2E2D2A',
  tint: '#1D1C1A',
  stripeA: '#1D1C1A',
  stripeB: '#232220',
  accentText: '#FF8A5E',
  coralTint: '#3A2219',
  coralLarge: '#FF7F50'
};

export const schemes = { light, dark };

const cssVar = (k) => `--c-${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}`;
const toVars = (scheme) => Object.fromEntries(Object.entries(scheme).map(([k, v]) => [cssVar(k), v]));

/** Color tokens as CSS variables: colors.ink === 'var(--c-ink)'. */
export const colors = Object.fromEntries(Object.keys(light).map((k) => [k, `var(${cssVar(k)})`]));

export const fonts = {
  serif: "'IBM Plex Serif', serif",
  sans: "'Instrument Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace"
};

export const stripes =
  `repeating-linear-gradient(135deg, ${colors.stripeA} 0 14px, ${colors.stripeB} 14px 28px)`;

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

const palette = (c) => ({
  primary: { main: c.accent, contrastText: c.accentOnBand },
  text: { primary: c.ink, secondary: c.muted },
  divider: c.border,
  background: { default: c.bg, paper: c.bg }
});

const theme = extendTheme({
  colorSchemes: {
    light: { palette: palette(light) },
    dark: { palette: palette(dark) }
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
        ':root, [data-mui-color-scheme="light"]': toVars(light),
        '[data-mui-color-scheme="dark"]': toVars(dark),
        body: { color: colors.ink, backgroundColor: colors.bg, transition: 'background-color 200ms ease, color 200ms ease' },
        '::selection': { background: colors.coral, color: colors.accentOnBand },
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
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { outlined: { '&.MuiButton-colorInherit': { borderColor: 'currentColor' } } }
    },
    MuiChip: { styleOverrides: { root: { borderRadius: 0 } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 0 } } }
  }
});

export default theme;
