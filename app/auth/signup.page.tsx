import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui';
import { Input } from '@/src/components/ui';
import { Card } from '@/src/components/ui';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-6 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Full name"
              required
              autoComplete="name"
            />
            <Input
              type="email"
              placeholder="Email address"
              required
              autoComplete="email"
            />
          </div>
          <Input
            type="password"
            placeholder="Password"
            required
            autoComplete="new-password"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <select className="bg-white border border-input rounded-md px-3 py-2 placeholder-muted focus:ring-2 focus:ring-ring focus:ring-input w-full disabled:opacity-50 disabled:pointer-events-none">
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="tutor">Tutor</option>
            </select>
            <Input
              type="password"
              placeholder="Confirm password"
              required
              autoComplete="confirm-password"
            />
          </div>
          
          <div className="text-center">
            <span className="text-sm text-gray-500">Already have an account? <a href="/auth/login" className="font-medium text-primary hover:underline">Sign in</a></span>
          </div>
          
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}