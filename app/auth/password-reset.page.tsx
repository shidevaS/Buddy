'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Card } from '@/components/ui';
import * as React from 'react';

export default function PasswordResetPage() {
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending a reset link
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-6 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <div className="p-4 rounded-md bg-green-50 text-green-700 border border-green-100">
            A password reset link has been sent to {email}.
          </div>
          <Button onClick={() => setSent(false)} className="w-full">
            Send another link
          </Button>
          <p className="text-center text-sm text-gray-500">
            <a href="/auth/login" className="font-medium text-primary hover:underline">
              Back to login
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-6 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <a href="/auth/login" className="text-sm text-primary hover:underline">
              Back to login
            </a>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      </div>
    </div>
  );
}