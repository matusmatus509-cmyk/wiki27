"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WikiProvider, useWiki } from '@/lib/wiki-context';
import { AdminPanel } from '@/components/wiki/AdminPanel';
import { Eye, EyeOff, Lock } from 'lucide-react';

function AdminGate() {
  const router = useRouter();
  const { isAdminMode, setAdminMode, checkAdminPassword } = useWiki();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already in admin mode
    const savedAdmin = localStorage.getItem('wiki-admin-session');
    if (savedAdmin === 'true') {
      setAdminMode(true);
    }
    setChecking(false);
  }, [setAdminMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (checkAdminPassword(password)) {
      setAdminMode(true);
      localStorage.setItem('wiki-admin-session', 'true');
    } else {
      setError('Nesprávne heslo');
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Načítavam...</div>
      </div>
    );
  }

  if (!isAdminMode) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
              <p className="text-sm text-gray-400 mt-1">Zadajte heslo pre prístup</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-900/50 border border-red-700 text-red-300 text-sm rounded">
                  {error}
                </div>
              )}

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none pr-10"
                  placeholder="Heslo"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
              >
                Prihlásiť sa
              </button>

              <button
                type="button"
                onClick={() => router.push('/')}
                className="w-full py-2 text-gray-400 text-sm hover:text-white transition-colors"
              >
                Späť na hlavnú stránku
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-700 text-center">
              <p className="text-xs text-gray-500">
                Tip: Predvolené heslo je <code className="bg-gray-700 px-1.5 py-0.5 rounded">akronym2024</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <AdminPanel />;
}

export default function AdminPage() {
  return (
    <WikiProvider>
      <AdminGate />
    </WikiProvider>
  );
}
