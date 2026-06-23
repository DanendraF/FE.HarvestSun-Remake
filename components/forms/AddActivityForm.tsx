'use client';

import React, { useState } from 'react';
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
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Farm, Activity } from '@/types';
import { activityService } from '@/lib/api/activityService';

const activitySchema = z.object({
  farmId: z.string().min(1, { message: 'Pilih lahan' }),
  type: z.enum(['irrigation', 'fertilizing', 'harvesting', 'pest_control', 'monitoring']),
  description: z.string().optional(),
  date: z.date({
    required_error: "Pilih tanggal aktivitas",
  }),
  status: z.enum(['completed', 'scheduled', 'in_progress']).default('scheduled'),
  cost: z.coerce.number().min(0).default(0),
});

interface AddActivityFormProps {
  children: React.ReactNode;
  farms: Farm[];
  initialData?: Activity;
  onSuccess?: () => void;
}

export function AddActivityForm({ children, farms, initialData, onSuccess }: AddActivityFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      farmId: initialData?.farm_id || '',
      type: initialData?.type as any || 'monitoring',
      description: initialData?.description || '',
      status: initialData?.status as any || 'scheduled',
      cost: initialData?.cost || 0,
      date: initialData?.date ? new Date(initialData.date) : undefined as any,
    },
  });

  async function onSubmit(values: z.infer<typeof activitySchema>) {
    setLoading(true);
    try {
      if (initialData) {
        await activityService.updateActivity(initialData.id, {
          ...values,
          date: values.date.toISOString(),
        } as any);
        toast.success('Aktivitas berhasil diperbarui');
      } else {
        await activityService.createActivity({
          ...values,
          date: values.date.toISOString(),
        } as any);
        toast.success('Aktivitas berhasil ditambahkan');
      }
      setOpen(false);
      if (!initialData) form.reset();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.message || (initialData ? 'Gagal memperbarui aktivitas' : 'Gagal menambahkan aktivitas'));
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
          <DialogTitle>{initialData ? 'Edit Aktivitas' : 'Tambah Aktivitas Baru'}</DialogTitle>
          <DialogDescription>
            {initialData ? 'Ubah detail aktivitas lahan Anda.' : 'Catat aktivitas operasional di lahan Anda.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="farmId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pilih Lahan *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Lahan" />
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
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Aktivitas *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="irrigation">Irigasi/Penyiraman</SelectItem>
                        <SelectItem value="fertilizing">Pemupukan</SelectItem>
                        <SelectItem value="pest_control">Pengendalian Hama</SelectItem>
                        <SelectItem value="monitoring">Pemantauan</SelectItem>
                        <SelectItem value="harvesting">Panen</SelectItem>
                      </SelectContent>
                    </Select>
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
                        <SelectItem value="scheduled">Terjadwal</SelectItem>
                        <SelectItem value="in_progress">Berlangsung</SelectItem>
                        <SelectItem value="completed">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal *</FormLabel>
                  <Popover modal={true}>
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
                            format(field.value, "dd MMM yyyy")
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biaya (Rp)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Lengkap</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detail aktivitas yang dilakukan..." 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Simpan Aktivitas')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
