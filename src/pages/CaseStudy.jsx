import { Box, Button, Chip, Divider, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams, Navigate } from 'react-router-dom';
import RichCaseStudy from './RichCaseStudy.jsx';
import { colors } from '../theme.js';
import { Container, Label, Placeholder, SiteNav, SiteFooter, h2CaseSx, displaySx, fieldLabel, monoChipSx, navBtnSx, monoLabel } from '../components/Shared.jsx';

const sectionTop = 'clamp(48px, 7vw, 88px)';
const h2Case = h2CaseSx;

// All case study copy lives in public/content/<slug>.json, never in this file,
// so it stays behind the password.
const toc = [['call', 'The call'], ['context', 'Context'], ['decisions', 'Decisions'], ['results', 'Results'], ['reflection', 'Reflection']];

// Content is fetched from /content/<slug>.json, which Vercel only serves after
// the password is entered (see middleware.js). A locked response sends the
// visitor to /unlock and back here afterwards.
function useStudy(slug) {
  const [state, setState] = useState({ status: 'loading' });
  useEffect(() => {
    let live = true;
    setState({ status: 'loading' });
    fetch(`/content/${slug}.json`, { credentials: 'same-origin', cache: 'no-store' })
      .then(async (res) => {
        if (res.status === 401) return { status: 'locked' };
        const type = res.headers.get('content-type') || '';
        if (!res.ok || !type.includes('json')) return { status: 'missing' };
        return { status: 'ready', s: await res.json() };
      })
      .catch(() => ({ status: 'missing' }))
      .then((next) => live && setState(next));
    return () => { live = false; };
  }, [slug]);
  return state;
}

export default function CaseStudy() {
  const { slug } = useParams();
  const study = useStudy(slug);
  if (study.status === 'locked') return <Navigate to={`/unlock?next=${encodeURIComponent('/work/' + slug)}`} replace />;
  if (study.status === 'missing') return <Navigate to="/" replace />;
  if (study.status === 'loading') return <Box sx={{ minHeight: '100vh', bgcolor: colors.bg }}><SiteNav /></Box>;
  const s = study.s;
  if (s.sections) return <RichCaseStudy s={s} />;
  return (
    <Box sx={{ width: '100%', bgcolor: colors.bg, color: colors.ink, typography: 'body1' }}>
      <SiteNav />

      {/* HEADER */}
      <Container sx={{ pt: 'clamp(24px, 4vw, 40px)' }}>
        <Button component={RouterLink} to="/#work" color="inherit" sx={{ ...navBtnSx, color: colors.muted, ml: -1 }}>← Work index</Button>
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {(s.tags || [s.client, s.year]).map((t) => (
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
          {s.subtitle}
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
                ['Problem', s.problem],
                ['Contribution', s.contribution],
                ['Outcome', s.outcome]
              ].map(([k, v]) => (
                <Box key={k} sx={{ flex: '1 1 240px' }}>
                  <Box sx={{ ...fieldLabel, mb: '6px' }}>{k}</Box>
                  {v}
                </Box>
              ))}
              <Box sx={{ flex: '1 1 240px' }}>
                <Box sx={{ ...fieldLabel, mb: '6px' }}>Metric</Box>
                <Box component="span" sx={{ typography: 'statSm' }}>{s.metric}</Box>
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
          {s.callHeading}
        </Box>
        <Box component="p" sx={{ mt: 3, mb: 0, maxWidth: 680, color: colors.body }}>
          {s.callBody}
        </Box>
      </Container>

      {/* CONTEXT */}
      <Container id="context" sx={{ pt: sectionTop }}>
        <Label>Context</Label>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '32px 48px', mt: 2 }}>
          <Box sx={{ flex: '1 1 420px' }}>
            <Box component="h2" sx={{ m: 0, mb: 2, typography: 'h3' }}>Who it was for.</Box>
            <Box component="p" sx={{ m: 0, mb: 2, color: colors.body }}>{s.contextOne}</Box>
            <Box component="p" sx={{ m: 0, color: colors.body }}>{s.contextTwo}</Box>
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
          {s.decisions.map(({ n, title, body }) => (
            <Box key={n}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px 32px', py: '28px' }}>
                <Box sx={{ flex: '0 0 64px', typography: 'statSm', color: colors.accentText }}>{n}</Box>
                <Box sx={{ flex: '1 1 360px' }}>
                  <Box component="h3" sx={{ m: 0, mb: 1, typography: 'h4' }}>{title}</Box>
                  <Box component="p" sx={{ m: 0, color: colors.body }}>{body}</Box>
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
          <Box component="h2" sx={{ ...h2Case, mt: 1.5 }}>{s.resultsHeading}</Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 5 }}>
            {s.results.map(({ value: r, text }) => (
              <Paper key={r} variant="outlined" sx={{ flex: '1 1 240px', p: 3, bgcolor: 'transparent', color: colors.ink, borderColor: colors.bandBorder }}>
                <Box sx={{ typography: 'stat', color: colors.accentOnBand }}>{r}</Box>
                <Box sx={{ mt: '10px', color: colors.onBand, typography: 'body2' }}>{text}</Box>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* REFLECTION */}
      <Container id="reflection" sx={{ pt: sectionTop }}>
        <Label>What I took from it</Label>
        <Box component="p" sx={{ mt: 2, mb: 0, maxWidth: 820, typography: 'quote' }}>
          {s.reflection}
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
        <SiteFooter sx={{ mt: 'clamp(64px, 8vw, 112px)' }} />
      </Container>
    </Box>
  );
}
