import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '../theme.js';
import { work } from './work.js';
import { RESUME_PDF } from './resume-data.js';
import { PUBLIC_CASE_STUDIES } from '../../lib/public-case-studies.js';
import { Container, Label, Placeholder, SiteNav, SiteFooter, ProjectIndex, h2Sx, displaySx } from '../components/Shared.jsx';

const sectionTop = 'clamp(72px, 10vw, 136px)';
const count = (n) => `(${String(n).padStart(2, '0')})`;

const stats = [
  ['15+', 'Years designing enterprise B2B software'],
  ['2', 'Teams: one agency, Truelio (formerly Dynamic Marketing Systems), and one enterprise, CarMax'],
  ['4y 3m', 'Full-time on CarMax Auctions, after six months as a contractor']
];

// Short work history for the home page; the full version is on /resume.
const previously = [
  ['CarMax', 'Product Designer II, CarMax Auctions. Earlier, contract Product Designer.', 'Feb 2022 to Sep 2026'],
  ['Dynamic Marketing Systems (now Truelio)', 'UX Designer (Nov 2019 to Jan 2022): mobile products for American Airlines, JetBlue and Frontier Airlines, plus tools for flight attendants to track incentives, set goals and monitor progress. Earlier Sr. Digital Designer (web and print design files, HTML email design and development), HTML Email Developer (weekly and recurring emails, airline site maintenance), and Graphic Designer, where I started in 2012.', '2012 to Jan 2022']
];

const about = [
  ['Agency first.', 'I started at Dynamic Marketing Systems (now Truelio), a digital marketing agency, where I did my Barclays and American Airlines work, then moved in-house to product design.'],
  ['Atlanta.', 'Home for more than a decade.']
];

const contact = [
  ['Email', 'justin@jwfn.design', { href: 'mailto:justin@jwfn.design' }],
  ['LinkedIn', 'in/jwfn ↗', { href: 'https://www.linkedin.com/in/jwfn/', target: '_blank', rel: 'noopener noreferrer' }],
  ['Resume', 'PDF ↓', { href: RESUME_PDF, download: 'Justin-Neely-Resume.pdf' }]
];

// Label column on the left, content on the right (stacks on phones).
const split = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '220px 1fr' },
  gap: { xs: '16px', md: '48px' }
};

