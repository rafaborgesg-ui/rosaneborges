/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function Contato() {
  return (
    <div className="pt-32 pb-24 bg-surface-low min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <span className="text-secondary font-bold text-xs uppercase tracking-[0.3em]">Canais de Atendimento</span>
            <h1 className="text-6xl font-display leading-[0.9]">Vamos planejar seu <br/><span className="italic">refúgio particular</span></h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              Seja para um projeto residencial de alto padrão ou para suporte em nossos sistemas, nossa equipe técnica está pronta para atender você.
            </p>

            <div className="space-y-6 pt-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">E-mail</p>
                  <p className="text-primary font-bold">contato@rosaneborges.com.br</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Atendimento Presencial</p>
                  <p className="text-primary font-bold">Curitiba - PR | Atendimento Nacional</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl border border-gray-100"
          >
            <h2 className="text-3xl font-display mb-8">Solicitar Orçamentos</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-4">Nome Completo</label>
                  <input type="text" className="w-full bg-surface-low border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Seu nome aqui" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-4">Whatsapp</label>
                  <input type="tel" className="w-full bg-surface-low border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="(00) 00000-0000" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-4">Interesse</label>
                <select className="w-full bg-surface-low border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer">
                  <option>Projeto de Paisagismo</option>
                  <option>Consultoria Técnica</option>
                  <option>Implantação e Obra</option>
                  <option>Sistema de Gestão (SaaS)</option>
                  <option>Outros</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-4">Mensagem</label>
                <textarea rows={4} className="w-full bg-surface-low border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" placeholder="Conte-nos um pouco sobre seu projeto..."></textarea>
              </div>

              <button className="w-full bg-primary text-white py-5 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Enviar Requisição
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
