import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ANIMATION_TYPES = {
  APPEAR_Z: 1,
  FADE_LEFT: 2,
  FADE_UP: 3,
};

export function isReducedMotionPreferred() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function setAnimationInitial(target, type) {
  if (type === ANIMATION_TYPES.APPEAR_Z) {
    gsap.set(target, { autoAlpha: 0, y: 10, zIndex: 0 });
    return;
  }

  if (type === ANIMATION_TYPES.FADE_LEFT) {
    gsap.set(target, { autoAlpha: 0, x: -28 });
    return;
  }

  gsap.set(target, { autoAlpha: 0, y: 28 });
}

export function setAnimationFinal(target, type) {
  if (type === ANIMATION_TYPES.APPEAR_Z) {
    gsap.set(target, { autoAlpha: 1, y: 0, zIndex: 1 });
    return;
  }

  if (type === ANIMATION_TYPES.FADE_LEFT) {
    gsap.set(target, { autoAlpha: 1, x: 0 });
    return;
  }

  gsap.set(target, { autoAlpha: 1, y: 0 });
}

export function toAnimation(target, type, options = {}) {
  const { duration = 0.7, ease = 'power2.out', onStart, stagger } = options;
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
  } else if (type === ANIMATION_TYPES.FADE_LEFT) {
    animationVars.x = 0;
    if (onStart) animationVars.onStart = onStart;
  } else {
    animationVars.y = 0;
    if (onStart) animationVars.onStart = onStart;
  }

  return gsap.to(target, animationVars);
}

export function createScrollTimeline({
  trigger,
  start = 'top 80%',
  once = true,
  toggleActions = 'play none none none',
}) {
  const timeline = gsap.timeline();

  ScrollTrigger.create({
    trigger,
    start,
    once,
    toggleActions,
    animation: timeline,
  });

  return timeline;
}

/**
 * Staggered scroll entrance — elements fade up one by one when scrolled into view.
 * @param {string|Element} trigger - ScrollTrigger trigger element
 * @param {string|Element[]} targets - Elements to animate
 * @param {object} options
 */
export function staggeredEntrance(trigger, targets, options = {}) {
  const {
    start = 'top 80%',
    stagger = 0.15,
    duration = 0.7,
    y = 40,
    ease = 'power2.out',
  } = options;

  gsap.set(targets, { autoAlpha: 0, y });

  const tl = gsap.timeline();
  tl.to(targets, { autoAlpha: 1, y: 0, duration, ease, stagger });

  ScrollTrigger.create({ trigger, start, once: true, animation: tl });

  return tl;
}

/**
 * Panel hover animation — slides a panel from a resting yPercent to 0 on hover.
 * Also fades in inner reveal elements (separator, description, button).
 * @param {Element} card - The hoverable card element
 * @param {Element} panel - The sliding panel element
 * @param {string|Element[]} revealEls - Elements inside the panel to fade in
 * @param {object} options
 */
export function setupPanelHover(card, panel, revealEls, options = {}) {
  const {
    restY = 87.5,
    duration = 0.35,
    ease = 'power2.out',
  } = options;

  gsap.set(panel, { yPercent: restY });
  gsap.set(revealEls, { autoAlpha: 0 });

  let hoverTl = null;

  card.addEventListener('mouseenter', () => {
    if (hoverTl) hoverTl.kill();
    hoverTl = gsap.timeline();
    hoverTl.to(panel, { yPercent: 0, duration, ease });
    hoverTl.to(revealEls, { autoAlpha: 1, duration: 0.25, ease, stagger: 0.06 }, '-=0.15');
  });

  card.addEventListener('mouseleave', () => {
    if (hoverTl) hoverTl.kill();
    hoverTl = gsap.timeline();
    hoverTl.to(revealEls, { autoAlpha: 0, duration: 0.15, ease: 'power2.in' });
    hoverTl.to(panel, { yPercent: restY, duration, ease: 'power2.in' }, '-=0.1');
  });
}

export { gsap, ScrollTrigger };
