export default function Contact() {
  return (
    <section id="contacto" className="py-28 sm:py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rosa-50/20 to-rosa-50/40" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rosa-200/40 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rosa-100/20 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-8 inline-flex">
            Contacto
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-playfair)] text-rosa-950 mb-5 tracking-tight">
            Contacta con <span className="italic gradient-text">nosotros</span>
          </h2>
          <p className="text-rosa-600/50 max-w-xl mx-auto text-lg">
            Más que uñas: bienestar y tranquilidad. Lo que amas está cuidado, con amor te cuidas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Info cards */}
          <div className="space-y-5">
            {/* Location */}
            <div className="card-premium p-7 flex gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rosa-100 to-rosa-200/70 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
                <svg className="w-6 h-6 text-rosa-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-rosa-900 mb-1.5 text-[15px]">¿Dónde estamos?</h4>
                <p className="text-rosa-600/55 text-sm leading-relaxed">Av. de la Constitució, 78, local 7</p>
                <p className="text-rosa-600/55 text-sm">08860 Castelldefels (Barcelona)</p>
              </div>
            </div>

            {/* Phone */}
            <div className="card-premium p-7 flex gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rosa-100 to-rosa-200/70 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
                <svg className="w-6 h-6 text-rosa-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-rosa-900 mb-1.5 text-[15px]">Contacto</h4>
                <p className="text-rosa-600/55 text-sm">611 86 95 04</p>
                <p className="text-rosa-600/55 text-sm">pawilnails@gmail.com</p>
              </div>
            </div>

            {/* Schedule */}
            <div className="card-premium p-7 flex gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rosa-100 to-rosa-200/70 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
                <svg className="w-6 h-6 text-rosa-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-rosa-900 mb-1.5 text-[15px]">Horario</h4>
                <p className="text-rosa-600/55 text-sm">Lunes a viernes: 09:00 – 21:00</p>
                <p className="text-rosa-600/55 text-sm">Sábado: 09:00 – 19:00</p>
                <p className="text-rosa-400/70 text-sm mt-0.5">Domingo: Cerrado</p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/34611869504?text=Hola%20Pawil%20Nails%2C%20me%20gustaría%20pedir%20información"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6 font-semibold hover:shadow-xl hover:shadow-green-200/30 transition-all duration-500 hover:-translate-y-1 group"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-rosa-200/15 border border-rosa-100/60 h-[540px] ring-1 ring-rosa-100/30">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.1693!2d1.9765!3d41.2816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49e8e0e000001%3A0x0!2sAv.+de+la+Constituci%C3%B3%2C+78%2C+08860+Castelldefels%2C+Barcelona!5e0!3m2!1ses!2ses!4v1709000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Pawil Nails"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
