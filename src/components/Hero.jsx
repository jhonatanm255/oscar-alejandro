import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';

const AnimatedCounter = ({ value, delay }) => {
  const strValue = String(value);
  const match = strValue.match(/^([\d.,]+)(.*)$/);
  
  const numValue = match ? parseFloat(match[1].replace(/,/g, '')) : 0;
  const suffix = match ? (match[2] || "") : "";
  const isFloat = match ? match[1].includes('.') : false;
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return isFloat ? Math.max(0, latest).toFixed(1) : Math.max(0, Math.round(latest));
  });

  useEffect(() => {
    if (!match) return;
    const controls = animate(count, numValue, {
      duration: 2.5,
      delay: delay + 0.3,
      ease: "easeOut"
    });
    return controls.stop;
  }, [count, numValue, delay, match]);

  if (!match) return <span>{value}</span>;

  return (
    <span className="inline-flex items-center">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const YoutubeIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.582 6.186C21.326 5.228 20.578 4.48 19.619 4.225C17.881 3.75 12 3.75 12 3.75C12 3.75 6.119 3.75 4.381 4.216C3.422 4.471 2.674 5.219 2.418 6.178C1.943 7.915 1.943 12 1.943 12C1.943 12 1.943 16.085 2.418 17.822C2.674 18.781 3.422 19.529 4.381 19.784C6.119 20.25 12 20.25 12 20.25C12 20.25 17.881 20.25 19.619 19.784C20.578 19.529 21.326 18.781 21.582 17.822C22.057 16.085 22.057 12 22.057 12C22.057 12 22.057 7.915 21.582 6.186Z" fill="#FF0000" />
    <path d="M10.0215 15.05L15.3082 11.999L10.0215 8.94797V15.05Z" fill="white" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="url(#ig_grad)" />
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="white" />
    <defs>
      <linearGradient id="ig_grad" x1="4.125" y1="21.75" x2="20.625" y2="2.25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFDD55" />
        <stop offset="0.3" stopColor="#FF543E" />
        <stop offset="0.7" stopColor="#C837AB" />
        <stop offset="1" stopColor="#4C5CDE" />
      </linearGradient>
    </defs>
  </svg>
);

const TiktokIcon = () => (
  <svg width="34" height="34" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#010101" />
    <path d="M21.5 6h-3.4v13.4c0 1.6-1.3 2.9-2.9 2.9s-2.9-1.3-2.9-2.9 1.3-2.9 2.9-2.9c.3 0 .6 0 .8.1V13c-.3 0-.5-.1-.8-.1-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3V12.2c1.2.8 2.6 1.3 4.2 1.3v-3.4c-2.3 0-4.2-1.9-4.2-4.1z" fill="#00f2ea" />
    <path d="M20.9 6.7h-3.4V20c0 1.6-1.3 2.9-2.9 2.9s-2.9-1.3-2.9-2.9 1.3-2.9 2.9-2.9c.3 0 .6 0 .8.1v-3.7c-.3 0-.5-.1-.8-.1-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3V3.65h2.7v4.18c.98.81 2.22 1.32 3.52 1.34v2.91z" fill="white" />
  </svg>
);

const getPlatformStyles = (platform) => {
  switch (platform) {
    case 'YouTube':
      return {
        btnClass: "bg-[#FF0000] text-white hover:bg-red-700 shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)]",
        glowColor: 'rgba(255,0,0,0.25)',
        text: "SUSCRIBIRSE",
        url: "https://www.youtube.com/@OscarAlejandr0"
      };
    case 'Instagram':
      return {
        btnClass: "bg-gradient-to-tr from-[#FFDD55] via-[#FF543E] to-[#C837AB] text-white hover:opacity-90 shadow-[0_0_20px_rgba(200,55,171,0.3)] hover:shadow-[0_0_30px_rgba(200,55,171,0.5)]",
        glowColor: 'rgba(200,55,171,0.2)',
        text: "SEGUIR",
        url: "https://www.instagram.com/oscaralejandro/"
      };
    case 'TikTok':
      return {
        btnClass: "bg-[#010101] text-white hover:bg-[#222] shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-[#00f2ea] hover:shadow-[-2px_2px_15px_rgba(0,242,234,0.4),2px_-2px_15px_rgba(255,0,80,0.4)] border border-transparent",
        glowColor: 'rgba(0,242,234,0.2)',
        text: "SEGUIR",
        url: "https://tiktok.com/@eloscarale"
      };
    default:
      return { btnClass: "bg-gray-900 text-white", glowColor: 'transparent', text: "VISITAR", url: "#" };
  }
};

