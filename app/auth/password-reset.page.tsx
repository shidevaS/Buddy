import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui';
import { Input } from '@/src/components/ui';
import { Card } from '@/src/components/ui';

export default function PasswordResetPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-6 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        
        <form className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            required
            autoComplete="email"
          />
          
          <div className="flex items-center justify-between">
            <a href="/auth/login" className="text-sm text-primary hover:underline">
              Back to login
            </a>
          </div>
          
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
}