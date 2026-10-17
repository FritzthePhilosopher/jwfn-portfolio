import { useEffect, useRef, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { colors, ramp } from '../theme.js';
import { Container, Label, SiteNav, SiteFooter, displaySx, fieldLabel } from '../components/Shared.jsx';

// Type specimen. Not linked from the nav: visit /type.

const samples = {
  display: 'I design enterprise products.',
  h1: "Things I've shipped.",
  h2: 'Three choices that shaped it.',
  h3: 'I helped lead the redesign of dealer registration.',
  h4: 'CarMax Auctions',
  h5: 'Justin Neely',
  h6: 'Small serif heading',
  stat: '15+',
  statSm: '25 → 6',
  quote: 'The constraint that looked like a limit became the brief.',
  subtitle1: 'Fifteen-plus years of enterprise B2B design across Barclays, American Airlines, and CarMax.',
  subtitle2: 'Product Designer II',
  body1: 'Dealers needed a faster way to register. The old flow asked for the same documents three times, and support tickets showed where people gave up.',
  body2: 'Problem: the site lacked direction, so parents and students had trouble identifying their next steps.',
  button: 'Read the case study →',
  overline: 'Selected work / 01',
  label: 'Work   About   Contact',
  caption: 'Role · Client · Year',
  mono: 'Feb 2022 to Sep 2026'
};

const familyName = { serif: 'IBM Plex Serif', sans: 'Instrument Sans', mono: 'JetBrains Mono' };

function LiveSize({ target }) {
  const [px, setPx] = useState('');
  useEffect(() => {
    const read = () => target.current && setPx(parseFloat(getComputedStyle(target.current).fontSize).toFixed(1));
    read();
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
  }, [target]);
  return <span>{px}px now</span>;
}

function Row({ r }) {
  const ref = useRef(null);
  const size = r.min === r.max ? `${r.min}px` : `${r.min} → ${r.max}px`;
  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px 48px', py: 4, alignItems: 'baseline' }}>
        <Box sx={{ flex: '0 0 220px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Box sx={{ typography: 'mono', color: colors.accentText }}>{r.token}</Box>
          <Box sx={{ ...fieldLabel, textTransform: 'none', letterSpacing: 0 }}>
            {familyName[r.family]} {r.weight}<br />
            {size} / {r.lineHeight}
            {r.letterSpacing !== '0' && <> / {r.letterSpacing}</>}
            {r.uppercase && <> / caps</>}<br />
            <LiveSize target={ref} />
          </Box>
        </Box>
        <Box sx={{ flex: '1 1 480px', minWidth: 0 }}>
          <Box ref={ref} sx={{ typography: r.token, color: colors.ink, overflowWrap: 'anywhere' }}>{samples[r.token]}</Box>
          <Box sx={{ typography: 'body2', color: colors.muted, mt: 1.5 }}>{r.role}</Box>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}

const groups = [
  ['Headings', ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']],
  ['Numbers and quotes', ['stat', 'statSm', 'quote']],
  ['Text', ['subtitle1', 'subtitle2', 'body1', 'body2', 'button']],
  ['Labels', ['overline', 'label', 'caption', 'mono']]
];

export default function TypeRamp() {
  return (
    <Box sx={{ width: '100%', bgcolor: '#fff', color: colors.ink, typography: 'body1' }}>
      <SiteNav />
      <Container sx={{ pt: 'clamp(48px, 7vw, 88px)' }}>
        <Label>Design system / Type</Label>
        <Box component="h1" sx={{ ...displaySx, mt: 2 }}>Type ramp.</Box>
        <Box component="p" sx={{ mt: 3, mb: 0, maxWidth: 720, typography: 'subtitle1', color: colors.body }}>
          Three families, nineteen styles. Fluid sizes scale from a 375px phone to the 1200px container. Resize the window to watch the live sizes change.
        </Box>
      </Container>
      {groups.map(([title, tokens]) => (
        <Container key={title} sx={{ pt: 'clamp(40px, 6vw, 72px)' }}>
          <Label>{title}</Label>
          <Divider sx={{ mt: 2, borderColor: colors.ink, borderBottomWidth: '1.5px' }} />
          {tokens.map((t) => <Row key={t} r={ramp.find((r) => r.token === t)} />)}
        </Container>
      ))}
      <Container sx={{ pt: 8, pb: 5 }}>
        <SiteFooter />
      </Container>
    </Box>
  );
}
