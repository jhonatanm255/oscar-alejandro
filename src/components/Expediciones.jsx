import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';

const destinos_default = [
  {
    id: 1, title: 'Patagonia Extrema', tag: 'Aventura',
    desc: '14 días cruzando glaciares y montañas. Compartiendo la calidez de su gente en medio del frío.',
    image: 'https://images.unsplash.com/photo-1510250669294-807e3355be88?q=80&w=800&auto=format&fit=crop',
    rotate: '-2deg'
  },
  {
    id: 2, title: 'Ruta del Desierto', tag: 'Exploración',
    desc: 'Nuestra aventura en todoterreno por el Sahara, descubriendo oasis escondidos.',
    image: 'https://images.unsplash.com/photo-1547481079-6b5d2daeb9f9?q=80&w=800&auto=format&fit=crop',
    rotate: '1.5deg'
  },
  {
    id: 3, title: 'Japón Oculto', tag: 'Cultura',
    desc: 'Me enamoré descubriendo santuarios olvidados en Kioto. Te cuento por qué.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    rotate: '-1deg'
  },
];

const TAG_COLORS = {
  'Aventura':   'bg-amber-100 text-amber-800',
  'Exploración':'bg-sky-100 text-sky-800',
  'Cultura':    'bg-rose-100 text-rose-800',
};

const Expediciones = () => {
  const { data } = useAdmin();
  const destinos = (data.expediciones || destinos_default).map((d, i) => ({
    ...d, rotate: ['-2deg','1.5deg','-1deg'][i % 3]
  }));

  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards stagger in with slight rotation
      gsap.from('.exp-card', {
        y: 70,
        opacity: 0,
        rotateZ: 4,
        scale: 0.92,
        duration: 1.1,
        stagger: 0.18,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      // Subtle parallax on the card images
      document.querySelectorAll('.exp-card-img').forEach((img) => {
        gsap.to(img, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.exp-card'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="expediciones" className="py-24 px-8 overflow-hidden" style={{ background: '#FFF8F0' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-amber-500 text-3xl mb-1" style={{ fontFamily: '"Caveat", cursive' }}>
            próximas aventuras
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight text-gray-900">
            Expediciones
          </h2>
        </motion.div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {destinos.map((dest, i) => (
            <div
              key={dest.id}
              style={{ rotate: dest.rotate }}
              className="exp-card group cursor-pointer"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-amber-200/50 overflow-hidden border border-amber-100/60 transition-shadow hover:shadow-2xl hover:scale-[1.03] hover:rotate-0 transition-transform duration-300">
                <div className="relative overflow-hidden" style={{ height: '260px' }}>
                  <img
                    src={dest.image} alt={dest.title}
                    className="exp-card-img w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 82%, 95% 88%, 90% 82%, 85% 89%, 78% 83%, 72% 91%, 65% 84%, 58% 92%, 50% 85%, 42% 93%, 35% 86%, 28% 92%, 20% 84%, 12% 91%, 6% 85%, 0% 90%)', transform: 'scale(1.15)' }}
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`font-body font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${TAG_COLORS[dest.tag] || 'bg-white/90 text-gray-800'}`}>
                      {dest.tag}
                    </span>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">{dest.title}</h3>
                  <p className="font-body text-gray-500 text-sm mb-5 leading-relaxed">{dest.desc}</p>
                  <button className="text-amber-600 font-body font-bold text-sm flex items-center gap-1.5 group/btn hover:gap-3 transition-all duration-200">
                    Acompáñame <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expediciones;
