import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import { useAdmin } from '../context/AdminContext';

const Galeria = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger-in gallery items with scale + fade
      gsap.utils.toArray('.galeria-item').forEach((item, i) => {
        gsap.from(item, {
          scale: 0.85,
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: (i % 3) * 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Parallax on gallery images for depth
      gsap.utils.toArray('.galeria-img').forEach((img) => {
        gsap.to(img, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.galeria-item'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="galeria" className="bg-background py-32 px-8">
      <div className="max-w-7xl mx-auto w-full text-center mb-16">
        <div>
          <p className="text-primary text-3xl mb-1" style={{ fontFamily: '"Caveat", cursive' }}>
            momentos que no se olvidan
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-gray-900">
            Galería Visual
          </h2>
        </div>
      </div>

      {/* Masonry-style grid with slight random rotations for a scrapbook feel */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {[1, 2, 3, 4, 5, 6].map((i) => {
          const rotations = ['-1.5deg', '1deg', '-0.5deg', '2deg', '-1deg', '0.5deg'];
          return (
            <div
              key={i}
              style={{ rotate: rotations[i - 1], display: 'block' }}
              className="galeria-item relative group overflow-hidden rounded-[1.75rem] shadow-md hover:shadow-2xl break-inside-avoid cursor-pointer transition-all duration-300 bg-white border-[5px] border-white hover:scale-[1.03] hover:rotate-0"
            >
              <img
                src={`https://images.unsplash.com/photo-${1500000000000 + i * 123456}?auto=format&fit=crop&w=600&q=80`}
                alt="Gallery item"
                className="galeria-img w-full h-auto object-cover transition-transform duration-700 ease-out"
                style={{ transform: 'scale(1.1)' }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-end justify-center pb-6">
                <span className="opacity-0 group-hover:opacity-100 text-white font-body font-bold text-sm tracking-wider transition-all duration-400 transform translate-y-4 group-hover:translate-y-0 bg-white/30 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
                  Ver foto
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Galeria;
