'use client';

import { useState, useEffect } from 'react';

interface ServiceOption {
  id: string;
  name: string;
  price: number;
  duration: number;
  categoryName: string;
}

interface CategoryGroup {
  name: string;
  services: ServiceOption[];
}

const DEMO_CATEGORIES: CategoryGroup[] = [
  {
    name: 'Manicura Semipermanente',
    services: [
      { id: 'd1', name: 'Esmaltado semipermanente manos', price: 11, duration: 30, categoryName: 'Manicura Semipermanente' },
      { id: 'd2', name: 'Esmaltado Semi + Base Niveladora', price: 12.5, duration: 35, categoryName: 'Manicura Semipermanente' },
      { id: 'd3', name: 'Esmaltado Semi Francesa', price: 14, duration: 40, categoryName: 'Manicura Semipermanente' },
      { id: 'd4', name: 'Manicura Rusa', price: 17.9, duration: 45, categoryName: 'Manicura Semipermanente' },
      { id: 'd5', name: 'Manicura Completa Semi', price: 23.9, duration: 60, categoryName: 'Manicura Semipermanente' },
      { id: 'd6', name: 'Retirar semipermanente', price: 7, duration: 20, categoryName: 'Manicura Semipermanente' },
    ],
  },
  {
    name: 'Manicura Tradicional',
    services: [
      { id: 'd7', name: 'Esmaltado tradicional', price: 10, duration: 25, categoryName: 'Manicura Tradicional' },
      { id: 'd8', name: 'Manicura completa tradicional', price: 18, duration: 45, categoryName: 'Manicura Tradicional' },
      { id: 'd9', name: 'Manicura completa sin esmaltar', price: 15, duration: 40, categoryName: 'Manicura Tradicional' },
    ],
  },
  {
    name: 'Pedicura Semipermanente',
    services: [
      { id: 'd10', name: 'Esmaltado semipermanente pies', price: 16.9, duration: 35, categoryName: 'Pedicura Semipermanente' },
      { id: 'd11', name: 'Esmaltado Semi + Base Protectora', price: 18, duration: 40, categoryName: 'Pedicura Semipermanente' },
      { id: 'd12', name: 'Pedicura completa semipermanente', price: 32, duration: 60, categoryName: 'Pedicura Semipermanente' },
    ],
  },
  {
    name: 'Pedicura Tradicional',
    services: [
      { id: 'd13', name: 'Esmaltado tradicional pies', price: 15.9, duration: 30, categoryName: 'Pedicura Tradicional' },
      { id: 'd14', name: 'Pedicura completa tradicional', price: 25.9, duration: 50, categoryName: 'Pedicura Tradicional' },
      { id: 'd15', name: 'Cortar, Limar y Masaje', price: 10.9, duration: 25, categoryName: 'Pedicura Tradicional' },
    ],
  },
  {
    name: 'Uñas Acrílicas / Gel',
    services: [
      { id: 'd16', name: 'Uñas acrílicas esculpidas', price: 38, duration: 75, categoryName: 'Uñas Acrílicas / Gel' },
      { id: 'd17', name: 'Uñas de gel', price: 35, duration: 70, categoryName: 'Uñas Acrílicas / Gel' },
      { id: 'd18', name: 'Mantenimiento acrílico/gel', price: 28, duration: 55, categoryName: 'Uñas Acrílicas / Gel' },
      { id: 'd19', name: 'Retirada acrílico/gel', price: 12, duration: 30, categoryName: 'Uñas Acrílicas / Gel' },
    ],
  },
  {
    name: 'Extras & Nail Art',
    services: [
      { id: 'd20', name: 'Nail Art (por uña)', price: 2, duration: 10, categoryName: 'Extras & Nail Art' },
      { id: 'd21', name: 'Jelly Spa pies', price: 8, duration: 20, categoryName: 'Extras & Nail Art' },
      { id: 'd22', name: 'Tratamiento fortalecedor', price: 5, duration: 15, categoryName: 'Extras & Nail Art' },
    ],
  },
];

