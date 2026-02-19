'use client';

import { useEffect, useState } from 'react';

interface Booking {
  id: string;
  date: string;
  time: string;
  status: string;
  total: number;
  notes: string | null;
  service: { name: string; category: { name: string } };
  client: { name: string; phone: string; email: string | null };
}

const statusColors: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmada: 'bg-blue-100 text-blue-700 border-blue-200',
  completada: 'bg-green-100 text-green-700 border-green-200',
  cancelada: 'bg-red-100 text-red-700 border-red-200',
};

export default function AdminReservas() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const fetchBookings = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter) params.set('status', filter);
    if (dateFilter) params.set('date', dateFilter);
    fetch(`/api/reservas?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, [filter, dateFilter]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/reservas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchBookings();
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('¿Eliminar esta reserva?')) return;
    await fetch(`/api/reservas/${id}`, { method: 'DELETE' });
    fetchBookings();
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-rosa-100">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-xs font-medium text-rosa-400 mb-1">Estado</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-rosa-200 text-sm text-rosa-700 focus:border-rosa-500 outline-none"
            >
              <option value="">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-rosa-400 mb-1">Fecha</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-rosa-200 text-sm text-rosa-700 focus:border-rosa-500 outline-none"
            />
          </div>
          {(filter || dateFilter) && (
            <button
              onClick={() => { setFilter(''); setDateFilter(''); }}
              className="self-end px-4 py-2 text-sm text-rosa-500 hover:text-rosa-700 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-rosa-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-6 h-6 border-2 border-rosa-200 border-t-rosa-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-rosa-50/50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-rosa-400 uppercase">Cliente</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-rosa-400 uppercase">Servicio</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-rosa-400 uppercase">Fecha</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-rosa-400 uppercase">Hora</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-rosa-400 uppercase">Total</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-rosa-400 uppercase">Estado</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-rosa-400 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rosa-50">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-rosa-400">
                      No hay reservas
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-rosa-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-rosa-800">{b.client.name}</div>
                        <div className="text-xs text-rosa-400">{b.client.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-rosa-700">{b.service.name}</div>
                        <div className="text-xs text-rosa-400">{b.service.category.name}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-rosa-700">{b.date.split('-').reverse().join('/')}</td>
                      <td className="px-6 py-4 text-sm text-rosa-700">{b.time}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-rosa-700">{b.total.toFixed(2)}€</td>
                      <td className="px-6 py-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[b.status]} outline-none cursor-pointer`}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="confirmada">Confirmada</option>
                          <option value="completada">Completada</option>
                          <option value="cancelada">Cancelada</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="text-rosa-300 hover:text-red-500 transition-colors"
                          title="Eliminar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
