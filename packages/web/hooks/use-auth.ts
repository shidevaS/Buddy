/**
 * @tuiton/web hooks/use-auth
 * React hook wrapper for Phase 1 auth (localStorage-based mock auth).
 * Shivani & Devendra.
 *
 * Provides: user, isAuthenticated, isAdmin, isStudent, login, register, logout,
 * requestOtp, verifyOtp, signInWithGoogle. Re-uses the Phase 1 auth logic
 * from lib/auth so the product can demo immediately without a backend.
 */

import { useEffect, useState } from 'react';
import {
  type TuitonUser,
  type UserRole,
  getUser,
  isAuthenticated,
  isAdmin,
  isStudent,
  login,
  register,
  logout,
  requestOtp,
  verifyOtp,
  signInWithGoogle,
} from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<TuitonUser | null>(getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticated());

  // Sync localStorage session changes to React state
  useEffect(() => {
    const updateState = () => {
      setUser(getUser());
      setIsAuthenticated(isAuthenticated());
    };

    // Listen for storage events from other tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'tuiton-session') {
        updateState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    updateState();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    user,
    isAuthenticated,
    isAdmin: () => isAdmin(user),
    isStudent: () => isStudent(user),
    login: (email: string, password?: string) => login(email, password),
    register: (name: string, email: string, password: string) => register(name, email, password),
    logout,
    requestOtp: (email: string) => requestOtp(email),
    verifyOtp: (email: string, otp: string) => verifyOtp(email, otp),
    signInWithGoogle: () => signInWithGoogle(),
  };
}