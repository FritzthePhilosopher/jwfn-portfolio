import { Box, Button, Card, CardActions, Chip, Divider, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '../theme.js';
import { cards } from './cards.js';
import { PUBLIC_CASE_STUDIES } from '../../lib/public-case-studies.js';
import { Container, Label, Placeholder, SiteNav, SiteFooter, h2Sx, displaySx, fieldLabel, monoChipSx } from '../components/Shared.jsx';

const cardPad = 'clamp(16px, 3vw, 32px)';
const sectionTop = 'clamp(56px, 8vw, 104px)';

const stats = [
  ['15+', 'Years designing enterprise B2B software'],
  ['2', 'Teams: one agency, Truelio (formerly Dynamic Marketing Systems), and one enterprise, CarMax'],
  ['4y 3m', 'Full-time on CarMax Auctions, after six months as a contractor']
];

const work = [
  {
    n: '01',
    tags: ['CarMax Auctions', 'Product design', '2026'],
    title: "I designed the damage detail card that shows dealers a vehicle's true condition.",
    problem: 'Damage photos were too small and scattered for dealers to judge before bidding.',
    outcome: 'Vertically scrolling damage cards with a large, highlighted photo and a clear label.',
    metric: '94% preferred the new layout (n=50)',
    to: '/work/damage-detail-card'
  },
  {
    n: '02',
    tags: ['CarMax Auctions', 'Product design', '2025'],
    title: 'I helped lead the redesign of how dealers register with CarMax Auctions.',
    problem: 'The registration process was long and a bit confusing for customers, and we wanted to cut the time and effort it took.',
    outcome: 'Fewer pages and less confusion about registration status, which means quicker access to more inventory.',
    metric: 'Reduced registration time by nearly 40%',
    to: '/work/dealer-registration'
  },
  {
    n: '03',
    tags: ['Truelio', 'UX', '2021–2022'],
    title: 'I designed an app that let flight attendants track card sign-ups and incentives.',
    problem: 'Flight attendants could only check their card applications on a web portal.',
    outcome: 'A mobile app that puts application status and projected earnings first.',
    metric: 'Currently live',
    cover: {
      src: '/images/aadvantage-cash/cover.jpg',
      alt: 'AAdvantage Cash app home screen greeting Joy, with $425 in projected April earnings and 13 applications received and 8 approved, beside a qualification status screen'
    },
    to: '/work/aadvantage-cash'
  }
];

// Hidden for now: 'heal-thy', 'ohto'. Add them back to this list to show their cards again.
const extra = ['life-school'].map((k, i) => {
  const c = cards[k];
  return { n: '0' + (4 + i), tags: c.tags, title: c.title, problem: c.problem, outcome: c.outcome, metric: c.metric, cover: c.cover, to: '/work/' + k };
});
work.push(...extra);

const labs = [1, 2];
const SHOW_CLAUDE = false;

const jobs = [
  ['CarMax', 'Product Designer II, CarMax Auctions. Earlier, contract Product Designer.', 'Feb 2022 to Sep 2026'],
  ['Dynamic Marketing Systems (now Truelio)', 'UX Designer (Nov 2019 to Jan 2022): mobile products for American Airlines, JetBlue and Frontier Airlines, plus tools for flight attendants to track incentives, set goals and monitor progress. Earlier Sr. Digital Designer (web and print design files, HTML email design and development), HTML Email Developer (weekly and recurring emails, airline site maintenance), and Graphic Designer, where I started in 2012.', '2012 to Jan 2022'],
];

const about = [
  ['Agency first.', 'I started at Dynamic Marketing Systems (now Truelio), a digital marketing agency, where I did my Barclays and American Airlines work, then moved in-house to product design.'],
  ['Atlanta.', 'Home for more than a decade.']
];


export default function Home() {
  return (
    <Box sx={{ width: '100%', bgcolor: '#fff', color: colors.ink, typography: 'body1' }}>
      <SiteNav />

      {/* HERO */}
      <Container id="top" sx={{ pt: 'clamp(48px, 9vw, 112px)', pb: 'clamp(40px, 6vw, 72px)' }}>
        <Label sx={{ mb: '28px' }}>Product designer / Atlanta, GA</Label>
        <Box
          component="h1"
          sx={{ ...displaySx, maxWidth: 1040 }}
        >
          I turn complex systems into products people can actually use.
        </Box>
        <Box component="p" sx={{ mt: 4, mb: 0, maxWidth: 700, typography: 'subtitle1', color: colors.body, textWrap: 'pretty' }}>
          Justin Neely. 15+ years in enterprise B2B design, with experience at Truelio (formerly Dynamic Marketing Systems) and CarMax.{' '}
          {/* Desktop: the tagline gets its own line. Phones wrap naturally. */}
          <Box component="br" sx={{ display: { xs: 'none', md: 'inline' } }} />
          Left-handed by nature. Designer by profession. Human by{'\u00A0'}default.
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', mt: 5 }}>
          <Button variant="contained" size="large" href="#work">See selected work ↓</Button>
          <Button variant="outlined" color="inherit" size="large" href="#contact">Get in touch</Button>
        </Box>
        <Box sx={{ mt: 'clamp(48px, 7vw, 88px)', pt: 3, borderTop: `1px solid ${colors.border}` }}>
          <Label sx={{ mb: 1 }}>Right now</Label>
          <Chip
            variant="outlined"
            label="Open to senior and lead product design roles"
            sx={{ typography: 'mono', height: 36, borderRadius: 0, color: colors.ink, borderColor: colors.band, bgcolor: 'rgba(255,255,255,0.4)' }}
          />
        </Box>
      </Container>

      {/* STATS */}
      <Box sx={{ bgcolor: colors.band }}>
        <Container sx={{ py: 5, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {stats.map(([n, l]) => (
            <Paper key={n} variant="outlined" sx={{ flex: '1 1 240px', p: 3, bgcolor: '#fff', borderColor: colors.border }}>
              <Box sx={{ typography: 'stat' }}>{n}</Box>
              <Box sx={{ mt: 1, typography: 'body2', color: colors.body }}>{l}</Box>
            </Paper>
          ))}
        </Container>
      </Box>

      {/* SELECTED WORK */}
      <Container id="work" sx={{ pt: sectionTop }}>
        <Label>Selected work / 01</Label>
        <Box component="h2" sx={{ ...h2Sx, mt: 1.5, mb: 5 }}>Things I've shipped.</Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {work.map((w) => (
            <Card key={w.n} variant="outlined" sx={{ bgcolor: colors.tint, borderColor: colors.ink, borderWidth: '1.5px', borderRadius: 0 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, p: cardPad }}>
                {w.cover ? (
                  <Box component="img" src={w.cover.src} alt={w.cover.alt} loading="lazy" sx={{ flex: '1 1 440px', minWidth: 0, width: '100%', maxHeight: 360, objectFit: 'cover', objectPosition: 'top', border: `1px solid ${colors.border}`, bgcolor: '#fff' }} />
                ) : (
                  <Placeholder label="[Cover image or prototype video]" sx={{ flex: '1 1 440px', minHeight: 320 }} />
                )}
                <Box sx={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ typography: 'mono', color: colors.accentText }}>{w.n}</Box>
                    {w.tags.map((t, i) => (
                      <Chip key={i} size="small" variant="outlined" label={t} sx={monoChipSx} />
                    ))}
                  </Box>
                  <Box component="h3" sx={{ m: 0, typography: 'h4' }}>{w.title}</Box>
                  <Divider />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', typography: 'body2' }}>
                    <div><Box component="span" sx={fieldLabel}>Problem </Box>{w.problem || '[One sentence: what was broken, and for whom]'}</div>
                    <div><Box component="span" sx={fieldLabel}>Outcome </Box>{w.outcome || '[One sentence: what changed]'}</div>
                    <div><Box component="span" sx={fieldLabel}>Metric </Box>{w.metric || '[KEY NUMBER]'}</div>
                  </Box>
                </Box>
              </Box>
              <CardActions sx={{ px: cardPad, pb: cardPad, pt: 0, gap: 2, flexWrap: 'wrap' }}>
                {w.to ? (
                  <>
                    <Button variant="contained" component={RouterLink} to={w.to}>Read the case study →</Button>
                    {!PUBLIC_CASE_STUDIES.includes(w.to.replace('/work/', '')) && (
                      <Box component="span" sx={{ typography: 'caption', color: colors.muted, ml: '0 !important' }}>Password required</Box>
                    )}
                  </>
                ) : (
                  <Button variant="outlined" color="inherit" disabled>[ADD CASE STUDY LINK]</Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>

      {/* BUILT WITH CLAUDE (hidden for now: set SHOW_CLAUDE = true to restore) */}
      {SHOW_CLAUDE && <Box id="claude" sx={{ bgcolor: colors.band, color: colors.ink, mt: 'clamp(64px, 9vw, 120px)' }}>
        <Container sx={{ py: sectionTop }}>
          <Label sx={{ color: colors.ink }}>Labs / 02</Label>
          <Box component="h2" sx={{ ...h2Sx, mt: 1.5, maxWidth: 820 }}>I design and prototype with Claude.</Box>
          <Box component="p" sx={{ mt: '20px', mb: 0, maxWidth: 640, color: colors.ink }}>
            [One or two sentences: what you build with Claude, and the judgment you bring to it.]
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mt: 4 }}>
            <Chip variant="outlined" label="Claude" sx={{ typography: 'mono', height: 36, color: colors.ink, borderColor: colors.ink }} />
            <Chip variant="outlined" label="Claude Design" sx={{ typography: 'mono', height: 36, color: colors.ink, borderColor: colors.ink }} />
            {[0, 1].map((i) => (
              <Chip key={i} variant="outlined" label="[YOUR TOOL]" sx={{ typography: 'mono', height: 36, color: colors.ink, borderColor: colors.ink, borderStyle: 'dashed' }} />
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 6 }}>
            {labs.map((n) => (
              <Card key={n} variant="outlined" sx={{ flex: '1 1 380px', bgcolor: 'transparent', color: colors.ink, borderColor: colors.ink, borderRadius: 0 }}>
                <Box sx={{ p: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', typography: 'caption', color: colors.ink }}>
                    <span>Lab 0{n}</span>
                    <Chip size="small" variant="outlined" label="[Live / Prototype]" sx={{ typography: 'caption', color: colors.ink, borderColor: colors.ink }} />
                  </Box>
                  <Box component="h3" sx={{ m: 0, typography: 'h4' }}>[Project name]</Box>
                  <Box component="p" sx={{ m: 0, color: colors.ink, typography: 'body2' }}>[One line: what it is, what Claude did, and what you decided.]</Box>
                  <Box sx={{ typography: 'mono', color: colors.ink }}>[Stack] / [URL] ↗</Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>}

      {/* PREVIOUSLY */}
      <Box sx={{ bgcolor: colors.band, color: colors.ink, mt: 'clamp(64px, 9vw, 120px)' }}>
      <Container sx={{ py: sectionTop }}>
        <Label sx={{ color: colors.ink }}>Previously / 03</Label>
        <Box component="h2" sx={{ ...h2Sx, mt: 1.5 }}>Where I've done the work.</Box>
        <Box sx={{ mt: 5 }}>
          <Divider sx={{ borderColor: colors.ink, borderBottomWidth: '1.5px' }} />
          {jobs.map(([co, role, yrs]) => (
            <Box key={co}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px 24px', py: '22px' }}>
                <Box sx={{ typography: 'h4' }}>{co}</Box>
                <Box sx={{ flex: '1 1 320px', color: colors.ink }}>{role}</Box>
                <Box sx={{ typography: 'mono', color: colors.ink }}>{yrs}</Box>
              </Box>
              <Divider sx={{ borderColor: colors.bandBorder }} />
            </Box>
          ))}
        </Box>
      </Container>
      </Box>

      {/* ABOUT */}
      <Container id="about" sx={{ pt: sectionTop }}>
        <Label>About / 04</Label>
        <Box component="h2" sx={{ ...h2Sx, mt: 1.5 }}>A left-handed human being who happens to design.</Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 6 }}>
          {about.map(([h, p]) => (
            <Paper key={h} variant="outlined" sx={{ flex: '1 1 280px', p: 3, bgcolor: colors.tint, borderColor: colors.border }}>
              <Box component="h3" sx={{ m: 0, mb: '10px', typography: 'h4' }}>{h}</Box>
              <Box component="p" sx={{ m: 0, color: colors.body }}>{p}</Box>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* CONTACT + FOOTER */}
      <Container id="contact" sx={{ pt: sectionTop, pb: 5 }}>
        <Label>Contact / 05</Label>
        <Box component="h2" sx={{ ...h2Sx, mt: 1.5 }}>If you want to talk.</Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', mt: 4 }}>
          <Button variant="contained" size="large" href="mailto:justin@jwfn.design">Email me</Button>
          <Button variant="outlined" color="inherit" size="large" href="https://www.linkedin.com/in/jwfn/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</Button>
        </Box>
        <SiteFooter sx={{ mt: 9 }} />
      </Container>
    </Box>
  );
}
