import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Mail, MapPin } from 'lucide-react';

const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#0e0e0e] relative overflow-hidden pt-32 pb-12 px-8 border-t border-gray-800">
      
      {/* Massive Watermark text */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full overflow-hidden flex flex-col justify-between py-8 px-8 md:px-16 select-none pointer-events-none z-0"
      >
        <h1 className="font-display font-black text-[14vw] md:text-[12vw] leading-none whitespace-nowrap text-left text-white">
          OSCAR
        </h1>
        <h1 className="font-display font-black text-[14vw] md:text-[12vw] leading-none whitespace-nowrap text-right text-white">
          ALEJANDRO
        </h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between gap-16 mt-[8vw]"
      >
         
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 w-full font-body">
            
            {/* Contact */}
            <div>
              <h4 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6">Contacto</h4>
              <ul className="space-y-4 text-base text-gray-500">
                <li>
                  <a href="mailto:business@oscaralejandro.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Mail size={20} /> business@oscaralejandro.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={20} className="flex-shrink-0" /> Miami, FL | Representación Global
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6">Conectar</h4>
              <ul className="space-y-4 text-base text-gray-500">
                <li><a href="#" className="flex items-center gap-3 hover:text-white transition-colors w-fit"><Instagram size={20} /> Instagram</a></li>
                <li><a href="#" className="flex items-center gap-3 hover:text-white transition-colors w-fit"><TikTokIcon size={20} /> TikTok</a></li>
                <li><a href="#" className="flex items-center gap-3 hover:text-white transition-colors w-fit"><Youtube size={20} /> YouTube</a></li>
                <li><a href="#" className="flex items-center gap-3 hover:text-white transition-colors w-fit"><Linkedin size={20} /> LinkedIn</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-2 lg:col-span-1">
              <h4 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6">Boletín</h4>
              <div className="flex bg-[#262626] rounded-full overflow-hidden border border-white/10 focus-within:border-primary/50 transition-colors shadow-sm">
                 <input type="email" placeholder="TU CORREO:" className="bg-transparent border-none outline-none text-white px-5 py-4 text-base w-full" />
                 <button className="bg-primary text-black font-bold px-6 py-4 text-sm uppercase hover:bg-white transition-colors">Enviar</button>
              </div>
            </div>

            {/* Legal */}
            <div className="lg:ml-auto">
              <h4 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6">Privacidad</h4>
              <ul className="space-y-4 text-base text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors block">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors block">Términos de Servicio</a></li>
              </ul>
            </div>
         </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-24 text-sm font-body text-gray-600 font-medium relative z-10"
      >
         <p>© 2026 OSCAR ALEJANDRO. Todos los derechos reservados.</p>
         <button className="mt-4 sm:mt-0 flex items-center gap-2 hover:text-white transition-colors">
            🌐 EN / ES
         </button>
      </motion.div>

    </footer>
  );
};

export default Footer;
