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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Farm, Crop, CropType } from '@/types';
import { cropService } from '@/lib/api/cropService';
import { masterDataService } from '@/lib/api/masterDataService';

const cropSchema = z.object({
  farmId: z.string().min(1, { message: 'Pilih lahan' }),
  name: z.string().min(2, { message: 'Nama tanaman minimal 2 karakter' }),
  variety: z.string().optional(),
  plantingDate: z.date({
    required_error: "Pilih tanggal tanam",
  }),
  expectedHarvest: z.date().optional(),
  growthStage: z.string().default('Vegetatif'),
  healthStatus: z.enum(['healthy', 'warning', 'critical']).default('healthy'),
});

interface AddCropFormProps {
  children: React.ReactNode;
  farms: Farm[];
  initialData?: Crop;
  onSuccess?: () => void;
}

export function AddCropForm({ children, farms, initialData, onSuccess }: AddCropFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cropTypes, setCropTypes] = useState<CropType[]>([]);
  const form = useForm<z.infer<typeof cropSchema>>({
    resolver: zodResolver(cropSchema),
    defaultValues: {
      farmId: initialData?.farmId || '',
      name: initialData?.name || '',
      variety: initialData?.variety || '',
      growthStage: initialData?.growthStage || 'Vegetatif',
      healthStatus: initialData?.healthStatus || 'healthy',
      plantingDate: initialData?.plantingDate ? new Date(initialData.plantingDate) : undefined as any,
      expectedHarvest: initialData?.expectedHarvest ? new Date(initialData.expectedHarvest) : undefined as any,
    },
  });

  React.useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const types = await masterDataService.getCropTypes();
        setCropTypes(types);
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
          farmId: initialData.farmId || '',
          name: initialData.name || '',
          variety: initialData.variety || '',
          growthStage: initialData.growthStage || 'Vegetatif',
          healthStatus: initialData.healthStatus || 'healthy',
          plantingDate: initialData.plantingDate ? new Date(initialData.plantingDate) : undefined as any,
          expectedHarvest: initialData.expectedHarvest ? new Date(initialData.expectedHarvest) : undefined as any,
        });
      } else {
        form.reset({
          farmId: '',
          name: '',
          variety: '',
          growthStage: 'Vegetatif',
          healthStatus: 'healthy',
          plantingDate: undefined as any,
          expectedHarvest: undefined as any,
        });
      }
    }
  }, [open, initialData, form]);

  async function onSubmit(values: z.infer<typeof cropSchema>) {
    setLoading(true);
    try {
      if (initialData) {
        await cropService.updateCrop(initialData.id, {
          ...values,
          plantingDate: values.plantingDate.toISOString(),
          expectedHarvest: values.expectedHarvest?.toISOString(),
        } as any);
        toast.success('Tanaman berhasil diperbarui');
      } else {
        await cropService.createCrop({
          ...values,
          plantingDate: values.plantingDate.toISOString(),
          expectedHarvest: values.expectedHarvest?.toISOString(),
        } as any);
        toast.success('Tanaman berhasil ditambahkan');
      }
      setOpen(false);
      if (!initialData) form.reset();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.message || (initialData ? 'Gagal memperbarui tanaman' : 'Gagal menambahkan tanaman'));
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
          <DialogTitle>{initialData ? 'Edit Tanaman' : 'Tambah Tanaman Baru'}</DialogTitle>
          <DialogDescription>
            {initialData ? 'Ubah detail tanaman di lahan Anda.' : 'Masukkan detail tanaman untuk lahan yang dipilih.'}
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
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                const uniqueNames = Array.from(new Set(cropTypes.map(c => c.name)));
                return (
                  <FormItem>
                    <FormLabel>Nama Tanaman *</FormLabel>
                    <Select onValueChange={(val) => {
                      field.onChange(val);
                      form.setValue('variety', ''); // Reset variety when name changes
                    }} defaultValue={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Tanaman" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {uniqueNames.map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="variety"
                render={({ field }) => {
                  const selectedName = form.watch('name');
                  const availableVarieties = cropTypes
                    .filter(c => c.name === selectedName && c.variety)
                    .map(c => c.variety as string);
                    
                  return (
                    <FormItem>
                      <FormLabel>Varietas</FormLabel>
                      {availableVarieties.length > 0 ? (
                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih varietas" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableVarieties.map((variety) => (
                              <SelectItem key={variety} value={variety}>
                                {variety}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <FormControl>
                          <Input placeholder="Contoh: IR64" {...field} />
                        </FormControl>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="healthStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Kesehatan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="healthy">Sehat</SelectItem>
                        <SelectItem value="warning">Waspada</SelectItem>
                        <SelectItem value="critical">Kritis</SelectItem>
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
                name="plantingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Tanam *</FormLabel>
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
              <FormField
                control={form.control}
                name="expectedHarvest"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Estimasi Panen</FormLabel>
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
            </div>
            
            <FormField
              control={form.control}
              name="growthStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fase Pertumbuhan</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Vegetatif" {...field} />
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
                {loading ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Simpan Tanaman')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
