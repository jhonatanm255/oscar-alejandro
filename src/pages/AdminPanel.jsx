import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { LogOut, BarChart2, Image, Film, MapPin, RefreshCw, Save, Eye } from 'lucide-react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'oscar2024';

// ──────────────────────────────────────────────────────────────────────────────
// Login Screen
// ──────────────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
      <form onSubmit={submit} className="bg-gray-900 border border-gray-800 rounded-3xl p-10 w-full max-w-sm shadow-2xl text-center">
        <p className="text-4xl mb-2" style={{ fontFamily: '"Caveat", cursive', color: '#00BAFF' }}>Panel Admin</p>
        <h1 className="text-white font-bold text-xl mb-8 font-display">Oscar Alejandro</h1>
        <input
          type="password"
          placeholder="Contraseña"
          value={pw}
          onChange={e => setPw(e.target.value)}
          className={`w-full bg-gray-800 border ${err ? 'border-red-500' : 'border-gray-700'} text-white rounded-xl px-5 py-4 text-sm outline-none focus:border-blue-400 transition-colors mb-4`}
        />
        {err && <p className="text-red-400 text-sm mb-4">Contraseña incorrecta</p>}
        <button type="submit" className="w-full bg-[#00BAFF] hover:bg-[#008bc2] text-white font-bold py-4 rounded-xl transition-colors">
          Entrar
        </button>
        <p className="text-gray-600 text-xs mt-6">Contraseña por defecto: <code className="text-gray-400">oscar2024</code></p>
      </form>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Shared UI pieces
// ──────────────────────────────────────────────────────────────────────────────
const Card = ({ children, title, icon: Icon }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
    <h2 className="flex items-center gap-2 text-white font-bold text-lg mb-5">
      {Icon && <Icon size={18} className="text-[#00BAFF]" />} {title}
    </h2>
    {children}
  </div>
);

const Input = ({ label, value, onChange, type = 'text', placeholder }) => (
  <div className="mb-3">
    {label && <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>}
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#00BAFF] transition-colors"
    />
  </div>
);

const SavedBadge = () => (
  <span className="inline-flex items-center gap-1 text-green-400 text-xs font-bold ml-2">
    <Save size={12} /> Guardado
  </span>
);

// ──────────────────────────────────────────────────────────────────────────────
// Section: Stats
// ──────────────────────────────────────────────────────────────────────────────
function StatsSection() {
  const { data, updateStats } = useAdmin();
  const [saved, setSaved] = useState(false);

  const platforms = [
    { key: 'youtube', label: '▶ YouTube', color: '#FF0000' },
    { key: 'instagram', label: '📷 Instagram', color: '#E1306C' },
    { key: 'tiktok', label: '♪ TikTok', color: '#00f2ea' },
  ];

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <Card title="Estadísticas de Seguidores" icon={BarChart2}>
      <p className="text-gray-500 text-sm mb-6">Actualiza el conteo y el crecimiento mensual de cada red social. Los cambios se reflejan inmediatamente en el sitio.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map(({ key, label }) => (
          <div key={key} className="bg-gray-800 rounded-xl p-5">
            <p className="text-white font-bold mb-4">{label}</p>
            <Input
              label="Seguidores (ej: 1.8M+)"
              value={data.stats[key].count}
              onChange={v => updateStats(key, 'count', v)}
            />
            <Input
              label="Crecimiento mensual (ej: +12%)"
              value={data.stats[key].growth}
              onChange={v => updateStats(key, 'growth', v)}
            />
          </div>
        ))}
      </div>
      <button onClick={save} className="mt-4 bg-[#00BAFF] hover:bg-[#008bc2] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2">
        <Save size={16} /> Guardar estadísticas {saved && <SavedBadge />}
      </button>
    </Card>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Section: Gallery
