'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#opiniones', label: 'Opiniones' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'glass shadow-xl shadow-rosa-200/10 py-2.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rosa-500 to-rosa-700 flex items-center justify-center shadow-lg shadow-rosa-400/30 group-hover:shadow-rosa-400/50 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
              <span className="text-white font-bold text-lg font-[var(--font-playfair)]">P</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold font-[var(--font-playfair)] leading-tight transition-colors duration-500 ${
              scrolled ? 'gradient-text' : 'text-white'
            }`}>
              Pawil Nails
            </span>
            <span className={`text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-500 ${
              scrolled ? 'text-rosa-400' : 'text-white/60'
            }`}>
              Spa de Uñas
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 relative group ${
                scrolled
                  ? 'text-rosa-900/70 hover:text-rosa-600 hover:bg-rosa-50'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-6 transition-all duration-300 rounded-full ${
                scrolled ? 'bg-rosa-500' : 'bg-white/70'
              }`} />
            </a>
          ))}
          <div className="ml-3">
            <a
              href="#reservar"
              className="btn-premium text-sm !px-7 !py-2.5 rounded-full inline-flex items-center gap-2 group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reservar
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
            scrolled ? 'hover:bg-rosa-100' : 'hover:bg-white/10'
          }`}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''} ${
              scrolled ? 'bg-rosa-800' : 'bg-white'
            }`} />
            <span className={`block h-0.5 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''} ${
              scrolled ? 'bg-rosa-800' : 'bg-white'
            }`} />
            <span className={`block h-0.5 rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''} ${
              scrolled ? 'bg-rosa-800' : 'bg-white'
            }`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass mx-4 mt-3 rounded-3xl p-7 space-y-2 shadow-2xl shadow-rosa-200/20 border border-rosa-100/50">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-rosa-900 font-medium hover:text-rosa-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-rosa-50"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="#reservar"
              onClick={() => setMenuOpen(false)}
              className="btn-premium block text-center text-sm py-3.5 rounded-full"
            >
              Reservar Cita
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
