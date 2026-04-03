import { gsap, ScrollTrigger, isReducedMotionPreferred, ANIMATION_TYPES, setAnimationInitial, toAnimation } from './animation.js';

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

function initScrollAnimations() {
  if (isReducedMotionPreferred()) return;

  const fadeUpEls = document.querySelectorAll('[data-anim="3"]:not([data-anim-initialized])');

  fadeUpEls.forEach((el) => {
    el.dataset.animInitialized = 'true';
    setAnimationInitial(el, ANIMATION_TYPES.FADE_UP);

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter() {
        toAnimation(el, ANIMATION_TYPES.FADE_UP);
      },
    });
  });
}

export function initEngagementsPage() {
  initHeroAnimations();
  initScrollAnimations();
}
