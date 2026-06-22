'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Send, Bot, User, Loader2, Sparkles, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function OfficerAICopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Halo Penyuluh! Saya AI Copilot HarvestSun. Saya bisa membantu Anda dengan:\n\n• Analisis performa petani\n• Rekomendasi intervensi\n• Prediksi risiko wilayah\n• Laporan otomatis\n\nApa yang ingin Anda analisis hari ini?',
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
        'Berdasarkan data petani di wilayah Anda, performa rata-rata meningkat 8% dibandingkan bulan lalu. Petani dengan skor tertinggi: Budi Santoso (92%).',
        'Analisis risiko menunjukkan 3 lahan memerlukan perhatian khusus akibat cuaca ekstrem minggu depan. Disarankan kunjungan preventif.',
        'Laporan otomatis wilayah Kec. Tani Makmur: Total produksi 4.8 ton, 2 kasus penyakit aktif, rata-rata skor kesehatan 87%.',
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
    <DashboardLayout role="officer" title="AI Copilot" subtitle="AI analysis assistant untuk penyuluh">
      <div className="flex flex-col h-[calc(100vh-8rem)] rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-accent/30">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">AI Copilot</h3>
            <p className="text-[10px] text-muted-foreground">Analisis & Laporan Otomatis</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={cn('max-w-[80%] sm:max-w-[70%] p-3 rounded-xl text-sm leading-relaxed', msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-sm' : 'bg-accent rounded-bl-sm')}>
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
              <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-accent rounded-xl rounded-bl-sm p-3">
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
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
              placeholder="Tanyakan analisis atau laporan..."
              className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <button onClick={handleSend} disabled={loading || !input.trim()} className="p-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
