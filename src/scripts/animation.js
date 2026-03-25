import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ overwrite: 'auto', duration: 1 });

export const ANIMATION_TYPES = {
  APPEAR_Z: 1,
  FADE_LEFT: 2,
  FADE_UP: 3,
  FADE_RIGHT: 4,
};

export function isReducedMotionPreferred() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function setAnimationInitial(target, type) {
  if (type === ANIMATION_TYPES.APPEAR_Z) {
    gsap.set(target, { autoAlpha: 0, y: 14, zIndex: 0 });
    return;
  }

  if (type === ANIMATION_TYPES.FADE_LEFT) {
    // Fixed pixel offset — avoids wide elements flying in from far off-screen
    gsap.set(target, { autoAlpha: 0, x: -40 });
    return;
  }

  if (type === ANIMATION_TYPES.FADE_RIGHT) {
    gsap.set(target, { autoAlpha: 0, x: 28 });
    return;
  }

  // FADE_UP
  gsap.set(target, { autoAlpha: 0, y: 30 });
}

export function setAnimationFinal(target, type) {
  if (type === ANIMATION_TYPES.APPEAR_Z) {
    gsap.set(target, { autoAlpha: 1, y: 0, zIndex: 1 });
    return;
  }

  if (type === ANIMATION_TYPES.FADE_LEFT || type === ANIMATION_TYPES.FADE_RIGHT) {
    gsap.set(target, { autoAlpha: 1, x: 0 });
    return;
  }

  gsap.set(target, { autoAlpha: 1, y: 0 });
}

export function toAnimation(target, type, options = {}) {
  const { duration = 0.9, ease = 'power3.out', onStart, stagger } = options;
  const animationVars = {
    autoAlpha: 1,
    duration,
    ease,
  };

  if (typeof stagger !== 'undefined') {
    animationVars.stagger = stagger;
  }

  if (type === ANIMATION_TYPES.APPEAR_Z) {
    animationVars.y = 0;
    animationVars.onStart = () => {
      gsap.set(target, { zIndex: 1 });
      if (onStart) onStart();
    };
  } else if (type === ANIMATION_TYPES.FADE_LEFT || type === ANIMATION_TYPES.FADE_RIGHT) {
    animationVars.x = 0;
    if (onStart) animationVars.onStart = onStart;
  } else {
    animationVars.y = 0;
    if (onStart) animationVars.onStart = onStart;
  }

  return gsap.to(target, animationVars);
}

/**
 * Creates a scroll-triggered timeline.
 * Timeline is paused by default; ScrollTrigger controls playback.
 * Best practice: pass the timeline via gsap.timeline({ scrollTrigger }) pattern
 * so GSAP manages the paused state automatically.
 */
export function createScrollTimeline({
  trigger,
  start = 'top 80%',
  once = true,
  toggleActions = 'play none none none',
}) {
  const timeline = gsap.timeline({
    paused: true,
    scrollTrigger: {
      trigger,
      start,
      once,
      toggleActions,
      fastScrollEnd: true,
    },
  });

  return timeline;
}

/**
 * Staggered scroll entrance — elements fade up one by one when scrolled into view.
 */
export function staggeredEntrance(trigger, targets, options = {}) {
  const {
    start = 'top 80%',
    stagger = 0.15,
    duration = 0.75,
    y = 50,
    ease = 'power3.out',
  } = options;

  gsap.set(targets, { autoAlpha: 0, y });

  const tl = gsap.timeline({
    paused: true,
    scrollTrigger: { trigger, start, once: true },
  });
  tl.to(targets, { autoAlpha: 1, y: 0, duration, ease, stagger });

  return tl;
}

/**
 * Panel hover animation — slides a panel from a resting yPercent to 0 on hover.
 */
export function setupPanelHover(card, panel, revealEls, options = {}) {
  const {
    restY = 87.5,
    duration = 0.38,
    ease = 'power3.out',
  } = options;

  gsap.set(panel, { yPercent: restY });
  gsap.set(revealEls, { autoAlpha: 0 });

  let hoverTl = null;

  card.addEventListener('mouseenter', () => {
    if (hoverTl) hoverTl.kill();
    hoverTl = gsap.timeline();
    hoverTl.to(panel, { yPercent: 0, duration, ease, overwrite: true });
    hoverTl.to(revealEls, { autoAlpha: 1, duration: 0.25, ease, stagger: 0.06, overwrite: true }, '-=0.18');
  });

  card.addEventListener('mouseleave', () => {
    if (hoverTl) hoverTl.kill();
    hoverTl = gsap.timeline();
    hoverTl.to(revealEls, { autoAlpha: 0, duration: 0.15, ease: 'power2.in', overwrite: true });
    hoverTl.to(panel, { yPercent: restY, duration, ease: 'power2.in', overwrite: true }, '-=0.1');
  });
}

export { gsap, ScrollTrigger };
