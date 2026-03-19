import {
  ANIMATION_TYPES,
  createScrollTimeline,
  gsap,
  isReducedMotionPreferred,
  setAnimationInitial,
  toAnimation,
} from './animation.js';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

function formatCountValue(value, decimals = 0) {
  return decimals > 0 ? value.toFixed(decimals).replace('.', ',') : Math.round(value).toString();
}

function setDonutProgress(element, progress, segments) {
  if (!element) return;

  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const visibleAngle = Math.max(30, 360 * clampedProgress);
  let angle = 0;
  const stops = [];

  segments.forEach((segment) => {
    const segmentAngle = (segment.pct / 100) * visibleAngle;
    if (segmentAngle <= 0) return;

    stops.push(`${segment.color} ${angle}deg ${angle + segmentAngle}deg`);
    angle += segmentAngle;
  });

  if (angle < 360) {
    stops.push(`transparent ${angle}deg 360deg`);
  }

  element.style.background = `conic-gradient(${stops.join(', ')})`;
}

function initIntegratedModelAnimations() {
  const section = document.getElementById('modele-integre');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;
  section.dataset.animInitialized = 'true';

  const leftColumn = section.querySelector('[data-anim="2"]');
  const rightColumn = section.querySelector('[data-anim="3"]');
  const leftItems = leftColumn ? Array.from(leftColumn.children) : [];
  const rightCards = rightColumn
    ? Array.from(rightColumn.querySelectorAll(':scope > div > div'))
    : [];

  leftItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.FADE_LEFT));
  rightCards.forEach((card) => setAnimationInitial(card, ANIMATION_TYPES.FADE_UP));

  const timeline = createScrollTimeline({ trigger: section, start: 'top 78%' });
  if (leftItems.length) {
    timeline.add(toAnimation(leftItems, ANIMATION_TYPES.FADE_LEFT, { stagger: 0.13, ease: 'power3.out' }));
  }

  if (rightCards.length) {
    timeline.add(toAnimation(rightCards, ANIMATION_TYPES.FADE_UP, { stagger: 0.1, ease: 'power3.out' }), '-=0.3');
  }
}

function animateCountUp(targets) {
  const elements = Array.isArray(targets) ? targets : Array.from(targets);
  const counter = { value: 0 };

  return gsap.to(counter, {
    value: 1,
    duration: 1.4,
    ease: 'power2.out',
    stagger: 0.12,
    onStart: () => {
      elements.forEach((element) => {
        const decimals = Number(element.dataset.countDecimals || '0');
        element.textContent = `${element.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${element.dataset.countSuffix || ''}`;
      });
    },
    onUpdate: function onUpdate() {
      elements.forEach((element, index) => {
        const targetValue = Number(element.dataset.countValue || '0');
        const decimals = Number(element.dataset.countDecimals || '0');
        const staggerDelay = index * 0.12;
        const progress = Math.min(Math.max((this.progress() - staggerDelay / 1.4) / (1 - staggerDelay / 1.4), 0), 1);
        const rawValue = targetValue * progress;
        const currentValue = decimals > 0 ? Number(rawValue.toFixed(decimals)) : Math.round(rawValue);
        element.textContent = `${element.dataset.countPrefix || ''}${formatCountValue(currentValue, decimals)}${element.dataset.countSuffix || ''}`;
      });
    },
  });
}

function initGroupStatisticsAnimations() {
  const section = document.getElementById('group-statistics');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;
  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="1"]'));
  const countItems = Array.from(section.querySelectorAll('[data-anim="4"]'));
  const statLines = Array.from(section.querySelectorAll('[data-stat-line]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.APPEAR_Z));
  countItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
  });
  statLines.forEach((line) => gsap.set(line, { scaleX: 0, transformOrigin: 'left center' }));

  const timeline = createScrollTimeline({ trigger: section, start: 'top 75%' });
  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.APPEAR_Z, { stagger: 0.12 }));
  }

  if (countItems.length) {
    timeline.add(animateCountUp(countItems), '-=0.15');
  }

  if (statLines.length) {
    timeline.to(statLines, { scaleX: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 }, '<');
  }
}

