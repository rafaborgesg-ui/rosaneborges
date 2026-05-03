/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { db, doc, onSnapshot } from '../lib/firebase';

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
    logo: "/logo_rosane.png"
  },
  highlights: [
    { title: "Jardim Natural", image: "https://lh3.googleusercontent.com/aida/ADBb0ugYdpa-dtlauELaJsewHWxU1zLj-LzbsScFtGjNIp2e4S2a122-xYxoaUgnTh5B9carsJ6S14EOwFfHm3RRLnoRGX7HfQ38y-h9GLQZYSjvCU6QQrqgHcb0y-M9BIm7hocVugM6fQFTJ_4VKkU-LVWfbSxAXAUFFBzCc4cal7zRb7oWMWqmFscFLI6wyqcuDErTc6D2E0dr7JvBKMMzgjKeYdmnU-lidWiRfSbqP9Z0q65yipQwBUomr9CFyk3cJ3GfFjT2itKxgA" },
    { title: "Jardim Preservado", image: "https://lh3.googleusercontent.com/aida/ADBb0uhUeEUjIUKFWpijfRCr7aOBVvUcY6yBKnTqx2HP2oDZVowK-tiB48F4NIe_dshhSFtUIeBrrJMHo9aqdjIy0_xepRjCu1tgd8c1Pw6gb44Tzk46m6geGvIXckkSvm-kTKvYnoXP04x8CYzUWW_7DAXYB_MUPWIbLxaBAwmulzLzbRzSY_PS52HC8_H54d-ULRc0gEzeMUmC9huDFqYR5x6uJXIzExTbY6qq89N5VgwXCPzjNYl424n7Vkub1XnE6whBc1idspBS" },
    { title: "Jardim Artificial", image: "https://lh3.googleusercontent.com/aida/ADBb0uiaBmILFB-BysvJyMy2ydZFI7yDG9Bhh50qPIIk37kPOTk1Pf821KJ6yqN-CxT6dxmjw9IuIkiOLc0miWdTe-SJ537aBXvVXiNXrj2ERPzMMrZxyPyqbe-7uiQdN7Cxa9o2NdPx7ZAb4MKoDe2YEgLpq3ikjnKTXfiyygwnfBVIcKPLe8C_lcjs4Z6hygLzs9hD29dCq9O7j7QDyfZch0ZPNrm12AFl-Vrb_Fu4cQdathR0A5ZKdDGYDXl_mX-j4Lse2C1rC1WUmg" },
    { title: "Jardim de Musgo", image: "https://lh3.googleusercontent.com/aida/ADBb0ug_AP5fC36sjt5bRKzseIc7AbvVa2OITKvy2HiEjBT4wFsd-LXpYMmo6R-SxlhiBZqJMlDFaov4x6SCky3OvL9wY0uIkgK5ESbhRbuly3_r5OSWVcP8fMS893SFzzw9W4cMVztFRaw_Xzba-cuygUforxrEFaq4ltncWwamsa1HamO6RQghAlajzxFTeTLsRGz5-oJafgYhVBKdTW56-vD9uWw_Bs4hxGdoqQO0NcpwfGVI7vbmJydaUYOZrOuThQuh1sou3RvT" }
  ]
};

export default function Home() {
  const [config, setConfig] = useState<HomepageConfig>(DEFAULT_CONFIG);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'configs', 'homepage'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setConfig({
          heroSlides: data.heroSlides || (data.hero ? [data.hero] : DEFAULT_CONFIG.heroSlides),
          about: data.about || DEFAULT_CONFIG.about,
          services: data.services || DEFAULT_CONFIG.services,
          cta: data.cta || DEFAULT_CONFIG.cta,
          branding: data.branding || DEFAULT_CONFIG.branding,
          highlights: data.highlights || DEFAULT_CONFIG.highlights
        });
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!config.heroSlides || config.heroSlides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % config.heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [config.heroSlides]);

  const activeSlide = config.heroSlides?.[currentSlide] || DEFAULT_CONFIG.heroSlides[0];

  return (
    <div className="pt-20">
      {/* Portfolio Full-Width Banner Carousel */}
      <section className="bg-white w-full overflow-hidden relative">
        <div className="w-full h-[400px] md:h-[600px] lg:h-[750px] relative group overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img 
                src={activeSlide.image} 
                alt={activeSlide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end pb-12 md:pb-24">
                <div className="max-w-7xl mx-auto w-full px-6 text-white">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <p className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] mb-4">{activeSlide.subtitle}</p>
                    <h1 className="text-5xl md:text-8xl font-display italic leading-none">{activeSlide.title}</h1>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {config.heroSlides.length > 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex justify-center gap-3 z-10">
            {config.heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  i === currentSlide ? 'bg-white w-8' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Dra. Rosane Authority Profile */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
           <div className="w-full md:w-1/2 relative">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] mask-asymmetric">
              <img 
                src={config.about.image} 
                alt={config.about.title}
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <div className="absolute -bottom-6 right-0 bg-primary text-white p-6 rounded-2xl shadow-xl">
              <p className="text-[10px] uppercase tracking-widest opacity-80">{config.about.title.toUpperCase()}</p>
              <p className="font-display italic text-2xl">{config.about.tagline}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">Fundadora & Diretora Criativa</span>
            <h2 className="text-5xl md:text-6xl font-display leading-[0.9]">{config.about.title}</h2>
            <p className="text-xl font-display italic text-gray-500">{config.about.quote}</p>
            <p className="text-gray-600 leading-relaxed">{config.about.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-low p-6 rounded-2xl text-center">
                <p className="text-3xl font-display text-primary">500+</p>
                <p className="text-[9px] uppercase font-bold tracking-widest text-secondary">Projetos Autorais</p>
              </div>
              <div className="bg-surface-low p-6 rounded-2xl text-center">
                <p className="text-3xl font-display text-primary">PhD</p>
                <p className="text-[9px] uppercase font-bold tracking-widest text-secondary">Expertise Técnica</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise / Services */}
      <section className="py-24 bg-surface-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">Bespoke Services</span>
            <h2 className="text-4xl font-display mt-4">Nossa Expertise</h2>
            <p className="text-gray-500 font-display italic text-xl mt-2">Soluções planejadas para proprietários que valorizam o detalhe.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {config.services.map(item => (
              <div key={item.id} className="space-y-6">
                <div className="flex items-center gap-4">
                   <span className="text-3xl font-display text-gray-300 italic">{item.id}</span>
                   <div className="w-12 h-12 bg-white flex items-center justify-center border border-gray-100 rounded-xl">
                      <span className="material-symbols-outlined text-primary">{item.icon}</span>
                   </div>
                </div>
                <h3 className="text-2xl font-display">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                <Link to="/contato" className="text-[10px] font-bold uppercase tracking-widest border-b border-primary/20 pb-1 hover:border-primary transition-colors">Ver Detalhes</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-display mb-12">Portfólio Selecionado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {config.highlights.map((p, i) => (
                <div key={i} className="aspect-square rounded-3xl overflow-hidden relative group">
                  <img 
                    src={p.image} 
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-display italic text-xl">{p.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-primary text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-white text-5xl font-display mb-8">{config.cta.title}</h2>
          <p className="text-white/60 mb-12">{config.cta.subtitle}</p>
          <Link 
            to="/contato"
            className="bg-white text-primary px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl inline-block"
          >
            Solicitar Orçamento
          </Link>
        </div>
      </section>
    </div>
  );
}
