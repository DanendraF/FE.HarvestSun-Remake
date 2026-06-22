'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import KPICard from '@/components/dashboard/KPICard';
import { ChartCard, AreaChartComponent, BarChartComponent } from '@/components/dashboard/ChartComponents';
import { farmerKPIs, productionChartData, aiInsights, weatherData, mockFarms } from '@/lib/data/mockData';
import { Sun, Cloud, CloudRain, Droplets, Wind, Thermometer, Sprout, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FarmerDashboard() {
  const weatherIcon = (condition: string) => {
    if (condition.includes('Hujan')) return <CloudRain className="w-5 h-5 text-blue-500" />;
    if (condition.includes('Cerah')) return <Sun className="w-5 h-5 text-amber-500" />;
    return <Cloud className="w-5 h-5 text-slate-400" />;
  };

  const healthColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <DashboardLayout role="farmer" title="Dashboard" subtitle="Overview lahan, cuaca, dan AI insight">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {farmerKPIs.map((kpi, idx) => (
            <KPICard key={idx} data={kpi} index={idx} />
          ))}
        </div>

        {/* Weather & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Weather Card */}
          <div className="lg:col-span-1 p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Cuaca Hari Ini</h3>
              <span className="text-xs text-muted-foreground">{weatherData.location}</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              {weatherIcon(weatherData.condition)}
              <div>
                <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
                <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center p-2 rounded-lg bg-accent/50">
                <Droplets className="w-4 h-4 text-blue-500 mb-1" />
                <span className="text-xs font-medium">{weatherData.humidity}%</span>
                <span className="text-[10px] text-muted-foreground">Kelembaban</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-accent/50">
                <Wind className="w-4 h-4 text-slate-500 mb-1" />
                <span className="text-xs font-medium">{weatherData.windSpeed} km/h</span>
                <span className="text-[10px] text-muted-foreground">Angin</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-accent/50">
                <Thermometer className="w-4 h-4 text-red-500 mb-1" />
                <span className="text-xs font-medium">{weatherData.temperature + 3}°C</span>
                <span className="text-[10px] text-muted-foreground">Terasa</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-xs font-medium mb-2">Prakiraan 5 Hari</p>
              <div className="flex justify-between">
                {weatherData.forecast.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">{day.day}</span>
                    {weatherIcon(day.condition)}
                    <span className="text-xs font-medium">{day.temp}°</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="lg:col-span-2 p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-semibold">AI Insights</h3>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={cn(
                    'p-3 rounded-lg border transition-all duration-200 hover:shadow-sm',
                    insight.type === 'warning'
                      ? 'bg-amber-500/5 border-amber-500/20'
                      : 'bg-emerald-500/5 border-emerald-500/20'
                  )}
                >
                  <div className="flex items-start gap-3">
                    {insight.type === 'warning' ? (
                      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    ) : (
                      <Lightbulb className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{insight.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{insight.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Tren Produksi" subtitle="Perbandingan komoditas (ton)">
            <BarChartComponent data={productionChartData} dataKeys={['padi', 'jagung', 'kedelai']} />
          </ChartCard>
          <ChartCard title="Kesehatan Lahan" subtitle="Skor rata-rata per minggu">
            <AreaChartComponent
              data={[
                { name: 'M1', score: 82 },
                { name: 'M2', score: 85 },
                { name: 'M3', score: 83 },
                { name: 'M4', score: 87 },
                { name: 'M5', score: 89 },
                { name: 'M6', score: 87 },
              ]}
              dataKey="score"
            />
          </ChartCard>
        </div>

        {/* Farm Health Overview */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold mb-4">Status Lahan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mockFarms.map((farm) => (
              <div key={farm.id} className="p-3 rounded-lg border border-border hover:border-emerald-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{farm.name}</span>
                  <span className={cn(
                    'text-[10px] px-2 py-0.5 rounded-full font-medium',
                    farm.status === 'active' && 'bg-emerald-500/10 text-emerald-600',
                    farm.status === 'harvesting' && 'bg-amber-500/10 text-amber-600',
                    farm.status === 'inactive' && 'bg-slate-500/10 text-slate-600'
                  )}>
                    {farm.status === 'active' ? 'Aktif' : farm.status === 'harvesting' ? 'Panen' : 'Nonaktif'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Sprout className="w-3 h-3" />
                  {farm.crop_type} · {farm.size} ha
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-accent rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full transition-all', healthColor(farm.health_score))} style={{ width: `${farm.health_score}%` }} />
                  </div>
                  <span className="text-xs font-medium">{farm.health_score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
