/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { auth, db, googleProvider, signInWithPopup, signOut, doc, getDoc, setDoc } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

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

  const fetchConfig = async () => {
    try {
      const docRef = doc(db, 'configs', 'homepage');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Migração suave
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
    }
  };

  const handleSave = async () => {
    if (!user || user.email !== ADMIN_EMAIL) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'configs', 'homepage'), config);
      alert("Configurações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar. Verifique se as imagens não são muito grandes.");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingFor) return;

    if (file.size > 800000) {
      alert("A imagem é muito grande. Por favor, use imagens menores que 800KB.");
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
  };

  const removeHeroSlide = (index: number) => {
    if (config.heroSlides.length <= 1) return;
    const newSlides = config.heroSlides.filter((_, i) => i !== index);
    setConfig({ ...config, heroSlides: newSlides });
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
  };

  const removeService = (index: number) => {
    if (config.services.length <= 1) return;
    const newServices = config.services.filter((_, i) => i !== index);
    setConfig({ ...config, services: newServices });
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) return <div className="pt-32 text-center">Carregando...</div>;

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="pt-32 pb-24 max-w-lg mx-auto px-6 text-center">
        <h1 className="text-4xl font-display mb-8">Área Restrita</h1>
        <p className="text-gray-500 mb-8">Página exclusiva para administração.</p>
        <button 
          onClick={handleLogin}
          className="bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest shadow-xl"
        >
          Entrar com Google
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-surface-low min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileUpload} 
        />

        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-display">Painel de Administração</h1>
          <button onClick={() => signOut(auth)} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-500">Sair</button>
        </div>

        <div className="space-y-12">
          {/* Header & Logo Section */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-display mb-8">Identidade Visual (Logo)</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <p className="text-sm text-gray-500">O logo será atualizado automaticamente no cabeçalho e no rodapé do site.</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={config.branding.logo.startsWith('data:') ? "[IMAGEM ANEXADA]" : config.branding.logo}
                    readOnly
                    className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 text-gray-400 italic"
                  />
                  <button 
                    onClick={() => triggerUpload('logo')}
                    className="bg-primary text-white p-4 rounded-xl hover:bg-primary/90"
                  >
                    <span className="material-symbols-outlined">upload</span>
                  </button>
                </div>
              </div>
              <div className="w-48 bg-surface-low rounded-[2rem] p-8 flex items-center justify-center aspect-square border border-gray-100">
                {config.branding.logo ? (
                  <img src={config.branding.logo} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-gray-300 italic text-xs">Sem logo</span>
                )}
              </div>
            </div>
          </section>

          {/* Hero Slides Section */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-display">Destaque Principal (Hero Slide)</h2>
                <p className="text-xs text-gray-400">As fotos e textos que rotacionam na entrada do site.</p>
              </div>
              <button 
                onClick={addHeroSlide}
                className="bg-primary/5 text-primary px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
              >
                + Adicionar Slide
              </button>
            </div>
            
            <div className="space-y-12">
              <AnimatePresence>
                {config.heroSlides.map((slide, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 border border-gray-100 rounded-3xl space-y-6 relative group"
                  >
                    <button 
                      onClick={() => removeHeroSlide(index)}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Título</label>
                          <input 
                            type="text" 
                            value={slide.title}
                            onChange={(e) => {
                              const newSlides = [...config.heroSlides];
                              newSlides[index].title = e.target.value;
                              setConfig({ ...config, heroSlides: newSlides });
                            }}
                            className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Subtítulo</label>
                          <input 
                            type="text" 
                            value={slide.subtitle}
                            onChange={(e) => {
                              const newSlides = [...config.heroSlides];
                              newSlides[index].subtitle = e.target.value;
                              setConfig({ ...config, heroSlides: newSlides });
                            }}
                            className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Imagem</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              placeholder="URL ou Upload ->"
                              value={slide.image.startsWith('data:') ? "[IMAGEM ANEXADA]" : slide.image}
                              readOnly
                              className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 text-gray-400 italic"
                            />
                            <button 
                              onClick={() => triggerUpload('hero', index)}
                              className="bg-primary text-white p-4 rounded-xl hover:bg-primary/90"
                            >
                              <span className="material-symbols-outlined">upload</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100 border border-gray-100 flex items-center justify-center">
                        {slide.image && <img src={slide.image} alt="Preview" className="w-full h-full object-cover" />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-display mb-8">Apresentação Dra. Rosane</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Nome/Título</label>
                  <input 
                    type="text" 
                    value={config.about.title}
                    onChange={(e) => setConfig({ ...config, about: { ...config.about, title: e.target.value } })}
                    className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Selo/Tagline</label>
                  <input 
                    type="text" 
                    value={config.about.tagline}
                    onChange={(e) => setConfig({ ...config, about: { ...config.about, tagline: e.target.value } })}
                    className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Citação</label>
                  <input 
                    type="text" 
                    value={config.about.quote}
                    onChange={(e) => setConfig({ ...config, about: { ...config.about, quote: e.target.value } })}
                    className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Descrição</label>
                  <textarea 
                    value={config.about.description}
                    onChange={(e) => setConfig({ ...config, about: { ...config.about, description: e.target.value } })}
                    rows={4}
                    className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
                <button 
                  onClick={() => triggerUpload('about')}
                  className="w-full bg-primary/5 text-primary py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">upload</span> Trocar Foto da Rosane
                </button>
              </div>
              <div className="rounded-[2rem] overflow-hidden aspect-[4/5] bg-gray-100 border border-gray-100">
                {config.about.image && <img src={config.about.image} alt="Preview" className="w-full h-full object-cover" />}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-display">Nossa Expertise (Serviços)</h2>
              <button 
                onClick={addService}
                disabled={config.services.length >= 6}
                className="bg-primary/5 text-primary px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-30"
              >
                + Adicionar Serviço
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.services.map((service, index) => (
                <div key={index} className="p-6 border border-gray-100 rounded-3xl space-y-4 relative">
                  <button 
                    onClick={() => removeService(index)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                  <div className="flex gap-4 items-center">
                    <span className="text-2xl font-display text-gray-200 italic">{service.id}</span>
                    <input 
                      type="text" 
                      value={service.icon}
                      placeholder="Icon ID (Material Symbols)"
                      onChange={(e) => {
                        const newServices = [...config.services];
                        newServices[index].icon = e.target.value;
                        setConfig({ ...config, services: newServices });
                      }}
                      className="bg-surface-low rounded-lg p-2 text-[10px] w-32 border-0 outline-none"
                    />
                    <span className="material-symbols-outlined text-primary">{service.icon}</span>
                  </div>
                  <input 
                    type="text" 
                    value={service.title}
                    placeholder="Título do Serviço"
                    onChange={(e) => {
                      const newServices = [...config.services];
                      newServices[index].title = e.target.value;
                      setConfig({ ...config, services: newServices });
                    }}
                    className="w-full bg-surface-low rounded-xl p-3 outline-none border-0 font-display text-lg"
                  />
                  <textarea 
                    value={service.description}
                    placeholder="Breve descrição..."
                    onChange={(e) => {
                      const newServices = [...config.services];
                      newServices[index].description = e.target.value;
                      setConfig({ ...config, services: newServices });
                    }}
                    rows={2}
                    className="w-full bg-surface-low rounded-xl p-3 outline-none border-0 text-sm resize-none"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Highlights Grid */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-display mb-8">Grid de Projetos (Destaques)</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {config.highlights.map((item, index) => (
                <div key={index} className="p-6 border border-gray-100 rounded-3xl space-y-4">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-100">
                    {item.image && <img src={item.image} alt="Preview" className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Título</label>
                    <input 
                      type="text" 
                      value={item.title}
                      onChange={(e) => {
                        const newHighlights = [...config.highlights];
                        newHighlights[index].title = e.target.value;
                        setConfig({ ...config, highlights: newHighlights });
                      }}
                      className="w-full bg-surface-low rounded-xl p-3 outline-none border-0 focus:ring-2 focus:ring-primary/20 mb-4"
                    />
                    <button 
                      onClick={() => triggerUpload('highlight', index)}
                      className="w-full bg-primary/5 text-primary py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">upload</span> Selecionar Nova Foto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-display mb-6">Chamada para Ação (Rodapé)</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Título de Fechamento</label>
                <input 
                  type="text" 
                  value={config.cta.title}
                  onChange={(e) => setConfig({ ...config, cta: { ...config.cta, title: e.target.value } })}
                  className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Subtítulo do Botão</label>
                <input 
                  type="text" 
                  value={config.cta.subtitle}
                  onChange={(e) => setConfig({ ...config, cta: { ...config.cta, subtitle: e.target.value } })}
                  className="w-full bg-surface-low rounded-xl p-4 outline-none border-0 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </section>

          <button 
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-primary text-white py-6 rounded-full font-bold uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {saving ? "Salvando Alterações..." : "Publicar Todas as Alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}
