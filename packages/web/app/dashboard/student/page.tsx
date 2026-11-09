import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AIChatbot } from '@/components/AIChatbot';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  return (
    <div className="bg-gradient-obsidian min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.name}
          </h1>
          <p className="text-ink-200/70">
            Here's what's happening today.
          </p>
        </div>

        {/* Today's snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-ink-500">Today's class</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">10:00 AM</div>
              <p className="text-ink-500 mt-1">Mathematics · Grade 9</p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-ink-500">Today's challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Daily Quiz</div>
              <p className="text-ink-500 mt-1">5 XP · Streak: 3 days</p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-ink-500">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">42%</div>
              <p className="text-ink-500 mt-1">Roadmap completion</p>
            </CardContent>
          </Card>
        </div>

        {/* Continue learning */}
        <section className="rounded-2xl bg-card border-border p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Continue learning</h2>
            <Link
              href="/roadmaps"
              className="text-sm text-brand-400 hover:text-brand-300 transition"
            >
              View all roadmaps →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-white">Mathematics · Grade 9</h3>
              <p className="text-ink-400 text-sm">60% progress</p>
              <div className="w-full bg-ink-900/50 rounded-full h-2 mb-3 overflow-hidden">
                <div className="h-full bg-brand-600" style={{ width: '60%' }} />
              </div>
              <p className="text-ink-400 text-xs mb-2">Next: Quadratic Equations</p>
              <Button variant="outline" size="sm" className="w-full">
                Continue
              </Button>
            </Card>

            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-white">Introduction to Python</h3>
              <p className="text-ink-400 text-sm">30% progress</p>
              <div className="w-full bg-ink-900/50 rounded-full h-2 mb-3 overflow-hidden">
                <div className="h-full bg-brand-600" style={{ width: '30%' }} />
              </div>
              <p className="text-ink-400 text-xs mb-2">Next: Variables & Data Types</p>
              <Button variant="outline" size="sm" className="w-full">
                Continue
              </Button>
            </Card>

            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-white">Science · Grade 9</h3>
              <p className="text-ink-400 text-sm">15% progress</p>
              <div className="w-full bg-ink-900/50 rounded-full h-2 mb-3 overflow-hidden">
                <div className="h-full bg-brand-600" style={{ width: '15%' }} />
              </div>
              <p className="text-ink-400 text-xs mb-2">Next: Motion & Force</p>
              <Button variant="outline" size="sm" className="w-full">
                Continue
              </Button>
            </Card>
          </div>
        </section>

        {/* Today's challenge */}
        <section className="rounded-2xl bg-card border-border p-6">
                  <h2 className="text-xl font-bold text-white mb-2">Today's Challenge</h2>
                  <p className="text-ink-300 mb-4">
                    Complete the daily quiz to keep your streak alive.
                  </p>
                  <Button className="w-full">Start Challenge</Button>
                </section>
              </div>
            </div>
          );