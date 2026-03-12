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

export { gsap, ScrollTrigger };
