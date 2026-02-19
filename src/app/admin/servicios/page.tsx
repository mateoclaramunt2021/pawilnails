'use client';

import { useEffect, useState } from 'react';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  active: boolean;
  description: string | null;
  order: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  services: Service[];
}

export default function AdminServicios() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: 0, duration: 30, active: true });

  const fetchServices = () => {
    setLoading(true);
    fetch('/api/servicios')
      .then((r) => r.json())
      .then((data) => {
        setCategories(data.categories || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchServices(); }, []);

  const startEdit = (service: Service) => {
    setEditingService(service);
    setEditForm({
      name: service.name,
      price: service.price,
      duration: service.duration,
      active: service.active,
    });
  };

  const saveEdit = async () => {
    if (!editingService) return;
    await fetch(`/api/servicios/${editingService.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    setEditingService(null);
    fetchServices();
  };

  const toggleActive = async (service: Service) => {
    await fetch(`/api/servicios/${service.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !service.active }),
    });
    fetchServices();
  };

  const deleteService = async (id: string) => {
    if (!confirm('¿Eliminar este servicio? Esta acción no se puede deshacer.')) return;
    await fetch(`/api/servicios/${id}`, { method: 'DELETE' });
    fetchServices();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-rosa-200 border-t-rosa-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Edit modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-rosa-800 font-[var(--font-playfair)] mb-6">
              Editar Servicio
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-rosa-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-rosa-200 text-rosa-800 focus:border-rosa-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-rosa-700 mb-1">Precio (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-rosa-200 text-rosa-800 focus:border-rosa-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rosa-700 mb-1">Duración (min)</label>
                  <input
                    type="number"
                    value={editForm.duration}
                    onChange={(e) => setEditForm({ ...editForm, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-rosa-200 text-rosa-800 focus:border-rosa-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={editForm.active}
                  onChange={(e) => setEditForm({ ...editForm, active: e.target.checked })}
                  className="w-4 h-4 accent-rosa-600"
                />
                <label className="text-sm text-rosa-700">Servicio activo</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingService(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-rosa-200 text-rosa-600 hover:bg-rosa-50 transition-colors text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 btn-premium py-2.5 rounded-xl text-sm"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {categories.map((cat) => (
        <div key={cat.id} className="bg-white rounded-2xl border border-rosa-100 overflow-hidden">
          <div className="p-6 border-b border-rosa-100 bg-rosa-50/30">
            <h3 className="text-lg font-semibold text-rosa-800 font-[var(--font-playfair)]">
              {cat.name}
            </h3>
            <p className="text-xs text-rosa-400">{cat.services.length} servicios</p>
          </div>
          <div className="divide-y divide-rosa-50">
            {cat.services.map((service) => (
              <div
                key={service.id}
                className={`px-6 py-4 flex items-center justify-between gap-4 hover:bg-rosa-50/30 transition-colors ${
                  !service.active ? 'opacity-50' : ''
                }`}
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-rosa-800">{service.name}</h4>
                  <p className="text-xs text-rosa-400">{service.duration} min</p>
                </div>
                <span className="text-lg font-bold gradient-text font-[var(--font-playfair)] shrink-0">
                  {service.price % 1 === 0 ? service.price + '€' : service.price.toFixed(2).replace('.', ',') + '€'}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(service)}
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      service.active ? 'bg-green-400' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        service.active ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => startEdit(service)}
                    className="p-2 rounded-lg hover:bg-rosa-100 text-rosa-400 hover:text-rosa-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-rosa-300 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
