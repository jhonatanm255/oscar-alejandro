import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';

const CTA = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Decorative circles drift on scroll
      gsap.utils.toArray('.cta-circle').forEach((circle, i) => {
        gsap.to(circle, {
          y: (i % 2 === 0 ? -40 : 40),
          x: (i % 2 === 0 ? 20 : -20),
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      });

      // Content reveal
      gsap.from('.cta-content > *', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.cta-content',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      // Buttons pop in
      gsap.from('.cta-buttons > *', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.cta-buttons',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-8 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #00BAFF 40%, #38bdf8 100%)' }}>
      {/* Decorative circles */}
      <div className="cta-circle absolute top-0 left-0 w-72 h-72 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 will-change-transform" />
      <div className="cta-circle absolute bottom-0 right-0 w-96 h-96 rounded-full bg-black/10 translate-x-1/3 translate-y-1/3 will-change-transform" />
      <div className="cta-circle absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-white/5 blur-xl will-change-transform" />

      <div className="cta-content relative z-10 max-w-4xl mx-auto text-center">
        <p className="text-4xl text-white/80 mb-2" style={{ fontFamily: '"Caveat", cursive' }}>
          ¿buscas impacto digital?
        </p>
        <h2 className="font-display font-black text-5xl md:text-7xl leading-tight tracking-[-0.02em] text-white mb-6">
          Potencia tu <span className="underline decoration-white/40 decoration-wavy underline-offset-4">marca</span>.
        </h2>
        <p className="font-body text-white/85 text-lg max-w-xl mx-auto mb-12 leading-relaxed font-medium">
          Llega a millones de personas a través de contenido auténtico, viral y de alta calidad. Descubre cómo podemos llevar tu proyecto al siguiente nivel en redes sociales.
        </p>
        <div className="cta-buttons flex flex-col sm:flex-row gap-5 justify-center">
          <button className="bg-white hover:bg-gray-50 text-sky-600 font-body font-bold text-sm px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transform">
            Hablemos del Proyecto
          </button>
          <button className="bg-transparent border-2 border-white/60 hover:border-white text-white font-body font-bold text-sm px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 transform">
            Descargar Media Kit
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
