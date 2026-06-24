'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, MapPin, Phone } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

export default function OnboardingPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    district: '',
    location: '',
  });

  useEffect(() => {
    // Redirect if they came here without registering
    const pendingData = sessionStorage.getItem('pending_registration');
    if (!pendingData) {
      router.replace('/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const pendingStr = sessionStorage.getItem('pending_registration');
      if (!pendingStr) throw new Error('Data registrasi tidak ditemukan. Silakan ulangi.');
      
      const { email, password, fullName, role } = JSON.parse(pendingStr);
      
      // Call actual signUp with the profile data
      const { error: signUpError, user } = await signUp(email, password, fullName, role, formData);
      
      if (signUpError) {
        throw signUpError;
      }
      
      if (user) {
        sessionStorage.removeItem('pending_registration');
        router.push('/farmer/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan saat menyimpan profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-emerald-500 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Leaf className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Satu Langkah Lagi!</h1>
            <p className="text-emerald-50 opacity-90 text-sm">
              Lengkapi profil Anda agar kami dapat memberikan rekomendasi pertanian yang akurat.
            </p>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Nomor WhatsApp / Telepon
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 text-slate-900 placeholder:text-slate-400 transition-colors"
                    placeholder="Contoh: 08123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-slate-700 mb-1">
                  Kecamatan
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    id="district"
                    name="district"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 text-slate-900 transition-colors appearance-none"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  >
                    <option value="" disabled>Pilih Kecamatan</option>
                    <option value="Kecamatan A">Kecamatan A</option>
                    <option value="Kecamatan B">Kecamatan B</option>
                    <option value="Kecamatan C">Kecamatan C</option>
                    <option value="Kecamatan D">Kecamatan D</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
                  Detail Alamat Lahan
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>
                  <textarea
                    id="location"
                    name="location"
                    rows={3}
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 text-slate-900 placeholder:text-slate-400 transition-colors resize-none"
                    placeholder="Masukkan nama desa, patokan, atau alamat lengkap lahan Anda"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              {error && (
                <div className="mb-4 text-xs px-3 py-2.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                'Selesai & Masuk Dashboard'
              )}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
