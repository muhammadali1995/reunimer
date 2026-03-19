import {
  gsap,
  ANIMATION_TYPES,
  isReducedMotionPreferred,
  setAnimationInitial,
  toAnimation,
  createScrollTimeline,
  setupPanelHover,
} from './animation.js';

/**
 * Hero wordmark entrance — plays on page load (not scroll-triggered, above the fold).
 * Fades in + slight scale + lift from below.
 */
function initHeroAnimation() {
  const wordmark = document.querySelector('[data-hero-wordmark]');
  if (!wordmark || isReducedMotionPreferred()) return;

  gsap.fromTo(
    wordmark,
    { autoAlpha: 0, y: 24, scale: 0.96 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.3 },
  );
}

function initSectionTimeline(sectionId, typeMap, buildTimeline) {
  const section = document.getElementById(sectionId);
  if (!section || isReducedMotionPreferred()) return;

  section.querySelectorAll('[data-anim]').forEach((el) => {
    const type = typeMap[el.dataset.anim];
    if (type) setAnimationInitial(el, type);
  });

  const timeline = createScrollTimeline({ trigger: section, start: 'top 75%' });
  buildTimeline(section, timeline);
}

function initGroupeAnimations() {
  initSectionTimeline(
    'groupe-section',
    {
      '1': ANIMATION_TYPES.APPEAR_Z,
      '2': ANIMATION_TYPES.FADE_LEFT,
      '3': ANIMATION_TYPES.FADE_UP,
    },
    (section, timeline) => {
      const title = section.querySelector('[data-anim="1"]');
      if (title) timeline.add(toAnimation(title, ANIMATION_TYPES.APPEAR_Z));

      const fadeLeftEls = section.querySelectorAll('[data-anim="2"]');
      if (fadeLeftEls.length) {
        timeline.add(toAnimation(fadeLeftEls, ANIMATION_TYPES.FADE_LEFT, { stagger: 0.13 }), '-=0.45');
      }

      const images = section.querySelectorAll('[data-anim="3"]');
      if (images.length) {
        timeline.add(toAnimation(images, ANIMATION_TYPES.FADE_UP, { stagger: 0.12 }), '-=0.45');
      }
    },
  );
}

function initSideImageSection(sectionId) {
  initSectionTimeline(
    sectionId,
    {
      '3': ANIMATION_TYPES.FADE_UP,
      '4': ANIMATION_TYPES.FADE_RIGHT,
    },
    (section, timeline) => {
      const image = section.querySelector('[data-anim="3"]');
      if (image) timeline.add(toAnimation(image, ANIMATION_TYPES.FADE_UP));

      const textEls = section.querySelectorAll('[data-anim="4"]');
      if (textEls.length) {
        timeline.add(toAnimation(textEls, ANIMATION_TYPES.FADE_RIGHT, { stagger: 0.13 }), '-=0.35');
      }
    },
  );
}

function initExpertisesAnimations() {
  initSectionTimeline(
    'expertises-section',
    {
      '1': ANIMATION_TYPES.APPEAR_Z,
      '2': ANIMATION_TYPES.FADE_UP,
    },
    (section, timeline) => {
      const introEls = section.querySelectorAll('[data-anim="1"]');
      if (introEls.length) {
        timeline.add(toAnimation(introEls, ANIMATION_TYPES.APPEAR_Z, { stagger: 0.12 }));
      }

      const cards = section.querySelectorAll('[data-anim="2"]');
      if (cards.length) {
        timeline.add(toAnimation(cards, ANIMATION_TYPES.FADE_UP, { stagger: 0.12 }), '-=0.3');
      }
    },
  );
}


function initExpertiseHover() {
  if (isReducedMotionPreferred()) return;

  document.querySelectorAll('[data-expertise-card]').forEach((card) => {
    const panel = card.querySelector('[data-panel]');
    const revealEls = card.querySelectorAll('[data-reveal]');
    if (panel && revealEls.length) {
      setupPanelHover(card, panel, revealEls);
    }
  });
}

export function initHomePage() {
  initHeroAnimation();
  initGroupeAnimations();
  initSideImageSection('rse-section');
  initSideImageSection('team-section');
  initExpertisesAnimations();
  initExpertiseHover();
  // actualites-section uses global data-stagger + heading reveal — no page-specific needed
  // filiales marquee is self-contained in HomeFilialesSection.astro
}
