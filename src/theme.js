import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

/* ------------------------------------------------------------------
   COLOR
   Two schemes, light and dark. Components use `colors.ink` etc., which
   are CSS variables, so the whole site flips when the theme toggle sets
   data-mui-color-scheme on <html>. The coral band keeps dark text in
   both schemes, so its "on band" colors are the same in each.
   ------------------------------------------------------------------ */
const light = {
  bg: '#FFFFFF',
  ink: '#2A1612',
  body: '#5A3B34',
  muted: '#7A5C55',
  border: '#F0D6CC',
  chipBorder: '#E0B5A6',
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

const dark = {
  ...light,
  bg: '#16100E',
  ink: '#F7EAE5',
  body: '#DCC7C0',
  muted: '#B09790',
  border: '#3A2A25',
  chipBorder: '#5C433B',
  tint: '#211714',
  accentText: '#FF9A74'
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
  'repeating-linear-gradient(135deg, #F7DDD3 0 14px, #FBE8E0 14px 28px)';

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
  ['display',   'serif', 700, 40, 88, 1.02, '-0.02em',  'Hero headline, case study title, contact CTA'],
  ['h1',        'serif', 700, 34, 56, 1.05, '-0.015em', 'Home page section headings'],
  ['h2',        'serif', 700, 28, 44, 1.1,  '-0.01em',  'Case study section headings'],
  ['h3',        'serif', 700, 24, 34, 1.15, '-0.01em',  'Work card titles, sub-section headings'],
  ['h4',        'serif', 700, 22, 26, 1.2,  '-0.01em',  'Company names, decision titles, about cards'],
  ['h5',        'serif', 700, 20, 20, 1.2,  '-0.005em', 'Nav wordmark'],
  ['h6',        'serif', 700, 17, 17, 1.3,  '0',        'Small serif heading (spare)'],
  ['stat',      'serif', 700, 44, 56, 1,    '-0.015em', 'Big numbers: stats band, results'],
  ['statSm',    'serif', 700, 30, 36, 1.05, '-0.01em',  'Inline metrics, decision numbers'],
  ['quote',     'serif', 500, 22, 32, 1.3,  '-0.01em',  'Reflection / pull quote'],
  ['subtitle1', 'sans',  400, 18, 22, 1.45, '0',        'Lead paragraph under a title'],
  ['subtitle2', 'sans',  600, 17, 17, 1.4,  '0',        'Emphasized values (Role, Client, Year)'],
  ['body1',     'sans',  400, 17, 17, 1.6,  '0',        'Default body copy'],
  ['body2',     'sans',  400, 15, 15, 1.55, '0',        'Card details, stat captions, small copy'],
  ['button',    'sans',  600, 16, 16, 1.25, '0',        'Buttons'],
  ['overline',  'mono',  400, 13, 13, 1.4,  '0.08em',   'Section eyebrows ("Selected work / 01")'],
  ['label',     'mono',  500, 13, 13, 1.4,  '0.06em',   'Nav links, on-this-page links'],
  ['caption',   'mono',  400, 12, 12, 1.4,  '0.06em',   'Field labels, chips, figure captions'],
  ['mono',      'mono',  400, 13, 13, 1.5,  '0',        'Dates, index numbers, footer']
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
