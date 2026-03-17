import {
  ANIMATION_TYPES,
  createScrollTimeline,
  isReducedMotionPreferred,
  setAnimationInitial,
  toAnimation,
} from './animation.js';

function initHeroAnimations() {
  const heroSection = document.querySelector('section.relative.-mt-\\[92px\\]');
  if (!heroSection || isReducedMotionPreferred() || heroSection.dataset.animInitialized === 'true') return;

  heroSection.dataset.animInitialized = 'true';

  const textItems = Array.from(heroSection.querySelectorAll('[data-anim="2"]'));
  if (!textItems.length) return;

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.FADE_LEFT));

  const timeline = createScrollTimeline({ trigger: heroSection, start: 'top 80%' });
  timeline.add(toAnimation(textItems, ANIMATION_TYPES.FADE_LEFT, { stagger: 0.12 }));
}

export function initEngagementsPage() {
  initHeroAnimations();
}
