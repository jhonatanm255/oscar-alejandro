import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';

/* ── Travel route definitions (SVG viewBox 0 0 500 300) ──
   All routes stay on actual landmasses — mostly horizontal arcs.
   Canada ~(120,82)  USA ~(130,112)  Mexico ~(112,148)
   UK ~(270,82)      France ~(280,92) Spain ~(272,108)
   Italy ~(298,102)  Turkey ~(328,100) Russia-M ~(330,72)
   Russia-S ~(400,65) Egypt ~(312,128) Dubai ~(350,128)
   India ~(385,138)  China ~(420,108) Thailand ~(405,142)
   S.Korea ~(438,105) Japan ~(450,98) */
const travelRoutes = [
  // ── North America ──
  { path: 'M 130 112 Q 118 130 112 148', dur: '3s',   delay: '0s',   color: '#22D3EE' },   // USA → Mexico
  { path: 'M 112 148 Q 120 132 130 112', dur: '3.2s', delay: '1.5s', color: '#FBBF24' },   // Mexico → USA (Return)
  { path: 'M 130 112 Q 125 96 120 82',   dur: '2.5s', delay: '0.4s', color: '#22D3EE' },   // USA → Canada
  { path: 'M 130 112 Q 200 48 270 82',   dur: '4.5s', delay: '0.2s', color: '#22D3EE' },   // USA → UK
  { path: 'M 270 82  Q 210 50 130 112',  dur: '4.8s', delay: '2.5s', color: '#FBBF24' },   // UK → USA (Return)
  { path: 'M 130 112 Q 285 12 450 98',   dur: '6s',   delay: '0.6s', color: '#22D3EE' },   // USA → Japan

  // ── USA ↔ South America (New) ──
  { path: 'M 145 105 Q 160 140 140 180', dur: '3.5s', delay: '1s',   color: '#FBBF24' },   // USA East → Colombia
  { path: 'M 90 120  Q 120 180 180 220', dur: '4s',   delay: '2s',   color: '#22D3EE' },   // USA West → Brazil
  { path: 'M 145 105 Q 180 180 165 260', dur: '4.5s', delay: '3.5s', color: '#FBBF24' },   // USA East → Argentina
  { path: 'M 180 220 Q 150 150 90 120',  dur: '3.8s', delay: '5s',   color: '#FBBF24' },   // Brazil → USA West (Return)

  // ── Europe ↔ USA (New) ──
  { path: 'M 270 82  Q 200 60 145 105',  dur: '4s',   delay: '3s',   color: '#22D3EE' },   // UK → USA East
  { path: 'M 285 85  Q 200 30 90 120',   dur: '5.5s', delay: '1.5s', color: '#FBBF24' },   // Germany → USA West
  { path: 'M 280 92  Q 200 100 145 105', dur: '4.2s', delay: '4s',   color: '#22D3EE' },   // France → USA East

  // ── Europe ──
  { path: 'M 272 108 Q 300 94 328 100',  dur: '3s',   delay: '1.5s', color: '#FBBF24' },   // Spain → Turkey
  { path: 'M 328 100 Q 305 90 272 108',  dur: '3.2s', delay: '4s',   color: '#22D3EE' },   // Turkey → Spain (Return)
  { path: 'M 270 82  Q 300 72 330 72',   dur: '3.5s', delay: '2.5s', color: '#22D3EE' },   // UK → Russia
  { path: 'M 298 102 Q 305 114 312 128', dur: '2.8s', delay: '2.8s', color: '#FBBF24' },   // Italy → Egypt

  // ── Asia / Oceania ──
  { path: 'M 350 128 Q 368 132 385 138', dur: '3s',   delay: '2.5s', color: '#22D3EE' },   // Dubai → India
  { path: 'M 385 138 Q 402 120 420 108', dur: '3.5s', delay: '3.2s', color: '#FBBF24' },   // India → China
  { path: 'M 420 108 Q 430 106 438 105', dur: '2s',   delay: '3.5s', color: '#22D3EE' },   // China → S.Korea
  { path: 'M 450 98  Q 410 120 385 138', dur: '4s',   delay: '5s',   color: '#22D3EE' },   // Japan → India (Return)
  { path: 'M 385 138 Q 430 200 440 240', dur: '4.5s', delay: '1s',   color: '#FBBF24' },   // India → Australia
  { path: 'M 440 240 Q 420 180 385 138', dur: '4.2s', delay: '6s',   color: '#22D3EE' },   // Australia → India (Return)
];

/* ── Location pin points (países reales) ── */
const pins = [
  { x: 120, y: 82,  label: 'Canadá', color: '#22D3EE' },
  { x: 130, y: 112, label: 'USA Main', color: '#FBBF24' },
  { x: 90,  y: 120, label: 'USA West', color: '#22D3EE' },
  { x: 145, y: 105, label: 'USA East', color: '#FBBF24' },
  { x: 112, y: 148, label: 'México', color: '#22D3EE' },
  { x: 140, y: 180, label: 'Colombia', color: '#FBBF24' },
  { x: 180, y: 220, label: 'Brasil', color: '#22D3EE' },
  { x: 165, y: 260, label: 'Argentina', color: '#FBBF24' },
  { x: 270, y: 82,  label: 'UK',     color: '#FBBF24' },
  { x: 285, y: 85,  label: 'Alemania', color: '#22D3EE' },
  { x: 272, y: 108, label: 'España', color: '#22D3EE' },
  { x: 328, y: 100, label: 'Turquía',color: '#FBBF24' },
  { x: 450, y: 98,  label: 'Japón',  color: '#22D3EE' },
  { x: 312, y: 128, label: 'Egipto', color: '#FBBF24' },
  { x: 385, y: 138, label: 'India',  color: '#22D3EE' },
  { x: 440, y: 240, label: 'Australia', color: '#FBBF24' },
];

