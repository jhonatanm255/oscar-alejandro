import React, { createContext, useContext, useState, useEffect } from 'react';

const DEFAULT_STATE = {
  stats: {
    youtube:   { count: '1.8M+', growth: '+12%' },
    instagram: { count: '640K+', growth: '+15%' },
    tiktok:    { count: '950K+', growth: '+23%' },
  },
  galleryImages: [
    { id: 1, url: 'https://images.unsplash.com/photo-1500123456789?auto=format&fit=crop&w=600&q=80', caption: 'Patagonia, 2023' },
    { id: 2, url: 'https://images.unsplash.com/photo-1500000123456?auto=format&fit=crop&w=600&q=80', caption: 'Sahara, 2022' },
    { id: 3, url: 'https://images.unsplash.com/photo-1500000246813?auto=format&fit=crop&w=600&q=80', caption: 'Kioto, 2023' },
    { id: 4, url: 'https://images.unsplash.com/photo-1500000370269?auto=format&fit=crop&w=600&q=80', caption: 'Nepal, 2024' },
    { id: 5, url: 'https://images.unsplash.com/photo-1500000493725?auto=format&fit=crop&w=600&q=80', caption: 'Islandia, 2022' },
    { id: 6, url: 'https://images.unsplash.com/photo-1500000617181?auto=format&fit=crop&w=600&q=80', caption: 'Colombia, 2024' },
  ],
  peliculas: [
    { id: 1, title: '30 Días en el Ártico', desc: 'Un mes con las comunidades más aisladas del mundo.', views: '1.2M', date: 'Hace 1 mes', thumbnail: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&w=400&q=80' },
    { id: 2, title: 'Cruzando África en Tren', desc: 'Dormir, comer y conocer gente increíble sobre rieles.', views: '850K', date: 'Hace 3 meses', thumbnail: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=400&q=80' },
    { id: 3, title: 'El Misterio del Triángulo de las Bermudas', desc: 'Navegamos las aguas más temidas para descubrir la verdad.', views: '2.5M', date: 'Hace 6 meses', thumbnail: 'https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&w=400&q=80' },
  ],
  expediciones: [
    { id: 1, title: 'Patagonia Extrema', tag: 'Aventura', desc: '14 días cruzando glaciares y montañas. Compartiendo la calidez de su gente en medio del frío.', image: 'https://images.unsplash.com/photo-1510250669294-807e3355be88?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'Ruta del Desierto', tag: 'Exploración', desc: 'Nuestra aventura en todoterreno por el Sahara, descubriendo oasis escondidos.', image: 'https://images.unsplash.com/photo-1547481079-6b5d2daeb9f9?q=80&w=800&auto=format&fit=crop' },
    { id: 3, title: 'Japón Oculto', tag: 'Cultura', desc: 'Me enamoré descubriendo santuarios olvidados en Kioto. Te cuento por qué.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' },
  ],
  audience: {
    subtitle: 'nos ven desde todo el mundo',
    title: 'Viajando por el Mundo',
    description: 'Nuestros videos cruzan fronteras y conectan con gente increíble que comparte esta locura por viajar. El 85% de la familia tiene entre 24 y 44 años.',
    countriesCount: '120+',
    countriesLabel: 'países alcanzados este año',
    metrics: [
      { id: 1, label: 'Estados Unidos', percentage: 43, color: 'from-cyan-500 to-blue-500' },
      { id: 2, label: 'México & LATAM', percentage: 31, color: 'from-amber-400 to-orange-500' },
      { id: 3, label: 'Europa', percentage: 15, color: 'from-emerald-400 to-teal-500' },
    ]
  }
};

const STORAGE_KEY = 'oscar_admin_data';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...DEFAULT_STATE, ...JSON.parse(stored) };
    } catch (_) {}
    return DEFAULT_STATE;
  });

  // Persist every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateStats = (platform, field, value) => {
    setData(prev => ({
      ...prev,
      stats: { ...prev.stats, [platform]: { ...prev.stats[platform], [field]: value } },
    }));
  };

  const updateGalleryImage = (id, updates) => {
    setData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.map(img => img.id === id ? { ...img, ...updates } : img),
    }));
  };

  const updatePelicula = (id, updates) => {
    setData(prev => ({
      ...prev,
      peliculas: prev.peliculas.map(p => p.id === id ? { ...p, ...updates } : p),
    }));
  };

  const updateExpedicion = (id, updates) => {
    setData(prev => ({
      ...prev,
      expediciones: prev.expediciones.map(e => e.id === id ? { ...e, ...updates } : e),
    }));
  };

  const updateAudience = (updates) => {
    setData(prev => ({
      ...prev,
      audience: { ...prev.audience, ...updates },
    }));
  };

  const updateAudienceMetric = (id, updates) => {
    setData(prev => ({
      ...prev,
      audience: {
        ...prev.audience,
        metrics: prev.audience.metrics.map(m => m.id === id ? { ...m, ...updates } : m)
      },
    }));
  };

  const resetToDefaults = () => {
    setData(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AdminContext.Provider value={{ data, updateStats, updateGalleryImage, updatePelicula, updateExpedicion, updateAudience, updateAudienceMetric, resetToDefaults }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}

export default AdminContext;
