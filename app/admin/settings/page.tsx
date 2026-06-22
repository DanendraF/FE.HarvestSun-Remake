'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Settings, Bot, Server, Bell, Shield, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSettingsPage() {
  const [aiConfig, setAiConfig] = useState({
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2048,
    enabled: true,
  });

  const [systemConfig, setSystemConfig] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    pushNotifications: true,
  });

  return (
    <DashboardLayout role="admin" title="Pengaturan" subtitle="AI config dan system config">
      <div className="space-y-6 max-w-3xl">
        {/* AI Config */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-violet-500" />
            <h3 className="text-sm font-semibold">Konfigurasi AI</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium mb-1.5 block">AI Model</label>
              <select
                value={aiConfig.model}
                onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium mb-1.5 block">Temperature: {aiConfig.temperature}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={aiConfig.temperature}
                  onChange={(e) => setAiConfig({ ...aiConfig, temperature: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block">Max Tokens</label>
                <input
                  type="number"
                  value={aiConfig.maxTokens}
                  onChange={(e) => setAiConfig({ ...aiConfig, maxTokens: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={aiConfig.enabled}
                onChange={(e) => setAiConfig({ ...aiConfig, enabled: e.target.checked })}
                className="rounded border-border"
              />
              <span className="text-sm">Aktifkan AI Assistant</span>
            </div>
          </div>
        </div>

        {/* System Config */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-violet-500" />
            <h3 className="text-sm font-semibold">Konfigurasi Sistem</h3>
          </div>
          <div className="space-y-3">
            {[
              { key: 'maintenanceMode', label: 'Mode Maintenance', icon: Server },
              { key: 'allowRegistration', label: 'Izinkan Registrasi Baru', icon: Shield },
              { key: 'emailNotifications', label: 'Notifikasi Email', icon: Bell },
              { key: 'pushNotifications', label: 'Notifikasi Push', icon: Bell },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{item.label}</span>
                </div>
                <button
                  onClick={() => setSystemConfig({ ...systemConfig, [item.key]: !systemConfig[item.key as keyof typeof systemConfig] })}
                  className={cn(
                    'w-10 h-5 rounded-full transition-colors relative',
                    systemConfig[item.key as keyof typeof systemConfig] ? 'bg-violet-500' : 'bg-slate-300 dark:bg-slate-600'
                  )}
                >
                  <div className={cn(
                    'w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all',
                    systemConfig[item.key as keyof typeof systemConfig] ? 'left-5' : 'left-0.5'
                  )} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 transition-colors">
          <Save className="w-4 h-4" />
          Simpan Perubahan
        </button>
      </div>
    </DashboardLayout>
  );
}
