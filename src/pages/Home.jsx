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
    // Locked: the homepage shows only a blurred preview. The problem, outcome and
    // results live in the password-protected case study (public/content/damage-detail-card.json).
    locked: true,
    cover: {
      src: '/images/damage-detail-card/cover-locked.jpg',
      alt: 'Blurred preview of the damage assessment design'
    },
    to: '/work/damage-detail-card'
  },
  {
    n: '02',
    tags: ['CarMax Auctions', 'Product design', '2025'],
    title: 'I helped lead the redesign of how dealers register with CarMax Auctions.',
    problem: 'The registration process was long and a bit confusing for customers, and we wanted to cut the time and effort it took.',
    outcome: 'Fewer pages and less confusion about registration status, which means quicker access to more inventory.',
    metric: 'Reduced registration time by nearly 40%',
    to: '/work/dealer-registration',
    hidden: true // Hidden for now; set to false (or delete this line) to show it again.
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

// Drop hidden projects and number the rest in order (01, 02, 03...).
const shownWork = work.filter((w) => !w.hidden).map((w, i) => ({ ...w, n: String(i + 1).padStart(2, '0') }));

const labs = [1, 2];
const SHOW_CLAUDE = false;

// Resume content, from Justin-Neely-Resume.pdf. Keep the two in sync.
const RESUME_PDF = '/Justin-Neely-Resume.pdf';

const jobs = [
  {
    co: 'CarMax',
    yrs: 'Feb 2022 to Sep 2026',
    roles: [
      {
        title: 'Product Designer II',
        dates: 'July 2022 to Sept 2026',
        bullets: [
          'Helped lead the refresh and redesign of the CarMax Auctions dealer registration experience, owning research, discovery, and design, and cut the time it takes to become an active dealer',
          'Designed the damage assessment detail card for auction customers, giving dealers a clearer read on vehicle condition before they bid; validated through research, with 94% of 50 surveyed dealers preferring the final direction',
          'Designed navigation and vehicle detail experiences for CarMax Auctions in partnership with the core product team',
          'Partnered with stakeholders across multiple product teams to align on priorities and ship work grounded in dealer needs'
        ]
      },
      {
        title: 'Contract Product Designer',
        dates: 'Feb 2022 to July 2022',
        bullets: [
          'Identified user pain points and designed email campaigns guided by product principles',
          'Partnered with stakeholders on solutions that built trust and transparency with customers',
          "Helped drive the design team's adoption of Figma within the first few months"
        ]
      }
    ]
  },
  {
    co: 'Dynamic Marketing Systems (now Truelio)',
    yrs: '2012 to Jan 2022',
    roles: [
      {
        title: 'UX Designer',
        dates: 'Nov 2019 to Jan 2022',
        bullets: [
          'Worked on mobile products for multiple airlines, including American Airlines, JetBlue, and Frontier Airlines',
          'Designed a tool for flight attendants to track incentives, set goals, and monitor progress during their tenure in the program'
        ]
      },
      {
        title: 'Sr. Digital Designer',
        dates: 'Nov 2017 to Nov 2019',
        bullets: ['Created design files for both web and print', 'Led HTML email design and development for clients']
      },
      {
        title: 'HTML Email Developer',
        dates: 'Nov 2015 to Nov 2017',
        bullets: ['Developed weekly and recurring HTML emails', 'Provided site maintenance for several airlines']
      },
      { title: 'Graphic Designer', dates: 'Started 2012', bullets: [] }
    ]
  }
];

const education = [
  ['General Assembly', 'UX Design, Certificate', 'Nov 2017 to Feb 2018'],
  ['General Assembly', 'Front-End Web Development, Certificate', 'Nov 2015 to Feb 2016'],
  ['Art Institute of Atlanta', 'Graphic Design, BFA', 'Oct 2009 to Mar 2012']
];

const skills = ['Product Design', 'Figma', 'Paper', 'Prototyping', 'AI Workflow Integration', 'Discovery', 'Research', 'Webflow', 'FullStory', 'Optimal Workshop', 'Whiteboarding', 'Storyboarding', 'Adobe Creative Cloud', 'Conceptual Design', 'Sketch', 'MS Office', 'CSS, HTML'];


const about = [
  ['Agency first.', 'I started at Dynamic Marketing Systems (now Truelio), a digital marketing agency, where I did my Barclays and American Airlines work, then moved in-house to product design.'],
  ['Atlanta.', 'Home for more than a decade.']
];


function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <rect x="5" y="11" width="14" height="10" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

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
          {shownWork.map((w) => (
            <Card key={w.n} variant="outlined" sx={{ bgcolor: colors.tint, borderColor: colors.ink, borderWidth: '1.5px', borderRadius: 0 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, p: cardPad }}>
                {w.cover && w.locked ? (
                  <Box sx={{ flex: '1 1 440px', minWidth: 0, position: 'relative', maxHeight: 360, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
                    <Box component="img" src={w.cover.src} alt={w.cover.alt} loading="lazy" sx={{ display: 'block', width: '100%', height: '100%', maxHeight: 360, objectFit: 'cover' }} />
                    <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', px: 2, py: 1.25, bgcolor: '#fff', color: colors.ink, border: `1.5px solid ${colors.ink}`, typography: 'label' }}>
                        <LockIcon />
                        Password protected
                      </Box>
                    </Box>
                  </Box>
                ) : w.cover ? (
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
                  {w.locked ? (
                    <Box component="p" sx={{ m: 0, typography: 'body2', color: colors.body }}>
                      The problem, the process and the results for this project are behind the password. Enter it to read the full case study.
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', typography: 'body2' }}>
                      <div><Box component="span" sx={fieldLabel}>Problem </Box>{w.problem || '[One sentence: what was broken, and for whom]'}</div>
                      <div><Box component="span" sx={fieldLabel}>Outcome </Box>{w.outcome || '[One sentence: what changed]'}</div>
                      <div><Box component="span" sx={fieldLabel}>Metric </Box>{w.metric || '[KEY NUMBER]'}</div>
                    </Box>
                  )}
                </Box>
              </Box>
              <CardActions sx={{ px: cardPad, pb: cardPad, pt: 0, gap: 2, flexWrap: 'wrap' }}>
                {w.to ? (
                  <>
                    <Button variant="contained" component={RouterLink} to={w.to}>{w.locked ? 'Unlock the case study →' : 'Read the case study →'}</Button>
                    {!w.locked && !PUBLIC_CASE_STUDIES.includes(w.to.replace('/work/', '')) && (
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

      {/* RESUME */}
      <Box id="resume" sx={{ bgcolor: colors.band, color: colors.ink, mt: 'clamp(64px, 9vw, 120px)', scrollMarginTop: '72px' }}>
      <Container sx={{ py: sectionTop }}>
        <Label sx={{ color: colors.ink }}>Resume / 03</Label>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px 24px', mt: 1.5 }}>
          <Box component="h2" sx={{ ...h2Sx }}>Where I've done the work.</Box>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            href={RESUME_PDF}
            download="Justin-Neely-Resume.pdf"
            sx={{ bgcolor: '#fff', borderColor: colors.ink, '&:hover': { bgcolor: colors.tint, borderColor: colors.ink } }}
          >
            Download resume (PDF) ↓
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '48px 64px', mt: 5, alignItems: 'flex-start' }}>
          {/* Experience */}
          <Box sx={{ flex: '2 1 560px', minWidth: 0 }}>
            <Box sx={{ typography: 'overline', color: colors.ink, mb: 2 }}>Experience</Box>
            <Divider sx={{ borderColor: colors.ink, borderBottomWidth: '1.5px' }} />
            {jobs.map((j) => (
              <Box key={j.co}>
                <Box sx={{ py: '24px' }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '4px 24px' }}>
                    <Box component="h3" sx={{ m: 0, typography: 'h4' }}>{j.co}</Box>
                    <Box sx={{ typography: 'mono', color: colors.ink }}>{j.yrs}</Box>
                  </Box>
                  {j.roles.map((r) => (
                    <Box key={r.title} sx={{ mt: '20px' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px 16px' }}>
                        <Box component="h4" sx={{ m: 0, typography: 'subtitle2' }}>{r.title}</Box>
                        <Box sx={{ typography: 'mono', color: colors.onBandMuted }}>{r.dates}</Box>
                      </Box>
                      {r.bullets.length > 0 && (
                        <Box component="ul" sx={{ m: 0, mt: 1, pl: '20px', maxWidth: 760, color: colors.ink, '& li': { mb: '6px', textWrap: 'pretty' } }}>
                          {r.bullets.map((b) => <li key={b}>{b}</li>)}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ borderColor: colors.bandBorder }} />
              </Box>
            ))}
          </Box>

          {/* Education and skills */}
          <Box sx={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Box>
              <Box sx={{ typography: 'overline', color: colors.ink, mb: 2 }}>Education</Box>
              <Divider sx={{ borderColor: colors.ink, borderBottomWidth: '1.5px' }} />
              {education.map(([school, program, dates]) => (
                <Box key={program}>
                  <Box sx={{ py: '16px' }}>
                    <Box component="h3" sx={{ m: 0, typography: 'subtitle2' }}>{school}</Box>
                    <Box sx={{ typography: 'body2', color: colors.ink }}>{program}</Box>
                    <Box sx={{ typography: 'mono', color: colors.onBandMuted, mt: '4px' }}>{dates}</Box>
                  </Box>
                  <Divider sx={{ borderColor: colors.bandBorder }} />
                </Box>
              ))}
            </Box>
            <Box>
              <Box sx={{ typography: 'overline', color: colors.ink, mb: 2 }}>Core skills</Box>
              <Divider sx={{ borderColor: colors.ink, borderBottomWidth: '1.5px', mb: 2 }} />
              <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.map((k) => (
                  <Box component="li" key={k} sx={{ typography: 'caption', color: colors.ink, border: `1px solid ${colors.ink}`, px: 1, py: '4px' }}>{k}</Box>
                ))}
              </Box>
            </Box>
          </Box>
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
          <Button variant="outlined" color="inherit" size="large" href={RESUME_PDF} download="Justin-Neely-Resume.pdf">Resume (PDF) ↓</Button>
        </Box>
        <SiteFooter sx={{ mt: 9 }} />
      </Container>
    </Box>
  );
}
