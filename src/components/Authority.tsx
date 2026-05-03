/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function Authority() {
  return (
    <section id="sobre" className="py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-secondary/20 hidden md:block" />
            <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-[4/5] bg-surface-low">
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0ug_AP5fC36sjt5bRKzseIc7AbvVa2OITKvy2HiEjBT4wFsd-LXpYMmo6R-SxlhiBZqJMlDFaov4x6SCky3OvL9wY0uIkgK5ESbhRbuly3_r5OSWVcP8fMS893SFzzw9W4cMVztFRaw_Xzba-cuygUforxrEFaq4ltncWwamsa1HamO6RQghAlajzxFTeTLsRGz5-oJafgYhVBKdTW56-vD9uWw_Bs4hxGdoqQO0NcpwfGVI7vbmJydaUYOZrOuThQuh1sou3RvT" 
                alt="Dra. Rosane Borges"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-10 -right-8 bg-primary text-white p-6 rounded-2xl shadow-xl transform rotate-3">
              <p className="text-xs uppercase tracking-widest font-bold opacity-80 mb-1">Chancela Acadêmica</p>
              <p className="font-display italic text-2xl">PhD Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-secondary font-bold text-xs uppercase tracking-[0.2em]">Expertise Técnica</span>
              <h2 className="text-4xl md:text-5xl leading-tight">
                A ciência da ecologia urbana encontra a sofisticação do design exclusivo.
              </h2>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Rosane Borges é engenheira agrônoma, mestre e doutora (PhD) em Produção Vegetal, com especialização em plantas ornamentais. Seu método une o rigor científico à estética de alto padrão, transformando o paisagismo em uma operação de alta performance.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-4xl font-display font-black text-primary">PhD</p>
                <p className="text-xs font-bold text-secondary uppercase tracking-widest">Produção Vegetal</p>
              </div>
              <div className="space-y-2 text-center md:text-left">
                <p className="text-4xl font-display font-black text-primary">+500</p>
                <p className="text-xs font-bold text-secondary uppercase tracking-widest">Projetos &amp; Alunos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
