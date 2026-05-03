/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

const faqs = [
  {
    q: "Para quem é este material?",
    a: "O material é ideal para paisagistas, arquitetos e engenheiros que atuam no mercado e desejam profissionalizar sua gestão documental e processos comerciais."
  },
  {
    q: "Em quais formatos os arquivos são entregues?",
    a: "Os arquivos são disponibilizados em formatos 100% editáveis: Word (.docx), Excel (.xlsx) e modelos estruturados no Canva para apresentações visuais."
  },
  {
    q: "Como recebo o acesso?",
    a: "Imediatamente após a confirmação do pagamento, você receberá um e-mail da plataforma Kiwify com seus dados de login e link para a área de membros."
  },
  {
    q: "Tenho suporte em caso de dúvidas?",
    a: "Sim! Dentro da plataforma você terá acesso aos nossos canais de suporte para auxiliar em qualquer dúvida sobre o uso do material."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-surface-low">
      <div className="max-w-4xl mx-auto px-6">
        {/* Guarantee Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24 p-12 rounded-[3rem] border-2 border-dashed border-secondary/20 bg-white shadow-sm"
        >
          <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-secondary text-5xl">verified</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-primary mb-6 font-display">Risco Zero: 7 dias de Garantia</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore todos os documentos, abra cada planilha. Se não sentir que seu escritório subiu de nível, devolvemos 100% do seu dinheiro sem perguntas.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          <h2 className="text-4xl text-primary text-center mb-12 font-display">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.details 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="faq-accordion group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm transition-all duration-300"
              >
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-bold text-primary italic font-display">{faq.q}</span>
                  <span className="material-symbols-outlined faq-icon transition-transform duration-300 text-secondary">expand_more</span>
                </summary>
                <div className="px-8 pb-8 text-gray-500 leading-relaxed">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
