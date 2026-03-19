import { gsap, isReducedMotionPreferred, ANIMATION_TYPES, setAnimationInitial, toAnimation } from './animation.js';

function initHeroAnimations() {
  const heroSection = document.querySelector('[data-engagements-hero]');
  if (!heroSection || isReducedMotionPreferred() || heroSection.dataset.animInitialized === 'true') return;

  heroSection.dataset.animInitialized = 'true';

  const textItems = Array.from(heroSection.querySelectorAll('[data-anim="2"]'));
  if (!textItems.length) return;

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.FADE_LEFT));

  // Above-fold — load-triggered entrance, not scroll-triggered
  gsap.to(textItems, {
    autoAlpha: 1,
    x: 0,
    duration: 0.85,
    ease: 'power3.out',
    stagger: 0.13,
    delay: 0.4,
  });
}

export function initEngagementsPage() {
  initHeroAnimations();
}
