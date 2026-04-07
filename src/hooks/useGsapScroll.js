import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Subtle parallax — element drifts at a different speed on scroll.
 * @param {number} speed – positive = slower, negative = faster than scroll
 * @param {string} direction – 'y' or 'x'
 */
export function useParallax(speed = 30, direction = 'y') {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(el, {
      [direction]: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, direction]);
  return ref;
}

/**
 * Fade-in + slide on scroll. Subtle default distance.
 */
export function useScrollReveal({ y = 40, x = 0, duration = 0.9, delay = 0, stagger = 0, children = false } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = children ? el.children : el;
    gsap.set(targets, { autoAlpha: 0, y, x });
    const tween = gsap.to(targets, {
      autoAlpha: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger: stagger || 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, x, duration, delay, stagger, children]);
  return ref;
}

/**
 * Scale-in from slightly smaller.
 */
export function useScrollScale({ from = 0.92, duration = 0.8, delay = 0 } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { scale: from, autoAlpha: 0 });
    const tween = gsap.to(el, {
      scale: 1,
      autoAlpha: 1,
      duration,
      delay,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [from, duration, delay]);
  return ref;
}

/**
 * Horizontal text scroll (marquee scrub).
 */
export function useScrollMarquee(speed = 200) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(el, {
      x: -speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);
  return ref;
}

/**
 * Counter animation triggered on scroll.
 */
export function useScrollCounter(endValue, duration = 2) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: endValue,
      duration,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.val);
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [endValue, duration]);
  return ref;
}

/**
 * Batch-init: call once in the root to set up global GSAP defaults + smooth config.
 */
export function initGsapDefaults() {
  gsap.defaults({ ease: 'power2.out', duration: 0.8 });
  ScrollTrigger.config({ limitCallbacks: true });
}

export { gsap, ScrollTrigger };