const AudienceSection = () => {
  const { data } = useAdmin();
  const { audience } = data;

  return (
    <section id="audiencia" className="py-24 px-8 overflow-hidden relative" style={{ background: 'rgba(255, 255, 255, 0.4)' }}>
      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ background: 'radial-gradient(circle at 50% 50%, #BAE6FD 0%, transparent 70%)' }} />

      <style>{`
        @keyframes comet-travel {
          0%   { stroke-dashoffset: 1000; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes pulse-pin {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.1); }
        }
        @keyframes ping-ring {
          0%   { r: 2; opacity: 0.6; stroke-width: 1.5; }
          100% { r: 12; opacity: 0; stroke-width: 0.5; }
        }
        .comet-line {
          stroke-dasharray: 60 1000;
          animation: comet-travel 5s linear infinite;
        }
        .pin-group {
          animation: pulse-pin 3s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        .pin-ring {
          animation: ping-ring 3s ease-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex-1 w-full z-10"
        >
          <p className="text-sky-500 text-3xl mb-1" style={{ fontFamily: '"Caveat", cursive' }}>
            {audience.subtitle}
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight text-slate-900 mb-6">
            {audience.title}
          </h2>
          <p className="font-body text-slate-600 font-medium text-lg mb-12 max-w-lg leading-relaxed">
            {audience.description}
          </p>
          <div className="space-y-10">
            {audience.metrics.map((metric, i) => (
              <StatBar 
                key={metric.id}
                label={metric.label} 
                percentage={metric.percentage} 
                delay={0.2 + (i * 0.1)} 
                color={metric.color} 
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full"
        >
          <div className="bg-white/60 backdrop-blur-md rounded-[3rem] p-6 relative overflow-hidden flex items-center justify-center min-h-[450px] border border-sky-100 shadow-2xl shadow-sky-200/50">
            {/* World map background with light contrast */}
            <div className="absolute inset-0 opacity-[0.25] filter contrast-[1.1] saturate-[1.2]" 
                 style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', margin: '2rem' }} />

            {/* ── Animated travel lines overlay ── */}
            <svg
              viewBox="0 0 500 300"
              className="absolute inset-0 w-full h-full z-[1]"
              preserveAspectRatio="xMidYMid meet"
              style={{ padding: '2rem' }}
            >
              <defs>
                {/* Glow filter for lines */}
                <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Glow filter for pins */}
                <filter id="glow-pin" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Travel arcs */}
              {travelRoutes.map((route, i) => (
                <g key={`route-${i}`}>
                  {/* Faint static path for continuity */}
                  <path
                    d={route.path}
                    fill="none"
                    stroke={route.color}
                    strokeWidth="1.2"
                    opacity="0.15"
                  />
                  {/* Animated comet path */}
                  <path
                    d={route.path}
                    fill="none"
                    stroke={route.color}
                    strokeWidth="2.5"
                    opacity="0.9"
                    filter="url(#glow-line)"
                    className="comet-line"
                    style={{
                      animationDuration: route.dur,
                      animationDelay: route.delay,
                      strokeLinecap: 'round'
                    }}
                  />
                </g>
              ))}

              {/* Location pins - Teardrop shape */}
              {pins.map((pin, i) => (
                <g key={`pin-${i}`} className="pin-group" style={{ animationDelay: `${i * 0.5}s` }}>
                  {/* Ping ring */}
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="4"
                    fill="none"
                    stroke={pin.color}
                    className="pin-ring"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                  {/* Teardrop Pin Icon */}
                  <path
                    d={`M ${pin.x} ${pin.y} 
                       c -1.5 -1.5 -4 -4 -4 -7
                       a 4 4 0 1 1 8 0
                       c 0 3 -2.5 5.5 -4 7 z`}
                    fill={pin.color}
                    filter="url(#glow-pin)"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                  {/* Small hole in pin */}
                  <circle
                    cx={pin.x}
                    cy={pin.y - 7}
                    r="1.5"
                    fill="white"
                  />
                </g>
              ))}
            </svg>

            {/* Central glassmorphism card (Light) */}
            <div className="relative z-10 flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/60 p-10 rounded-[2.5rem] shadow-2xl shadow-sky-200/40">
              <div className="w-20 h-20 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-400/20 mb-6 rotate-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                </svg>
              </div>
              <h3 className="font-display font-black text-7xl text-slate-900 mb-1 tracking-tighter">{audience.countriesCount}</h3>
              <p className="text-2xl text-sky-600 font-medium" style={{ fontFamily: '"Caveat", cursive' }}>
                {audience.countriesLabel}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatBar = ({ label, percentage, delay, color }) => (
  <div className="w-full">
    <div className="flex justify-between font-body text-sm font-bold mb-3">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900 font-bold">{percentage}%</span>
    </div>
    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        className={`h-full bg-gradient-to-r ${color} rounded-full`}
      />
    </div>
  </div>
);

export default AudienceSection;
