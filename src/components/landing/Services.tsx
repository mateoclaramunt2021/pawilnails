'use client';

import { useState } from 'react';

const serviceCategories = [
  {
    id: 'manicura-semi',
    name: 'Manicura Semipermanente',
    image: '/images/manicura-permanente.jpg',
    services: [
      { name: 'Esmaltado semipermanente manos', price: 11 },
      { name: 'Esmaltado Semi + Base Niveladora', price: 12.5 },
      { name: 'Esmaltado Semi Francesa', price: 14 },
      { name: 'Manicura Rusa', price: 17.9 },
      { name: 'Manicura Completa Semi', price: 23.9 },
      { name: 'Retirar semipermanente', price: 7 },
    ],
  },
  {
    id: 'manicura-trad',
    name: 'Manicura Tradicional',
    image: '/images/manicura-tradicional.jpg',
    services: [
      { name: 'Esmaltado tradicional', price: 10 },
      { name: 'Manicura completa tradicional', price: 18 },
      { name: 'Manicura completa sin esmaltar', price: 15 },
    ],
  },
  {
    id: 'pedicura-semi',
    name: 'Pedicura Semipermanente',
    image: '/images/pedicurasemipermanente.jpg',
    services: [
      { name: 'Esmaltado semipermanente', price: 16.9 },
      { name: 'Esmaltado Semipermanente + Base Protectora', price: 18 },
      { name: 'Pedicura completa semipermanente', price: 32 },
    ],
  },
  {
    id: 'pedicura-trad',
    name: 'Pedicura Tradicional',
    image: '/images/pedicura,tradicional.jpg',
    services: [
      { name: 'Esmaltado tradicional pies', price: 15.9 },
      { name: 'Pedicura completa tradicional', price: 25.9 },
      { name: 'Pedicura completa sin esmaltado', price: 22.9 },
      { name: 'Cortar, Limar y Masaje', price: 10.9 },
    ],
  },
  {
    id: 'acrilico-gel',
    name: 'Acrílico y Gel',
    image: '/images/acrilicosde-gel.jpg',
    services: [
      { name: 'Extensión de uñas en acrílico o gel con esmaltado semipermanente', price: 35.9 },
      { name: 'Relleno de acrílico o gel', price: 29.9 },
      { name: 'Baño de acrílico o gel sobre uña natural', price: 25 },
      { name: 'Reconstrucción uñas mordidas', price: 39.9 },
      { name: 'Reparación 1 uña con extensión', price: 3.5 },
      { name: 'Uñas Acrílicas nuevas Pies', price: 32.9 },
      { name: 'Extensión de Uñas + Encapsuladas', price: 49.9 },
      { name: 'Uñas Acrílicas Babybommer', price: 39.9 },
      { name: 'Retirar Acrílico o Gel', price: 15 },
      { name: 'Retirar Acrílico o Gel + Esmaltado', price: 20 },
      { name: 'Reparación 1 uña sin extensión', price: 2 },
    ],
  },
  {
    id: 'efectos-semi',
    name: 'Efectos Semipermanentes',
    image: '/images/efectosemipermanentes.jpg',
    services: [
      { name: 'Babybommer', price: 19 },
      { name: 'Efecto Espejo, Aurora, Glazed', price: 15.9 },
      { name: 'Efecto ojo de gato', price: 17.9 },
      { name: 'Diseño multidot', price: 18.9 },
    ],
  },
  {
    id: 'nail-art',
    name: 'Nail Art',
    image: '/images/nail,art.jpg',
    services: [
      { name: 'Decoración básica 1 uña (piedras, stickers, stamping)', price: 1.5 },
      { name: 'Decoración plus 1 uña (dibujos mano alzada)', price: 3 },
      { name: 'Decoración básica 10 uñas (piedras, stickers, stamping)', price: 12 },
      { name: 'Decoración plus 10 uñas (dibujos mano alzada)', price: 20 },
    ],
  },
  {
    id: 'jelly-spa',
    name: 'Jelly Spa',
    image: '/images/jelly-spa.jpg',
    services: [
      { name: 'Manicura Completa Semipermanente Jelly Spa', price: 29.9 },
      { name: 'Manicura Completa Tradicional Jelly Spa', price: 23.9 },
      { name: 'Pedicura Completa Semipermanente Jelly Spa', price: 37.9 },
      { name: 'Pedicura Completa Tradicional Jelly Spa', price: 30.9 },
    ],
  },
];

