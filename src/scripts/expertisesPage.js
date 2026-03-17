import {
  ANIMATION_TYPES,
  ScrollTrigger,
  createScrollTimeline,
  gsap,
  isReducedMotionPreferred,
  setAnimationInitial,
  toAnimation,
} from './animation.js';

function formatCountValue(value, decimals = 0) {
  return decimals > 0 ? value.toFixed(decimals).replace('.', ',') : Math.round(value).toString();
}

function animateCountUp(targets) {
  const elements = Array.isArray(targets) ? targets : Array.from(targets);
  const counter = { value: 0 };

  return gsap.to(counter, {
    value: 1,
    duration: 1.4,
    ease: 'power2.out',
    stagger: 0.1,
    onUpdate: function onUpdate() {
      elements.forEach((element, index) => {
        const targetValue = Number(element.dataset.countValue || '0');
        const decimals = Number(element.dataset.countDecimals || '0');
        const staggerDelay = index * 0.1;
        const progress = Math.min(Math.max((this.progress() - staggerDelay / 1.4) / (1 - staggerDelay / 1.4), 0), 1);
        const rawValue = targetValue * progress;
        const currentValue = decimals > 0 ? Number(rawValue.toFixed(decimals)) : Math.round(rawValue);

        element.textContent = `${element.dataset.countPrefix || ''}${formatCountValue(currentValue, decimals)}${element.dataset.countSuffix || ''}`;
      });
    },
  });
}

function initCountsOnView(targets, options = {}) {
  const {
    start = 'top 85%',
    triggerResolver = (element) => element,
    entranceAnimation,
  } = options;

  targets.forEach((element) => {
    const trigger = triggerResolver(element);
    if (!trigger || element.dataset.countInitialized === 'true') return;

    element.dataset.countInitialized = 'true';

    ScrollTrigger.create({
      trigger,
      start,
      once: true,
      onEnter: () => {
        if (entranceAnimation) {
          entranceAnimation(element, trigger);
        }

        animateCountUp([element]);
      },
    });
  });
}

