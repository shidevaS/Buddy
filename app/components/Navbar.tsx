'use client';

import { auth } from '@/lib/auth';
import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/school', label: 'School' },
  { href: '/coding', label: 'Coding' },
  { href: '/ai-tutor', label: 'AI Tutor' },
  { href: '/career', label: 'Career' },
];

export function Navbar() {
  const user = auth.getUser();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
            OL
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">OmniLearn<span className="text-indigo-600">India</span></span>
        </div>
        {mounted && user ? (
          <>
            <div className="flex items-center gap-6 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-600 hover:text-indigo-600 transition">
                  {link.label}
                </Link>
              ))}
              {user.role === 'admin' ? (
                <Link href="/admin" className="text-rose-600 hover:text-rose-700 font-semibold">Admin</Link>
              ) : (
                <Link href="/student" className="text-indigo-600 hover:text-indigo-700 font-semibold">Workspace</Link>
              )}
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role} • {user.grade || ''}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={() => {
                  auth.logout();
                  window.location.href = '/auth/login';
                }}
                className="text-sm font-medium text-gray-600 hover:text-rose-600 transition underline"
              >
                Sign out
              </button>
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
}
