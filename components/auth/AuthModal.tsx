'use client';

import React, { useState, useEffect } from 'react';
import AuthImagePanel from '@/components/auth/AuthImagePanel';
import AuthForm from '@/components/auth/AuthForm';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export default function AuthModal({ open, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMode(defaultMode);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open, defaultMode]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const isRegister = mode === 'register';

  const handleSwitchMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4"
      style={{
        backgroundColor: visible ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0)',
        backdropFilter: visible ? 'blur(6px)' : 'blur(0px)',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      {/* ── MOBILE: Bottom Sheet ─────────────────────────────────── */}
      <div
        className="md:hidden w-full bg-card rounded-t-3xl overflow-hidden relative flex flex-col"
        style={{
          maxHeight: '92vh',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* Drag handle indicator */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <button
            onClick={onClose}
            id="btn-close-auth-modal-mobile"
            className="group flex flex-col items-center gap-1 px-6 py-1"
          >
            <span className="block w-10 h-1 rounded-full bg-muted group-hover:bg-muted-foreground transition-all duration-200 group-hover:w-14" />
          </button>
        </div>

        {/* Mobile header strip — mode indicator */}
        <div className="flex items-center justify-between px-6 pb-2 flex-shrink-0">
          <div className="flex gap-1 p-1 rounded-xl bg-muted">
            <button
              onClick={() => setMode('login')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === 'login'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => setMode('register')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === 'register'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Daftar
            </button>
          </div>

          {/* AgriLink brand mini */}
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22V12M12 12C12 12 7 9 7 4a5 5 0 0 1 10 0c0 5-5 8-5 8z"/>
              </svg>
            </div>
            <span className="text-xs font-bold text-foreground">AgriLink</span>
          </div>
        </div>

        {/* Scrollable form area */}
        <div className="overflow-y-auto flex-1 px-2 pb-8">
          <AuthForm mode={mode} onSwitchMode={handleSwitchMode} onSuccess={onClose} isMobile />
        </div>
      </div>

      {/* ── DESKTOP: Split slider modal ──────────────────────────── */}
      <div
        className="hidden md:block w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden border border-border bg-card relative"
        style={{
          height: 'min(680px, 92vh)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(16px)',
          transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Pill handle close — follows form panel */}
        <div
          className="absolute top-4 z-50 transition-all duration-[550ms]"
          style={{ right: isRegister ? 'calc(45% + 16px)' : '16px' }}
        >
          <button
            onClick={onClose}
            id="btn-close-auth-modal"
            className="group flex flex-col items-center gap-1 px-3 pt-1.5 pb-2 rounded-full transition-all duration-200"
            title="Tutup"
          >
            <span className="block w-8 h-1 rounded-full bg-border group-hover:bg-muted-foreground transition-all duration-200 group-hover:w-12" />
            <span className="text-[10px] text-muted-foreground/0 group-hover:text-muted-foreground/70 transition-all duration-200 font-medium tracking-wide select-none">
              Tutup
            </span>
          </button>
        </div>

        {/* IMAGE PANEL */}
        <div
          className="absolute top-0 bottom-0 w-[45%]"
          style={{
            left: isRegister ? '55%' : '0%',
            transition: 'left 0.55s cubic-bezier(0.77, 0, 0.175, 1)',
            zIndex: 10,
          }}
        >
          <AuthImagePanel mode={mode} />
        </div>

        {/* FORM PANEL */}
        <div
          className="absolute top-0 bottom-0 w-[55%] overflow-y-auto"
          style={{
            left: isRegister ? '0%' : '45%',
            transition: 'left 0.55s cubic-bezier(0.77, 0, 0.175, 1)',
            zIndex: 5,
          }}
        >
          <div className="relative z-10 h-full bg-card">
            <AuthForm mode={mode} onSwitchMode={handleSwitchMode} onSuccess={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