function initFishingSectionAnimations() {
  const section = document.getElementById('peche-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="1"]'));
  const countItems = Array.from(section.querySelectorAll('[data-anim="4"][data-count-value]'));
  const statLines = Array.from(section.querySelectorAll('[data-stat-line]'));
  const quotaDonuts = Array.from(section.querySelectorAll('[data-quota-donut]'));
  const quotaArcs = Array.from(section.querySelectorAll('[data-quota-donut-arc]'));
  const quotaCenters = Array.from(section.querySelectorAll('[data-quota-donut-center]'));
  const quotaCountItems = Array.from(section.querySelectorAll('[data-quota-count="true"][data-count-value]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.APPEAR_Z));
  countItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
    gsap.set(item, { autoAlpha: 0, y: 10 });
  });
  statLines.forEach((line) => gsap.set(line, { scaleX: 0, transformOrigin: 'left center' }));
  quotaDonuts.forEach((donut) => gsap.set(donut, { autoAlpha: 0, y: 24 }));
  quotaArcs.forEach((arc) => {
    const dashArray = String(arc.getAttribute('stroke-dasharray') || '0 0').split(' ');
    const visibleLength = Number(dashArray[0] || '0');
    const totalLength = Number(dashArray[1] || dashArray[0] || '0');

    arc.dataset.arcVisibleLength = String(visibleLength);
    arc.dataset.arcTotalLength = String(totalLength);

    gsap.set(arc, { strokeDasharray: `0 ${totalLength}` });
  });
  quotaCenters.forEach((center) => {
    gsap.set(center, { autoAlpha: 0, scale: 0.88, transformOrigin: 'center center' });
  });
  quotaCountItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
  });

  const timeline = createScrollTimeline({ trigger: section, start: 'top 72%' });

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.APPEAR_Z, { stagger: 0.08 }));
  }

  if (statLines.length) {
    timeline.to(statLines, { scaleX: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08 }, '<');
  }

  if (quotaDonuts.length) {
    timeline.to(
      quotaDonuts,
      { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.14 },
      '-=0.2',
    );
  }

  if (quotaArcs.length) {
    timeline.to(
      quotaArcs,
      {
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.14,
        strokeDasharray: (_, arc) => `${arc.dataset.arcVisibleLength || '0'} ${arc.dataset.arcTotalLength || '0'}`,
      },
      '<',
    );
  }

  if (quotaCenters.length) {
    timeline.to(
      quotaCenters,
      { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out', stagger: 0.14 },
      '-=0.45',
    );
  }

  initCountsOnView(countItems, {
    triggerResolver: (element) => element.closest('.flex') || element,
    entranceAnimation: (element) => {
      gsap.to(element, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' });
    },
  });

  initCountsOnView(quotaCountItems, {
    triggerResolver: (element) => element.closest('[data-quota-donut]') || element,
  });

}

function initRhSectionAnimations() {
  const section = document.getElementById('rh-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="1"]'));
  const donuts = Array.from(section.querySelectorAll('[data-rh-donut]'));
  const arcs = Array.from(section.querySelectorAll('[data-rh-donut-arc]'));
  const donutCenters = Array.from(section.querySelectorAll('[data-rh-donut-center]'));
  const countItems = Array.from(section.querySelectorAll('[data-rh-count="true"][data-count-value]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.APPEAR_Z));
  donuts.forEach((donut) => gsap.set(donut, { autoAlpha: 0, y: 24 }));
  arcs.forEach((arc) => {
    const dashArray = String(arc.getAttribute('stroke-dasharray') || '0 0').split(' ');
    const visibleLength = Number(dashArray[0] || '0');
    const totalLength = Number(dashArray[1] || dashArray[0] || '0');

    arc.dataset.arcVisibleLength = String(visibleLength);
    arc.dataset.arcTotalLength = String(totalLength);

    gsap.set(arc, { strokeDasharray: `0 ${totalLength}` });
  });
  donutCenters.forEach((center) => {
    gsap.set(center, { autoAlpha: 0, scale: 0.88, transformOrigin: 'center center' });
  });
  countItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
  });

  const timeline = createScrollTimeline({ trigger: section, start: 'top 72%' });

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.APPEAR_Z, { stagger: 0.08 }));
  }

  if (donuts.length) {
    timeline.to(
      donuts,
      { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.14 },
      '-=0.2',
    );
  }

  if (arcs.length) {
    timeline.to(
      arcs,
      {
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.14,
        strokeDasharray: (_, arc) => `${arc.dataset.arcVisibleLength || '0'} ${arc.dataset.arcTotalLength || '0'}`,
      },
      '<',
    );
  }

  if (donutCenters.length) {
    timeline.to(
      donutCenters,
      { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out', stagger: 0.14 },
      '-=0.45',
    );
  }

  if (countItems.length) {
    timeline.add(animateCountUp(countItems), '<');
  }
}

function initSupportSectionAnimations() {
  const section = document.getElementById('support-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="1"]'));
  const countItems = Array.from(section.querySelectorAll('[data-anim="4"][data-count-value]'));
  const statLines = Array.from(section.querySelectorAll('[data-stat-line]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.APPEAR_Z));
  countItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
    gsap.set(item, { autoAlpha: 0, y: 10 });
  });
  statLines.forEach((line) => gsap.set(line, { scaleX: 0, transformOrigin: 'left center' }));

  const timeline = createScrollTimeline({ trigger: section, start: 'top 72%' });

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.APPEAR_Z, { stagger: 0.08 }));
  }

  if (countItems.length) {
    timeline.to(countItems, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.1 }, '-=0.35');
    timeline.add(animateCountUp(countItems), '<');
  }

  if (statLines.length) {
    timeline.to(statLines, { scaleX: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08 }, '<');
  }
}

function initBrandsSectionAnimations() {
  const section = document.getElementById('brands-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const cards = Array.from(section.querySelectorAll('[data-brand-card]'));
  if (!cards.length) return;

  cards.forEach((card) => setAnimationInitial(card, ANIMATION_TYPES.FADE_RIGHT));

  const timeline = createScrollTimeline({ trigger: section, start: 'top 75%' });
  timeline.add(toAnimation(cards, ANIMATION_TYPES.FADE_RIGHT, { stagger: 0.16 }));
}

function initDistributionSectionAnimations() {
  const section = document.getElementById('distribution-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="2"]'));
  const cards = Array.from(section.querySelectorAll('[data-distribution-card]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.FADE_LEFT));
  cards.forEach((card) => setAnimationInitial(card, ANIMATION_TYPES.FADE_UP));

  const timeline = createScrollTimeline({ trigger: section, start: 'top 75%' });

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.FADE_LEFT, { stagger: 0.12 }));
  }

  if (cards.length) {
    timeline.add(toAnimation(cards, ANIMATION_TYPES.FADE_UP, { stagger: 0.16 }), '-=0.25');
  }
}