const StatsCard = ({ icon: Icon, platform, count, growth, delay }) => {
  const { btnClass, text, url } = getPlatformStyles(platform);
  
  return (
    <div className="stats-card bg-white/95 backdrop-blur-2xl rounded-3xl p-6 px-8 flex flex-col items-center justify-center border border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.08)] will-change-transform">
      <div className="mb-4 stats-icon"><Icon /></div>
      <span className="text-gray-400 font-body font-bold text-[10px] tracking-widest uppercase mb-1">{platform}</span>
      <span className="font-display font-black text-4xl lg:text-5xl text-gray-900 mb-2">
        <AnimatedCounter value={count} delay={delay} />
      </span>
      <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full font-body text-xs font-bold flex items-center mb-4">
        ↗ {growth} este mes
      </span>
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block font-display uppercase tracking-widest px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 text-xs font-bold ${btnClass}`}
      >
        {text}
      </a>
    </div>
  );
};

const Hero = ({ isReady = true }) => {
  const { data } = useAdmin();
  const { stats } = data;
  const heroRef = useRef(null);
  const cardsGridRef = useRef(null);

  useEffect(() => {
    if (!isReady || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // ── Stats cards: 3D flip-in with stagger ──
      const cards = gsap.utils.toArray('.stats-card');
      gsap.set(cards, {
        opacity: 0,
        y: 80,
        scale: 0.85,
        rotateX: 15,
        transformPerspective: 800,
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power4.out',
      });

      // ── Subtle floating on cards ──
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: -6,
          duration: 2.2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5 + i * 0.2,
        });
      });

      // ── Icon pulse on each card ──
      gsap.utils.toArray('.stats-icon').forEach((icon, i) => {
        gsap.fromTo(icon, 
          { scale: 0.5, opacity: 0, rotate: -15 },
          { 
            scale: 1, opacity: 1, rotate: 0, 
            duration: 0.6, 
            delay: 0.8 + i * 0.15,
            ease: 'back.out(2)',
          }
        );
      });

      // ── Card hover interactions via GSAP ──
      cards.forEach((card) => {
        const glowEl = document.createElement('div');
        glowEl.className = 'absolute inset-0 rounded-3xl pointer-events-none opacity-0';
        glowEl.style.cssText = 'background: radial-gradient(circle at center, rgba(0,186,255,0.08) 0%, transparent 70%); z-index: 0;';
        card.style.position = 'relative';
        card.appendChild(glowEl);

        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -10, scale: 1.04, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
          gsap.to(glowEl, { opacity: 1, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
          gsap.to(glowEl, { opacity: 0, duration: 0.3 });
        });
      });

      // ── Hero video background subtle zoom ──
      const video = heroRef.current.querySelector('video');
      if (video) {
        gsap.fromTo(video,
          { scale: 1.05 },
          {
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

    }, heroRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-24 px-8 overflow-hidden">
      {/* Local video background */}
      <div className="absolute inset-0 z-0 bg-gray-900">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover opacity-65 will-change-transform"
          poster="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&auto=format&fit=crop&q=80"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-transparent z-10" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center mt-10 lg:mt-16">
        {isReady && (
          <>
            {/* Caveat script overline */}
            <motion.p
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-accent text-3xl md:text-4xl text-white/80 mb-2 drop-shadow"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              Bienvenido a mi mundo
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="font-display font-black text-5xl md:text-7xl leading-[1.08] tracking-tight text-white mb-4 drop-shadow-2xl"
            >
              ¡Hola! Soy<br />
              <span className="relative inline-block mt-1">
                Oscar Alejandro.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 w-full h-3 bg-primary/70 -z-10 origin-left rounded-full"
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="text-white/90 text-2xl md:text-3xl max-w-2xl mb-10 leading-relaxed drop-shadow"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              Viajero, documentalista y eterno curioso.
              Llevo una década recorriendo el mundo y contándolo tal cual es.
            </motion.p>

            {/* Stats Grid — GSAP animated */}
            <div ref={cardsGridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl relative z-20">
              <StatsCard icon={YoutubeIcon} platform="YouTube" count={stats.youtube.count} growth={stats.youtube.growth} delay={0.45} />
              <StatsCard icon={InstagramIcon} platform="Instagram" count={stats.instagram.count} growth={stats.instagram.growth} delay={0.55} />
              <StatsCard icon={TiktokIcon} platform="TikTok" count={stats.tiktok.count} growth={stats.tiktok.growth} delay={0.65} />
            </div>
          </>
        )}
      </div>

      {/* Social Media Infinite Marquee at the bottom of Hero */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-red-600 text-white py-3 z-30 flex whitespace-nowrap border-t border-white/20 shadow-[0_-10px_30px_rgba(220,38,38,0.3)]">
        <motion.div 
          className="flex gap-8 items-center font-display font-bold uppercase tracking-[0.2em] text-xs sm:text-sm"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span>CREADOR DE CONTENIDO</span><span>•</span>
              <span>NUEVO VIDEO CADA SEMANA</span><span>•</span>
              <span>TRAVEL VLOGGER</span><span>•</span>
              <span>+3M SUSCRIPTORES</span><span>•</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
