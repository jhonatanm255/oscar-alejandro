import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';

const Historias = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards fan in from the right with rotation
      gsap.utils.toArray('.historia-card').forEach((card, i) => {
        gsap.from(card, {
          x: 80,
          opacity: 0,
          rotateZ: 5,
          duration: 0.7,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="historias" className="py-24 px-8 overflow-hidden" style={{ background: '#FFF8F0' }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <p className="text-amber-500 text-3xl mb-1" style={{ fontFamily: '"Caveat", cursive' }}>
            desde mi diario de viaje
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-5xl tracking-tight text-gray-900 mb-6">
            Historias del Camino
          </h2>
          <p className="font-body text-gray-600 font-medium text-lg mb-8 max-w-md leading-relaxed">
            A veces la cámara se apaga, pero la aventura continúa. Aquí te comparto reflexiones y lecciones que han cambiado mi forma de ver el mundo.
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-body font-bold text-sm px-8 py-4 rounded-full transition-all shadow-md shadow-amber-300/50 hover:shadow-lg hover:-translate-y-0.5 transform">
            Leer todas las historias
          </button>
        </motion.div>

        <div className="flex-1 w-full flex gap-6 overflow-x-auto pb-4 snap-x">
          {[
            { bg: 'bg-amber-50', border: 'border-amber-100', accent: 'text-amber-600', img: 1480000000000 + 200000, caption: 'Mongolia, 2021' },
            { bg: 'bg-sky-50',   border: 'border-sky-100',   accent: 'text-sky-600',   img: 1480000000000 + 400000, caption: 'Grecia, 2022' },
            { bg: 'bg-rose-50',  border: 'border-rose-100',  accent: 'text-rose-600',  img: 1480000000000 + 600000, caption: 'Marruecos, 2023' },
          ].map((card, i) => (
            <div
              key={i}
              style={{ rotate: i % 2 === 0 ? '1deg' : '-1deg' }}
              className={`historia-card min-w-[300px] w-[300px] ${card.bg} rounded-[2rem] overflow-hidden shadow-lg flex-shrink-0 snap-center border ${card.border} group cursor-pointer transition-shadow hover:shadow-2xl hover:scale-[1.02] hover:rotate-0 transition-transform duration-300`}
            >
              <div className="h-52 bg-gray-200 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${card.img}?auto=format&fit=crop&w=400&q=80`}
                  alt="blog"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-6 font-body">
                <p className={`text-xl mb-1 ${card.accent}`} style={{ fontFamily: '"Caveat", cursive' }}>{card.caption}</p>
                <h3 className="font-display font-bold text-lg text-gray-900 mb-4 leading-snug group-hover:text-primary transition-colors">
                  Lo que aprendí viviendo 5 días con nómadas
                </h3>
                <div className={`font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all ${card.accent}`}>
                  Continuar leyendo <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Historias;
