import React, { useState, useEffect, useRef } from 'react';
import { Send, MapPin, Mail, Instagram, Youtube } from 'lucide-react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';

// Replace with Oscar's real email before deploying
const CONTACT_EMAIL = 'business@oscaralejandro.com';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const sectionRef = useRef(null);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _subject: `[Web] ${form.subject}`,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (_) {
      setStatus('error');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left info panel slides in
      gsap.from('.contact-info > *', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      // Form slides in from right
      gsap.from('.contact-form', {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const inputCls = "w-full bg-white border border-gray-200 focus:border-primary outline-none text-gray-900 rounded-xl px-5 py-4 text-base font-body transition-colors shadow-sm placeholder:text-gray-400";

  return (
    <section ref={sectionRef} id="contacto" className="bg-white py-32 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-start">

        {/* Left — Info */}
        <div className="contact-info flex-1">
          <p className="text-primary text-3xl mb-1" style={{ fontFamily: '"Caveat", cursive' }}>
            ¡hablemos!
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-5xl tracking-tight text-gray-900 mb-6 leading-tight">
            Tengo ganas de<br/>escucharte.
          </h2>
          <p className="font-body text-gray-600 text-lg leading-relaxed mb-10 max-w-md font-medium">
            Si tienes una idea de colaboración, un proyecto emocionante o simplemente quieres saludar — escríbeme. Respondo todos los mensajes personalmente.
          </p>

          <div className="space-y-5 font-body text-base text-gray-600">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 hover:text-primary transition-colors group">
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-primary/10 rounded-2xl flex items-center justify-center transition-colors flex-shrink-0">
                <Mail size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">Email</p>
                <p className="font-semibold text-gray-900">{CONTACT_EMAIL}</p>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">Ubicación</p>
                <p className="font-semibold text-gray-900">Miami, FL — Representación Global</p>
              </div>
            </div>
          </div>

          {/* Social quick-links */}
          <div className="flex gap-3 mt-10">
            {[
              { href: '#', Icon: Instagram, label: 'Instagram' },
              { href: '#', Icon: Youtube, label: 'YouTube' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} aria-label={label}
                className="w-12 h-12 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 rounded-2xl flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="contact-form flex-1 w-full">
          {status === 'success' ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-12 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-display font-bold text-2xl text-gray-900 mb-3">¡Mensaje enviado!</h3>
              <p className="text-gray-600 font-body mb-6">Gracias por escribir. Le respondo personalmente en las próximas 24–48 horas.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-primary font-body font-bold underline underline-offset-2 hover:text-primary-dim transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Tu nombre</label>
                  <input required value={form.name} onChange={set('name')} placeholder="Oscar Ejemplo" className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Tu email</label>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="hola@email.com" className={inputCls} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Asunto</label>
                <input required value={form.subject} onChange={set('subject')} placeholder="Colaboración, pregunta, saludo..." className={inputCls} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Mensaje</label>
                <textarea required value={form.message} onChange={set('message')} rows={6} placeholder="Cuéntame de qué va tu proyecto o lo que quieras decirme..." className={`${inputCls} resize-none`} />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-body">Hubo un problema al enviar. Intenta de nuevo o escríbeme directamente al email.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-primary hover:bg-primary-dim disabled:opacity-60 text-white font-body font-bold text-base py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
              >
                {status === 'sending' ? (
                  <>Enviando... <span className="animate-spin">⟳</span></>
                ) : (
                  <>Enviar mensaje <Send size={18} /></>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center font-body">
                Los mensajes van directamente a Oscar. Sin intermediarios. 🌍
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
