/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function Combo() {
  return (
    <section id="combo" className="py-24 bg-primary relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-20 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <span className="inline-block bg-accent/20 text-accent px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-10 animate-pulse">
                OFERTA HISTÓRICA
              </span>
              <h2 className="text-white text-5xl md:text-7xl mb-10 font-display">Combo Paisagista Profissional</h2>
              <p className="text-white/80 text-xl mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Tenha o ecossistema completo para organizar seu escritório. Inclui o <b>Kit Profissional</b> + <b>Kit Contratos</b> + <b>Suporte VIP</b>.
              </p>
              
              <div className="flex items-center gap-10 justify-center lg:justify-start mb-14">
                <div className="opacity-50 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1">De R$ 94,00</p>
                  <p className="text-3xl font-display line-through">R$ 94</p>
                </div>
                <div className="text-accent">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Por apenas</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-7xl font-display font-black">R$ 67</span>
                  </div>
                </div>
              </div>

              <button className="bg-accent text-primary px-12 py-6 rounded-full text-sm font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                Garantir Meu Combo Agora
              </button>
              <p className="mt-8 text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Pagamento seguro via Kiwify • Acesso imediato</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0uiJfnBgPgYILtLI_HqiLYELxdOoiOnadqpMOKnwP31pTj7QpLsVh0rWI_HWW7lzHafuZv4z5GTqAHdvyLxOo_Qa8Bgl4RcCk1-jvYxh6x2a5TAQulXTbSA2KsN_ZcPtOb3d0Tm0nLlPfKI-duMWnodZpvQvLy49RAczW0YjOEiFdteDxoRNhPW-5IBLL5T4QkRlUb_Zs-IaTVjufjSq4o-hGPcm3_v6Y6AGq8Y-dxcvV_OuyBRHN157WmjrjhfTAieMNtYN6O_uf3w" 
                alt="Transformação Paisagística"
                className="rounded-[2.5rem] shadow-2xl border-4 border-white/20"
              />
              <div className="absolute -top-10 -right-4 bg-white text-primary p-8 rounded-3xl shadow-2xl text-center rotate-6 border border-gray-100">
                <span className="material-symbols-outlined text-5xl mb-2 text-secondary">workspace_premium</span>
                <p className="font-bold text-xs leading-tight uppercase tracking-widest font-sans">Garantia<br/>Vitalícia</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
