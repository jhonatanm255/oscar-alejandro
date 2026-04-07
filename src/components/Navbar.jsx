import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[80%] rounded-full z-50 bg-white/65 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center px-8 py-3.5 max-w-7xl mx-auto">
        {/* Logo — uses script font for warmth */}
        <a href="#" className="flex items-baseline gap-1" onClick={closeMenu}>
          <span className="font-display font-black text-xl tracking-tight text-gray-900">Oscar</span>
          <span className="text-2xl text-primary" style={{ fontFamily: '"Caveat", cursive' }}>Alejandro</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex flex-1 justify-center gap-8 font-body font-bold text-sm text-gray-600 items-center">
          <li><a href="#expediciones" className="hover:text-primary transition-colors cursor-pointer">Expediciones</a></li>
          <li><a href="#peliculas" className="hover:text-primary transition-colors cursor-pointer">Películas</a></li>
          <li><a href="#historias" className="hover:text-primary transition-colors cursor-pointer">Historias</a></li>
          <li><a href="#galeria" className="hover:text-primary transition-colors cursor-pointer">Galería</a></li>
          <li><a href="#sobre-mi" className="hover:text-primary transition-colors cursor-pointer">Sobre mí</a></li>
          <li><a href="#contacto" className="hover:text-primary transition-colors cursor-pointer">Contacto</a></li>
        </ul>
        <div className="hidden md:block">
          <button className="bg-primary hover:bg-primary-dim text-white font-body font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 transform">
            Únete a la Aventura
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-900 focus:outline-none z-50 relative" onClick={toggleMenu}>
          <AnimatePresence mode="wait">
             {isMobileMenuOpen ? (
               <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                 <X size={28} />
               </motion.div>
             ) : (
               <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                 <Menu size={28} />
               </motion.div>
             )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-sm mt-2 rounded-3xl border-t border-gray-100 shadow-xl absolute top-full left-0 w-full overflow-hidden"
          >
            <div className="px-8 py-6 flex flex-col gap-6">
              <ul className="flex flex-col gap-5 font-body font-bold text-base text-gray-800">
                {['expediciones','peliculas','historias','galeria','sobre-mi','contacto'].map((id, i) => (
                  <motion.li key={id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 + i * 0.05 }}>
                    <a href={`#${id}`} className="hover:text-primary transition-colors block capitalize" onClick={closeMenu}>
                      {id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.button 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}
                className="bg-primary text-white font-body font-bold text-sm px-6 py-4 rounded-full hover:bg-primary-dim transition-colors shadow-md w-full" 
                onClick={closeMenu}
              >
                Únete a la Aventura
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
