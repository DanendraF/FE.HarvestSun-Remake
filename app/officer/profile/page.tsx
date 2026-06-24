'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/lib/auth/AuthContext';
import Image from 'next/image';
import { User, Phone, MapPin, Mail, Calendar, Save, Lock, Map, Shield, ClipboardCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function OfficerProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nip: '',
    region: '',
  });

  useEffect(() => {
    if (user) {
      const profile = user.officerProfile || {};

      setFormData(prev => ({
        ...prev,
        fullName: user.full_name || (user as any).fullName || '',
        email: user.email || '',
        phone: profile.phone || '',
        nip: 'P-8472910482', // Not editable, mock logic for now
        region: profile.region || '',
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user) {
      const profile = user.officerProfile || {};
      setFormData({
        fullName: user.full_name || (user as any).fullName || '',
        email: user.email || '',
        phone: profile.phone || '',
        nip: 'P-8472910482',
        region: profile.region || '',
      });
    }
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setShowSaveDialog(true);
  };

  const confirmSave = async () => {
    setShowSaveDialog(false);
    setIsSaving(true);
    
    const { error } = await updateProfile({
      fullName: formData.fullName,
      phone: formData.phone,
      region: formData.region,
    });

    setIsSaving(false);
    if (error) {
      alert('Gagal menyimpan profil: ' + error.message);
    } else {
      setIsEditing(false);
      alert('Profil berhasil diperbarui!');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPasswordDialog(true);
  };

  const confirmPasswordChange = async () => {
    setShowPasswordDialog(false);
    // Logic for updating password
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Fitur ubah kata sandi belum terhubung ke backend sepenuhnya.');
    }, 1000);
  };

  const displayFullName = formData.fullName || user?.full_name || (user as any)?.fullName || '-';
  const displayEmail = formData.email || user?.email || '-';

  return (
    <DashboardLayout role="officer" title="Profil Penyuluh" subtitle="Kelola informasi penugasan dan akun Anda">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        
        {/* Left Column: Overview Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-blue-500/20 to-blue-500/5 relative" />
            <div className="px-6 pb-6 relative">
              <div className="flex justify-center -mt-16 mb-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background bg-card shadow-lg">
                  <Image 
                    src={user?.avatar_url || '/avatars/default-avatar.svg'} 
                    alt={displayFullName} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-bold">{displayFullName}</h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-600 text-sm font-semibold rounded-full">
                  <ClipboardCheck className="w-4 h-4" /> Penyuluh Aktif
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium truncate">{displayEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Telepon</p>
                    <p className="font-medium truncate">{formData.phone ? `+62 ${formData.phone.replace(/^0+/, '')}` : '-'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Mulai Tugas</p>
                    <p className="font-medium truncate">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-semibold mb-4">Statistik Penugasan</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Petani Binaan</span>
                </div>
                <span className="font-bold">24 Petani</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-muted-foreground">Lahan Diawasi</span>
                </div>
                <span className="font-bold">14 Hektar</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-muted-foreground">Skor Kinerja</span>
                </div>
                <span className="font-bold">98%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Forms */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8">
            <div className="mb-6 border-b border-border pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" /> Informasi Data Diri
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Perbarui informasi personal dan kontak Anda.</p>
              </div>
            </div>
            
            <form onSubmit={handleSaveClick} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Masukkan nama lengkap" disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Alamat Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@contoh.com" disabled />
                  {isEditing && <p className="text-[10px] text-muted-foreground">Email tidak dapat diubah.</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="08xxx" disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nip">NIP / ID Petugas (Hanya Baca)</Label>
                  <Input id="nip" value={formData.nip} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Wilayah Tugas</Label>
                <Input id="region" value={formData.region} onChange={handleChange} disabled={!isEditing} />
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                {isEditing ? (
                  <>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCancelEdit();
                      }}
                    >
                      Batal
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSaving}>
                      {isSaving ? 'Menyimpan...' : (
                        <>
                          <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Edit Profil
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8">
            <div className="mb-6 border-b border-border pb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-500" /> Keamanan Akun
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Perbarui kata sandi untuk menjaga keamanan akun.</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-2 max-w-md">
                <Label htmlFor="currentPass">Kata Sandi Saat Ini</Label>
                <Input id="currentPass" type="password" placeholder="••••••••" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="newPass">Kata Sandi Baru</Label>
                  <Input id="newPass" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPass">Konfirmasi Kata Sandi Baru</Label>
                  <Input id="confirmPass" type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" variant="secondary" disabled={isSaving}>
                  {isSaving ? 'Memperbarui...' : 'Perbarui Kata Sandi'}
                </Button>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* Save Profile Confirmation Dialog */}
      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Simpan Perubahan Profil?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menyimpan perubahan pada profil Anda? Data yang baru akan menggantikan data lama Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSaving}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isSaving ? 'Menyimpan...' : 'Ya, Simpan'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Save Password Confirmation Dialog */}
      <AlertDialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ubah Kata Sandi?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin mengubah kata sandi Anda? Anda harus menggunakan kata sandi baru untuk login berikutnya.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSaving}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmPasswordChange} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isSaving ? 'Memperbarui...' : 'Ya, Ubah Sandi'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </DashboardLayout>
  );
}
