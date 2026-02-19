export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with cinematic overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/images/entrada.jpeg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rosa-950/90 via-rosa-900/75 to-rosa-800/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFAF7] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-rosa-950/40 via-transparent to-rosa-950/40" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-rosa-500/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-dorado-400/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rosa-400/5 rounded-full blur-[150px]" />

      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-[0.03]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <div className="animate-fade-in-up mb-8">
          <img src="/images/logo.jpg" alt="Pawil Nails" className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl mx-auto shadow-2xl shadow-black/30 border-2 border-white/20" />
        </div>

        <div className="animate-fade-in-up">
          <span className="section-label !text-white/90 !bg-white/10 !border-white/20 backdrop-blur-xl mb-10 inline-flex">
            Spa de Uñas — Castelldefels
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold font-[var(--font-playfair)] text-white leading-[1.05] mb-8 animate-fade-in-up tracking-[-0.02em]"
          style={{ animationDelay: '0.15s' }}
        >
          Tus uñas cuentan{' '}
          <br className="hidden sm:block" />
          <span className="italic gradient-text-light">
            historias
          </span>
        </h1>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="elegant-line mx-auto mb-8 !bg-gradient-to-r !from-white/40 !via-dorado-300/60 !to-white/40" />
        </div>

        <p
          className="text-lg sm:text-xl md:text-2xl text-white/75 max-w-2xl mx-auto mb-3 font-light animate-fade-in-up font-[var(--font-cormorant)] tracking-wide"
          style={{ animationDelay: '0.35s' }}
        >
          ¿Son frágiles? ¿Resistentes?
        </p>

        <p
          className="text-base sm:text-lg text-white/50 max-w-xl mx-auto mb-12 animate-fade-in-up leading-relaxed"
          style={{ animationDelay: '0.45s' }}
        >
          El mejor servicio, la mejor calidad, al mejor precio.
          <br />
          Confía en tu belleza, mereces que te admiren.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <a
            href="#reservar"
            className="btn-premium text-base sm:text-lg px-10 py-4 rounded-full inline-flex items-center gap-3 animate-pulse-glow group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Reservar Cita
          </a>
          <a
            href="#servicios"
            className="group px-10 py-4 rounded-full border-2 border-white/25 text-white font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-500 inline-flex items-center gap-3 backdrop-blur-sm"
          >
            Ver Servicios
            <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-20 flex flex-wrap justify-center gap-6 sm:gap-8 animate-fade-in-up"
          style={{ animationDelay: '0.9s' }}
        >
          {[
            { value: '4.9', label: 'Treatwell', sub: '1.2K+ reseñas', icon: '⭐' },
            { value: '4.7', label: 'Google', sub: '121 reseñas', icon: '⭐' },
            { value: '2+', label: 'Años', sub: 'de experiencia', icon: '💅' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group text-center px-8 py-5 rounded-2xl border border-white/15 backdrop-blur-xl bg-white/[0.07] hover:bg-white/[0.12] hover:border-white/25 transition-all duration-500 hover:-translate-y-1 cursor-default min-w-[140px]"
            >
              <div className="text-base mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold text-white font-[var(--font-playfair)] drop-shadow-lg tracking-tight">
                {stat.value}
              </div>
              <div className="text-white/70 font-semibold text-sm mt-1.5">{stat.label}</div>
              <div className="text-white/40 text-xs font-medium mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-7 h-11 border-2 border-white/20 rounded-full flex items-start justify-center pt-2.5 backdrop-blur-sm">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
