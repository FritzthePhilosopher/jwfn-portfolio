import { useRef } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText, useGSAP);

// What the letters flicker through while they're "messy".
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>?!*+=';
// Coral and indigo offset copies behind the outline, like the Edgerunners
// intro's color split. The "clean" value has the same shape, so GSAP can tween it.
const SPLIT = '0.06em 0 0 rgba(255,127,80,1), -0.06em 0 0 rgba(91,59,255,1)';
const CLEAN = '0em 0 0 rgba(255,127,80,0), 0em 0 0 rgba(91,59,255,0)';

/**
 * A phrase whose letters start scattered, scrambled and color-split, then
 * snap into clean alignment. Hovering replays a quicker glitch.
 * Screen readers get the plain phrase; reduced motion gets no animation.
 */
export default function MessyText({ children, delay = 0.6, sx }) {
  const root = useRef(null);
  const play = useRef(null);

  useGSAP((context, contextSafe) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const build = contextSafe(() => {
      const split = SplitText.create(root.current, { type: 'words,chars', aria: 'auto' });
      const chars = split.chars;
      const finals = chars.map((c) => c.textContent);

      // Lock each letter to its final width so scrambling never reflows the headline.
      chars.forEach((c) => {
        c.style.width = `${c.getBoundingClientRect().width}px`;
        c.style.textAlign = 'center';
      });

      const scramble = (base) =>
        chars.map((c, i) =>
          gsap.to({}, {
            duration: base + i * 0.035,
            onUpdate: () => { c.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0]; },
            onComplete: () => { c.textContent = finals[i]; }
          })
        );

      play.current = contextSafe((intro) => {
        gsap.killTweensOf(chars);
        const tl = gsap.timeline();
        tl.set(chars, {
          x: () => `${gsap.utils.random(-0.35, 0.35)}em`,
          y: () => `${gsap.utils.random(-0.55, 0.55)}em`,
          rotation: () => gsap.utils.random(-28, 28),
          textShadow: SPLIT,
          ...(intro && { opacity: 0 })
        });
        if (intro) tl.to(chars, { opacity: 1, duration: 0.15, stagger: { each: 0.02, from: 'random' } });
        tl.add(scramble(intro ? 0.7 : 0.35), 0);
        tl.to(chars, {
          x: 0, y: 0, rotation: 0,
          duration: intro ? 1 : 0.6,
          ease: 'expo.out',
          stagger: { each: 0.035, from: 'random' }
        }, intro ? 0.25 : 0.05);
        tl.to(chars, { textShadow: CLEAN, duration: 0.45, ease: 'power2.out' }, '-=0.4');
        return tl;
      });

      // Letters wait invisible through the delay, then the intro brings them in.
      gsap.set(chars, { opacity: 0 });
      gsap.set(root.current, { visibility: 'visible' });
      play.current(true).delay(delay);
    });

    // Measure after the web fonts load, or the letter widths would be wrong.
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
  }, { scope: root });

  const onEnter = () => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    play.current?.(false);
  };

  return (
    <Box
      component="span"
      ref={root}
      onMouseEnter={onEnter}
      // Hidden until the letters are split and placed, so the phrase doesn't flash
      // in its final form first. Reduced motion never hides it.
      sx={{ display: 'inline', '@media (prefers-reduced-motion: no-preference)': { visibility: 'hidden' }, ...sx }}
    >
      {children}
    </Box>
  );
}