const textLink = {
  color: colors.ink,
  textDecorationColor: colors.chipBorder,
  textUnderlineOffset: '4px',
  transition: 'color 150ms ease',
  '&:hover': { color: colors.accentText, textDecorationColor: 'currentColor' }
};

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <rect x="5" y="11" width="14" height="10" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function WorkCard({ w, feature }) {
  const isPublic = PUBLIC_CASE_STUDIES.includes(w.slug);
  return (
    <Box
      component={RouterLink}
      to={w.to}
      sx={{
        gridColumn: feature ? { md: '1 / -1' } : undefined,
        display: 'block',
        color: 'inherit',
        textDecoration: 'none',
        '&:hover .cover img, &:focus-visible .cover img': { transform: 'scale(1.03)' },
        '&:hover .name, &:focus-visible .name': { color: colors.accentText },
        '&:focus-visible': { outline: `2px solid ${colors.ink}`, outlineOffset: 6 }
      }}
    >
      <Box
        className="cover"
        sx={{ position: 'relative', overflow: 'hidden', aspectRatio: feature ? { xs: '4 / 3', md: '16 / 7' } : '4 / 3', bgcolor: colors.tint, border: `1px solid ${colors.border}` }}
      >
        {w.cover ? (
          <Box
            component="img"
            src={w.cover.src}
            alt={w.cover.alt}
            loading="lazy"
            sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 600ms cubic-bezier(.2,.7,.2,1)' }}
          />
        ) : (
          <Placeholder label="[Cover image]" sx={{ height: '100%' }} />
        )}
        {w.locked && (
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', px: 1.5, py: 1, bgcolor: colors.bg, color: colors.ink, border: `1px solid ${colors.ink}`, typography: 'label' }}>
              <LockIcon /> Password protected
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'baseline', gap: '6px 16px', pt: '18px' }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '12px', minWidth: 0 }}>
          <Box component="span" sx={{ typography: 'mono', color: colors.accentText }}>{w.n}</Box>
          <Box component="h3" className="name" sx={{ m: 0, typography: 'h4', transition: 'color 150ms ease' }}>{w.name}</Box>
        </Box>
        <Box component="span" sx={{ typography: 'mono', color: colors.muted }}>{w.year}</Box>
        <Box sx={{ gridColumn: '1 / -1', typography: 'caption', color: colors.muted }}>{w.tags.join(' · ')}</Box>
        <Box component="p" sx={{ gridColumn: '1 / -1', m: 0, mt: '6px', maxWidth: 620, typography: 'body2', color: colors.body, textWrap: 'pretty' }}>{w.title}</Box>
        <Box sx={{ gridColumn: '1 / -1', mt: '6px', typography: 'label', color: colors.ink }}>
          {w.locked ? 'Unlock the case study →' : 'Read the case study →'}
          {!w.locked && !isPublic && <Box component="span" sx={{ typography: 'caption', color: colors.muted, ml: 1.5 }}>Password required</Box>}
        </Box>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <Box sx={{ width: '100%', bgcolor: colors.bg, color: colors.ink, typography: 'body1' }}>
      <SiteNav />

      {/* HERO: one statement, with the facts in a mono row above it */}
      <Container id="top" sx={{ pt: 'clamp(40px, 7vw, 88px)' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: '8px 24px',
            pb: '16px',
            borderBottom: `1px solid ${colors.border}`,
            typography: 'mono',
            color: colors.muted
          }}
        >
          <span>Justin Neely</span>
          <span>Product designer</span>
          <span>Atlanta, GA</span>
          <span>15+ years, enterprise B2B</span>
        </Box>
        <Box component="h1" sx={{ ...displaySx, mt: 'clamp(40px, 6vw, 80px)', maxWidth: 1080, textWrap: 'balance' }}>
          I turn complex systems into products people can actually use.
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px 32px', mt: 'clamp(32px, 5vw, 56px)' }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px', typography: 'mono', color: colors.ink }}>
            <Box component="span" aria-hidden="true" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.accent, boxShadow: `0 0 0 4px color-mix(in srgb, ${colors.accent} 25%, transparent)` }} />
            Open to product designer roles
          </Box>
          <Box component="p" sx={{ m: 0, typography: 'body2', color: colors.body }}>
            Left-handed by nature. Designer by profession. Human by{' '}default.
          </Box>
        </Box>
      </Container>

      {/* INFO */}
      <Container id="about" sx={{ pt: sectionTop }}>
        <Box sx={split}>
          <Label>Info</Label>
          <Box>
            <Box component="p" sx={{ m: 0, maxWidth: 760, typography: 'quote', textWrap: 'pretty' }}>
              15+ years in enterprise B2B design, with experience at Truelio (formerly Dynamic Marketing Systems) and CarMax.
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: '20px 40px', mt: 4, maxWidth: 760 }}>
              {about.map(([h, p]) => (
                <Box key={h} component="p" sx={{ m: 0, color: colors.body }}>
                  <Box component="strong" sx={{ color: colors.ink, fontWeight: 600 }}>{h}</Box> {p}
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: '24px', mt: 6, pt: 3, borderTop: `1px solid ${colors.border}` }}>
              {stats.map(([n, l]) => (
                <div key={n}>
                  <Box sx={{ typography: 'statSm' }}>{n}</Box>
                  <Box sx={{ mt: 1, typography: 'body2', color: colors.body }}>{l}</Box>
                </div>
              ))}
            </Box>

            <Box component="dl" sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px 48px', m: 0, mt: 6 }}>
              {contact.map(([k, v, props]) => (
                <div key={k}>
                  <Box component="dt" sx={{ typography: 'caption', color: colors.muted, mb: '4px' }}>{k}</Box>
                  <Box component="dd" sx={{ m: 0 }}>
                    <Link {...props} sx={{ ...textLink, typography: 'subtitle2' }}>{v}</Link>
                  </Box>
                </div>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      {/* SELECTED WORK */}
      <Container id="work" sx={{ pt: sectionTop }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2, pb: '16px', borderBottom: `1.5px solid ${colors.ink}` }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <Box component="h2" sx={h2Sx}>Selected work</Box>
            <Box component="span" sx={{ typography: 'mono', color: colors.muted }}>{count(work.length)}</Box>
          </Box>
          <Link href="#index" sx={{ ...textLink, typography: 'label' }}>View index ↓</Link>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: '56px', md: '72px 40px' }, mt: 5 }}>
          {work.map((w, i) => <WorkCard key={w.slug} w={w} feature={i === 0} />)}
        </Box>
      </Container>

      {/* PREVIOUSLY */}
      <Container sx={{ pt: sectionTop }}>
        <Box sx={split}>
          <Label>Previously</Label>
          <Box>
            <Box sx={{ borderTop: `1.5px solid ${colors.ink}` }}>
              {previously.map(([co, role, yrs]) => (
                <Box key={co} sx={{ py: 3, borderBottom: `1px solid ${colors.border}` }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '4px 24px' }}>
                    <Box component="h3" sx={{ m: 0, typography: 'h4' }}>{co}</Box>
                    <Box sx={{ typography: 'mono', color: colors.muted }}>{yrs}</Box>
                  </Box>
                  <Box component="p" sx={{ mt: 1.5, mb: 0, maxWidth: 760, color: colors.body, textWrap: 'pretty' }}>{role}</Box>
                </Box>
              ))}
            </Box>
            <Link component={RouterLink} to="/resume" sx={{ ...textLink, typography: 'label', display: 'inline-block', mt: 3 }}>See the full resume →</Link>
          </Box>
        </Box>
      </Container>

      {/* CONTACT */}
      <Container id="contact" sx={{ pt: sectionTop }}>
        <Label>Contact</Label>
        <Box component="h2" sx={{ ...displaySx, mt: 2 }}>If you want to talk.</Box>
        <Link href="mailto:justin@jwfn.design" sx={{ ...textLink, display: 'inline-block', mt: 3, typography: 'h3', fontWeight: 500 }}>
          justin@jwfn.design ↗
        </Link>
      </Container>

      {/* INDEX + FOOTER */}
      <Container sx={{ pt: sectionTop, pb: 5 }}>
        <ProjectIndex items={work} />
        <SiteFooter sx={{ mt: 9 }} />
      </Container>
    </Box>
  );
}
