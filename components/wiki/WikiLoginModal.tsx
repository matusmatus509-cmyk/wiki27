"use client";

import { useState } from 'react';
import { useWiki } from '@/lib/wiki-context';
import { WikiDialog } from './WikiDialog';

export function WikiLoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { checkAdminPassword, setAdminMode } = useWiki();
  if (!isOpen) return null;

  return <WikiDialog title="Prihlásiť sa" onClose={onClose}>
    <form className="wiki-login-form" onSubmit={event => {
      event.preventDefault(); setError('');
      if (checkAdminPassword(password)) { setAdminMode(true); onClose(); window.location.assign('/admin'); return; }
      setError('Nesprávne používateľské meno alebo heslo. Skúste to znova.');
    }}>
      {error && <p className="wiki-form-error" role="alert">{error}</p>}
      <label htmlFor="wiki-username">Používateľské meno</label>
      <input id="wiki-username" autoComplete="username" value={username} onChange={event => setUsername(event.target.value)} placeholder="Zadajte používateľské meno" />
      <label htmlFor="wiki-password">Heslo</label>
      <div className="wiki-password-field"><input id="wiki-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Zadajte heslo" /><button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Skryť heslo' : 'Zobraziť heslo'}>{showPassword ? 'Skryť' : 'Zobraziť'}</button></div>
      <label className="wiki-login-remember"><input type="checkbox" />Zapamätať prihlásenie</label>
      <button className="wiki-primary-button" type="submit">Prihlásiť sa</button>
      <a href="https://sk.wikipedia.org/wiki/Špeciálne:ObnovenieHesla">Zabudli ste heslo?</a>
      <p>Nemáte ešte účet?</p>
      <a className="wiki-secondary-button" href="https://sk.wikipedia.org/wiki/Špeciálne:Vytvoriť_účet">Vytvoriť účet</a>
    </form>
  </WikiDialog>;
}
