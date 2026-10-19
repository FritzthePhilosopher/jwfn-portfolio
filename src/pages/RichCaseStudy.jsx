import { useState } from 'react';
import { Box, Button, Chip, Divider, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '../theme.js';
import { Container, Label, SiteNav, SiteFooter, h2CaseSx, displaySx, fieldLabel, monoChipSx, navBtnSx, monoLabel } from '../components/Shared.jsx';

const sectionTop = 'clamp(48px, 7vw, 88px)';
const h2Case = h2CaseSx;

function Figure({ img }) {
  const [failed, setFailed] = useState(false);
  if (!img || failed) return null;
  return (
    <Box component="figure" sx={{ m: 0, mt: 4 }}>
      <Box component="img" src={img.src} alt={img.alt} loading="lazy" onError={() => setFailed(true)} sx={{ display: 'block', width: '100%', height: 'auto', border: `1px solid ${colors.border}`, bgcolor: '#fff' }} />
      {img.caption && <Box component="figcaption" sx={{ ...fieldLabel, mt: 1 }}>{img.caption}</Box>}
    </Box>
  );
}

export default function RichCaseStudy({ s }) {
  return (
    <Box sx={{ width: '100%', bgcolor: '#fff', color: colors.ink, typography: 'body1' }}>
      <SiteNav />

      <Container sx={{ pt: 'clamp(24px, 4vw, 40px)' }}>
        <Button component={RouterLink} to="/#work" color="inherit" sx={{ ...navBtnSx, color: colors.muted, ml: -1 }}>← Work index</Button>
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {s.tags.map((t) => <Chip key={t} size="small" variant="outlined" label={t} sx={monoChipSx} />)}
        </Box>
        <Box component="h1" sx={{ ...displaySx, mt: '20px' }}>
          {s.title}
        </Box>
        <Box component="p" sx={{ mt: 3, mb: 0, maxWidth: 720, typography: 'subtitle1', color: colors.body }}>{s.subtitle}</Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px 64px', mt: 5, pt: '20px' }}>
          <Box sx={{ width: '100%' }}><Divider /></Box>
          {[['Role', s.role], ['Client', s.client], ['Year', s.year]].map(([k, v]) => (
            <div key={k}><Box sx={fieldLabel}>{k}</Box><Box sx={{ typography: 'subtitle2' }}>{v}</Box></div>
          ))}
          {s.links.map(([label, href]) => (
            <div key={label}><Box sx={fieldLabel}>{label}</Box><Box component="a" href={href} target="_blank" rel="noopener noreferrer" sx={{ typography: 'subtitle2', color: colors.accentText }}>{href.replace(/^https?:\/\/(www\.)?/, '')} ↗</Box></div>
          ))}
        </Box>
      </Container>

      <Container sx={{ pt: 'clamp(32px, 5vw, 56px)' }}>
        <Paper variant="outlined" sx={{ p: 'clamp(24px, 4vw, 40px)', bgcolor: colors.tint, borderColor: colors.ink, borderWidth: '1.5px' }}>
          <Label sx={{ color: colors.accentText, mb: 3 }}>At a glance</Label>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '28px 40px' }}>
            {Object.entries(s.glance).map(([k, v]) => (
              <Box key={k} sx={{ flex: '1 1 240px' }}>
                <Box sx={{ ...fieldLabel, mb: '6px' }}>{k}</Box>
                {k === 'Metric' ? <Box component="span" sx={{ typography: 'statSm' }}>{v}</Box> : v}
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>

      <Container sx={{ pt: 4 }}><Figure img={s.hero} /></Container>

      <Container sx={{ pt: 5 }}>
        <Divider />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 12px', py: '6px' }}>
          <Box component="span" sx={{ ...monoLabel, mr: '12px' }}>On this page</Box>
          {s.sections.map((x) => <Button key={x.id} href={`#${x.id}`} color="inherit" sx={navBtnSx}>{x.label}</Button>)}
          {s.results && <Button href="#results" color="inherit" sx={navBtnSx}>Results</Button>}
          {s.nextSteps && <Button href="#next" color="inherit" sx={navBtnSx}>Next steps</Button>}
        </Box>
        <Divider />
      </Container>

      {s.sections.map((x) => (
        <Container key={x.id} id={x.id} sx={{ pt: sectionTop }}>
          <Label>{x.label}</Label>
          <Box component="h2" sx={{ ...h2Case, mt: 1.5, maxWidth: 900 }}>{x.heading}</Box>
          <Box sx={{ maxWidth: 760 }}>
            {(x.paras || []).map((p, i) => <Box key={i} component="p" sx={{ mt: 3, mb: 0, color: colors.body }}>{p}</Box>)}
            {x.bullets && (
              <Box component="ul" sx={{ mt: 3, mb: 0, pl: 3, color: colors.body, '& li': { mb: 1 } }}>
                {x.bullets.map((b) => <li key={b}>{b}</li>)}
              </Box>
            )}
            {x.quotes && (
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {x.quotes.map((q) => (
                  <Box key={q} component="blockquote" sx={{ m: 0, pl: 3, borderLeft: `3px solid ${colors.accent}`, typography: 'subtitle1', color: colors.ink }}>
                    “{q}”
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Figure img={x.image} />
          <Figure img={x.image2} />
        </Container>
      ))}

      {s.results && (
        <Box id="results" sx={{ bgcolor: colors.band, color: colors.ink, mt: 'clamp(56px, 8vw, 104px)' }}>
          <Container sx={{ py: sectionTop }}>
            <Label sx={{ color: colors.onBandMuted }}>Results</Label>
            <Box component="h2" sx={{ ...h2Case, mt: 1.5 }}>{s.resultsHeading || 'What changed.'}</Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 5 }}>
              {s.results.map(([big, text]) => (
                <Paper key={big} variant="outlined" sx={{ flex: '1 1 240px', p: 3, bgcolor: 'transparent', color: colors.ink, borderColor: colors.bandBorder }}>
                  <Box sx={{ typography: 'stat', color: colors.accentOnBand }}>{big}</Box>
                  <Box sx={{ mt: '10px', color: colors.onBand, typography: 'body2' }}>{text}</Box>
                </Paper>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {s.nextSteps && (
        <Container id="next" sx={{ pt: sectionTop }}>
          <Label>Next steps</Label>
          <Box component="h2" sx={{ ...h2Case, mt: 1.5 }}>What I'd do next.</Box>
          <Box component="ul" sx={{ mt: 3, mb: 0, pl: 3, maxWidth: 760, color: colors.body, '& li': { mb: 1 } }}>
            {s.nextSteps.map((b) => <li key={b}>{b}</li>)}
          </Box>
        </Container>
      )}

      <Container sx={{ pt: 'clamp(56px, 8vw, 96px)', pb: 5 }}>
        <Divider sx={{ borderColor: colors.ink, borderBottomWidth: '1.5px' }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px 32px', py: '20px' }}>
          <Button component={RouterLink} to={s.prev.to} color="inherit" size="large">{s.prev.label}</Button>
          <Button component={RouterLink} to={s.next.to} variant="contained" size="large">{s.next.label}</Button>
        </Box>
        <Divider />
        <SiteFooter sx={{ mt: 3 }} />
      </Container>
    </Box>
  );
}
