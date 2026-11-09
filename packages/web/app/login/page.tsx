'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardFooter } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Auto-logout if session expired
  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      const expiry = new Date(localStorage.getItem('tuiton-session')?.split('expiresAt=')[1] || '0');
      const now = new Date();
      if (now > expiry) {
        logout();
        router.push('/login');
        toast({
          title: 'Session expired',
          description: 'Please log in again.',
          variant: 'destructive',
        });
      }
    }
  }, [isAuthenticated, user, logout, router, toast]);

  return (
    <main className="min-h-screen bg-gradient-obsidian flex items-center justify-center px-4 pt-8">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-glow max-w-xs">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {user?.role === 'admin' ? 'Admin Console' : 'Student Portal'}
          </CardTitle>
          <CardDescription>
            {user?.role === 'admin'
              ? 'Sign in as Shivani or Devendra to access the control center.'
              : 'Welcome to Tuiton \u2014 your learning journey starts here.'}
          </CardDescription>
        </CardHeader>

        {user ? (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted">
              Welcome, {user.name || user.email.split('@')[0]}!
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className="w-full"
            >
              Logout
            </Button>
          </CardContent>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const role = (document.querySelector('input[name="role"]') as HTMLInputElement)?.value;
              if (role === 'admin') {
                await login('admin');
              } else {
                await login('student');
              }
              router.push('/dashboard');
            }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight">
                {user?.role === 'admin' ? 'Admin Console' : 'Student Portal'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
                disabled={isAuthenticated}
              >
                Skip
              </Button>
            </div>

            {/* Admin Login Section */}
            <div id="admin-section" className="hidden">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input
                id="admin-email"
                type="email"
                required
                placeholder="shivani@tuiton.in"
                className="w-full"
              />
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                required
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                className="w-full"
              />
            </div>

            {/* Student Login Section */}
            <div id="student-section" className="hidden">
              <Label htmlFor="student-email">Student Email</Label>
              <Input
                id="student-email"
                type="email"
                required
                placeholder="student@tuiton.in"
                className="w-full"
              />
              <Label htmlFor="student-password">Password</Label>
              <Input
                id="student-password"
                type="password"
                required
                placeholder="student123"
                className="w-full"
              />
            </div>

            {/* Role selector */}
            <div className="space-y-3">
              <Label className="cursor-pointer select-none">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  className="w-4 h-4 rounded border-border/30 focus:ring-primary"
                />
                <span className="ml-2 text-muted/60 text-sm">
                  Admin Login (Shivani & Devendra)
                </span>
              </Label>

              <Label className="cursor-pointer select-none">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={true}
                  className="w-4 h-4 rounded border-border/30 focus:ring-primary"
                />
                <span className="ml-2 text-muted/60 text-sm">
                  Student Login
                </span>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isAuthenticated}
            >
              {isAuthenticated ? 'Loading...' : 'Sign In'}
            </Button>

            <p className="text-center text-xs text-muted/60 mt-3">
              Seeded admins: shivani@tuiton.in / devendra@tuiton.in (any password)\u003cbr /\u003e
              Demo student: student@tuiton.in / student123
            </p>
          </form>
        )}

        {isAuthenticated && (
          <p className="mt-4 text-center text-sm text-ink-400">
            Already signed in{' '}
            <span className="font-medium">{user?.name || user?.email.split('@')[0]}</span>
          </p>
        )}
      </div>
    </main>
  );
}