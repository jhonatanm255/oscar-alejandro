import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, BatteryFull, Video, Crosshair } from 'lucide-react';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    // Progress interval (approx 4 seconds to reach 100)
    // 4000ms / 100 = 40ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Wait a bit at 100% then fire event
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Update timecode based on progress (simulating frame time)
  useEffect(() => {
    // just some logic to make numbers spin
    const msecs = Math.floor(progress * 40 % 100).toString().padStart(2, '0');
    const secs = Math.floor(progress * 40 / 1000).toString().padStart(2, '0');
    setTimecode(`00:00:${secs}:${msecs}`);
  }, [progress]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col items-center justify-center font-body"
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Video (Darkened) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105 pointer-events-none"
      >
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
      </video>

      {/* Background dark gradient overlay just in case video fails or to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-80"></div>

      {/* Camera UI Overlay */}
      <div className="absolute inset-4 md:inset-8 pointer-events-none">
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-8 md:w-16 h-8 md:h-16 border-t-2 border-l-2 border-white/50"></div>
        <div className="absolute top-0 right-0 w-8 md:w-16 h-8 md:h-16 border-t-2 border-r-2 border-white/50"></div>
        <div className="absolute bottom-0 left-0 w-8 md:w-16 h-8 md:h-16 border-b-2 border-l-2 border-white/50"></div>
        <div className="absolute bottom-0 right-0 w-8 md:w-16 h-8 md:h-16 border-b-2 border-r-2 border-white/50"></div>

        {/* Top Info Bar */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start text-white/80 font-mono text-xs sm:text-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Video size={16} /> <span className="tracking-widest hidden sm:inline">1080p 60FPS</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <BatteryFull size={16} /> <span>100%</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-red-500 font-bold tracking-widest text-sm sm:text-base">
              <motion.div 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
              />
              REC
            </div>
            <div className="tracking-widest tabular-nums text-white/90">
              {timecode}
            </div>
          </div>
        </div>

        {/* Center Crosshair (subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 hidden sm:block">
          <Crosshair size={64} strokeWidth={1} />
        </div>
      </div>

      {/* Main Presentation Text */}
      <div className="relative z-10 flex flex-col items-center gap-2 mix-blend-screen text-center px-4 -mt-10">
        <motion.h1 
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          className="text-white text-3xl sm:text-5xl md:text-7xl font-display uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold"
        >
          Oscar Alejandro
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-white/70 tracking-[0.2em] md:tracking-[0.4em] text-xs sm:text-sm uppercase font-light"
        >
          Travel & Adventure Creator
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
