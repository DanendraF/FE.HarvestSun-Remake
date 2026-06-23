'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { toast } from 'sonner';
import { farmService } from '@/lib/api/farmService';
import { useAuth } from '@/lib/auth/AuthContext';
import { masterDataService } from '@/lib/api/masterDataService';
import { Farm, CropType } from '@/types';
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('./MapPicker'), {
  ssr: false,
});

const farmSchema = z.object({
  name: z.string().min(2, { message: 'Nama lahan minimal 2 karakter' }),
  location: z.string().optional(),
  latitude: z.number({ required_error: 'Silakan pilih titik di peta' }),
  longitude: z.number({ required_error: 'Silakan pilih titik di peta' }),
  size: z.coerce.number().min(0.1, { message: 'Luas lahan minimal 0.1 ha' }),
  cropType: z.string().optional(),
  status: z.enum(['active', 'inactive', 'harvesting']).default('active'),
  healthScore: z.coerce.number().min(0).max(100).default(100),
});

interface AddFarmFormProps {
  children: React.ReactNode;
  initialData?: Farm;
  onSuccess?: () => void;
}

export function AddFarmForm({ children, initialData, onSuccess }: AddFarmFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cropTypes, setCropTypes] = useState<CropType[]>([]);
  const { user } = useAuth();
  const form = useForm<z.infer<typeof farmSchema>>({
    resolver: zodResolver(farmSchema),
    defaultValues: {
      name: initialData?.name || '',
      location: initialData?.location || '',
      latitude: initialData?.latitude || undefined,
      longitude: initialData?.longitude || undefined,
      size: initialData?.size || 1,
      cropType: initialData?.cropType || '',
      status: initialData?.status || 'active',
      healthScore: initialData?.healthScore || 100,
    },
  });

  React.useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const types = await masterDataService.getCropTypes();
        // Unique crop names for farms
        const uniqueNames = Array.from(new Set(types.map((t) => t.name)));
        setCropTypes(uniqueNames.map((name) => ({ id: name, name } as CropType)));
      } catch (error) {
        console.error('Failed to load crop types', error);
      }
    };
    fetchMasterData();
  }, []);

  React.useEffect(() => {
    if (open) {
      if (initialData) {
        form.reset({
          name: initialData.name || '',
          location: initialData.location || '',
          latitude: initialData.latitude || undefined,
          longitude: initialData.longitude || undefined,
          size: initialData.size || 1,
          cropType: initialData.cropType || '',
          status: initialData.status || 'active',
          healthScore: initialData.healthScore || 100,
        });
      } else {
        form.reset({
          name: '',
          location: '',
          latitude: undefined,
          longitude: undefined,
          size: 1,
          cropType: '',
          status: 'active',
          healthScore: 100,
        });
      }
    }
  }, [open, initialData, form]);

  async function onSubmit(values: z.infer<typeof farmSchema>) {
    if (!user) {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }
    
    setLoading(true);
    try {
      if (initialData) {
        await farmService.updateFarm(initialData.id, {
          ...values,
          userId: user.id,
        } as any);
        toast.success('Lahan berhasil diperbarui');
      } else {
        await farmService.createFarm({
          ...values,
          userId: user.id,
        } as any);
        toast.success('Lahan berhasil ditambahkan');
      }
      setOpen(false);
      if (!initialData) form.reset();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.message || (initialData ? 'Gagal memperbarui lahan' : 'Gagal menambahkan lahan'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Lahan' : 'Tambah Lahan Baru'}</DialogTitle>
          <DialogDescription>
            {initialData 
              ? 'Ubah detail lahan pertanian Anda di sini. Klik simpan setelah selesai.' 
              : 'Masukkan detail lahan pertanian Anda di sini. Klik simpan setelah selesai.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 mb-2">
                    <FormLabel className="mb-0">Nama Lahan *</FormLabel>
                    <Tooltip>
                      <TooltipTrigger type="button" tabIndex={-1}>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Masukkan nama identifikasi lahan (minimal 2 karakter)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <FormControl>
                    <Input placeholder="Contoh: Lahan Padi A1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 mb-2">
                    <FormLabel className="mb-0">Lokasi / Alamat</FormLabel>
                    <Tooltip>
                      <TooltipTrigger type="button" tabIndex={-1}>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Masukkan alamat lengkap atau detail lokasi lahan</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <FormControl>
                    <Input placeholder="Desa Sumber Makmur, Kec. Godean" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FormLabel className="mb-0">Pilih Titik di Peta</FormLabel>
                <Tooltip>
                  <TooltipTrigger type="button" tabIndex={-1}>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Geser peta atau klik pada peta untuk menentukan koordinat lahan</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <MapPicker 
                onLocationSelect={(lat, lng) => {
                  form.setValue('latitude', lat, { shouldValidate: true });
                  form.setValue('longitude', lng, { shouldValidate: true });
                }}
                defaultLat={form.watch('latitude')}
                defaultLng={form.watch('longitude')}
              />
              {(!form.watch('latitude') || !form.watch('longitude')) && form.formState.isSubmitted && (
                <p className="text-[0.8rem] font-medium text-destructive">Silakan pilih titik lokasi di peta terlebih dahulu</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 mb-2">
                      <FormLabel className="mb-0">Luas (Hektar) *</FormLabel>
                      <Tooltip>
                        <TooltipTrigger type="button" tabIndex={-1}>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Hanya boleh berisi angka atau desimal (contoh: 1.5)</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <Input 
                        inputMode="decimal"
                        placeholder="Contoh: 1.5"
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9.]/g, '');
                          field.onChange(val);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 mb-2">
                      <FormLabel className="mb-0">Status</FormLabel>
                      <Tooltip>
                        <TooltipTrigger type="button" tabIndex={-1}>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Pilih status operasional lahan saat ini</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="harvesting">Masa Panen</SelectItem>
                        <SelectItem value="inactive">Nonaktif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 mb-2">
                      <FormLabel className="mb-0">Komoditas Utama</FormLabel>
                      <Tooltip>
                        <TooltipTrigger type="button" tabIndex={-1}>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Pilih komoditas utama yang sedang ditanam di lahan ini</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih komoditas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cropTypes.map((crop) => (
                            <SelectItem key={crop.name} value={crop.name}>
                              {crop.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="healthScore"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 mb-2">
                      <FormLabel className="mb-0">Skor Kesehatan (0-100)</FormLabel>
                      <Tooltip>
                        <TooltipTrigger type="button" tabIndex={-1}>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Hanya boleh berisi angka bulat dari 0 hingga 100</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <Input 
                        inputMode="numeric"
                        placeholder="100"
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          field.onChange(val);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Simpan Lahan')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
