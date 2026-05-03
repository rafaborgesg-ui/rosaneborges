/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function Sistema() {
  return (
    <div className="pt-20">
      {/* SaaS Hero */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em]">Gestão Inteligente</span>
            <h1 className="text-6xl font-display leading-[0.9]">Suas finanças sob controle</h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              A primeira plataforma de gestão financeira e operacional pensada exclusivamente para arquitetos e paisagistas. Organize fluxos, controle obras e prospere.
            </p>
            <div className="flex gap-4">
               <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl">Começar Agora</button>
               <button className="border border-gray-200 px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest">Ver Demo</button>
            </div>
            <p className="text-xs text-gray-400">+2.000 profissionais já utilizam nosso sistema</p>
          </div>
          <div className="relative">
             <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl transform rotate-1">
                <img 
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujtKu7cRdSho-JakvzkW3-sGBWF-lrDutqJfgV1-VkmnGBXYrAV4enMffMgKi29rB3BpiJuF6TqNyi8jwZfwfZ5eCx0ZMvqhAGLTUL0x6UhZptplI6DOzuVg5B03Y87V5MZHBhKlsN8VF_5OLVe996uYFl4q6hEuLuAAgbzhroz_sti6PLx4d-AuA_uOM3CPhoGzZx5O3u0jf4VQUenaVqeFTYITNGuGT9v91Su72oeLzJsidx0yVcPBg-Sn8e-z3PbNylwyr78Hw" 
                  alt="Dashboard Sistema"
                  className="w-full h-auto"
                />
             </div>
          </div>
        </div>
      </section>

      {/* SaaS Features */}
      <section className="py-24 bg-surface-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-display mb-4">Tudo que você precisa</h2>
             <p className="text-gray-500 max-w-2xl mx-auto">Módulos integrados que trabalham juntos para dar a você a visão completa do seu negócio.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: 'Controle de Receitas', i: 'trending_up', c: 'text-green-600', bg: 'bg-green-50' },
              { t: 'Gestão de Despesas', i: 'trending_down', c: 'text-red-600', bg: 'bg-red-50' },
              { t: 'Pipeline Comercial', i: 'groups', c: 'text-blue-600', bg: 'bg-blue-50' },
              { t: 'Metas Anuais', i: 'track_changes', c: 'text-amber-600', bg: 'bg-amber-50' },
              { t: 'Fluxo de Caixa', i: 'bar_chart', c: 'text-purple-600', bg: 'bg-purple-50' },
              { t: 'Relatórios Exportáveis', i: 'description', c: 'text-teal-600', bg: 'bg-teal-50' }
            ].map((f, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-50 hover:shadow-xl transition-shadow">
                 <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6`}>
                    <span className={`material-symbols-outlined ${f.c} text-3xl`}>{f.i}</span>
                 </div>
                 <h4 className="text-xl font-display mb-3">{f.t}</h4>
                 <p className="text-gray-500 text-sm">Visualize seu progresso em tempo real com ferramentas automatizadas.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Planos */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-display mb-4">Escolha o plano ideal</h2>
            <p className="text-gray-500 mb-16">Experimente grátis por 7 dias. Cancele quando quiser.</p>
            
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
                {/* Basic */}
                <div className="border border-gray-100 p-10 rounded-[2.5rem] bg-surface-low space-y-8 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-display">Básico</h3>
                    <p className="text-4xl font-display mt-4 text-primary">R$ 39 <span className="text-lg text-gray-400">/mês</span></p>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-4 flex-grow">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check</span> 1 Usuário</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check</span> 8 Projetos Ativos</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check</span> Suporte por E-mail</li>
                  </ul>
                  <button className="w-full py-4 border border-primary text-primary rounded-full font-bold text-[10px] uppercase tracking-widest">Testar 7 Dias</button>
                </div>

                {/* Pro */}
                <div className="bg-primary p-10 rounded-[2.5rem] text-white space-y-8 scale-105 shadow-2xl flex flex-col">
                  <div>
                    <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest mb-4 inline-block">MAIS POPULAR</span>
                    <h3 className="text-2xl font-display">PRO</h3>
                    <p className="text-4xl font-display mt-4">R$ 59 <span className="text-lg opacity-40">/mês</span></p>
                  </div>
                  <ul className="text-sm opacity-80 space-y-4 flex-grow">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check</span> 5 Usuários</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check</span> 15 Projetos Ativos</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check</span> Combo Materiais Incluso</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check</span> Suporte WhatsApp</li>
                  </ul>
                  <button className="w-full py-4 bg-accent text-primary rounded-full font-bold text-[10px] uppercase tracking-widest shadow-xl">Assinar Agora</button>
                </div>

                {/* Premium */}
                <div className="border border-gray-100 p-10 rounded-[2.5rem] bg-surface-low space-y-8 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-display">Premium</h3>
                    <p className="text-4xl font-display mt-4 text-primary">R$ 89 <span className="text-lg text-gray-400">/mês</span></p>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-4 flex-grow">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check</span> Usuários Ilimitados</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check</span> Gestão de Obras Pro</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check</span> Suporte Prioritário</li>
                  </ul>
                  <button className="w-full py-4 border border-primary text-primary rounded-full font-bold text-[10px] uppercase tracking-widest">Testar 7 Dias</button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
