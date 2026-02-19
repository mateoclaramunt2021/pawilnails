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

export default function BookingSection() {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [clientData, setClientData] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetch(`/api/reservas/disponibilidad?date=${selectedDate}`)
        .then((r) => r.json())
        .then((data) => setBookedSlots(data.bookedSlots || []))
        .catch(() => {});
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
    if (!selectedService || !selectedDate || !selectedTime || !clientData.name || !clientData.phone) return;
    setLoading(true);
    try {
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedService.id,
          date: selectedDate,
          time: selectedTime,
          clientName: clientData.name,
          clientPhone: clientData.phone,
          clientEmail: clientData.email,
          total: selectedService.price,
        }),
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch {
      // Error silencioso
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
            <p className="text-rosa-700/60 mb-2 text-lg">
              Tu cita para <strong className="text-rosa-800">{selectedService?.name}</strong> ha sido registrada.
            </p>
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
                setSelectedService(null);
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
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="p-8 sm:p-10">
              <h3 className="text-xl font-bold text-rosa-900 font-[var(--font-playfair)] mb-8">
                1. Selecciona tu servicio
              </h3>
              <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2">
                {categories.map((cat) => (
                  <div key={cat.name}>
                    <h4 className="text-xs font-bold text-rosa-400 uppercase tracking-[0.15em] mb-4">
                      {cat.name}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {cat.services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => {
                            setSelectedService(service);
                            setStep(2);
                          }}
                          className={`text-left p-4 rounded-2xl border transition-all duration-300 hover:border-rosa-400/60 hover:bg-rosa-50/80 hover:shadow-sm group ${
                            selectedService?.id === service.id
                              ? 'border-rosa-500 bg-rosa-50 shadow-sm shadow-rosa-100/50'
                              : 'border-rosa-100/70'
                          }`}
                        >
                          <div className="font-medium text-rosa-900/80 text-sm group-hover:text-rosa-700 transition-colors">{service.name}</div>
                          <div className="text-rosa-500 font-bold mt-1.5 text-sm">
                            {service.price % 1 === 0 ? service.price + '€' : service.price.toFixed(2).replace('.', ',') + '€'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
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
                Servicio: <strong className="text-rosa-700">{selectedService?.name}</strong> —{' '}
                <strong className="gradient-text">
                  {selectedService && (selectedService.price % 1 === 0 ? selectedService.price + '€' : selectedService.price.toFixed(2).replace('.', ',') + '€')}
                </strong>
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
                {selectedDate.split('-').reverse().join('/')} — {selectedService?.name}
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
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs text-rosa-400">Servicio</span>
                    <p className="font-semibold text-rosa-800 text-sm">{selectedService?.name}</p>
                  </div>
                  <div>
                    <span className="text-xs text-rosa-400">Fecha y hora</span>
                    <p className="font-semibold text-rosa-800 text-sm">
                      {selectedDate.split('-').reverse().join('/')} · {selectedTime}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-rosa-400">Precio</span>
                    <p className="font-bold gradient-text text-lg">
                      {selectedService && (selectedService.price % 1 === 0 ? selectedService.price + '€' : selectedService.price.toFixed(2).replace('.', ',') + '€')}
                    </p>
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