function initWorldStatsAnimations() {
  const section = document.getElementById('stats-monde');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;
  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="1"]'));
  const countItems = Array.from(section.querySelectorAll('[data-anim="4"]'));
  const chartBars = Array.from(section.querySelectorAll('[data-chart-bar]'));
  const chartLines = Array.from(section.querySelectorAll('[data-chart-line]'));
  const donutChart = section.querySelector('[data-donut-chart]');
  const donutSurface = donutChart?.firstElementChild;
  const legendRows = Array.from(section.querySelectorAll('[data-legend-row]'));
  const legendLines = Array.from(section.querySelectorAll('[data-legend-line]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.APPEAR_Z));
  countItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    setAnimationInitial(item, ANIMATION_TYPES.FADE_RIGHT);
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
  });
  chartBars.forEach((bar) => gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' }));
  chartLines.forEach((line) => gsap.set(line, { scaleY: 0, transformOrigin: 'center top' }));
  legendRows.forEach((row) => gsap.set(row, { autoAlpha: 0, y: 18 }));
  legendLines.forEach((line) => gsap.set(line, { scaleX: 0, transformOrigin: 'left center' }));

  if (donutChart) {
    gsap.set(donutChart, { autoAlpha: 0, scale: 0.86, transformOrigin: 'center center' });
  }

  if (donutSurface) {
    const donutSegments = JSON.parse(donutChart?.dataset.donutSegments || '[]');
    setDonutProgress(donutSurface, 30 / 360, donutSegments);
  }

  const timeline = createScrollTimeline({ trigger: section, start: 'top 72%' });

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.APPEAR_Z, { stagger: 0.08 }));
  }

  if (chartLines.length) {
    timeline.to(chartLines, { scaleY: 1, duration: 0.35, ease: 'power3.out', stagger: 0.06 }, '-=0.15');
  }

  if (chartBars.length) {
    timeline.to(chartBars, { scaleX: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, '<');
  }

  if (countItems.length) {
    timeline.add(animateCountUp(countItems), '-=0.45');
    timeline.add(toAnimation(countItems, ANIMATION_TYPES.FADE_RIGHT, { stagger: 0.05 }), '<');
  }

  if (donutChart) {
    timeline.to(
      donutChart,
      { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.9',
    );
  }

  if (donutSurface) {
    const donutSegments = JSON.parse(donutChart?.dataset.donutSegments || '[]');
    const donutArc = { progress: 30 / 360 };
    timeline.to(
      donutArc,
      {
        progress: 1,
        duration: 0.95,
        ease: 'power3.out',
        onUpdate: () => {
          setDonutProgress(donutSurface, donutArc.progress, donutSegments);
        },
      },
      donutChart ? '<' : '-=0.5',
    );
  }

  if (legendRows.length) {
    timeline.to(
      legendRows,
      { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.06 },
      donutChart ? '-=0.35' : '-=0.2',
    );
  }

  if (legendLines.length) {
    timeline.to(
      legendLines,
      { scaleX: 1, duration: 0.45, ease: 'power3.out', stagger: 0.06 },
      '<',
    );
  }
}

function initMissionAnimations() {
  const section = document.getElementById('raison-detre');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;
  section.dataset.animInitialized = 'true';

  const image = section.querySelector('[data-anim="2"]');
  const textItems = Array.from(section.querySelectorAll('[data-anim="3"]'));

  if (image) {
    setAnimationInitial(image, ANIMATION_TYPES.FADE_LEFT);
  }

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.FADE_UP));

  const timeline = createScrollTimeline({ trigger: section, start: 'top 78%' });
  if (image) {
    timeline.add(toAnimation(image, ANIMATION_TYPES.FADE_LEFT, { ease: 'power3.out' }));
  }

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.FADE_UP, { stagger: 0.13, ease: 'power3.out' }), '-=0.25');
  }
}

function animateActiveHistorySlide(swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (!activeSlide) return;

  const year = activeSlide.querySelector('[data-history-year]');
  const copy = activeSlide.querySelector('[data-history-copy]');

  gsap.killTweensOf([year, copy]);

  if (year) {
    gsap.fromTo(
      year,
      { autoAlpha: 0, x: 30 },
      { autoAlpha: 1, x: 0, duration: 0.55, ease: 'power3.out', overwrite: true },
    );
  }

  if (copy) {
    gsap.fromTo(
      copy,
      { autoAlpha: 0, x: 30 },
      { autoAlpha: 1, x: 0, duration: 0.55, ease: 'power3.out', delay: 0.12, overwrite: true },
    );
  }
}

function initHistoryAnimations() {
  const section = document.getElementById('histoire');
  if (!section) return;

  const slider = section.querySelector('[data-history-slider]');
  const slides = Array.from(section.querySelectorAll('[data-history-slide]'));
  const prevButton = section.querySelector('.history-nav-prev');
  const nextButton = section.querySelector('.history-nav-next');

  if (!slider || !slides.length || !prevButton || !nextButton) return;
  if (slider.dataset.historyInitialized === 'true') return;

  slider.dataset.historyInitialized = 'true';

  if (!isReducedMotionPreferred()) {
    slides.forEach((slide) => setAnimationInitial(slide, ANIMATION_TYPES.FADE_RIGHT));

    const timeline = createScrollTimeline({ trigger: section, start: 'top 75%' });
    timeline.add(toAnimation(slides, ANIMATION_TYPES.FADE_RIGHT, { stagger: 0.12 }));
  } else {
    slides.forEach((slide) => {
      gsap.set(slide, { autoAlpha: 1, x: 0 });
    });
  }

  const swiper = new Swiper(slider, {
    modules: [Navigation],
    speed: 700,
    spaceBetween: 0,
    slidesPerView: 1.08,
    watchOverflow: true,
    grabCursor: true,
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    breakpoints: {
      768: {
        slidesPerView: 2.1,
      },
      1024: {
        slidesPerView: 3.15,
      },
    },
    on: {
      init(instance) {
        animateActiveHistorySlide(instance);
      },
      slideChangeTransitionStart(instance) {
        animateActiveHistorySlide(instance);
      },
    },
  });

  section.addEventListener(
    'astro:unmount',
    () => {
      swiper.destroy(true, true);
      delete slider.dataset.historyInitialized;
    },
    { once: true },
  );
}

export function initGroupePage() {
  initIntegratedModelAnimations();
  initGroupStatisticsAnimations();
  initMissionAnimations();
  initHistoryAnimations();
  initWorldStatsAnimations();
}
