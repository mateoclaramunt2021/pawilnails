'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalBookings: number;
  todayBookings: number;
  pendingBookings: number;
  totalClients: number;
  todayRevenue: number;
  monthlyRevenue: number;
  popularServices: { serviceName: string; _count: number }[];
  recentBookings: {
    id: string;
    date: string;
    time: string;
    status: string;
    total: number;
    service: { name: string };
    client: { name: string; phone: string };
  }[];
  bookingsByStatus: { status: string; _count: number }[];
}

const statusColors: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-700',
  confirmada: 'bg-blue-100 text-blue-700',
  completada: 'bg-green-100 text-green-700',
  cancelada: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  pendiente: 'Pendiente',
  confirmada: 'Confirmada',
  completada: 'Completada',
  cancelada: 'Cancelada',
};

const DEMO_STATS: Stats = {
  totalBookings: 47,
  todayBookings: 3,
  pendingBookings: 5,
  totalClients: 32,
  todayRevenue: 71.80,
  monthlyRevenue: 1842.50,
  popularServices: [
    { serviceName: 'Manicura Completa Semi', _count: 18 },
    { serviceName: 'Manicura Rusa', _count: 12 },
    { serviceName: 'Pedicura completa semipermanente', _count: 8 },
    { serviceName: 'Esmaltado semipermanente manos', _count: 6 },
    { serviceName: 'Uñas acrílicas esculpidas', _count: 3 },
  ],
  recentBookings: [
    { id: '1', date: '2026-02-19', time: '10:00', status: 'confirmada', total: 23.90, service: { name: 'Manicura Completa Semi' }, client: { name: 'María García', phone: '612 345 678' } },
    { id: '2', date: '2026-02-19', time: '11:30', status: 'pendiente', total: 17.90, service: { name: 'Manicura Rusa' }, client: { name: 'Laura López', phone: '634 567 890' } },
    { id: '3', date: '2026-02-19', time: '16:00', status: 'confirmada', total: 32.00, service: { name: 'Pedicura completa semi' }, client: { name: 'Ana Martínez', phone: '655 789 012' } },
    { id: '4', date: '2026-02-18', time: '12:00', status: 'completada', total: 38.00, service: { name: 'Uñas acrílicas esculpidas' }, client: { name: 'Carmen Ruiz', phone: '678 901 234' } },
    { id: '5', date: '2026-02-18', time: '09:30', status: 'completada', total: 11.00, service: { name: 'Esmaltado semipermanente' }, client: { name: 'Sofía Fernández', phone: '690 123 456' } },
  ],
  bookingsByStatus: [
    { status: 'completada', _count: 28 },
    { status: 'confirmada', _count: 10 },
    { status: 'pendiente', _count: 5 },
    { status: 'cancelada', _count: 4 },
  ],
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setStats(DEMO_STATS);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-rosa-200 border-t-rosa-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) return <p className="text-rosa-400">No se pudieron cargar las estadísticas</p>;

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Reservas Hoy',
            value: stats.todayBookings,
            icon: '📅',
            color: 'from-rosa-500 to-rosa-600',
          },
          {
            label: 'Pendientes',
            value: stats.pendingBookings,
            icon: '⏳',
            color: 'from-yellow-400 to-orange-500',
          },
          {
            label: 'Ingresos Hoy',
            value: `${stats.todayRevenue.toFixed(2)}€`,
            icon: '💰',
            color: 'from-green-400 to-emerald-600',
          },
          {
            label: 'Total Clientes',
            value: stats.totalClients,
            icon: '👥',
            color: 'from-purple-400 to-purple-600',
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-2xl p-6 border border-rosa-100 card-hover relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${kpi.color} opacity-10 rounded-bl-[60px]`} />
            <div className="text-3xl mb-2">{kpi.icon}</div>
            <p className="text-sm text-rosa-400 font-medium">{kpi.label}</p>
            <p className="text-3xl font-bold text-rosa-800 font-[var(--font-playfair)] mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Monthly revenue */}
      <div className="bg-white rounded-2xl p-6 border border-rosa-100">
        <h3 className="text-lg font-semibold text-rosa-800 font-[var(--font-playfair)] mb-4">
          Ingresos del Mes
        </h3>
        <div className="flex items-end gap-4">
          <span className="text-4xl font-bold gradient-text font-[var(--font-playfair)]">
            {stats.monthlyRevenue.toFixed(2)}€
          </span>
          <span className="text-sm text-rosa-400 pb-1">este mes</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-rosa-100">
          <h3 className="text-lg font-semibold text-rosa-800 font-[var(--font-playfair)] mb-4">
            Reservas por Estado
          </h3>
          <div className="space-y-3">
            {stats.bookingsByStatus.map((s) => {
              const pct = stats.totalBookings > 0 ? (s._count / stats.totalBookings) * 100 : 0;
              return (
                <div key={s.status} className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[s.status] || 'bg-gray-100 text-gray-600'}`}>
                    {statusLabels[s.status] || s.status}
                  </span>
                  <div className="flex-1 bg-rosa-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rosa-400 to-rosa-600 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-rosa-700 w-8 text-right">{s._count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular services */}
        <div className="bg-white rounded-2xl p-6 border border-rosa-100">
          <h3 className="text-lg font-semibold text-rosa-800 font-[var(--font-playfair)] mb-4">
            Servicios Más Populares
          </h3>
          <div className="space-y-3">
            {stats.popularServices.length === 0 ? (
              <p className="text-rosa-400 text-sm">Aún no hay datos</p>
            ) : (
              stats.popularServices.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-rosa-100 flex items-center justify-center text-xs font-bold text-rosa-600">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm text-rosa-700 truncate">{s.serviceName}</span>
                  <span className="text-sm font-semibold text-rosa-500">{s._count}x</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent bookings table */}
      <div className="bg-white rounded-2xl border border-rosa-100 overflow-hidden">
        <div className="p-6 border-b border-rosa-100">
          <h3 className="text-lg font-semibold text-rosa-800 font-[var(--font-playfair)]">
            Últimas Reservas
          </h3>
        </div>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-rosa-50">
              {stats.recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-rosa-400 text-sm">
                    No hay reservas aún
                  </td>
                </tr>
              ) : (
                stats.recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-rosa-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-rosa-800">{b.client.name}</div>
                      <div className="text-xs text-rosa-400">{b.client.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-rosa-700">{b.service.name}</td>
                    <td className="px-6 py-4 text-sm text-rosa-700">
                      {b.date.split('-').reverse().join('/')}
                    </td>
                    <td className="px-6 py-4 text-sm text-rosa-700">{b.time}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-rosa-700">{b.total.toFixed(2)}€</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[b.status] || 'bg-gray-100'}`}>
                        {statusLabels[b.status] || b.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
