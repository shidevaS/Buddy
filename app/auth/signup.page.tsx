'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Card } from '@/components/ui';
import { auth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [role, setRole] = React.useState<'student' | 'parent' | 'tutor'>('student');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const success = await auth.register(name, email, password, role);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('An account with this email already exists.');
      }
    } catch {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-6 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>

        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Full name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email address"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Input
            type="password"
            placeholder="Password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'student' | 'parent' | 'tutor')}
              className="bg-white border border-input rounded-md px-3 py-2 placeholder-muted focus:ring-2 focus:ring-ring focus:ring-input w-full disabled:opacity-50 disabled:pointer-events-none"
            >
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="tutor">Tutor</option>
            </select>
            <Input
              type="password"
              placeholder="Confirm password"
              required
              autoComplete="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-500">Already have an account? <a href="/auth/login" className="font-medium text-primary hover:underline">Sign in</a></span>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
}