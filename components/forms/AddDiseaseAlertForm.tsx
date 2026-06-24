'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Farm, DiseaseAlert } from '@/types';
import { diseaseAlertService } from '@/lib/api/diseaseAlertService';
import { farmService } from '@/lib/api/farmService';

const diseaseAlertSchema = z.object({
  farmId: z.string().min(1, { message: 'Pilih lahan' }),
  diseaseName: z.string().min(1, { message: 'Nama penyakit wajib diisi' }),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  detectedAt: z.date({
    required_error: "Pilih tanggal deteksi",
  }),
  status: z.enum(['active', 'resolved']).default('active'),
  recommendation: z.string().optional(),
});

type DiseaseAlertFormValues = z.infer<typeof diseaseAlertSchema>;

interface AddDiseaseAlertFormProps {
  children: React.ReactNode;
  initialData?: DiseaseAlert;
  onSuccess?: () => void;
}

export function AddDiseaseAlertForm({ children, initialData, onSuccess }: AddDiseaseAlertFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [farms, setFarms] = useState<Farm[]>([]);

  const form = useForm<DiseaseAlertFormValues>({
    resolver: zodResolver(diseaseAlertSchema),
    defaultValues: {
      farmId: initialData?.farmId || '',
      diseaseName: initialData?.diseaseName || '',
      severity: initialData?.severity || 'low',
      detectedAt: initialData?.detectedAt ? new Date(initialData.detectedAt) : new Date(),
      status: initialData?.status || 'active',
      recommendation: initialData?.recommendation || '',
    },
  });

  useEffect(() => {
    if (open && farms.length === 0) {
      farmService.getFarms().then(setFarms).catch(console.error);
    }
  }, [open, farms.length]);

  useEffect(() => {
    if (open && initialData) {
      form.reset({
        farmId: initialData.farmId,
        diseaseName: initialData.diseaseName,
        severity: initialData.severity,
        detectedAt: new Date(initialData.detectedAt),
        status: initialData.status,
        recommendation: initialData.recommendation || '',
      });
    } else if (open && !initialData) {
      form.reset({
        farmId: '',
        diseaseName: '',
        severity: 'low',
        detectedAt: new Date(),
        status: 'active',
        recommendation: '',
      });
    }
  }, [open, initialData, form]);

  const onSubmit = async (data: DiseaseAlertFormValues) => {
    try {
      setLoading(true);
      const apiData = {
        ...data,
        detectedAt: data.detectedAt.toISOString(),
      };
      
      if (initialData?.id) {
        await diseaseAlertService.updateDiseaseAlert(initialData.id, apiData);
        toast.success('Peringatan penyakit berhasil diperbarui');
      } else {
        await diseaseAlertService.createDiseaseAlert(apiData);
        toast.success('Peringatan penyakit berhasil ditambahkan');
      }
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save disease alert:', error);
      toast.error('Gagal menyimpan peringatan penyakit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Peringatan' : 'Tambah Peringatan Penyakit'}</DialogTitle>
          <DialogDescription>
            {initialData ? 'Perbarui data peringatan penyakit yang ada.' : 'Catat peringatan penyakit baru untuk lahan yang dipantau.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="farmId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Lahan
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>Pilih lahan tempat penyakit terdeteksi.</TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih lahan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {farms.map((farm) => (
                        <SelectItem key={farm.id} value={farm.id}>
                          {farm.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diseaseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Nama Penyakit/Hama
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>Contoh: Wereng Coklat, Karat Daun, dll.</TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama penyakit/hama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tingkat Bahaya (Severity)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tingkat bahaya" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Rendah (Low)</SelectItem>
                        <SelectItem value="medium">Sedang (Medium)</SelectItem>
                        <SelectItem value="high">Tinggi (High)</SelectItem>
                        <SelectItem value="critical">Kritis (Critical)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="detectedAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Terdeteksi</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Peringatan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status peringatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Aktif (Belum Tertangani)</SelectItem>
                      <SelectItem value="resolved">Selesai (Sudah Tertangani)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recommendation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Rekomendasi Tindakan
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>Saran penanganan untuk petani.</TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan langkah-langkah rekomendasi..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
