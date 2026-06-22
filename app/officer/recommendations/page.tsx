'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Send, MessageSquare, User, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Recommendation {
  id: string;
  farmer: string;
  message: string;
  sent: boolean;
  date: string;
}

export default function OfficerRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    { id: '1', farmer: 'Budi Santoso', message: 'Lakukan penyiraman pagi hari untuk mengurangi penguapan. Kelembaban tanah menurun di lahan A1.', sent: true, date: '21 Mar 2024' },
    { id: '2', farmer: 'Siti Aminah', message: 'Disarankan untuk memberikan pupuk NPK pada fase generatif jagung B2.', sent: true, date: '20 Mar 2024' },
    { id: '3', farmer: 'Ahmad Wijaya', message: 'Pantau populasi kutu kebul setiap 3 hari. Risiko meningkat akibat cuaca lembab.', sent: false, date: '19 Mar 2024' },
  ]);
  const [selectedFarmer, setSelectedFarmer] = useState('');
  const [message, setMessage] = useState('');

  const farmers = ['Budi Santoso', 'Siti Aminah', 'Ahmad Wijaya', 'Dewi Kusuma', 'Eko Prasetyo'];

  const handleSend = () => {
    if (!selectedFarmer || !message.trim()) return;
    const newRec: Recommendation = {
      id: Date.now().toString(),
      farmer: selectedFarmer,
      message,
      sent: true,
      date: new Date().toLocaleDateString('id-ID'),
    };
    setRecommendations([newRec, ...recommendations]);
    setMessage('');
  };

  return (
    <DashboardLayout role="officer" title="Rekomendasi" subtitle="Kirim saran ke petani">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Send Form */}
        <div className="lg:col-span-1 p-4 rounded-xl border border-border bg-card h-fit">
          <h3 className="text-sm font-semibold mb-4">Kirim Rekomendasi</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium mb-1.5 block">Pilih Petani</label>
              <select
                value={selectedFarmer}
                onChange={(e) => setSelectedFarmer(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
              >
                <option value="">Pilih petani...</option>
                {farmers.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block">Pesan</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none"
                placeholder="Tulis rekomendasi..."
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!selectedFarmer || !message.trim()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              Kirim
            </button>
          </div>
        </div>

        {/* History */}
        <div className="lg:col-span-2 p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold mb-4">Riwayat Rekomendasi</h3>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-3 rounded-lg border border-border hover:bg-accent/20 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 text-xs font-bold">
                      {rec.farmer.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{rec.farmer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {rec.sent && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                    <span className="text-xs text-muted-foreground">{rec.date}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{rec.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
