"use client";

import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useWiki } from '@/lib/wiki-context';

interface WikiLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WikiLoginModal({ isOpen, onClose }: WikiLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { checkAdminPassword, setAdminMode } = useWiki();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check for secret admin password
    if (checkAdminPassword(password)) {
      setAdminMode(true);
      onClose();
      // Navigate to admin panel
      window.location.href = '/admin';
      return;
    }

    // Regular "login" - just show error for demo
    setError('Nesprávne prihlasovacie údaje');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Prihlásiť sa</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Prihláste sa pomocou svojho používateľského mena a hesla.
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Používateľské meno
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="wiki-search-input w-full"
              placeholder="Zadajte používateľské meno"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Heslo
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="wiki-search-input w-full pr-10"
                placeholder="Zadajte heslo"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="rounded border-gray-300"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Zapamätať si ma
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#36c] text-white text-sm font-medium rounded hover:bg-[#2a4b8d] transition-colors"
            >
              Prihlásiť sa
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
            >
              Zrušiť
            </button>
          </div>

          <div className="pt-4 border-t text-sm text-gray-500 space-y-1">
            <a href="#" className="block text-[#36c] hover:underline">Zabudli ste heslo?</a>
            <a href="#" className="block text-[#36c] hover:underline">Vytvoriť účet</a>
          </div>
        </form>
      </div>
    </div>
  );
}
