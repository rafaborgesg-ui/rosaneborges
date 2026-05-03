/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-surface-low">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:col-span-7 z-10"
        >
          <span className="inline-block bg-primary/10 text-primary px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            Excelência em Gestão
          </span>
          <h1 className="text-5xl md:text-7xl mb-8 leading-[1.05] tracking-tight">
            Transforme seu <br />
            <span className="italic text-secondary">paisagismo</span> em um <br />
            negócio lucrativo
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
            Documentos profissionais prontos para uso, criados por uma especialista com PhD em Produção Vegetal, para organizar, vender e escalar seus projetos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-white px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Ver Ferramentas Profissionais
            </button>
            <button className="border-2 border-primary/20 text-primary px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors">
              Portfólio 2024
            </button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:col-span-5 relative"
        >
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              alt="Rosane Borges" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida/ADBb0uiz00vrpZdTgMEPyL0AhcbWc6ABGPSQCLKCnkC_YGbUucKfK6pbP_DW8dE60QRqTLhUgp-mryxphLA3uB3BSqFeZLULqBqwwbll3TLAVC2F44Y_UMrpk24wJpNOmlXFCv9R9BnfNFyDBjsqoLG-WTcBTFzQdAkDUvhqUiJnlpmNJWmgD3N9xQ7xCLEsNOFgRP9ya4MKBqkWxPWQPjPuiJ4bBuKU7xum1sQDQQooZcFbBWLjsc65Bgov90dCU9qxQXhaoCDuEIr3kCQ" 
            />
          </div>
          
          {/* Badge */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute -bottom-10 -right-4 md:-right-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 z-20"
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl font-display font-bold text-primary">+15 Anos</span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-secondary mt-1">Expertise no Mercado</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
