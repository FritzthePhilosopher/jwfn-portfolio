import { useEffect } from 'react';
import { Box, Button, Divider } from '@mui/material';
import { colors } from '../theme.js';
import { Container, Label, SiteNav, SiteFooter, displaySx, monoChipSx } from '../components/Shared.jsx';
import { RESUME_PDF, jobs, education, skills } from './resume-data.js';

const sectionLabel = { typography: 'overline', color: colors.muted, mb: 2 };
const heavyRule = { borderColor: colors.ink, borderBottomWidth: '1.5px' };

export default function Resume() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Resume · Justin Neely, Product Designer';
    return () => { document.title = prev; };
  }, []);

  return (
    <Box sx={{ width: '100%', bgcolor: colors.bg, color: colors.ink, typography: 'body1' }}>
      <SiteNav />

      {/* HEADER */}
      <Container sx={{ pt: 'clamp(48px, 8vw, 96px)' }}>
        <Label>Resume</Label>
        <Box component="h1" sx={{ ...displaySx, mt: '20px' }}>Justin Neely.</Box>
        <Box component="p" sx={{ mt: 3, mb: 0, maxWidth: 720, typography: 'subtitle1', color: colors.body }}>
          Product designer in Atlanta. 15+ years in enterprise B2B design, with experience at Truelio (formerly Dynamic Marketing Systems) and CarMax.
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', mt: 5 }}>
          <Button variant="contained" size="large" href={RESUME_PDF} download="Justin-Neely-Resume.pdf">Download resume (PDF) ↓</Button>
          <Button variant="outlined" color="inherit" size="large" href="mailto:justin@jwfn.design">Email me</Button>
          <Button variant="outlined" color="inherit" size="large" href="https://www.linkedin.com/in/jwfn/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</Button>
        </Box>
      </Container>

      {/* BODY */}
      <Container sx={{ pt: 'clamp(48px, 7vw, 88px)' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '56px 64px', alignItems: 'flex-start' }}>
          {/* Experience */}
          <Box component="section" aria-labelledby="experience" sx={{ flex: '2 1 560px', minWidth: 0 }}>
            <Box component="h2" id="experience" sx={{ ...sectionLabel, m: 0, mb: 2 }}>Experience</Box>
            <Divider sx={heavyRule} />
            {jobs.map((j) => (
              <Box key={j.co}>
                <Box sx={{ py: '28px' }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '4px 24px' }}>
                    <Box component="h3" sx={{ m: 0, typography: 'h4' }}>{j.co}</Box>
                    <Box sx={{ typography: 'mono', color: colors.muted }}>{j.yrs}</Box>
                  </Box>
                  {j.roles.map((r) => (
                    <Box key={r.title} sx={{ mt: '22px' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px 16px' }}>
                        <Box component="h4" sx={{ m: 0, typography: 'subtitle2' }}>{r.title}</Box>
                        <Box sx={{ typography: 'mono', color: colors.accentText }}>{r.dates}</Box>
                      </Box>
                      {r.bullets.length > 0 && (
                        <Box component="ul" sx={{ m: 0, mt: 1, pl: '20px', maxWidth: 760, color: colors.body, '& li': { mb: '6px', textWrap: 'pretty' } }}>
                          {r.bullets.map((b) => <li key={b}>{b}</li>)}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* Education and skills */}
          <Box sx={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
            <Box component="section" aria-labelledby="education">
              <Box component="h2" id="education" sx={{ ...sectionLabel, m: 0, mb: 2 }}>Education</Box>
              <Divider sx={heavyRule} />
              {education.map(([school, program, dates]) => (
                <Box key={program}>
                  <Box sx={{ py: '18px' }}>
                    <Box component="h3" sx={{ m: 0, typography: 'subtitle2' }}>{school}</Box>
                    <Box sx={{ typography: 'body2', color: colors.body }}>{program}</Box>
                    <Box sx={{ typography: 'mono', color: colors.muted, mt: '4px' }}>{dates}</Box>
                  </Box>
                  <Divider />
                </Box>
              ))}
            </Box>
            <Box component="section" aria-labelledby="skills">
              <Box component="h2" id="skills" sx={{ ...sectionLabel, m: 0, mb: 2 }}>Core skills</Box>
              <Divider sx={{ ...heavyRule, mb: 2 }} />
              <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.map((k) => (
                  <Box component="li" key={k} sx={{ ...monoChipSx, color: colors.ink, border: `1px solid ${colors.border}`, bgcolor: colors.tint, px: 1, py: '4px' }}>{k}</Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* FOOTER */}
      <Container sx={{ pt: 'clamp(56px, 8vw, 96px)', pb: 5 }}>
        <Box sx={{ typography: 'body2', color: colors.muted }}>References available upon request.</Box>
        <SiteFooter sx={{ mt: 'clamp(64px, 8vw, 112px)' }} />
      </Container>
    </Box>
  );
}
