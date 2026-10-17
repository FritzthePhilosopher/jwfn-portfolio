import { Box, Button, Chip, Divider, Paper } from '@mui/material';
import { Link as RouterLink, useParams, Navigate } from 'react-router-dom';
import { studies } from './studies.js';
import RichCaseStudy from './RichCaseStudy.jsx';
import { colors } from '../theme.js';
import { Container, Label, Placeholder, SiteNav, SiteFooter, h2CaseSx, displaySx, fieldLabel, monoChipSx, navBtnSx, monoLabel } from '../components/Shared.jsx';

const sectionTop = 'clamp(48px, 7vw, 88px)';
const h2Case = h2CaseSx;

const decisions = [
  ['01', '[Decision 1, stated as a choice]'],
  ['02', '[Decision 2, stated as a choice]'],
  ['03', '[Decision 3, stated as a choice]']
];

const results = ['[00%]', '[00]', '[00x]'];

const toc = [['call', 'The call'], ['context', 'Context'], ['decisions', 'Decisions'], ['results', 'Results'], ['reflection', 'Reflection']];

export default function CaseStudy() {
  const { slug } = useParams();
  const s = studies[slug];
  if (!s) return <Navigate to="/" replace />;
  if (s.sections) return <RichCaseStudy s={s} />;
  return (
    <Box sx={{ width: '100%', bgcolor: '#fff', color: colors.ink, typography: 'body1' }}>
      <SiteNav />

      {/* HEADER */}
      <Container sx={{ pt: 'clamp(24px, 4vw, 40px)' }}>
        <Button component={RouterLink} to="/#work" color="inherit" sx={{ ...navBtnSx, color: colors.muted, ml: -1 }}>← Work index</Button>
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {[s.client, 'UX', 'Product', s.year].map((t) => (
            <Chip key={t} size="small" variant="outlined" label={t} sx={monoChipSx} />
          ))}
        </Box>
        <Box
          component="h1"
          sx={{ ...displaySx, mt: '20px' }}
        >
          {s.title}
        </Box>
        <Box component="p" sx={{ mt: 3, mb: 0, maxWidth: 720, typography: 'subtitle1', color: colors.body }}>
          [One sentence: the redesigned experience, who it serves, and the constraint that shaped it.]
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px 64px', mt: 5, pt: '20px' }}>
          <Box sx={{ width: '100%' }}><Divider /></Box>
          {[['Role', s.role], ['Client', s.client], ['Year', s.year]].map(([k, v]) => (
            <div key={k}>
              <Box sx={fieldLabel}>{k}</Box>
              <Box sx={{ typography: 'subtitle2' }}>{v}</Box>
            </div>
          ))}
        </Box>
      </Container>

      {/* AT A GLANCE */}
      <Container sx={{ pt: 'clamp(32px, 5vw, 56px)' }}>
        <Paper variant="outlined" sx={{ p: 'clamp(24px, 4vw, 40px)', bgcolor: colors.tint, borderColor: colors.ink, borderWidth: '1.5px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Label sx={{ color: colors.accentText }}>At a glance</Label>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '28px 40px' }}>
              {[
                ['Problem', '[What was broken, and for whom. One or two sentences.]'],
                ['Contribution', s.contribution],
                ['Outcome', '[What shipped, and what changed for dealers.]']
              ].map(([k, v]) => (
                <Box key={k} sx={{ flex: '1 1 240px' }}>
                  <Box sx={{ ...fieldLabel, mb: '6px' }}>{k}</Box>
                  {v}
                </Box>
              ))}
              <Box sx={{ flex: '1 1 240px' }}>
                <Box sx={{ ...fieldLabel, mb: '6px' }}>Metric</Box>
                <Box component="span" sx={{ typography: 'statSm' }}>[KEY NUMBER]</Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* COVER */}
      <Container sx={{ pt: 4 }}>
        <Placeholder label={s.heroLabel} sx={{ minHeight: 420 }} />
      </Container>

      {/* ON THIS PAGE */}
      <Container sx={{ pt: 5 }}>
        <Divider />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 12px', py: '6px' }}>
          <Box component="span" sx={{ ...monoLabel, mr: '12px' }}>On this page</Box>
          {toc.map(([id, label]) => (
            <Button key={id} href={`#${id}`} color="inherit" sx={navBtnSx}>{label}</Button>
          ))}
        </Box>
        <Divider />
      </Container>

      {/* THE CALL */}
      <Container id="call" sx={{ pt: sectionTop }}>
        <Label>The call</Label>
        <Box component="h2" sx={{ ...h2Case, mt: 1.5, maxWidth: 900 }}>
          [The tension in one line: "Ship the quick fix, or rebuild the flow right?"]
        </Box>
        <Box component="p" sx={{ mt: 3, mb: 0, maxWidth: 680, color: colors.body }}>
          [Two or three sentences: the constraint, the stakes, and the decision you faced. This is the paragraph a hiring manager reads first, so name the trade-off plainly.]
        </Box>
      </Container>

      {/* CONTEXT */}
      <Container id="context" sx={{ pt: sectionTop }}>
        <Label>Context</Label>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '32px 48px', mt: 2 }}>
          <Box sx={{ flex: '1 1 420px' }}>
            <Box component="h2" sx={{ m: 0, mb: 2, typography: 'h3' }}>Who it was for.</Box>
            <Box component="p" sx={{ m: 0, mb: 2, color: colors.body }}>{s.contextOne}</Box>
            <Box component="p" sx={{ m: 0, color: colors.body }}>[What the team knew going in: feedback, support volume, drop-off, or business goals.]</Box>
          </Box>
          <Placeholder label={s.beforeLabel} sx={{ flex: '1 1 420px', minHeight: 280 }} />
        </Box>
      </Container>

      {/* DECISIONS */}
      <Container id="decisions" sx={{ pt: sectionTop }}>
        <Label>Decisions</Label>
        <Box component="h2" sx={{ ...h2Case, mt: 1.5 }}>Three choices that shaped it.</Box>
        <Box sx={{ mt: 5 }}>
          <Divider sx={{ borderColor: colors.ink, borderBottomWidth: '1.5px' }} />
          {decisions.map(([n, title]) => (
            <Box key={n}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px 32px', py: '28px' }}>
                <Box sx={{ flex: '0 0 64px', typography: 'statSm', color: colors.accentText }}>{n}</Box>
                <Box sx={{ flex: '1 1 360px' }}>
                  <Box component="h3" sx={{ m: 0, mb: 1, typography: 'h4' }}>{title}</Box>
                  <Box component="p" sx={{ m: 0, color: colors.body }}>[What the options were, what you chose, and the evidence or constraint behind it.]</Box>
                </Box>
                <Placeholder sx={{ flex: '1 1 320px', minHeight: 180 }} />
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>
      </Container>

      {/* RESULTS */}
      <Box id="results" sx={{ bgcolor: colors.band, color: colors.ink, mt: 'clamp(56px, 8vw, 104px)' }}>
        <Container sx={{ py: sectionTop }}>
          <Label sx={{ color: colors.onBandMuted }}>Results</Label>
          <Box component="h2" sx={{ ...h2Case, mt: 1.5 }}>What changed after launch.</Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 5 }}>
            {results.map((r) => (
              <Paper key={r} variant="outlined" sx={{ flex: '1 1 240px', p: 3, bgcolor: 'transparent', color: colors.ink, borderColor: colors.bandBorder }}>
                <Box sx={{ typography: 'stat', color: colors.accentOnBand }}>{r}</Box>
                <Box sx={{ mt: '10px', color: colors.onBand, typography: 'body2' }}>[What this number measures, and the baseline it moved from.]</Box>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* REFLECTION */}
      <Container id="reflection" sx={{ pt: sectionTop }}>
        <Label>What I took from it</Label>
        <Box component="p" sx={{ mt: 2, mb: 0, maxWidth: 820, typography: 'quote' }}>
          [One reflective paragraph: the constraint that looked like a limit and became the brief, and what you would do next.]
        </Box>
      </Container>

      {/* PREV / NEXT + FOOTER */}
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
