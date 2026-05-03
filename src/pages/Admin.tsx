/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { auth, db, googleProvider, signInWithPopup, signOut, doc, getDoc, setDoc } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const ADMIN_EMAIL = "rafaborgesg@gmail.com";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

interface HomepageConfig {
  heroSlides: HeroSlide[];
  about: {
    image: string;
    title: string;
    quote: string;
    description: string;
    tagline: string;
  };
  services: Array<{ id: string; title: string; icon: string; description: string }>;
  cta: {
    title: string;
    subtitle: string;
  };
  branding: {
    logo: string;
  };
  highlights: Array<{ title: string; image: string }>;
}

const DEFAULT_CONFIG: HomepageConfig = {
  heroSlides: [
    {
      image: "https://lh3.googleusercontent.com/aida/ADBb0uiaBmILFB-BysvJyMy2ydZFI7yDG9Bhh50qPIIk37kPOTk1Pf821KJ6yqN-CxT6dxmjw9IuIkiOLc0miWdTe-SJ537aBXvVXiNXrj2ERPzMMrZxyPyqbe-7uiQdN7Cxa9o2NdPx7ZAb4MKoDe2YEgLpq3ikjnKTXfiyygwnfBVIcKPLe8C_lcjs4Z6hygLzs9hD29dCq9O7j7QDyfZch0ZPNrm12AFl-Vrb_Fu4cQdathR0A5ZKdDGYDXl_mX-j4Lse2C1rC1WUmg",
      title: "Jardim Vertical Denso",
      subtitle: "Portfólio Residencial"
    }
  ],
  about: {
    image: "https://lh3.googleusercontent.com/aida/ADBb0ug_AP5fC36sjt5bRKzseIc7AbvVa2OITKvy2HiEjBT4wFsd-LXpYMmo6R-SxlhiBZqJMlDFaov4x6SCky3OvL9wY0uIkgK5ESbhRbuly3_r5OSWVcP8fMS893SFzzw9W4cMVztFRaw_Xzba-cuygUforxrEFaq4ltncWwamsa1HamO6RQghAlajzxFTeTLsRGz5-oJafgYhVBKdTW56-vD9uWw_Bs4hxGdoqQO0NcpwfGVI7vbmJydaUYOZrOuThQuh1sou3RvT",
    title: "Dra. Rosane Borges",
    quote: "\"Onde a ciência da ecologia urbana encontra a sofisticação do design exclusivo.\"",
    description: "Com PhD em Arquitetura Paisagística e uma trajetória de mais de 500 projetos autorais, Dra. Rosane redefine o conceito de luxo sustentável.",
    tagline: "PhD Excellence"
  },
  services: [
    { id: '01', title: 'Projeto de Paisagismo', icon: 'landscape', description: 'Conceito completo em 3D, do estudo preliminar ao executivo.' },
    { id: '02', title: 'Consultoria Técnica', icon: 'menu_book', description: 'Escolha de espécies e melhorias pontuais no seu ambiente.' },
    { id: '03', title: 'Implantação de Paisagismo', icon: 'verified', description: 'Gestão total da execução, garantindo rigor e sofisticação.' }
  ],
  cta: {
    title: "Inicie sua Transformação",
    subtitle: "Consultorias exclusivas com a Dra. Rosane Borges este semestre."
  },
  branding: {
    logo: "https://lh3.googleusercontent.com/aida/ADBb0uhP6AovB2m8q0d8m8q0d8m8q0d8m8q0d8m8q0d8m8q0d8m8q0d8m8q0"
  },
  highlights: [
    { title: "Jardim Natural", image: "https://lh3.googleusercontent.com/aida/ADBb0ugYdpa-dtlauELaJsewHWxU1zLj-LzbsScFtGjNIp2e4S2a122-xYxoaUgnTh5B9carsJ6S14EOwFfHm3RRLnoRGX7HfQ38y-h9GLQZYSjvCU6QQrqgHcb0y-M9BIm7hocVugM6fQFTJ_4VKkU-LVWfbSxAXAUFFBzCc4cal7zRb7oWMWqmFscFLI6wyqcuDErTc6D2E0dr7JvBKMMzgjKeYdmnU-lidWiRfSbqP9Z0q65yipQwBUomr9CFyk3cJ3GfFjT2itKxgA" },
    { title: "Jardim Preservado", image: "https://lh3.googleusercontent.com/aida/ADBb0uhUeEUjIUKFWpijfRCr7aOBVvUcY6yBKnTqx2HP2oDZVowK-tiB48F4NIe_dshhSFtUIeBrrJMHo9aqdjIy0_xepRjCu1tgd8c1Pw6gb44Tzk46m6geGvIXckkSvm-kTKvYnoXP04x8CYzUWW_7DAXYB_MUPWIbLxaBAwmulzLzbRzSY_PS52HC8_H54d-ULRc0gEzeMUmC9huDFqYR5x6uJXIzExTbY6qq89N5VgwXCPzjNYl424n7Vkub1XnE6whBc1idspBS" },
    { title: "Jardim Artificial", image: "https://lh3.googleusercontent.com/aida/ADBb0uiaBmILFB-BysvJyMy2ydZFI7yDG9Bhh50qPIIk37kPOTk1Pf821KJ6yqN-CxT6dxmjw9IuIkiOLc0miWdTe-SJ537aBXvVXiNXrj2ERPzMMrZxyPyqbe-7uiQdN7Cxa9o2NdPx7ZAb4MKoDe2YEgLpq33ikjnKTXfiyygwnfBVIcKPLe8C_lcjs4Z6hygLzs9hD29dCq9O7j7QDyfZch0ZPNrm12AFl-Vrb_Fu4cQdathR0A5ZKdDGYDXl_mX-j4Lse2C1rC1WUmg" },
    { title: "Jardim de Musgo", image: "https://lh3.googleusercontent.com/aida/ADBb0ug_AP5fC36sjt5bRKzseIc7AbvVa2OITKvy2HiEjBT4wFsd-LXpYMmo6R-SxlhiBZqJMlDFaov4x6SCky3OvL9wY0uIkgK5ESbhRbuly3_r5OSWVcP8fMS893SFzzw9W4cMVztFRaw_Xzba-cuygUforxrEFaq4ltncWwamsa1HamO6RQghAlajzxFTeTLsRGz5-oJafgYhVBKdTW56-vD9uWw_Bs4hxGdoqQO0NcpwfGVI7vbmJydaUYOZrOuThQuh1sou3RvT" }
  ]
};

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<HomepageConfig>(DEFAULT_CONFIG);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFor, setUploadingFor] = useState<{ type: 'hero' | 'highlight' | 'about' | 'logo', index: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'branding' | 'hero' | 'about' | 'services' | 'highlights' | 'cta'>('branding');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u?.email === ADMIN_EMAIL) {
        fetchConfig();
      }
    });
    return () => unsubscribe();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchConfig = async () => {
    try {
      const docRef = doc(db, 'configs', 'homepage');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setConfig({
          heroSlides: data.heroSlides || (data.hero ? [data.hero] : DEFAULT_CONFIG.heroSlides),
          about: data.about || DEFAULT_CONFIG.about,
          services: data.services || DEFAULT_CONFIG.services,
          cta: data.cta || DEFAULT_CONFIG.cta,
          branding: data.branding || DEFAULT_CONFIG.branding,
          highlights: data.highlights || DEFAULT_CONFIG.highlights
        });
      }
    } catch (error) {
      console.error("Erro ao buscar config:", error);
      showToast("Erro ao carregar configurações", "error");
    }
  };

  const handleSave = async () => {
    if (!user || user.email !== ADMIN_EMAIL) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'configs', 'homepage'), config);
      showToast("Configurações publicadas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      showToast("Erro ao publicar. Verifique o tamanho das imagens.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingFor) return;

    if (file.size > 800000) {
      showToast("Imagem muito grande (máx 800KB)", "error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (uploadingFor.type === 'hero') {
        const newSlides = [...config.heroSlides];
        newSlides[uploadingFor.index].image = base64;
        setConfig({ ...config, heroSlides: newSlides });
      } else if (uploadingFor.type === 'about') {
        setConfig({ ...config, about: { ...config.about, image: base64 } });
      } else if (uploadingFor.type === 'logo') {
        setConfig({ ...config, branding: { ...config.branding, logo: base64 } });
      } else {
        const newHighlights = [...config.highlights];
        newHighlights[uploadingFor.index].image = base64;
        setConfig({ ...config, highlights: newHighlights });
      }
      setUploadingFor(null);
      showToast("Imagem carregada!");
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = (type: 'hero' | 'highlight' | 'about' | 'logo', index: number = 0) => {
    setUploadingFor({ type, index });
    fileInputRef.current?.click();
  };

  const addHeroSlide = () => {
    setConfig({
      ...config,
      heroSlides: [
        ...config.heroSlides,
        { image: "", title: "Novo Título", subtitle: "Novo Subtítulo" }
      ]
    });
    showToast("Slide adicionado");
  };

  const removeHeroSlide = (index: number) => {
    if (config.heroSlides.length <= 1) return;
    const newSlides = config.heroSlides.filter((_, i) => i !== index);
    setConfig({ ...config, heroSlides: newSlides });
    showToast("Slide removido");
  };

  const addService = () => {
    if (config.services.length >= 6) return;
    setConfig({
      ...config,
      services: [
        ...config.services,
        { id: `0${config.services.length + 1}`, title: "Novo Serviço", icon: "landscape", description: "Descrição do serviço..." }
      ]
    });
    showToast("Serviço adicionado");
  };

  const removeService = (index: number) => {
    if (config.services.length <= 1) return;
    const newServices = config.services.filter((_, i) => i !== index);
    setConfig({ ...config, services: newServices });
    showToast("Serviço removido");
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-display italic text-2xl">Carregando painel técnico...</div>;

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
             <span className="material-symbols-outlined text-6xl text-primary/20">lock</span>
             <h1 className="text-4xl font-display">Acesso Restrito</h1>
             <p className="text-gray-500 leading-relaxed">Este ambiente é exclusivo para a administração da Dra. Rosane Borges.</p>
          </div>
          <button 
            onClick={handleLogin}
            className="w-full bg-primary text-white px-8 py-5 rounded-3xl font-bold uppercase tracking-widest shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale invert" alt="Google" />
            Entrar com Google
          </button>
          <Link to="/" className="inline-block text-xs font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors">Voltar ao site público</Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'branding', label: 'Identidade', icon: 'palette' },
    { id: 'hero', label: 'Banner Inicial', icon: 'view_carousel' },
    { id: 'about', label: 'Sobre Rosane', icon: 'person' },
    { id: 'services', label: 'Expertise', icon: 'eco' },
    { id: 'highlights', label: 'Portfólio', icon: 'grid_view' },
    { id: 'cta', label: 'Fechamento', icon: 'call_to_action' },
  ] as const;

  return (
    <div className="flex min-h-screen bg-surface-low">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-bold flex items-center gap-3 ${
              toast.type === 'success' ? 'bg-primary' : 'bg-red-500'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed h-full z-30">
        <div className="p-8 border-b border-gray-50">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Painel de Gestão</p>
          <h1 className="text-xl font-display italic">Rosane Borges</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-gray-400 hover:bg-surface-low hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div layoutId="tab-indicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-50 space-y-2">
           <button 
             onClick={handleSave}
             disabled={saving}
             className="w-full bg-accent text-primary p-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-accent/10 hover:bg-white transition-all disabled:opacity-50"
           >
             {saving ? "Salvando..." : "Publicar"}
           </button>
           <button onClick={() => signOut(auth)} className="w-full p-4 text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-red-400 transition-colors">Sair da Conta</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <div className="max-w-4xl">
          <header className="mb-12 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-2">Editor de Conteúdo</p>
              <h2 className="text-5xl font-display">{tabs.find(t => t.id === activeTab)?.label}</h2>
            </div>
            <Link to="/" target="_blank" className="bg-white border border-gray-100 p-4 rounded-2xl text-primary/40 hover:text-primary transition-all flex items-center gap-3">
               <span className="material-symbols-outlined">open_in_new</span>
               <span className="text-[10px] font-bold uppercase tracking-widest">Abrir Site Público</span>
            </Link>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'branding' && (
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50 space-y-8">
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Logomarca Principal</label>
                        <p className="text-sm text-gray-500 leading-relaxed">Sua marca será exibida em todas as páginas, no cabeçalho e rodapé. Use fundo transparente para melhor resultado.</p>
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={config.branding.logo.startsWith('data:') ? "[IMAGEM CARREGADA]" : config.branding.logo}
                          readOnly
                          className="w-full bg-surface-low rounded-2xl p-5 outline-none border-0 text-gray-400 italic text-sm"
                        />
                        <button 
                          onClick={() => triggerUpload('logo')}
                          className="bg-primary text-white p-5 rounded-2xl hover:bg-black transition-colors"
                        >
                          <span className="material-symbols-outlined">upload</span>
                        </button>
                      </div>
                    </div>
                    <div className="w-56 aspect-square bg-surface-low rounded-[2.5rem] p-10 flex items-center justify-center border border-gray-100 shadow-inner">
                      {config.branding.logo ? (
                        <img src={config.branding.logo} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-gray-300 italic text-xs">Sem logo</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hero' && (
                <div className="space-y-8">
                  <div className="flex justify-end">
                    <button onClick={addHeroSlide} className="bg-primary text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-primary/20">+ Novo Slide</button>
                  </div>
                  {config.heroSlides.map((slide, index) => (
                    <div key={index} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50 space-y-8 relative group">
                      <button onClick={() => removeHeroSlide(index)} className="absolute top-8 right-8 text-gray-200 hover:text-red-500">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                      <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Título de Impacto</label>
                            <input 
                              type="text" 
                              value={slide.title}
                              onChange={(e) => {
                                const newSlides = [...config.heroSlides];
                                newSlides[index].title = e.target.value;
                                setConfig({ ...config, heroSlides: newSlides });
                              }}
                              className="w-full bg-surface-low rounded-2xl p-5 outline-none border-0 font-display text-2xl italic"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subtítulo / Categoria</label>
                            <input 
                              type="text" 
                              value={slide.subtitle}
                              onChange={(e) => {
                                const newSlides = [...config.heroSlides];
                                newSlides[index].subtitle = e.target.value;
                                setConfig({ ...config, heroSlides: newSlides });
                              }}
                              className="w-full bg-surface-low rounded-2xl p-5 outline-none border-0"
                            />
                          </div>
                          <button 
                            onClick={() => triggerUpload('hero', index)}
                            className="w-full bg-surface-low text-primary py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
                          >
                             <span className="material-symbols-outlined text-sm">image</span> Trocar Foto de Fundo
                          </button>
                        </div>
                        <div className="aspect-[16/10] bg-surface-low rounded-[2rem] overflow-hidden border border-gray-100">
                           {slide.image && <img src={slide.image} alt="Preview" className="w-full h-full object-cover" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'about' && (
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50 space-y-12">
                   <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nome Oficial</label>
                          <input 
                            type="text" 
                            value={config.about.title}
                            onChange={(e) => setConfig({ ...config, about: { ...config.about, title: e.target.value } })}
                            className="w-full bg-surface-low rounded-2xl p-5 outline-none border-0 text-xl font-display"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Badge de Especialidade</label>
                          <input 
                            type="text" 
                            value={config.about.tagline}
                            onChange={(e) => setConfig({ ...config, about: { ...config.about, tagline: e.target.value } })}
                            className="w-full bg-surface-low rounded-2xl p-5 outline-none border-0"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Citação Manifesto</label>
                          <textarea 
                            value={config.about.quote}
                            rows={3}
                            onChange={(e) => setConfig({ ...config, about: { ...config.about, quote: e.target.value } })}
                            className="w-full bg-surface-low rounded-2xl p-5 outline-none border-0 font-display italic text-lg resize-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="aspect-[4/5] bg-surface-low rounded-[2rem] overflow-hidden border border-gray-100 group relative">
                           {config.about.image && <img src={config.about.image} alt="Rosane" className="w-full h-full object-cover" />}
                           <button 
                             onClick={() => triggerUpload('about')}
                             className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                           >
                             <span className="material-symbols-outlined text-4xl">photo_camera</span>
                           </button>
                        </div>
                        <p className="text-[10px] text-center text-gray-300 font-bold uppercase tracking-widest">Clique na foto para alterar</p>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Trajetória Profissional</label>
                      <textarea 
                        value={config.about.description}
                        rows={6}
                        onChange={(e) => setConfig({ ...config, about: { ...config.about, description: e.target.value } })}
                        className="w-full bg-surface-low rounded-2xl p-5 outline-none border-0 leading-relaxed resize-none"
                      />
                   </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-6">
                   <div className="flex justify-end">
                    <button onClick={addService} disabled={config.services.length >= 6} className="bg-primary text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-primary/20 disabled:opacity-30">+ Novo Serviço</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {config.services.map((service, index) => (
                       <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 space-y-6 relative group">
                          <button onClick={() => removeService(index)} className="absolute top-6 right-6 text-gray-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-surface-low rounded-xl flex items-center justify-center">
                               <span className="material-symbols-outlined text-primary">{service.icon}</span>
                            </div>
                            <input 
                              type="text" 
                              value={service.icon}
                              onChange={(e) => {
                                const newS = [...config.services];
                                newS[index].icon = e.target.value;
                                setConfig({ ...config, services: newS });
                              }}
                              className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-gray-300 outline-none w-24"
                            />
                          </div>
                          <input 
                            type="text" 
                            value={service.title}
                            onChange={(e) => {
                              const newS = [...config.services];
                              newS[index].title = e.target.value;
                              setConfig({ ...config, services: newS });
                            }}
                            className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 font-display text-xl leading-tight"
                          />
                          <textarea 
                            value={service.description}
                            rows={3}
                            onChange={(e) => {
                              const newS = [...config.services];
                              newS[index].description = e.target.value;
                              setConfig({ ...config, services: newS });
                            }}
                            className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 text-sm leading-relaxed resize-none"
                          />
                       </div>
                     ))}
                  </div>
                </div>
              )}

              {activeTab === 'highlights' && (
                <div className="grid grid-cols-2 gap-8">
                   {config.highlights.map((item, index) => (
                    <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 space-y-6">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-surface-low group relative border border-gray-100 shadow-inner">
                        {item.image && <img src={item.image} alt="Preview" className="w-full h-full object-cover" />}
                        <button 
                          onClick={() => triggerUpload('highlight', index)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                        >
                          <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                        </button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Título do Projeto</label>
                        <input 
                          type="text" 
                          value={item.title}
                          onChange={(e) => {
                            const newH = [...config.highlights];
                            newH[index].title = e.target.value;
                            setConfig({ ...config, highlights: newH });
                          }}
                          className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 font-display italic text-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'cta' && (
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50 space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Título de Encerramento</label>
                      <textarea 
                        value={config.cta.title}
                        rows={2}
                        onChange={(e) => setConfig({ ...config, cta: { ...config.cta, title: e.target.value } })}
                        className="w-full bg-surface-low rounded-2xl p-5 outline-none border-0 font-display text-4xl leading-tight resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Frase de Apoio</label>
                      <input 
                        type="text" 
                        value={config.cta.subtitle}
                        onChange={(e) => setConfig({ ...config, cta: { ...config.cta, subtitle: e.target.value } })}
                        className="w-full bg-surface-low rounded-2xl p-5 outline-none border-0 italic"
                      />
                    </div>
                  </div>
                  <div className="p-12 bg-primary rounded-[2rem] text-center space-y-6">
                     <h3 className="text-white font-display text-4xl">{config.cta.title}</h3>
                     <p className="text-white/60 font-display italic">{config.cta.subtitle}</p>
                     <div className="pt-4">
                        <span className="bg-accent text-primary px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest">Chamada de Exemplo</span>
                     </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