const formatPrice = (price: number) =>
  price % 1 === 0 ? price + '€' : price.toFixed(2).replace('.', ',') + '€';

export default function BookingSection() {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<CategoryGroup[]>(DEMO_CATEGORIES);
  const [selectedServices, setSelectedServices] = useState<ServiceOption[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [clientData, setClientData] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  const toggleService = (service: ServiceOption) => {
    setSelectedServices((prev) =>
      prev.find((s) => s.id === service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service]
    );
  };

  useEffect(() => {
    fetch('/api/servicios')
      .then((r) => r.json())
      .then((data) => {
        if (data.categories) {
          const groups: CategoryGroup[] = data.categories.map((cat: { name: string; services: { id: string; name: string; price: number; duration: number }[] }) => ({
            name: cat.name,
            services: cat.services.map((s: { id: string; name: string; price: number; duration: number }) => ({
              ...s,
              categoryName: cat.name,
            })),
          }));
          setCategories(groups);
        }
      })
      .catch(() => {
        // API not available (static export) - keep demo data
      });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetch(`/api/reservas/disponibilidad?date=${selectedDate}`)
        .then((r) => r.json())
        .then((data) => setBookedSlots(data.bookedSlots || []))
        .catch(() => {
          // Static mode - no booked slots
          setBookedSlots([]);
        });
    }
  }, [selectedDate]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay: firstDay === 0 ? 6 : firstDay - 1, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (date < today) return true;
    if (date.getDay() === 0) return true; // Domingo
    return false;
  };

  const formatDateString = (day: number) => {
    const y = currentMonth.getFullYear();
    const m = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getTimeSlots = () => {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    const endHour = dayOfWeek === 6 ? 19 : 21; // Sábado hasta 19, resto hasta 21
    const slots: string[] = [];
    for (let h = 9; h < endHour; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00`);
      if (h < endHour - 1 || (h === endHour - 1 && endHour > h)) {
        slots.push(`${String(h).padStart(2, '0')}:30`);
      }
    }
    return slots.filter((s) => !bookedSlots.includes(s));
  };

  const handleSubmit = async () => {
    if (selectedServices.length === 0 || !selectedDate || !selectedTime || !clientData.name || !clientData.phone) return;
    setLoading(true);
    try {
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedServices[0].id,
          services: selectedServices.map((s) => s.id),
          date: selectedDate,
          time: selectedTime,
          clientName: clientData.name,
          clientPhone: clientData.phone,
          clientEmail: clientData.email,
          total: totalPrice,
        }),
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch {
      // API not available (static/demo mode) — simulate success
      await new Promise((r) => setTimeout(r, 1200));
      setSuccess(true);
    }
    setLoading(false);
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];
  const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  if (success) {
    return (
      <section id="reservar" className="py-28 sm:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rosa-50/30 via-white to-white" />
        <div className="max-w-2xl mx-auto text-center relative">
          <div className="bg-white rounded-[2rem] p-14 shadow-2xl shadow-rosa-100/30 border border-rosa-100/60">
            <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100/50">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold font-[var(--font-playfair)] text-rosa-950 mb-5">
              ¡Reserva Confirmada!
            </h3>
            <div className="text-rosa-700/60 mb-2 text-lg">
              {selectedServices.length === 1 ? (
                <p>Tu cita para <strong className="text-rosa-800">{selectedServices[0].name}</strong> ha sido registrada.</p>
              ) : (
                <div>
                  <p className="mb-3">Tus servicios han sido registrados:</p>
                  <ul className="text-sm space-y-1 mb-2">
                    {selectedServices.map((s) => (
                      <li key={s.id} className="text-rosa-800 font-medium">• {s.name} — {formatPrice(s.price)}</li>
                    ))}
                  </ul>
                  <p className="font-bold gradient-text text-lg">Total: {formatPrice(totalPrice)}</p>
                </div>
              )}
            </div>
            <p className="text-rosa-600 font-semibold mb-8 text-lg">
              {selectedDate.split('-').reverse().join('/')} a las {selectedTime}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-rosa-200 to-transparent mb-8" />
            <p className="text-sm text-rosa-400 mb-10">
              Te esperamos en Av. de la Constitució, 78, local 7, Castelldefels
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setStep(1);
                setSelectedServices([]);
                setSelectedDate('');
                setSelectedTime('');
                setClientData({ name: '', phone: '', email: '' });
              }}
              className="btn-premium px-10 py-4 rounded-full text-base"
            >
              Nueva Reserva
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservar" className="py-28 sm:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-rosa-50/30 via-white to-white" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rosa-200/40 to-transparent" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-rosa-100/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-dorado-300/10 rounded-full blur-[100px]" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-8 inline-flex">
            Reservar Cita
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-playfair)] text-rosa-950 mb-5 tracking-tight">
            Agenda tu <span className="italic gradient-text">cita</span>
          </h2>
          <p className="text-rosa-600/50 max-w-xl mx-auto text-lg">
            Selecciona tu servicio, elige fecha y hora, y confirma tu reserva en segundos
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-14">
          {[
            { n: 1, label: 'Servicio' },
            { n: 2, label: 'Fecha' },
            { n: 3, label: 'Hora' },
            { n: 4, label: 'Datos' },
          ].map((s) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    step >= s.n
                      ? 'bg-gradient-to-br from-rosa-500 to-rosa-600 text-white shadow-lg shadow-rosa-300/40'
                      : 'bg-rosa-50 text-rosa-300 border border-rosa-200/50'
                  }`}
                >
                  {step > s.n ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.n
                  )}
                </div>
                <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-300 hidden sm:block ${
                  step >= s.n ? 'text-rosa-600' : 'text-rosa-300'
                }`}>
                  {s.label}
                </span>
              </div>
              {s.n < 4 && (
                <div className={`w-10 sm:w-16 h-0.5 rounded-full mb-5 sm:mb-0 ${step > s.n ? 'bg-gradient-to-r from-rosa-500 to-rosa-400' : 'bg-rosa-100'} transition-colors duration-500`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl shadow-rosa-100/30 border border-rosa-100/60 overflow-hidden">
          {/* Step 1: Select Services */}
          {step === 1 && (
            <div className="p-8 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-rosa-900 font-[var(--font-playfair)]">
                  1. Selecciona tus servicios
                </h3>
                {selectedServices.length > 0 && (
                  <span className="text-xs font-bold text-rosa-500 bg-rosa-50 px-3 py-1.5 rounded-full border border-rosa-200/50">
                    {selectedServices.length} seleccionado{selectedServices.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="space-y-8 max-h-[420px] overflow-y-auto pr-2">
                {categories.map((cat) => (
                  <div key={cat.name}>
                    <h4 className="text-xs font-bold text-rosa-400 uppercase tracking-[0.15em] mb-4">
                      {cat.name}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {cat.services.map((service) => {
                        const isSelected = selectedServices.some((s) => s.id === service.id);
                        return (
                          <button
                            key={service.id}
                            onClick={() => toggleService(service)}
                            className={`text-left p-4 rounded-2xl border transition-all duration-300 hover:border-rosa-400/60 hover:bg-rosa-50/80 hover:shadow-sm group relative ${
                              isSelected
                                ? 'border-rosa-500 bg-rosa-50 shadow-sm shadow-rosa-100/50'
                                : 'border-rosa-100/70'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-3 right-3 w-5 h-5 bg-gradient-to-br from-rosa-500 to-rosa-600 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                            <div className="font-medium text-rosa-900/80 text-sm group-hover:text-rosa-700 transition-colors pr-6">{service.name}</div>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-rosa-500 font-bold text-sm">{formatPrice(service.price)}</span>
                              <span className="text-rosa-300 text-xs">· {service.duration} min</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected services summary / cart */}
              {selectedServices.length > 0 && (
                <div className="mt-8 bg-gradient-to-br from-rosa-50 to-nude-50 rounded-2xl p-6 border border-rosa-100/40">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-rosa-400 uppercase tracking-[0.15em]">Tu selección</h4>
                    <button
                      onClick={() => setSelectedServices([])}
                      className="text-xs text-rosa-400 hover:text-rosa-600 transition-colors"
                    >
                      Limpiar todo
                    </button>
                  </div>
                  <div className="space-y-2 mb-4">
                    {selectedServices.map((s) => (
                      <div key={s.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleService(s)}
                            className="w-5 h-5 rounded-full bg-rosa-100 hover:bg-rosa-200 flex items-center justify-center text-rosa-500 transition-colors shrink-0"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <span className="text-rosa-800">{s.name}</span>
                        </div>
                        <span className="text-rosa-500 font-semibold">{formatPrice(s.price)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-rosa-200 to-transparent mb-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-rosa-600 font-semibold">Total</span>
                      <span className="text-xs text-rosa-400 ml-2">~{totalDuration} min</span>
                    </div>
                    <span className="text-xl font-bold gradient-text">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setStep(2)}
                  disabled={selectedServices.length === 0}
                  className="btn-premium px-10 py-3.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2.5"
                >
                  Continuar
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date */}
          {step === 2 && (
            <div className="p-8 sm:p-10">
              <h3 className="text-xl font-bold text-rosa-900 font-[var(--font-playfair)] mb-2">
                2. Selecciona la fecha
              </h3>
              <p className="text-sm text-rosa-500/70 mb-8">
                {selectedServices.length === 1 ? (
                  <>Servicio: <strong className="text-rosa-700">{selectedServices[0].name}</strong> — <strong className="gradient-text">{formatPrice(totalPrice)}</strong></>
                ) : (
                  <><strong className="text-rosa-700">{selectedServices.length} servicios</strong> — <strong className="gradient-text">{formatPrice(totalPrice)}</strong></>
                )}
              </p>

              {/* Calendar */}
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 rounded-lg hover:bg-rosa-100 text-rosa-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h4 className="font-semibold text-rosa-800 font-[var(--font-playfair)]">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h4>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 rounded-lg hover:bg-rosa-100 text-rosa-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((d) => (
                    <div key={d} className="text-center text-xs font-semibold text-rosa-400 py-2">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {[...Array(firstDay)].map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    const dateStr = formatDateString(day);
                    const disabled = isDateDisabled(day);
                    const selected = selectedDate === dateStr;
                    return (
                      <button
                        key={day}
                        disabled={disabled}
                        onClick={() => {
                          setSelectedDate(dateStr);
                          setSelectedTime('');
                          setStep(3);
                        }}
                        className={`calendar-day w-full aspect-square rounded-xl flex items-center justify-center text-sm font-medium ${
                          selected ? 'selected' : disabled ? 'disabled text-rosa-300' : 'hover:bg-rosa-100 text-rosa-700'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button onClick={() => setStep(1)} className="px-7 py-2.5 rounded-full border border-rosa-200/60 text-rosa-600 hover:bg-rosa-50 transition-all duration-300 text-sm font-medium hover:border-rosa-300">
                  ← Atrás
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Select Time */}
          {step === 3 && (
            <div className="p-8 sm:p-10">
              <h3 className="text-xl font-bold text-rosa-900 font-[var(--font-playfair)] mb-2">
                3. Selecciona la hora
              </h3>
              <p className="text-sm text-rosa-500/70 mb-8">
                {selectedDate.split('-').reverse().join('/')} — {selectedServices.length === 1 ? selectedServices[0].name : `${selectedServices.length} servicios`} — <strong className="gradient-text">{formatPrice(totalPrice)}</strong>
              </p>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-w-lg mx-auto">
                {getTimeSlots().map((slot) => (
                  <button
                    key={slot}
                    onClick={() => {
                      setSelectedTime(slot);
                      setStep(4);
                    }}
                    className={`py-3 px-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedTime === slot
                        ? 'bg-gradient-to-br from-rosa-500 to-rosa-600 text-white shadow-lg shadow-rosa-300/30 scale-[1.03]'
                        : 'bg-rosa-50/70 text-rosa-700 hover:bg-rosa-100 border border-rosa-100/60 hover:border-rosa-200 hover:shadow-sm'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-10">
                <button onClick={() => setStep(2)} className="px-7 py-2.5 rounded-full border border-rosa-200/60 text-rosa-600 hover:bg-rosa-50 transition-all duration-300 text-sm font-medium hover:border-rosa-300">
                  ← Atrás
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Client Data */}
          {step === 4 && (
            <div className="p-8 sm:p-10">
              <h3 className="text-xl font-bold text-rosa-900 font-[var(--font-playfair)] mb-8">
                4. Tus datos
              </h3>

              {/* Summary */}
              <div className="bg-gradient-to-br from-rosa-50 to-nude-50 rounded-2xl p-7 mb-10 border border-rosa-100/40">
                <h4 className="text-xs font-bold text-rosa-400 uppercase tracking-[0.15em] mb-4">Resumen de tu cita</h4>
                <div className="space-y-3 mb-5">
                  {selectedServices.map((s) => (
                    <div key={s.id} className="flex items-center justify-between text-sm">
                      <span className="text-rosa-800 font-medium">{s.name}</span>
                      <span className="text-rosa-500 font-semibold">{formatPrice(s.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-rosa-200 to-transparent mb-4" />
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs text-rosa-400">Servicios</span>
                    <p className="font-semibold text-rosa-800 text-sm">{selectedServices.length} servicio{selectedServices.length > 1 ? 's' : ''} · ~{totalDuration} min</p>
                  </div>
                  <div>
                    <span className="text-xs text-rosa-400">Fecha y hora</span>
                    <p className="font-semibold text-rosa-800 text-sm">
                      {selectedDate.split('-').reverse().join('/')} · {selectedTime}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-rosa-400">Total</span>
                    <p className="font-bold gradient-text text-lg">{formatPrice(totalPrice)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-semibold text-rosa-800 mb-2">Nombre completo *</label>
                  <input
                    type="text"
                    value={clientData.name}
                    onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-rosa-200/60 focus:border-rosa-400 focus:ring-4 focus:ring-rosa-100 outline-none transition-all duration-300 text-rosa-900 bg-rosa-50/30 placeholder:text-rosa-300"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-rosa-800 mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    value={clientData.phone}
                    onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-rosa-200/60 focus:border-rosa-400 focus:ring-4 focus:ring-rosa-100 outline-none transition-all duration-300 text-rosa-900 bg-rosa-50/30 placeholder:text-rosa-300"
                    placeholder="Tu teléfono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-rosa-800 mb-2">Email (opcional)</label>
                  <input
                    type="email"
                    value={clientData.email}
                    onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-rosa-200/60 focus:border-rosa-400 focus:ring-4 focus:ring-rosa-100 outline-none transition-all duration-300 text-rosa-900 bg-rosa-50/30 placeholder:text-rosa-300"
                    placeholder="Tu email"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button onClick={() => setStep(3)} className="px-7 py-2.5 rounded-full border border-rosa-200/60 text-rosa-600 hover:bg-rosa-50 transition-all duration-300 text-sm font-medium hover:border-rosa-300">
                  ← Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !clientData.name || !clientData.phone}
                  className="btn-premium px-10 py-3.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2.5 text-base"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Confirmar Reserva
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
