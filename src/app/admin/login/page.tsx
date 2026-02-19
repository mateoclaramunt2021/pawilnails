'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch {
      // Demo mode: accept hardcoded credentials when API is unavailable
      if (email === 'admin@pawilnails.com' && password === 'pawilnails2026') {
        sessionStorage.setItem('demo-admin', 'true');
        router.push('/admin');
      } else {
        setError('Credenciales incorrectas');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rosa-50 via-white to-rosa-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rosa-500 to-rosa-700 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-rosa-300/50">
            <span className="text-white font-bold text-2xl font-[var(--font-playfair)]">P</span>
          </div>
          <h1 className="text-3xl font-bold font-[var(--font-playfair)] gradient-text">Pawil Nails</h1>
          <p className="text-rosa-400 text-sm mt-1">Panel de Administración</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="bg-white rounded-3xl p-8 shadow-xl shadow-rosa-100/50 border border-rosa-100">
          <h2 className="text-xl font-bold text-rosa-800 font-[var(--font-playfair)] mb-6">Iniciar Sesión</h2>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-rosa-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-rosa-200 focus:border-rosa-500 focus:ring-2 focus:ring-rosa-200 outline-none transition-all text-rosa-800"
                placeholder="admin@pawilnails.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-rosa-700 mb-1.5">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-rosa-200 focus:border-rosa-500 focus:ring-2 focus:ring-rosa-200 outline-none transition-all text-rosa-800"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-premium py-3 rounded-xl mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Acceder'
            )}
          </button>

          <Link href="/" className="block text-center text-sm text-rosa-400 hover:text-rosa-600 mt-4 transition-colors">
            ← Volver a la página principal
          </Link>
        </form>
      </div>
    </div>
  );
}
