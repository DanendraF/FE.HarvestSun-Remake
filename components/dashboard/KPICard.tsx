'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { KPIData } from '@/types';
import {
  MapPin, Sprout, Heart, Wheat, Users, AlertTriangle, ClipboardCheck,
  Map, BarChart3, Activity, Server, Zap, TrendingUp, TrendingDown, Minus
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  MapPin, Sprout, Heart, Wheat, Users, AlertTriangle, ClipboardCheck,
  Map, BarChart3, Activity, Server, Zap,
};

interface KPICardProps {
  data: KPIData;
  index?: number;
}

export default function KPICard({ data, index = 0 }: KPICardProps) {
  const Icon = iconMap[data.icon] || Activity;
  const TrendIcon = data.trend === 'up' ? TrendingUp : data.trend === 'down' ? TrendingDown : Minus;
  const trendColor = data.trend === 'up' ? 'text-emerald-500' : data.trend === 'down' ? 'text-red-500' : 'text-muted-foreground';

  return (
    <div
      className="relative p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-all duration-200 group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{data.label}</p>
          <p className="text-2xl font-bold tracking-tight">{data.value}</p>
          {data.change !== undefined && (
            <div className="flex items-center gap-1">
              <TrendIcon className={cn('w-3.5 h-3.5', trendColor)} />
              <span className={cn('text-xs font-medium', trendColor)}>
                {data.change > 0 ? '+' : ''}{data.change}%
              </span>
              <span className="text-xs text-muted-foreground">{data.changeLabel}</span>
            </div>
          )}
        </div>
        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
