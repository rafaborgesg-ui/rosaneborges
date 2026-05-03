/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

const products = [
  {
    title: "Kit Profissional do Paisagista Lucrativo",
    description: "A base organizacional que você precisa para conduzir propostas e briefings impecáveis.",
    price: "47,00",
    oldPrice: "97,00",
    icon: "assignment_turned_in",
    color: "primary",
    bgColor: "bg-primary/5",
    features: [
      "Briefing detalhado (Arquitetura e Interiores)",
      "Proposta Comercial Editável (Excelência)",
      "Cronograma de execução mestre",
      "Tabela técnica de manutenção"
    ],
    link: "https://pay.kiwify.com.br/TbN4teT"
  },
  {
    title: "Kit Contratos Blindados para Paisagistas",
    description: "Segurança jurídica absoluta para seus projetos de execução, consultoria e manutenção.",
    price: "47,00",
    oldPrice: "97,00",
    icon: "gavel",
    color: "secondary",
    bgColor: "bg-secondary/5",
    features: [
      "Contrato de Projeto (Prazos e Entregas)",
      "Contrato de Consultoria Técnica Especializada",
      "Contrato de Execução e Implantação",
      "Termos de Conclusão e Pós-Entrega"
    ],
    link: "https://pay.kiwify.com.br/TbN4teT"
  }
];

export default function ManagementTools() {
  return (
    <section id="produtos" className="py-24 bg-surface-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-6 font-display">Ferramentas de Gestão Profissional</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Pare de perder tempo criando documentos do zero toda semana. Escolha o kit que transformará sua gestão agora.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col"
            >
              <div className="flex justify-between items-start mb-10">
                <div className={`p-5 rounded-3xl ${product.bgColor} transition-colors group-hover:scale-110 duration-500`}>
                  <span className={`material-symbols-outlined text-4xl text-${product.color}`}>
                    {product.icon}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest line-through block mb-1">
                    De R$ {product.oldPrice}
                  </span>
                  <span className={`text-4xl font-display font-black text-${product.color}`}>
                    R$ {product.price}
                  </span>
                </div>
              </div>

              <h3 className="text-3xl mb-4 font-display italic leading-tight">{product.title}</h3>
              <p className="text-gray-500 mb-10 flex-grow leading-relaxed">{product.description}</p>

              <ul className="space-y-4 mb-12">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4 text-sm text-gray-600">
                    <span className={`material-symbols-outlined text-${product.color} text-xl shrink-0`}>check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href={product.link}
                className={`w-full py-5 rounded-full text-center text-[10px] font-bold uppercase tracking-widest transition-all ${
                  product.color === 'primary' 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-secondary text-white hover:bg-secondary/90'
                }`}
              >
                Acessar {product.color === 'primary' ? 'Kit' : 'Contratos'} Agora
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
