'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Upload, Scan, AlertTriangle, CheckCircle, Leaf, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DiseaseDetectionPage() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    disease: string;
    confidence: number;
    severity: 'low' | 'medium' | 'high';
    recommendation: string;
  } | null>(null);

  const handleUpload = () => {
    setUploaded(true);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        disease: 'Virus Keriting Daun Cabai',
        confidence: 94,
        severity: 'high',
        recommendation: 'Lakukan pemangkasan daun terinfeksi, semprot insektisida berbahan aktif imidakloprid, dan pantau populasi kutu kebul setiap 3 hari.',
      });
    }, 2500);
  };

  return (
    <DashboardLayout role="farmer" title="Deteksi Penyakit" subtitle="Upload gambar tanaman untuk deteksi AI">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Upload Area */}
        <div
          onClick={handleUpload}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200',
            uploaded ? 'border-emerald-500 bg-emerald-500/5' : 'border-border hover:border-emerald-500/50 hover:bg-accent/50'
          )}
        >
          {!uploaded ? (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Klik untuk upload gambar</p>
                <p className="text-xs text-muted-foreground mt-1">atau seret file ke sini</p>
              </div>
              <p className="text-[10px] text-muted-foreground">JPG, PNG (max 10MB)</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                <Leaf className="w-8 h-8 text-emerald-500" />
              </div>
              <p className="text-sm font-medium">Gambar berhasil diupload</p>
            </div>
          )}
        </div>

        {/* Analyzing */}
        {analyzing && (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            <p className="text-sm font-medium">AI sedang menganalisis gambar...</p>
            <p className="text-xs text-muted-foreground">Mendeteksi pola penyakit dan gejala</p>
          </div>
        )}

        {/* Result */}
        {result && !analyzing && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Scan className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-semibold">Hasil Deteksi</h3>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Penyakit Terdeteksi</p>
                  <p className="text-lg font-bold">{result.disease}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-0.5">Confidence</p>
                  <p className="text-lg font-bold text-emerald-500">{result.confidence}%</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-red-600">Tingkat Keparahan: Tinggi</p>
                  <p className="text-xs text-muted-foreground">Segera lakukan tindakan pengendalian</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-emerald-600 mb-1">Rekomendasi AI</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{result.recommendation}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => { setUploaded(false); setResult(null); }}
              className="w-full py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors"
            >
              Deteksi Gambar Lain
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
