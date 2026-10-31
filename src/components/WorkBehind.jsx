import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { outlineText } from '../theme.js';
import { work } from '../pages/work.js';

const STEP = 1200; // ms each project stays up while hovering

/**
 * An outlined phrase that shows the work through its letters on hover:
 * each project's cover fills the letterforms in turn, cycling while the
 * pointer stays. `onShow` reports the project showing (or null), so the
 * page can credit it. Pointer devices only; on touch it's just the outline.
 */
export default function WorkBehind({ children, onShow }) {
  const items = work.filter((w) => w.cover);
  const [on, setOn] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), STEP);
    return () => clearInterval(t);
  }, [on, items.length]);

  useEffect(() => { onShow?.(on ? items[i] : null); }, [on, i]);

  const enter = () => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setI(0);
    setOn(true);
  };

  return (
    <Box
      component="span"
      onMouseEnter={enter}
      onMouseLeave={() => setOn(false)}
      sx={{ position: 'relative', display: 'inline-block', cursor: 'default' }}
    >
      {/* At rest: the outline */}
      <Box component="span" sx={outlineText()}>{children}</Box>

      {/* On hover: the same words again, filled with a project cover, one per project */}
      {items.map((w, n) => (
        <Box
          key={w.slug}
          component="span"
          aria-hidden="true"
          sx={{
            ...outlineText(),
            position: 'absolute', inset: 0,
            backgroundImage: `url(${w.cover.src})`,
            backgroundSize: 'cover',
            backgroundPosition: on && n === i ? 'center 35%' : 'center 55%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            opacity: on && n === i ? 1 : 0,
            transition: 'opacity 450ms ease, background-position 1400ms cubic-bezier(.2,.7,.2,1)',
            pointerEvents: 'none',
            '@media (prefers-reduced-motion: reduce)': { transition: 'opacity 1ms' }
          }}
        >
          {children}
        </Box>
      ))}
    </Box>
  );
}
