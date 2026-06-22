'use client';

import React from 'react';
import { Sprout, Wheat, Leaf, TreePine } from 'lucide-react';

export default function AuthImagePanel({ mode }: { mode: 'login' | 'register' }) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden select-none">

      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-emerald-400 opacity-10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-52 h-52 rounded-full bg-emerald-500 opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-teal-400 opacity-10 blur-3xl" />
      </div>

      {/* Floating icon decorations */}
      <div className="absolute top-14 right-12 opacity-20 animate-pulse">
        <Wheat className="w-8 h-8 text-emerald-300" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <Leaf className="w-6 h-6 text-emerald-300" />
      </div>
      <div className="absolute top-1/3 left-8 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
        <TreePine className="w-7 h-7 text-emerald-300" />
      </div>

      {/* Main content — fades when mode changes */}
      <div
        key={mode}
        className="relative z-10 flex flex-col items-center text-center px-8 gap-6 animate-fade-in"
        style={{ animation: 'fadeInUp 0.4s ease forwards' }}
      >
        {/* Logo icon */}
        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
          <Sprout className="w-10 h-10 text-emerald-300" />
        </div>

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">AgriLink</h2>
          <p className="text-emerald-300 text-xs font-medium tracking-widest uppercase">Smart Agriculture Platform</p>
        </div>

        {/* Dynamic message per mode */}
        <div className="max-w-[220px]">
          {mode === 'login' ? (
            <>
              <p className="text-white/90 text-base font-semibold leading-snug">
                Kelola lahan Anda lebih cerdas
              </p>
              <p className="text-white/50 text-xs mt-2 leading-relaxed">
                Platform kolaboratif untuk petani, penyuluh, dan dinas pertanian.
              </p>
            </>
          ) : (
            <>
              <p className="text-white/90 text-base font-semibold leading-snug">
                Bergabung bersama ribuan petani
              </p>
              <p className="text-white/50 text-xs mt-2 leading-relaxed">
                Daftar sekarang dan mulai perjalanan tani digital Anda.
              </p>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-5 mt-2">
          {[
            { val: '2.8K+', label: 'Lahan' },
            { val: '89', label: 'Penyuluh' },
            { val: '5 Kec', label: 'Regional' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-white font-bold text-base">{s.val}</span>
              <span className="text-white/40 text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-900/50 to-transparent pointer-events-none" />

      {/* Keyframe animation defined inline via style tag */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
