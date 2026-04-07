import React, { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';

const Peliculas = () => {
  const { data } = useAdmin();
  const videos = data.peliculas || [];
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each video row slides in from alternating sides
      gsap.utils.toArray('.pelicula-row').forEach((row, i) => {
        gsap.from(row, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [videos]);

  return (
    <section ref={sectionRef} id="peliculas" className="py-24 px-8 overflow-hidden" style={{ background: '#EBF8FF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-3xl mb-1" style={{ fontFamily: '"Caveat", cursive' }}>
              en el canal de YouTube
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight text-gray-900">
              Películas y Documentales
            </h2>
          </motion.div>

          <motion.a
            href="#"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary hover:text-primary-dim font-body font-bold text-sm flex items-center gap-2 transition-colors"
          >
            Ir al canal →
          </motion.a>
        </div>

        <div className="flex flex-col gap-6">
          {videos.map((vid, i) => (
            <div
              key={vid.id}
              className="pelicula-row group bg-white rounded-[2rem] p-5 flex flex-col md:flex-row gap-6 items-center shadow-md shadow-sky-100 hover:shadow-xl hover:shadow-sky-200/50 transition-all duration-300 cursor-pointer border border-sky-100"
            >
              <div className="relative w-full md:w-72 h-48 bg-gray-200 rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={e => { e.target.src = 'https://placehold.co/400x250/e2e8f0/1e293b?text=Video+No+Disponible'; }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center pl-1 text-primary shadow-xl group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="flex-1 font-body text-left px-2 md:px-0 py-2">
                <p className="text-primary text-2xl" style={{ fontFamily: '"Caveat", cursive' }}>Documental</p>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors leading-snug">{vid.title}</h3>
                <p className="text-gray-500 font-medium text-base mb-5 leading-relaxed max-w-2xl">{vid.desc}</p>
                <div className="flex gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span className="text-sky-700 bg-sky-100 px-3 py-1 rounded-full">{vid.views} vistas</span>
                  <span className="self-center">•</span>
                  <span>{vid.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Peliculas;
