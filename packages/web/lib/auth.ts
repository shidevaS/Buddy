/**
 * @tuiton/web lib/auth
 * Authentication for Phase 1: Email OTP + Google auth with seeded admins
 * Shivani & Devendra. Role-gated helpers (Student / Admin).
 *
 * This is the Phase 1 auth skeleton. It uses localStorage for session
 * persistence so the product can run without a backend yet. The `api` client
 * from @tuiton/shared is wired so auth can be swapped to real endpoints later.
 */

import { api, type User, type UserRole } from '@tuiton/shared';

export type TuitonUser = User & { role: UserRole };

const SESSION_KEY = 'tuiton-session';
const SEEDED_ADMIN_EMAILS = ['shivani@tuiton.in', 'devendra@tuiton.in'];

type Session = {
  user: TuitonUser;
  accessToken: string;
  expiresAt: string;
};

let session: Session | null = null;

if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      session = JSON.parse(stored);
    }
  } catch {
    // ignore malformed stored session
  }
}

/** Is the current user an admin (Shivani or Devendra)? */
export function isAdmin(user: TuitonUser | null): boolean {
  return !!user && SEEDED_ADMIN_EMAILS.includes(user.email);
}

/** Is the current user a student? */
export function isStudent(user: TuitonUser | null): boolean {
  return !!user && user.role === 'student';
}

/** Get the current session user (null if not authenticated). */
export function getUser(): TuitonUser | null {
  return session?.user ?? null;
}

/** Is there an authenticated session? */
export function isAuthenticated(): boolean {
  return session !== null;
}

/** Login with email + password (mock for Phase 1; replaced by Email OTP flow). */
export async function login(email: string, password: string): Promise<TuitonUser> {
  await new Promise((r) => setTimeout(r, 600));

  const emailLower = email.toLowerCase().trim();
  const isSeededAdmin = SEEDED_ADMIN_EMAILS.includes(emailLower);

  // Phase 1 mock: accept any password for seeded admins; for students accept
  // a simple well-known password so the product can be demoed immediately.
  const validStudentPasswords: Record<string, string> = {
    'student@tuiton.in': 'student123',
  };

  if (isSeededAdmin) {
    // Seeded admins log in with any non-empty password.
    if (!password) throw new Error('Password is required');
    const user: TuitonUser = {
      id: emailLower,
      name: emailLower.split('@')[0]
        .split(/[._-]/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      email: emailLower,
      role: 'admin',
    };
    setSession(user);
    return user;
  }

  if (validStudentPasswords[emailLower] && validStudentPasswords[emailLower] === password) {
    const user: TuitonUser = {
      id: emailLower,
      name: emailLower.split('@')[0]
        .split(/[._-]/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      email: emailLower,
      role: 'student',
    };
    setSession(user);
    return user;
  }

  throw new Error('Invalid email or password');
}

/** Register a new student user. */
export async function register(name: string, email: string, password: string): Promise<TuitonUser> {
  await new Promise((r) => setTimeout(r, 600));

  const emailLower = email.toLowerCase().trim();
  if (SEEDED_ADMIN_EMAILS.includes(emailLower)) {
    throw new Error('This email is reserved for a seeded admin');
  }

  const user: TuitonUser = {
    id: emailLower,
    name: name.trim(),
    email: emailLower,
    role: 'student',
  };
  setSession(user);
  return user;
}

/** Logout. */
export function logout(): void {
  session = null;
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

/** Request an email OTP (Phase 1 placeholder — logs to console). */
export async function requestOtp(email: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 400));
  // In production this calls the backend /api/auth/otp/send via `api.post`.
  console.log('[tuiton/auth] OTP for', email, '(Phase 1 placeholder — no email provider configured)');
}

/** Verify an email OTP (Phase 1 placeholder). */
export async function verifyOtp(email: string, otp: string): Promise<TuitonUser> {
  await new Promise((r) => setTimeout(r, 400));
  // Accept any 6-digit OTP in Phase 1 so the flow can be demoed.
  if (!/^\d{6}$/.test(otp)) throw new Error('Invalid OTP');
  const user: TuitonUser = {
    id: email.toLowerCase().trim(),
    name: email.toLowerCase().trim().split('@')[0],
    email: email.toLowerCase().trim(),
    role: 'student',
  };
  setSession(user);
  return user;
}

/** Google sign-in (Phase 1 placeholder). */
export async function signInWithGoogle(): Promise<TuitonUser> {
  await new Promise((r) => setTimeout(r, 600));
  throw new Error('Google OAuth not yet configured (Phase 1 placeholder)');
}

function setSession(user: TuitonUser): void {
  const now = Date.now();
  session = {
    user,
    accessToken: `tuiton_${Math.random().toString(36).slice(2)}_${Date.now()}`,
    expiresAt: new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // ignore storage errors
  }
}

export default {
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
};

export const auth = {
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
};
