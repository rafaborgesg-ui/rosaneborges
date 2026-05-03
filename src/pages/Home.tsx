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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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
    }, 6000);

    return () => clearInterval(interval);
  }, [config.heroSlides]);

  const activeSlide = config.heroSlides?.[currentSlide] || DEFAULT_CONFIG.heroSlides[0];

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Portfolio Full-Width Banner Carousel */}
      <section className="bg-white w-full overflow-hidden relative">
        <div className="w-full h-[85vh] md:h-[90vh] relative group overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-black/30 z-0" />
              <img 
                src={activeSlide.image} 
                alt={activeSlide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
                <div className="max-w-4xl mx-auto px-6 text-white pb-32">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <p className="text-[10px] md:text-[12px] uppercase font-bold tracking-[0.5em] mb-8 text-white/80">{activeSlide.subtitle}</p>
                    <h1 className="text-6xl md:text-[120px] font-display italic leading-none mb-12 tracking-tight">
                      {activeSlide.title}
                    </h1>
                    <div className="flex justify-center">
                      <div className="flex flex-col items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-white/60">
                        <span className="w-px h-16 bg-white/20 relative overflow-hidden">
                          <motion.span 
                            animate={{ y: [0, 64, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 left-0 w-full h-full bg-white block" 
                          />
                        </span>
                        Deslize para Conhecer
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {config.heroSlides.length > 1 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex justify-center gap-4 z-20">
            {config.heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-700 ease-out h-1 rounded-full ${
                  i === currentSlide ? 'bg-white w-12' : 'bg-white/20 w-8 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Dra. Rosane Authority Profile */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24 items-center">
             <motion.div 
               initial={{ opacity: 0, x: -40 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               viewport={{ once: true, margin: "-100px" }}
               className="relative"
             >
                <div className="rounded-[4rem] overflow-hidden shadow-2xl aspect-[4/5] relative z-10 bg-gray-100">
                  <img 
                    src={config.about.image} 
                    alt={config.about.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-primary px-12 py-8 rounded-[2.5rem] shadow-2xl z-20 text-white min-w-[280px]">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2 font-bold">{config.about.tagline}</p>
                  <p className="font-display italic text-3xl leading-tight">Excelência Técnica <br/>e Design Exclusivo</p>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
               viewport={{ once: true, margin: "-100px" }}
               className="space-y-12"
             >
                <div className="space-y-4">
                  <span className="text-secondary font-black text-[11px] uppercase tracking-[0.4em] block">Fundadora & Diretora Criativa</span>
                  <h2 className="text-6xl md:text-8xl font-display leading-[0.85]">{config.about.title}</h2>
                </div>
                
                <div className="relative pl-8 border-l border-accent/20">
                  <p className="text-2xl font-display italic text-gray-500 leading-relaxed">
                    {config.about.quote}
                  </p>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                  {config.about.description}
                </p>

                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="space-y-2 border-l border-gray-100 pl-6">
                    <p className="text-4xl font-display text-primary leading-none">500+</p>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">Projetos <br/>Autorais</p>
                  </div>
                  <div className="space-y-2 border-l border-gray-100 pl-6">
                    <p className="text-4xl font-display text-primary leading-none">PhD</p>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">Base <br/>Científica</p>
                  </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise / Services */}
      <section className="py-32 bg-surface-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-primary font-black text-[11px] uppercase tracking-[0.4em]">Bespoke Solutions</span>
              <h2 className="text-5xl md:text-6xl font-display">Nossa Expertise</h2>
              <p className="text-gray-500 font-display italic text-2xl">Ecologia Urbana & Design de Luxo.</p>
            </div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-16"
          >
            {config.services.map((item) => (
              <motion.div key={item.id} variants={itemReveal} className="space-y-8 group">
                <div className="flex items-center gap-6">
                   <span className="text-4xl font-display text-gray-200 italic group-hover:text-accent transition-colors duration-500">{item.id}</span>
                   <div className="w-16 h-16 bg-white flex items-center justify-center border border-gray-50 rounded-[1.5rem] shadow-sm transform group-hover:-rotate-6 transition-transform duration-500">
                      <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                   </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-display leading-tight">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <span className="text-secondary font-black text-[11px] uppercase tracking-[0.4em]">Portfolio Exhibit</span>
            <h2 className="text-5xl md:text-7xl font-display italic">Visões de Natureza</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[1000px]">
             {config.highlights.map((p, i) => {
               const spans = [
                 "md:col-span-8 md:row-span-2",
                 "md:col-span-4 md:row-span-1",
                 "md:col-span-4 md:row-span-1",
                 "md:col-span-12 md:row-span-1"
               ];
               return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`${spans[i] || 'md:col-span-4'} rounded-[3rem] overflow-hidden relative group cursor-pointer`}
                >
                  <img 
                    src={p.image} 
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                    <p className="text-white font-display italic text-4xl">{p.title}</p>
                  </div>
                </motion.div>
               );
             })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-white text-6xl md:text-8xl font-display leading-[0.85]">{config.cta.title}</h2>
            <p className="text-white/70 text-xl font-light italic max-w-2xl mx-auto">{config.cta.subtitle}</p>
            <Link 
              to="/contato"
              className="bg-accent text-primary px-16 py-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl inline-block hover:bg-white transition-all transform hover:-translate-y-1"
            >
              Agendar Consultoria Exclusiva
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
