'use client';

import { useState } from 'react';

const reviews = [
  {
    name: 'MR F',
    date: '01/03/2024',
    rating: 5,
    text: 'Muy buena atención, la chica muy profesional el sitio bonito y agradable me ofrecieron una infusión. Volveré y lo recomiendo.',
  },
  {
    name: 'Nayla Montiel Rodríguez',
    date: '29/02/2024',
    rating: 5,
    text: 'Me encanta el servicio! Paula es encantadora, además de simpática lo hace todo genial. Nunca habían tardado tan poco en hacerme unas uñas francesas y tan perfectas! Mi salón favorito de uñas!!! Además el interior es precioso, de ensueño.',
  },
  {
    name: 'Nelly Sabogal',
    date: '28/02/2024',
    rating: 5,
    text: 'Hacía falta un sitio así, entre por curiosidad y quede impresionada de la decoración del local pero aparte de esto el servicio, la atención y el trato es inmejorable, todo el servicio excelente. Un sitio donde hay que ir si vienes a Castelldefels.',
  },
  {
    name: 'Laura Torres',
    date: '28/02/2024',
    rating: 5,
    text: 'Una experiéncia muy agradable, tenia miedo de como seria el tipo de manicura pero una grata sorpresa al ver que me han realizado la manicura sin tornos ni limas agresivas. Productos naturales y de calidad. Atención inmejorable.',
  },
  {
    name: 'Cristina Radean',
    date: '28/02/2024',
    rating: 5,
    text: 'Vine al centro porque me lo recomendó una amiga y realmente desde que entramos la atención, ambiente y decoración de 100, luego me hecho una pedicura genial. Estamos muy contentas. Las recomendamos al 100%.',
  },
  {
    name: 'Sandry Meneses',
    date: '26/02/2024',
    rating: 5,
    text: 'Fui al lugar por la inauguración, me pareció encantador, precioso el lugar, las chicas encantadoras, muy majas, pendientes de que me gustara el trabajo. Paula muy profesional encantadora. Volveré sin dudarlo.',
  },
  {
    name: 'Sara Jimenez',
    date: '26/02/2024',
    rating: 5,
    text: 'Es un lugar maravilloso, las chicas son muy profesionales y amables, me siento muy cómoda, como en casa. El jelly spa fue increíble, vale la pena. Sin duda volveré.',
  },
  {
    name: 'Raquel Santos',
    date: '26/02/2024',
    rating: 5,
    text: 'Muy contenta con el resultado, Paula es encantadora, muy agradable, educada, dulce, siempre pendiente de que me gustara el trabajo. El sitio super bonito, con muy buen gusto decorado. Volveremos.',
  },
  {
    name: 'EVA',
    date: '25/02/2024',
    rating: 5,
    text: 'Fuimos a la inauguración y la verdad es que nos sorprendió gratamente. Las chicas muy amables, atentas y profesionales. El resultado de la manicura nos gustó mucho, sin duda volveremos a repetir.',
  },
  {
    name: 'Luisa Jimenez',
    date: '24/02/2024',
    rating: 5,
    text: 'Se nota en cada detalle la atención. El nail art que realiza Paula es chulísimo. Un sitio en Castelldefels que me place visitar cada que voy.',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-dorado-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visibleReviews = reviews.slice(currentPage * perPage, (currentPage + 1) * perPage);

  return (
    <section id="opiniones" className="py-28 sm:py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rosa-50/20 to-rosa-50/40" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rosa-200/40 to-transparent" />

      {/* Decorative */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-rosa-100/20 rounded-full blur-[150px] translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dorado-300/10 rounded-full blur-[120px] -translate-x-1/3" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-8 inline-flex">
            Opiniones
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-playfair)] text-rosa-950 mb-5 tracking-tight">
            Nuestros clientes <span className="italic gradient-text">hablan</span>
          </h2>
          <p className="text-rosa-600/50 max-w-xl mx-auto text-lg">
            Más de 1.200 reseñas nos respaldan. Tu confianza es nuestra mayor recompensa.
          </p>

          {/* Rating badges */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <div className="bg-white rounded-2xl px-7 py-5 shadow-lg shadow-rosa-100/30 border border-rosa-100/60 flex items-center gap-4 hover:shadow-xl hover:shadow-rosa-100/40 transition-all duration-500 hover:-translate-y-0.5">
              <div className="text-3xl font-bold text-rosa-900 font-[var(--font-playfair)] leading-none">4.9</div>
              <div className="text-left">
                <Stars count={5} />
                <div className="text-xs text-rosa-400 mt-1 font-medium">Treatwell · 1.2K+ reseñas</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl px-7 py-5 shadow-lg shadow-rosa-100/30 border border-rosa-100/60 flex items-center gap-4 hover:shadow-xl hover:shadow-rosa-100/40 transition-all duration-500 hover:-translate-y-0.5">
              <div className="text-3xl font-bold text-rosa-900 font-[var(--font-playfair)] leading-none">4.7</div>
              <div className="text-left">
                <Stars count={5} />
                <div className="text-xs text-rosa-400 mt-1 font-medium">Google · 121 reseñas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {visibleReviews.map((review, idx) => (
            <div
              key={idx}
              className="card-premium p-8 relative group"
            >
              {/* Quote icon */}
              <svg className="absolute top-6 right-6 w-10 h-10 text-rosa-100 group-hover:text-rosa-200 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391C0 7.905 3.748 4.039 9 3l.996 2.151C7.563 6.068 5.996 8.789 5.996 11h4.017v10H0z" />
              </svg>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rosa-400 to-rosa-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-rosa-300/20 w-[52px] h-[52px]">
                  {getInitials(review.name)}
                </div>
                <div>
                  <h4 className="font-semibold text-rosa-900 text-[15px]">{review.name}</h4>
                  <p className="text-xs text-rosa-400 mt-0.5">{review.date}</p>
                </div>
              </div>
              <Stars count={review.rating} />
              <p className="mt-5 text-rosa-800/55 text-[15px] leading-relaxed line-clamp-4">{review.text}</p>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2.5">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                currentPage === i
                  ? 'bg-gradient-to-r from-rosa-500 to-rosa-600 w-10 shadow-sm shadow-rosa-300/40'
                  : 'bg-rosa-200 hover:bg-rosa-300 w-2.5'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
