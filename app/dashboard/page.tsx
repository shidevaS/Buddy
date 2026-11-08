'use client';

import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import * as React from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const user = auth.getUser();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/auth/login');
    } else if (user.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/student');
    }
  }, [user, router]);

  if (!mounted || !user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mx-auto mb-4">
          {user.role === 'admin' ? 'AD' : 'SW'}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {user.role === 'admin' ? 'Admin Workspace' : 'Student Workspace'}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Redirecting to your {user.role} workspace…
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => router.push(user.role === 'admin' ? '/admin' : '/student')}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            Go to Workspace
          </button>
          <button
            onClick={() => {
              auth.logout();
              router.push('/auth/login');
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}