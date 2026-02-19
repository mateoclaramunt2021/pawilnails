export default function About() {
  return (
    <section className="py-28 sm:py-32 px-4 relative overflow-hidden bg-[#FFFBFC]">
      {/* Decorative backgrounds */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rosa-100/30 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dorado-300/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-rosa-300/15 group">
              <img
                src="/images/sillones-pedicura.jpeg"
                alt="Interior Pawil Nails"
                className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rosa-950/40 via-rosa-950/5 to-transparent" />
              {/* Decorative border effect */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white rounded-3xl p-7 shadow-2xl shadow-rosa-200/20 max-w-[240px] border border-rosa-100/60 backdrop-blur-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rosa-100 to-rosa-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-rosa-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rosa-900 font-[var(--font-playfair)] leading-none">4.9</div>
                  <div className="text-xs text-rosa-400 mt-1 font-medium">Valoración media</div>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-rosa-200 to-transparent my-3" />
              <p className="text-xs text-rosa-600/60 leading-relaxed">+1.200 clientes satisfechas nos avalan en Treatwell</p>
            </div>

            {/* Decorative accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-rosa-200/40 rounded-3xl -z-10" />
          </div>

          {/* Text */}
          <div>
            <span className="section-label mb-8 inline-flex">
              Sobre Nosotros
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-playfair)] text-rosa-950 mb-8 leading-[1.1] tracking-tight">
              Cuidamos cada{' '}
              <span className="italic gradient-text">detalle</span>
            </h2>

            <div className="elegant-line mb-8" />

            <p className="text-rosa-800/65 text-lg leading-relaxed mb-5">
              Pawil Nails es un Spa de Uñas ubicado en Castelldefels, nuestro propósito es brindar un servicio
              profesional y completo manteniendo los estándares de calidad.
            </p>
            <p className="text-rosa-700/50 leading-relaxed mb-10">
              Disfruta de los beneficios de nuestros servicios, quédate dónde te sientas cuidada.
              Confía en tu belleza, mereces que te admiren. Reconocerte valiosa es el comienzo de
              cosas grandes.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: '💅', title: 'Profesionalidad', desc: 'Manicuristas capacitadas' },
                { icon: '✨', title: 'Calidad Premium', desc: 'Productos de primera' },
                { icon: '🌸', title: 'Ambiente Acogedor', desc: 'Tu comodidad primero' },
                { icon: '💖', title: 'Atención Personal', desc: 'Cada clienta es única' },
              ].map((item) => (
                <div key={item.title} className="group flex gap-4 items-start p-4 rounded-2xl hover:bg-rosa-50/80 transition-all duration-300 cursor-default">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-rosa-900 text-sm mb-0.5">{item.title}</h4>
                    <p className="text-rosa-500/70 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
