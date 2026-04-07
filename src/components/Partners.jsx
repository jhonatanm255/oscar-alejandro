import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';

const Partners = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo grid items pop in with stagger
      gsap.from('.partner-item', {
        scale: 0.7,
        opacity: 0,
        duration: 0.6,
        stagger: {
          each: 0.07,
          from: 'center',
        },
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.partner-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-surface py-32 px-8 flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full text-center mb-16">
         <span className="text-tertiary font-body font-bold text-sm tracking-widest block mb-4">
           Marcas que Confían
         </span>
         <h2 className="font-display font-black text-4xl md:text-5xl lg:text-5xl tracking-tight text-gray-900">
           Amigos del Proyecto
         </h2>
      </div>

      <div className="partner-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
        {[1,2,3,4,5,6,7,8].map((i) => (
          <div 
            key={i} 
            className="partner-item aspect-[4/3] bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center opacity-70 hover:opacity-100 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer will-change-transform"
          >
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <span className="text-xs font-bold uppercase tracking-widest font-body">Logo</span>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
