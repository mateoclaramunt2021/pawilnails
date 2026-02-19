import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-rosa-50/30 to-rosa-100/20 overflow-hidden">
      <div className="section-divider" />

      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rosa-200/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rosa-500 to-rosa-700 flex items-center justify-center shadow-lg shadow-rosa-300/30">
                <span className="text-white font-bold text-xl font-[var(--font-playfair)]">P</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-[var(--font-playfair)] gradient-text">Pawil Nails</span>
              </div>
            </div>
            <p className="text-rosa-600/50 text-sm leading-relaxed mb-8 max-w-xs">
              Tus uñas cuentan historias. El mejor servicio, la mejor calidad, al mejor precio.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/pawilnails"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-2xl bg-white border border-rosa-200/60 flex items-center justify-center text-rosa-500 hover:bg-gradient-to-br hover:from-rosa-500 hover:to-rosa-600 hover:text-white hover:border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-rosa-300/20"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/pawilnails"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-2xl bg-white border border-rosa-200/60 flex items-center justify-center text-rosa-500 hover:bg-gradient-to-br hover:from-rosa-500 hover:to-rosa-600 hover:text-white hover:border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-rosa-300/20"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-rosa-900 font-[var(--font-playfair)] mb-5 text-[15px]">Enlaces</h4>
            <ul className="space-y-3.5">
              {['Inicio', 'Servicios', 'Opiniones', 'Contacto'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-rosa-600/50 hover:text-rosa-600 text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <a href="#reservar" className="text-rosa-600/50 hover:text-rosa-600 text-sm transition-all duration-300 hover:translate-x-1 inline-block">
                  Reservar Cita
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-rosa-900 font-[var(--font-playfair)] mb-5 text-[15px]">Servicios</h4>
            <ul className="space-y-3.5">
              {[
                'Manicura Semipermanente',
                'Manicura Tradicional',
                'Pedicura',
                'Acrílico y Gel',
                'Nail Art',
                'Jelly Spa',
              ].map((service) => (
                <li key={service}>
                  <a href="#servicios" className="text-rosa-600/50 hover:text-rosa-600 text-sm transition-all duration-300 hover:translate-x-1 inline-block">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-rosa-900 font-[var(--font-playfair)] mb-5 text-[15px]">Contacto</h4>
            <ul className="space-y-3.5 text-sm text-rosa-600/50">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-rosa-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Av. de la Constitució, 78, local 7
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-rosa-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Castelldefels (Barcelona)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rosa-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                611 86 95 04
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rosa-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                pawilnails@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-rosa-200/40">
        <div className="max-w-7xl mx-auto px-4 py-7 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-rosa-400/70">
            Desarrollado por adelfi para Pawil Nails © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-xs text-rosa-400/70 hover:text-rosa-600 transition-colors duration-300">
              Privacidad
            </a>
            <a href="#" className="text-xs text-rosa-400/70 hover:text-rosa-600 transition-colors duration-300">
              Términos
            </a>
            <Link
              href="/admin/login"
              className="text-xs text-rosa-300/50 hover:text-rosa-500 transition-colors duration-300"
            >
              Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
