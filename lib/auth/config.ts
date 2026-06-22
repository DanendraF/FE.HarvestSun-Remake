import { UserRole } from '@/types';

export const ROLE_ROUTES: Record<UserRole, string> = {
  farmer: '/farmer/dashboard',
  officer: '/officer/dashboard',
  dinas: '/dinas/dashboard',
  admin: '/admin/dashboard',
};

export const PROTECTED_ROUTES = ['/farmer', '/officer', '/dinas', '/admin'];

export function getRoleFromPath(path: string): UserRole | null {
  if (path.startsWith('/farmer')) return 'farmer';
  if (path.startsWith('/officer')) return 'officer';
  if (path.startsWith('/dinas')) return 'dinas';
  if (path.startsWith('/admin')) return 'admin';
  return null;
}