function initQualitySectionAnimations() {
  const section = document.getElementById('quality-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="1"]'));
  const countItems = Array.from(section.querySelectorAll('[data-anim="4"][data-count-value]'));
  const statLines = Array.from(section.querySelectorAll('[data-stat-line]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.APPEAR_Z));
  countItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
    gsap.set(item, { autoAlpha: 0, y: 10 });
  });
  statLines.forEach((line) => gsap.set(line, { scaleX: 0, transformOrigin: 'left center' }));

  const timeline = createScrollTimeline({ trigger: section, start: 'top 72%' });

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.APPEAR_Z, { stagger: 0.08 }));
  }

  if (countItems.length) {
    timeline.to(countItems, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.1 }, '-=0.3');
    timeline.add(animateCountUp(countItems), '<');
  }

  if (statLines.length) {
    timeline.to(statLines, { scaleX: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08 }, '<');
  }
}

function initTransformationSectionAnimations() {
  const section = document.getElementById('transformation-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const topTextItems = Array.from(section.querySelectorAll('[data-transformation-top-text]'));
  const topImage = section.querySelector('[data-transformation-top-image]');
  const rightText = section.querySelector('[data-transformation-right-text]');
  if (!topTextItems.length && !topImage && !rightText) return;

  topTextItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.FADE_LEFT));

  if (topImage) {
    setAnimationInitial(topImage, ANIMATION_TYPES.FADE_UP);
  }

  if (rightText) {
    setAnimationInitial(rightText, ANIMATION_TYPES.FADE_UP);
  }

  const timeline = createScrollTimeline({ trigger: section, start: 'top 75%' });

  if (topTextItems.length) {
    timeline.add(toAnimation(topTextItems, ANIMATION_TYPES.FADE_LEFT, { stagger: 0.12 }));
  }

  if (topImage) {
    timeline.add(toAnimation(topImage, ANIMATION_TYPES.FADE_UP), '-=0.2');
  }

  if (rightText) {
    timeline.add(toAnimation(rightText, ANIMATION_TYPES.FADE_UP), '-=0.15');
  }
}

export function initExpertisesPage() {
  initFishingSectionAnimations();
  initTransformationSectionAnimations();
  initQualitySectionAnimations();
  initDistributionSectionAnimations();
  initBrandsSectionAnimations();
  initSupportSectionAnimations();
  initRhSectionAnimations();

  const tabs = Array.from(document.querySelectorAll('[data-expertise-tab]'));
  const sectionIds = ['peche', 'transformation', 'distribution', 'logistique', 'rh'];

  if (!tabs.length) return;

  const isMd = () => window.innerWidth >= 768;

  const setActiveTab = (targetId) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.target === targetId;
      tab.dataset.active = String(isActive);
      tab.setAttribute('aria-current', isActive ? 'page' : 'false');

      if (isMd()) {
        gsap.to(tab, {
          height: isActive ? 47 : 29,
          paddingTop: isActive ? 15 : 7,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
        });
      } else {
        tab.classList.toggle('md:h-[47px]', isActive);
        tab.classList.toggle('md:pt-[15px]', isActive);
        tab.classList.toggle('md:h-[29px]', !isActive);
        tab.classList.toggle('md:pt-[7px]', !isActive);
      }
    });
  };

  tabs.forEach((tab) => {
    if (tab.dataset.navInitialized === 'true') return;
    tab.dataset.navInitialized = 'true';
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      if (targetId) setActiveTab(targetId);
    });
  });

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) {
    setActiveTab('peche');
    return;
  }

  const getStickyOffset = () => (window.innerWidth >= 1024 ? 194 : 150);

  const updateActiveFromScroll = () => {
    const referenceY = window.scrollY + getStickyOffset();
    let activeId = sections[0].id;

    sections.forEach((section) => {
      if (section.offsetTop <= referenceY) {
        activeId = section.id;
      }
    });

    setActiveTab(activeId);
  };

  const hashTarget = window.location.hash.replace('#', '');
  if (sectionIds.includes(hashTarget)) {
    setActiveTab(hashTarget);
  } else {
    updateActiveFromScroll();
  }

  if (document.body.dataset.expertisesScrollBound !== 'true') {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    }, { passive: true });

    window.addEventListener('resize', updateActiveFromScroll);
    document.body.dataset.expertisesScrollBound = 'true';
  }

  requestAnimationFrame(updateActiveFromScroll);
}
