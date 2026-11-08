'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Card } from '@/components/ui';
import { auth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await auth.login(email, password, rememberMe);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
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
        <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>

        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary"
              />
              <label htmlFor="remember-me" className="text-sm text-gray-600">
                Remember Me
              </label>
            </div>
            <a href="/auth/password-reset" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-gray-500">Or continue with</span>
            <div className="flex gap-3 mt-4">
                          <Button variant="ghost" size="lg" className="flex-1" disabled>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.54 2.73a9.96 9.96 0 0 0-4.25 1.38C14.82 1.59 13.09 1 11 1S7.18.59 5.46 2.73a1.2 1.2 0 0 0-.3 1.26 12.08 12.08 0 0 0 2.7 4.04 8.98 8.98 0 0 1-2.45 2.57M2.73 22.54a9.96 9.96 0 0 0 1.38 4.25c1.59 13.09 1 13.09S1 35.18.59 33.46a1.2 1.2 0 0 0 1.26-.3 12.08 12.08 0 0 0 4.04 2.7 8.98 8.98 0 0 1-2.57-2.45M4.96 21.77a5.98 5.98 0 0 1-1.39-2.03 5.96 5.96 0 0 1-2.03-1.39 5.98 5.98 0 0 1-1.39 2.03 5.98 5.98 0 0 1 1.39 2.03zM21.77 4.96a5.98 5.98 0 0 1 2.03 1.39 5.96 5.96 0 0 1 1.39 2.03 5.98 5.98 0 0 1-2.03 1.39 5.98 5.98 0 0 1 1.39 2.03z" />
                </svg>
                Google
              </Button>
              <Button variant="ghost" size="lg" className="flex-1" disabled>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v2.234c-3.338.726-4.033-1.416-4.033-1.416s-1.097-1.943-1.097-2.287-.007-1.545 0-1.545s1.097-1.943 1.097-2.287c0-.37-.03-.72-.03-1.128v-2.234a12.02 12.02 0 0 0-.593-2.51c-.451-.779-.905-1.444-1.397-1.823-1-1.195.177-2.195.763-2.762-.417.695-1.024.378-1.37.763-.568.178-1.09.55-1.417.874l2.24 2.24c.979.979.979 2.57 0 3.549-.995.995-2.598.995-3.598 0-.998-.995-1.998-1.998-1.998-2.01 0-1.998.998-3.598l-2.238-2.238a8.016 8.016 0 0 0-.717-1.357L3.067 7.838a8.052 8.052 0 0 0 .586 1.488c0 .388.154.768.41.993l2.308 2.31 2.266-2.266a7.987 7.987 0 0 1 1.069-1.037c.369-.369.369-1.016 0-1.385zM12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                </svg>
                GitHub
              </Button>
            </div>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? <a href="/auth/signup" className="font-medium text-primary hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}