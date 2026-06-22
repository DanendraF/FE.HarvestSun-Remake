'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { ROLE_ROUTES } from '@/lib/auth/config';
import AuthImagePanel from '@/components/auth/AuthImagePanel';
import AuthForm from '@/components/auth/AuthForm';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  if (user) {
    router.push(ROLE_ROUTES[user.role]);
    return null;
  }

  const handleSwitchMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const isRegister = mode === 'register';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      {/* Card container — relative + overflow-hidden untuk slider effect */}
      <div className="w-full max-w-4xl h-[600px] rounded-2xl shadow-2xl overflow-hidden border border-border bg-card relative">

        {/*
         * SLIDER MECHANISM:
         * - Image panel: absolute, lebar 45%, bergerak dari left:0% (login) → left:55% (register)
         * - Form panel: absolute, lebar 55%, bergerak dari left:45% (login) → left:0% (register)
         * Keduanya menggunakan transition transform yang identik agar terasa slide bersama.
         */}

        {/* IMAGE PANEL */}
        <div
          className="absolute top-0 bottom-0 w-[45%] hidden md:block"
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
          className="absolute top-0 bottom-0 w-full md:w-[55%] overflow-y-auto"
          style={{
            left: isRegister ? '0%' : '45%',
            transition: 'left 0.55s cubic-bezier(0.77, 0, 0.175, 1)',
            zIndex: 5,
          }}
        >
          {/* On mobile: full width, hide image */}
          <div className="md:hidden absolute top-0 bottom-0 left-0 right-0 bg-card" />
          <div className="relative z-10 h-full bg-card">
            <AuthForm mode={mode} onSwitchMode={handleSwitchMode} />
          </div>
        </div>

      </div>
    </div>
  );
}
