'use client';

import { useEffect, useState } from 'react';

interface Booking {
  id: string;
  date: string;
  time: string;
  status: string;
  total: number;
  service: { name: string };
}

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  createdAt: string;
  bookings: Booking[];
}

const statusColors: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-700',
  confirmada: 'bg-blue-100 text-blue-700',
  completada: 'bg-green-100 text-green-700',
  cancelada: 'bg-red-100 text-red-700',
};

const DEMO_CLIENTS: Client[] = [
  { id: '1', name: 'María García', phone: '612 345 678', email: 'maria@email.com', notes: null, createdAt: '2025-11-15', bookings: [
    { id: 'b1', date: '2026-02-19', time: '10:00', status: 'confirmada', total: 23.90, service: { name: 'Manicura Completa Semi' } },
    { id: 'b2', date: '2026-01-28', time: '11:00', status: 'completada', total: 17.90, service: { name: 'Manicura Rusa' } },
    { id: 'b3', date: '2025-12-20', time: '10:30', status: 'completada', total: 32.00, service: { name: 'Pedicura completa semi' } },
  ]},
  { id: '2', name: 'Laura López', phone: '634 567 890', email: null, notes: null, createdAt: '2025-12-03', bookings: [
    { id: 'b4', date: '2026-02-19', time: '11:30', status: 'pendiente', total: 17.90, service: { name: 'Manicura Rusa' } },
    { id: 'b5', date: '2026-01-15', time: '16:00', status: 'completada', total: 11.00, service: { name: 'Esmaltado semipermanente' } },
  ]},
  { id: '3', name: 'Ana Martínez', phone: '655 789 012', email: 'ana@email.com', notes: null, createdAt: '2026-01-10', bookings: [
    { id: 'b6', date: '2026-02-19', time: '16:00', status: 'confirmada', total: 32.00, service: { name: 'Pedicura completa semi' } },
  ]},
  { id: '4', name: 'Carmen Ruiz', phone: '678 901 234', email: 'carmen@email.com', notes: null, createdAt: '2025-10-22', bookings: [
    { id: 'b7', date: '2026-02-18', time: '12:00', status: 'completada', total: 38.00, service: { name: 'Uñas acrílicas esculpidas' } },
    { id: 'b8', date: '2026-01-05', time: '10:00', status: 'completada', total: 28.00, service: { name: 'Mantenimiento acrílico' } },
    { id: 'b9', date: '2025-12-01', time: '11:30', status: 'completada', total: 38.00, service: { name: 'Uñas acrílicas esculpidas' } },
    { id: 'b10', date: '2025-11-05', time: '09:00', status: 'completada', total: 28.00, service: { name: 'Mantenimiento acrílico' } },
  ]},
  { id: '5', name: 'Sofía Fernández', phone: '690 123 456', email: null, notes: null, createdAt: '2026-02-01', bookings: [
    { id: 'b11', date: '2026-02-18', time: '09:30', status: 'completada', total: 11.00, service: { name: 'Esmaltado semipermanente' } },
  ]},
  { id: '6', name: 'Elena Sánchez', phone: '601 234 567', email: null, notes: null, createdAt: '2026-01-20', bookings: [
    { id: 'b12', date: '2026-02-17', time: '15:00', status: 'cancelada', total: 25.90, service: { name: 'Pedicura completa tradicional' } },
  ]},
  { id: '7', name: 'Paula Moreno', phone: '623 456 789', email: 'paula@email.com', notes: null, createdAt: '2025-11-30', bookings: [
    { id: 'b13', date: '2026-02-17', time: '10:30', status: 'completada', total: 14.00, service: { name: 'Esmaltado Semi Francesa' } },
    { id: 'b14', date: '2025-12-15', time: '12:00', status: 'completada', total: 23.90, service: { name: 'Manicura Completa Semi' } },
  ]},
];

export default function AdminClientes() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    fetch('/api/clientes')
      .then((r) => r.json())
      .then((data) => {
        setClients(data.clients || []);
        setLoading(false);
      })
      .catch(() => {
        setClients(DEMO_CLIENTS);
        setLoading(false);
      });
  }, []);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-rosa-200 border-t-rosa-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Client detail modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-rosa-800 font-[var(--font-playfair)]">
                {selectedClient.name}
              </h3>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 rounded-lg hover:bg-rosa-50 text-rosa-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-rosa-50 rounded-xl p-4">
                <span className="text-xs text-rosa-400">Teléfono</span>
                <p className="font-semibold text-rosa-800 text-sm">{selectedClient.phone}</p>
              </div>
              <div className="bg-rosa-50 rounded-xl p-4">
                <span className="text-xs text-rosa-400">Email</span>
                <p className="font-semibold text-rosa-800 text-sm">{selectedClient.email || '—'}</p>
              </div>
              <div className="bg-rosa-50 rounded-xl p-4">
                <span className="text-xs text-rosa-400">Total visitas</span>
                <p className="font-semibold text-rosa-800 text-sm">{selectedClient.bookings.length}</p>
              </div>
              <div className="bg-rosa-50 rounded-xl p-4">
                <span className="text-xs text-rosa-400">Total gastado</span>
                <p className="font-semibold gradient-text text-sm">
                  {selectedClient.bookings
                    .filter((b) => b.status !== 'cancelada')
                    .reduce((sum, b) => sum + b.total, 0)
                    .toFixed(2)}€
                </p>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-rosa-400 uppercase tracking-wider mb-3">
              Historial de reservas
            </h4>
            <div className="space-y-2">
              {selectedClient.bookings.length === 0 ? (
                <p className="text-rosa-400 text-sm">Sin reservas</p>
              ) : (
                selectedClient.bookings.map((b) => (
                  <div key={b.id} className="flex items-center justify-between bg-rosa-50/50 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-rosa-800">{b.service.name}</p>
                      <p className="text-xs text-rosa-400">
                        {b.date.split('-').reverse().join('/')} · {b.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-rosa-700">{b.total.toFixed(2)}€</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[b.status]}`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 border border-rosa-100">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-rosa-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, teléfono o email..."
            className="flex-1 outline-none text-rosa-800 placeholder:text-rosa-300"
          />
          <span className="text-sm text-rosa-400">{filtered.length} clientes</span>
        </div>
      </div>

      {/* Clients grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client) => (
          <div
            key={client.id}
            onClick={() => setSelectedClient(client)}
            className="bg-white rounded-2xl p-6 border border-rosa-100 card-hover cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rosa-400 to-rosa-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {client.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-rosa-800 text-sm truncate">{client.name}</h4>
                <p className="text-xs text-rosa-400">{client.phone}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-rosa-400">{client.bookings.length} reservas</span>
              <span className="font-semibold text-rosa-600">
                {client.bookings.filter((b) => b.status !== 'cancelada').reduce((s, b) => s + b.total, 0).toFixed(2)}€
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
