'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdminUser = user?.role === 'admin';
  const isStudentUser = user?.role === 'student';

  return (
    <header className="sticky top-0 z-50 border-b border-border/20 bg-gradient-obsidian backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">Tuiton</span>
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">v1</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-ink-200 hover:text-white transition">
              Dashboard
            </Link>
            {isAdminUser && (
              <Link href="/admin" className="text-sm font-medium text-brand-400 hover:text-brand-300 transition">
                Admin Console
              </Link>
            )}
            {user && (
              <Button variant="ghost" size="sm" onClick={() => auth.logout()}>
                Logout
              </Button>
            )}
            {!user && (
              <>
                <Link href="/login" className="text-sm font-medium text-ink-200 hover:text-white transition">
                  Sign in
                </Link>
                <Link href="/login">
                  <Button size="sm">Get started</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-ink-200 hover:bg-white/10 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open main menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-b border-white/10 bg-ink-950/90 backdrop-blur">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-ink-200 hover:bg-white/10"
            >
              Dashboard
            </Link>
            {isAdminUser && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-400 hover:bg-white/10"
              >
                Admin Console
              </Link>
            )}
            {user ? (
              <button
                onClick={() => auth.logout()}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-ink-200 hover:bg-white/10"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-ink-200 hover:bg-white/10"
                >
                  Sign in
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-brand-400 hover:bg-white/10"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
