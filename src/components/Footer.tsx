/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, doc, onSnapshot } from '../lib/firebase';

const DEFAULT_LOGO = "https://lh3.googleusercontent.com/aida/ADBb0uhUeEUjIUKFWpijfRCr7aOBVvUcY6yBKnTqx2HP2oDZVowK-tiB48F4NIe_dshhSFtUIeBrrJMHo9aqdjIy0_xepRjCu1tgd8c1Pw6gb44Tzk46m6geGvIXckkSvm-kTKvYnoXP04x8CYzUWW_7DAXYB_MUPWIbLxaBAwmulzLzbRzSY_PS52HC8_H54d-ULRc0gEzeMUmC9huDFqYR5x6uJXIzExTbY6qq89N5VgwXCPzjNYl424n7Vkub1XnE6whBc1idspBS";

export default function Footer() {
  const [logo, setLogo] = useState(DEFAULT_LOGO);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'configs', 'homepage'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.branding?.logo) {
          setLogo(data.branding.logo);
        }
      }
    });
    return () => unsub();
  }, []);

  return (
    <footer className="bg-primary text-white py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 items-start mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <img 
              alt="Rosane Borges Paisagismo" 
              className="h-16 w-auto object-contain" 
              src={logo} 
            />
            <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] font-sans">
              Excelência Técnica em Paisagismo
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Empresa</p>
              <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Início</Link>
              <Link to="/#sobre" className="text-sm text-white/70 hover:text-white transition-colors">Sobre</Link>
              <Link to="/#portfolio" className="text-sm text-white/70 hover:text-white transition-colors">Portfólio</Link>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Suporte</p>
              <Link to="/produtos" className="text-sm text-white/70 hover:text-white transition-colors">Produtos</Link>
              <Link to="/produtos#faq" className="text-sm text-white/70 hover:text-white transition-colors">FAQ</Link>
              <Link to="/sistema" className="text-sm text-white/70 hover:text-white transition-colors">Sistema</Link>
              <Link to="/contato" className="text-sm text-white/70 hover:text-white transition-colors">Contato</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <p className="text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Redes Sociais</p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/rosanepaisagismo/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-[10px] text-white/30 font-bold uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Rosane Borges Paisagismo. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
