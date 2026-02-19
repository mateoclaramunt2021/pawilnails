'use client';

import { useEffect, useState } from 'react';

interface BlockedDate {
  id: string;
  date: string;
  reason: string | null;
}

const DEMO_BLOCKED: BlockedDate[] = [
  { id: 'bd1', date: '2026-03-19', reason: 'Fiesta de San José' },
  { id: 'bd2', date: '2026-04-17', reason: 'Viernes Santo' },
  { id: 'bd3', date: '2026-08-01', reason: 'Vacaciones de verano' },
];

export default function AdminConfiguracion() {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newReason, setNewReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  const fetchBlocked = () => {
    fetch('/api/horarios')
      .then((r) => r.json())
      .then((data) => {
        setBlockedDates(data.blocked || []);
        setLoading(false);
      })
      .catch(() => {
        setIsDemo(true);
        setBlockedDates(DEMO_BLOCKED);
        setLoading(false);
      });
  };

  useEffect(() => { fetchBlocked(); }, []);

  const addBlocked = async () => {
    if (!newDate) return;
    if (isDemo) {
      setBlockedDates((prev) => [...prev, { id: `bd-${Date.now()}`, date: newDate, reason: newReason || null }]);
      setNewDate('');
      setNewReason('');
      return;
    }
    await fetch('/api/horarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: newDate, reason: newReason || null }),
    });
    setNewDate('');
    setNewReason('');
    fetchBlocked();
  };

  const removeBlocked = async (id: string) => {
    if (isDemo) {
      setBlockedDates((prev) => prev.filter((bd) => bd.id !== id));
      return;
    }
    await fetch(`/api/horarios?id=${id}`, { method: 'DELETE' });
    fetchBlocked();
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Business Info */}
      <div className="bg-white rounded-2xl p-8 border border-rosa-100">
        <h3 className="text-lg font-semibold text-rosa-800 font-[var(--font-playfair)] mb-6">
          Información del Negocio
        </h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-rosa-50 rounded-xl p-5">
            <span className="text-xs text-rosa-400 uppercase tracking-wider font-semibold">Nombre</span>
            <p className="font-semibold text-rosa-800 mt-1">Pawil Nails</p>
          </div>
          <div className="bg-rosa-50 rounded-xl p-5">
            <span className="text-xs text-rosa-400 uppercase tracking-wider font-semibold">Teléfono</span>
            <p className="font-semibold text-rosa-800 mt-1">611 86 95 04</p>
          </div>
          <div className="bg-rosa-50 rounded-xl p-5">
            <span className="text-xs text-rosa-400 uppercase tracking-wider font-semibold">Email</span>
            <p className="font-semibold text-rosa-800 mt-1">pawilnails@gmail.com</p>
          </div>
          <div className="bg-rosa-50 rounded-xl p-5">
            <span className="text-xs text-rosa-400 uppercase tracking-wider font-semibold">Dirección</span>
            <p className="font-semibold text-rosa-800 mt-1 text-sm">Av. de la Constitució, 78, local 7, Castelldefels</p>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-2xl p-8 border border-rosa-100">
        <h3 className="text-lg font-semibold text-rosa-800 font-[var(--font-playfair)] mb-6">
          Horarios de Apertura
        </h3>
        <div className="space-y-3">
          {[
            { day: 'Lunes', hours: '09:00 – 21:00' },
            { day: 'Martes', hours: '09:00 – 21:00' },
            { day: 'Miércoles', hours: '09:00 – 21:00' },
            { day: 'Jueves', hours: '09:00 – 21:00' },
            { day: 'Viernes', hours: '09:00 – 21:00' },
            { day: 'Sábado', hours: '09:00 – 19:00' },
            { day: 'Domingo', hours: 'Cerrado' },
          ].map((schedule) => (
            <div
              key={schedule.day}
              className={`flex items-center justify-between px-5 py-3 rounded-xl ${
                schedule.hours === 'Cerrado' ? 'bg-red-50' : 'bg-rosa-50'
              }`}
            >
              <span className="font-medium text-rosa-800 text-sm">{schedule.day}</span>
              <span className={`text-sm ${schedule.hours === 'Cerrado' ? 'text-red-400' : 'text-rosa-600'}`}>
                {schedule.hours}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Blocked dates */}
      <div className="bg-white rounded-2xl p-8 border border-rosa-100">
        <h3 className="text-lg font-semibold text-rosa-800 font-[var(--font-playfair)] mb-6">
          Días Bloqueados (Festivos / Vacaciones)
        </h3>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-rosa-200 text-sm text-rosa-700 focus:border-rosa-500 outline-none"
          />
          <input
            type="text"
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
            placeholder="Motivo (opcional)"
            className="px-4 py-2.5 rounded-xl border border-rosa-200 text-sm text-rosa-700 focus:border-rosa-500 outline-none flex-1 min-w-[200px]"
          />
          <button onClick={addBlocked} className="btn-premium px-6 py-2.5 rounded-xl text-sm">
            Bloquear Día
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-rosa-200 border-t-rosa-600 rounded-full animate-spin" />
          </div>
        ) : blockedDates.length === 0 ? (
          <p className="text-rosa-400 text-sm text-center py-4">No hay días bloqueados</p>
        ) : (
          <div className="space-y-2">
            {blockedDates.map((bd) => (
              <div
                key={bd.id}
                className="flex items-center justify-between bg-red-50 rounded-xl px-5 py-3"
              >
                <div>
                  <span className="font-medium text-red-700 text-sm">
                    {bd.date.split('-').reverse().join('/')}
                  </span>
                  {bd.reason && (
                    <span className="text-red-400 text-sm ml-3">— {bd.reason}</span>
                  )}
                </div>
                <button
                  onClick={() => removeBlocked(bd.id)}
                  className="text-red-300 hover:text-red-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admin credentials info */}
      <div className="bg-white rounded-2xl p-8 border border-rosa-100">
        <h3 className="text-lg font-semibold text-rosa-800 font-[var(--font-playfair)] mb-4">
          Acceso Admin
        </h3>
        <div className="bg-rosa-50 rounded-xl p-5">
          <p className="text-sm text-rosa-600 mb-2">
            <strong>Email:</strong> admin@pawilnails.com
          </p>
          <p className="text-sm text-rosa-600">
            <strong>Contraseña:</strong> pawilnails2026
          </p>
          <p className="text-xs text-rosa-400 mt-3">
            Para cambiar las credenciales, contacta al desarrollador.
          </p>
        </div>
      </div>
    </div>
  );
}
