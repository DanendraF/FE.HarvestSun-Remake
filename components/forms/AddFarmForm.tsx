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
import { toast } from 'sonner';
import { farmService } from '@/lib/api/farmService';
import { useAuth } from '@/lib/auth/AuthContext';

const farmSchema = z.object({
  name: z.string().min(2, { message: 'Nama lahan minimal 2 karakter' }),
  location: z.string().optional(),
  size: z.coerce.number().min(0.1, { message: 'Ukuran lahan harus lebih dari 0' }),
  cropType: z.string().optional(),
  status: z.enum(['active', 'inactive', 'harvesting']).default('active'),
  healthScore: z.coerce.number().min(0).max(100).default(100),
});

interface AddFarmFormProps {
  children: React.ReactNode;
  onSuccess?: () => void;
}

export function AddFarmForm({ children, onSuccess }: AddFarmFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const form = useForm<z.infer<typeof farmSchema>>({
    resolver: zodResolver(farmSchema),
    defaultValues: {
      name: '',
      location: '',
      size: 1,
      cropType: '',
      status: 'active',
      healthScore: 100,
    },
  });

  async function onSubmit(values: z.infer<typeof farmSchema>) {
    if (!user) {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }
    
    setLoading(true);
    try {
      await farmService.createFarm({
        ...values,
        userId: user.id,
      });
      toast.success('Lahan berhasil ditambahkan');
      setOpen(false);
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Gagal menambahkan lahan');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Lahan Baru</DialogTitle>
          <DialogDescription>
            Masukkan detail lahan pertanian Anda di sini. Klik simpan setelah selesai.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lahan *</FormLabel>
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
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Sleman, Yogyakarta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Luas (Hektar) *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
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
                    <FormLabel>Status</FormLabel>
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
                    <FormLabel>Komoditas Utama</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Padi" {...field} />
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
                    <FormLabel>Skor Kesehatan (0-100)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} />
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
                {loading ? 'Menyimpan...' : 'Simpan Lahan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
