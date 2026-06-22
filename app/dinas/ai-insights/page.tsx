'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Send, Bot, User, Loader2, Sparkles, Brain, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function DinasAIInsightsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Selamat datang di AI Insights Dinas Pertanian. Saya dapat membantu Anda dengan:\n\n• Prediksi produksi regional\n• Rekomendasi kebijakan pertanian\n• Analisis tren komoditas\n• Identifikasi wilayah prioritas intervensi\n\nApa yang ingin Anda analisis?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const responses = [
        'Berdasarkan analisis data 5 tahun terakhir, produksi padi di wilayah ini diprediksi meningkat 12% pada musim panen berikutnya. Faktor utama: peningkatan luas panen dan adopsi varietas unggul.',
        'Rekomendasi kebijakan: Fokuskan subsidi pupuk pada Kec. Tani Jaya yang menunjukkan penurunan hasil 5% berturut-turut 2 tahun terakhir.',
        'Analisis tren komoditas: Harga jagung naik 18% YoY. Disarankan untuk memperluas program diversifikasi tanaman di Kec. Tani Makmur dan Kec. Tani Baru.',
      ];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1500);
  };

  return (
    <DashboardLayout role="dinas" title="AI Insights" subtitle="Prediksi wilayah dan rekomendasi kebijakan">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
        {/* Quick Insights */}
        <div className="lg:col-span-1 space-y-4 overflow-y-auto">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-semibold">Prediksi Produksi</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Produksi total diprediksi mencapai <span className="font-medium text-foreground">13,200 ton</span> pada Q2 2024,
              meningkat <span className="text-emerald-600 font-medium">6.0%</span> dari periode sebelumnya.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-semibold">Wilayah Prioritas</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Kec. Tani Jaya</span> memerlukan perhatian khusus
              akibat penurunan hasil panen berturut-turut dan peningkatan kasus penyakit.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold">Rekomendasi</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Perluas program diversifikasi komoditas ke <span className="font-medium text-foreground">Kec. Tani Makmur</span>
              dan <span className="font-medium text-foreground">Kec. Tani Baru</span> untuk optimalisasi lahan.
            </p>
          </div>
        </div>

        {/* Chat */}
        <div className="lg:col-span-2 flex flex-col rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-accent/30">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">AI Insights</h3>
              <p className="text-[10px] text-muted-foreground">Prediksi & Rekomendasi Kebijakan</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={cn('max-w-[80%] sm:max-w-[70%] p-3 rounded-xl text-sm leading-relaxed', msg.role === 'user' ? 'bg-amber-500 text-white rounded-br-sm' : 'bg-accent rounded-bl-sm')}>
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span className="text-[10px] opacity-60 mt-1 block">{msg.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-accent rounded-xl rounded-bl-sm p-3">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanyakan prediksi atau rekomendasi kebijakan..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
              <button onClick={handleSend} disabled={loading || !input.trim()} className="p-2.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors disabled:opacity-50">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