// ──────────────────────────────────────────────────────────────────────────────
function GallerySection() {
  const { data, updateGalleryImage } = useAdmin();

  return (
    <Card title="Galería de Imágenes" icon={Image}>
      <p className="text-gray-500 text-sm mb-6">Pega la URL de cada imagen y actualiza el texto del pie de foto (caption).</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.galleryImages.map((img) => (
          <div key={img.id} className="bg-gray-800 rounded-xl p-4 flex gap-4 items-start">
            <img
              src={img.url}
              alt={img.caption}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0 bg-gray-700"
              onError={e => { e.target.src = 'https://via.placeholder.com/80?text=?'; }}
            />
            <div className="flex-1 min-w-0">
              <Input
                label={`Foto ${img.id} — URL`}
                value={img.url}
                onChange={v => updateGalleryImage(img.id, { url: v })}
                placeholder="https://..."
              />
              <Input
                label="Caption"
                value={img.caption}
                onChange={v => updateGalleryImage(img.id, { caption: v })}
                placeholder="Patagonia, 2023"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Section: Películas
// ──────────────────────────────────────────────────────────────────────────────
function PeliculasSection() {
  const { data, updatePelicula } = useAdmin();

  return (
    <Card title="Películas y Documentales" icon={Film}>
      <p className="text-gray-500 text-sm mb-6">Edita el título, descripción, número de vistas y fecha de cada video.</p>
      <div className="flex flex-col gap-6">
        {data.peliculas.map((p) => (
          <div key={p.id} className="bg-gray-800 rounded-xl p-5 flex flex-col md:flex-row gap-4 items-start">
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full md:w-36 h-24 object-cover rounded-lg bg-gray-700 flex-shrink-0"
              onError={e => { e.target.src = 'https://via.placeholder.com/144x96?text=Video'; }}
            />
            <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <Input label="Título" value={p.title} onChange={v => updatePelicula(p.id, { title: v })} />
              </div>
              <div className="md:col-span-2">
                <Input label="Descripción" value={p.desc} onChange={v => updatePelicula(p.id, { desc: v })} />
              </div>
              <Input label="URL del thumbnail" value={p.thumbnail} onChange={v => updatePelicula(p.id, { thumbnail: v })} placeholder="https://..." />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Vistas" value={p.views} onChange={v => updatePelicula(p.id, { views: v })} placeholder="1.2M" />
                <Input label="Fecha" value={p.date} onChange={v => updatePelicula(p.id, { date: v })} placeholder="Hace 1 mes" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Section: Expediciones
// ──────────────────────────────────────────────────────────────────────────────
function ExpedicionesSection() {
  const { data, updateExpedicion } = useAdmin();

  return (
    <Card title="Expediciones" icon={MapPin}>
      <p className="text-gray-500 text-sm mb-6">Actualiza los destinos destacados que aparecen en la sección de Expediciones.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.expediciones.map((exp) => (
          <div key={exp.id} className="bg-gray-800 rounded-xl p-4">
            <img
              src={exp.image}
              alt={exp.title}
              className="w-full h-32 object-cover rounded-lg mb-4 bg-gray-700"
              onError={e => { e.target.src = 'https://via.placeholder.com/300x128?text=Imagen'; }}
            />
            <Input label="Título" value={exp.title} onChange={v => updateExpedicion(exp.id, { title: v })} />
            <Input label="Tag (ej: Aventura)" value={exp.tag} onChange={v => updateExpedicion(exp.id, { tag: v })} />
            <Input label="Descripción" value={exp.desc} onChange={v => updateExpedicion(exp.id, { desc: v })} />
            <Input label="URL de imagen" value={exp.image} onChange={v => updateExpedicion(exp.id, { image: v })} placeholder="https://..." />
          </div>
        ))}
      </div>
    </Card>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Main Admin Panel
// ──────────────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'stats', label: 'Estadísticas', icon: BarChart2 },
  { id: 'galeria', label: 'Galería', icon: Image },
  { id: 'peliculas', label: 'Películas', icon: Film },
  { id: 'expediciones', label: 'Expediciones', icon: MapPin },
];

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState('stats');
  const { resetToDefaults } = useAdmin();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-lg">Oscar</span>
            <span className="text-2xl text-[#00BAFF]" style={{ fontFamily: '"Caveat", cursive' }}>Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
              <Eye size={16} /> Ver sitio
            </a>
            <button
              onClick={() => { if (window.confirm('¿Restaurar todos los valores por defecto?')) resetToDefaults(); }}
              className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 text-sm transition-colors"
            >
              <RefreshCw size={15} /> Restaurar
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 bg-gray-800 hover:bg-red-900/50 text-gray-300 hover:text-red-400 text-sm px-4 py-2 rounded-lg transition-colors">
              <LogOut size={15} /> Salir
            </button>
          </div>
        </div>
        {/* Tab Nav */}
        <div className="max-w-6xl mx-auto px-6 flex gap-1 border-t border-gray-800 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold transition-colors border-b-2 whitespace-nowrap ${
                tab === id ? 'border-[#00BAFF] text-[#00BAFF]' : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {tab === 'stats' && <StatsSection />}
        {tab === 'galeria' && <GallerySection />}
        {tab === 'peliculas' && <PeliculasSection />}
        {tab === 'expediciones' && <ExpedicionesSection />}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Root export — handles login state
// ──────────────────────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');

  const login = () => { sessionStorage.setItem('admin_auth', '1'); setAuthed(true); };
  const logout = () => { sessionStorage.removeItem('admin_auth'); setAuthed(false); };

  return authed ? <Dashboard onLogout={logout} /> : <Login onLogin={login} />;
}
