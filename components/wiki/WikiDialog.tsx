"use client";

import { useEffect, useRef, type ReactNode } from 'react';
import { WikiIcon } from './WikiIcon';

export function WikiDialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = overflow; };
  }, []);
  return <dialog ref={ref} className="wiki-dialog" aria-label={title} onCancel={onClose} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="wiki-dialog-panel">
      <header className="wiki-dialog-header"><button className="wiki-icon-button" onClick={onClose} aria-label="Zavrieť"><WikiIcon name="close" /></button><h2>{title}</h2></header>
      <div className="wiki-dialog-body">{children}</div>
    </div>
  </dialog>;
}