function formatPrice(price: number) {
  return price % 1 === 0
    ? price + '€'
    : price.toFixed(2).replace('.', ',') + '€';
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);
  const active = serviceCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="servicios" className="py-28 sm:py-32 px-4 relative overflow-hidden">
      {/* Refined background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rosa-50/40 via-white to-white" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rosa-200/50 to-transparent" />

      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rosa-100/25 rounded-full blur-[150px]" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-dorado-300/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-8 inline-flex">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-playfair)] text-rosa-950 mb-5 tracking-tight">
            ¿Qué <span className="italic gradient-text">necesitas</span>?
          </h2>
          <p className="text-rosa-600/50 max-w-xl mx-auto text-lg leading-relaxed">
            Descubre nuestra amplia carta de servicios pensados para el cuidado perfecto de tus uñas
          </p>
        </div>

        {/* Category tabs - redesigned */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-rosa-600 to-rosa-500 text-white shadow-lg shadow-rosa-300/30 scale-[1.03]'
                  : 'bg-white text-rosa-700/70 hover:text-rosa-600 hover:bg-rosa-50 border border-rosa-200/60 hover:border-rosa-300/80 hover:shadow-sm'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active category content */}
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl shadow-rosa-200/20 aspect-[4/3] group">
              <img
                src={active.image}
                alt={active.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rosa-950/60 via-rosa-950/10 to-transparent" />
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <h3 className="text-2xl font-bold text-white font-[var(--font-playfair)] drop-shadow-lg">{active.name}</h3>
                <p className="text-white/60 text-sm mt-1.5 font-medium">{active.services.length} servicios disponibles</p>
              </div>
            </div>

            {/* Jelly Spa special description */}
            {activeCategory === 'jelly-spa' && (
              <div className="mt-8 bg-gradient-to-br from-rosa-50 to-nude-100 rounded-3xl p-7 border border-rosa-200/30 shadow-sm">
                <h4 className="font-semibold text-rosa-900 mb-4 font-[var(--font-playfair)] text-lg">
                  ✨ Experiencia Jelly Spa
                </h4>
                <ul className="space-y-2.5 text-sm text-rosa-700/65">
                  {[
                    'Baño de Burbujas con bomba efervescente',
                    'Pétalos de Rosa',
                    'Sales Minerales de aromas',
                    'Jelly Spa',
                    'Exfoliante de colágeno y vitaminas',
                    'Termoterapia (Parafina)',
                    'Mascarilla Hidratante',
                    'Aceites especiales',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-rosa-400 to-rosa-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Services list */}
          <div className="lg:col-span-3 space-y-3">
            {active.services.map((service, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-5 sm:p-6 border border-rosa-100/70 hover:border-rosa-300/60 card-hover flex items-center justify-between gap-4 cursor-pointer relative overflow-hidden"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-rosa-900 group-hover:text-rosa-600 transition-colors duration-300">
                    {service.name}
                  </h4>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xl font-bold gradient-text font-[var(--font-playfair)]">
                    {formatPrice(service.price)}
                  </span>
                  <a
                    href="#reservar"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-rosa-500 to-rosa-600 text-white text-xs px-5 py-2 rounded-full hover:shadow-lg hover:shadow-rosa-300/30 font-semibold tracking-wide"
                  >
                    Reservar
                  </a>
                </div>
              </div>
            ))}

            {/* Extras section */}
            {(activeCategory === 'jelly-spa' || activeCategory === 'manicura-semi') && (
              <div className="mt-8 pt-6 border-t border-rosa-100/60">
                <h4 className="text-sm font-semibold text-rosa-400 uppercase tracking-wider mb-4">
                  Suplementos y Extras
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-rosa-50 to-nude-50 rounded-xl p-4 flex items-center justify-between border border-rosa-100/40">
                    <span className="text-sm text-rosa-800/70">Suplemento 1 color extra</span>
                    <span className="font-bold text-rosa-600 text-sm">1€</span>
                  </div>
                  <div className="bg-gradient-to-br from-rosa-50 to-nude-50 rounded-xl p-4 flex items-center justify-between border border-rosa-100/40">
                    <span className="text-sm text-rosa-800/70">Suplemento Termoterapia</span>
                    <span className="font-bold text-rosa-600 text-sm">2,50€</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
