import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';

const SobreMi = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Polaroid photo — slide in from left with rotation
      gsap.from('.sobremi-photo', {
        x: -100,
        opacity: 0,
        rotate: -8,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Text content — slide in from right, children stagger
      gsap.from('.sobremi-text > *', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.sobremi-text',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Parallax drift on the polaroid
      gsap.to('.sobremi-photo', {
        y: -25,
        rotate: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sobre-mi" className="py-24 px-8 overflow-hidden" style={{ background: '#FFF8F0' }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">

        {/* Polaroid photo tilted */}
        <div
          className="sobremi-photo flex-1 w-full flex justify-center lg:justify-start will-change-transform"
          style={{ rotate: '-2deg' }}
        >
          <div className="bg-white p-4 pb-12 shadow-2xl shadow-amber-200/60 max-w-[360px] w-full border border-amber-50" style={{ borderRadius: '4px' }}>
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
                alt="Oscar Alejandro"
                className="w-full object-cover"
              />
            </div>
            <p className="text-center text-amber-600 text-2xl mt-4 px-2" style={{ fontFamily: '"Caveat", cursive' }}>
              En algún lugar del mundo... 🌍
            </p>
          </div>
        </div>

        {/* Text */}
        <div className="sobremi-text flex-1 w-full text-left">
          <p className="text-amber-500 text-3xl mb-1" style={{ fontFamily: '"Caveat", cursive' }}>
            un poco sobre mí
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-gray-900 mb-8 leading-tight">
            ¡Encantado de conocerte!
          </h2>
          <div className="space-y-5 font-body text-gray-600 text-base lg:text-lg mb-10 leading-relaxed font-medium">
            <p>
              He dedicado la última década a documentar las culturas más fascinantes del planeta. Empecé con una pequeña cámara y muchas ganas de aprender. Hoy, cada viaje es un intento de acercarte el mundo, rompiendo estigmas y construyendo puentes.
            </p>
            <p>
              Mi mayor alegría es inspirarte a dejar tu zona de confort y explorar lo desconocido. No viajamos para escapar de la vida, sino para que la vida no se nos escape.
            </p>
            <p className="text-2xl text-amber-600" style={{ fontFamily: '"Caveat", cursive' }}>
               ¡Gracias por acompañarme en esta locura linda! 🙌
            </p>
          </div>
          <button className="bg-gray-900 text-white font-body font-bold text-sm px-8 py-4 rounded-full hover:bg-gray-700 transition-all shadow-md hover:-translate-y-0.5 transform">
            Escríbeme
          </button>
        </div>
      </div>
    </section>
  );
};

export default SobreMi;
