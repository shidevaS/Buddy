'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth } from '@/lib/auth';

type Student = {
  id: string; name: string; email: string; school?: string; grade?: string;
  streak?: number; totalXp?: number; level?: number; createdAt?: string;
};
type Homework = {
  id: string; title: string; subject: string; grade: string;
  description: string; dueDate: string; status: string;
  assignedBy: string; studentId: string; totalMarks?: number; marks?: number;
};

export default function AdminWorkspace() {
  const router = useRouter();
  const user = auth.getUser();
  const [mounted, setMounted] = React.useState(false);

  const [students, setStudents] = React.useState<Student[]>([]);
  const [homework, setHomework] = React.useState<Homework[]>([]);
  const [newHomework, setNewHomework] = React.useState({
    title: '', subject: '', grade: '', description: '', dueDate: '', studentId: '', totalMarks: '',
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [sRes, hRes] = await Promise.all([
        fetch('/api/students'),
        fetch('/api/homework'),
      ]);
      setStudents((await sRes.json()).students || []);
      setHomework((await hRes.json()).homework || []);
    } catch (e) {
      console.error('Failed to load admin data', e);
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Admin Workspace</h2>
          <p className="text-gray-500 mb-6">Admin access required.</p>
          {user ? (
            <p className="text-sm text-red-600 mb-4">Logged in as {user.role}. Contact Shivani Sharma for admin access.</p>
          ) : (
            <p className="text-sm text-gray-500 mb-4">Please sign in as admin.</p>
          )}
          <Button onClick={() => router.push('/auth/login')} className="w-full">
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  const handleAddHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newHomework,
          assignedBy: user.name,
        }),
      });
      setNewHomework({ title: '', subject: '', grade: '', description: '', dueDate: '', studentId: '', totalMarks: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold text-lg">
              AD
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">OmniLearn<span className="text-rose-600">India</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              ADMIN Workspace
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Owner: Shivani Sharma</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <Button variant="ghost" size="sm" onClick={() => { auth.logout(); router.push('/auth/login'); }}>
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-gradient-to-r from-rose-600 to-rose-800 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-rose-100 text-sm uppercase tracking-wider font-semibold mb-1">
                Admin Dashboard — Managed by Shivani Sharma
              </p>
              <h1 className="text-3xl font-bold mb-2">Monitor Students</h1>
              <p className="text-rose-200 text-sm">
                Track student progress, assign homework, and oversee competitions & hackathons.
              </p>
            </div>
            <div className="flex gap-3">
              <Badge variant="default" className="bg-white/20 backdrop-blur text-white border-white/30 px-3 py-1">
                {students.length} Students
              </Badge>
              <Badge variant="default" className="bg-white/20 backdrop-blur text-white border-white/30 px-3 py-1">
                {homework.length} Homework Assigned
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Students" value={students.length} icon="👨‍🎓" color="bg-rose-500" />
          <StatCard title="Active (7-day streak)" value={students.filter((s) => (s.streak || 0) > 0).length} icon="🔥" color="bg-amber-500" />
          <StatCard title="Avg Level" value={students.length ? Math.round(students.reduce((a, s) => a + (s.level || 0), 0) / students.length) : 0} icon="⭐" color="bg-violet-500" />
          <StatCard title="Total XP Distributed" value={students.reduce((a, s) => a + (s.totalXp || 0), 0)} icon="💎" color="bg-green-500" />
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-3 border-b p-1 bg-white rounded-xl shadow-sm">
            <TabsTrigger value="students" className="flex flex-col items-center gap-1 p-3 text-sm">
              👨‍🎓 Students
            </TabsTrigger>
            <TabsTrigger value="homework" className="flex flex-col items-center gap-1 p-3 text-sm">
              📝 Assign Homework
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex flex-col items-center gap-1 p-3 text-sm">
              📊 Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-6 space-y-3">
            {loading ? (
              <div className="animate-pulse h-64 bg-gray-200 rounded-xl" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">Student</th>
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">Grade</th>
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">School</th>
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">Streak</th>
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">XP</th>
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">Level</th>
                      <th className="pb-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-sm font-medium">
                              {s.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{s.name}</p>
                              <p className="text-xs text-gray-500">{s.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-sm text-gray-600">{s.grade || '—'}</td>
                        <td className="py-3 text-sm text-gray-600">{s.school || '—'}</td>
                        <td className="py-3 text-sm text-gray-600">
                          <span className={`flex items-center gap-1 ${(s.streak || 0) > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                            {(s.streak || 0) > 0 ? '🔥' : '⚪'} {s.streak || 0} day
                          </span>
                        </td>
                        <td className="py-3 text-sm font-medium text-gray-900">{s.totalXp || 0}</td>
                        <td className="py-3 text-sm text-gray-600">{s.level || 1}</td>
                        <td className="py-3">
                          <Badge variant="default" className="text-xs capitalize">
                            active
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="homework" className="mt-6 space-y-4">
            <form onSubmit={handleAddHomework} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Assign New Homework</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="col-span-full sm:col-span-2">
                  <Input
                    placeholder="e.g. Quadratic Equations Practice"
                    value={newHomework.title}
                    onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Mathematics"
                    value={newHomework.subject}
                    onChange={(e) => setNewHomework({ ...newHomework, subject: e.target.value })}
                  />
                </div>
                <div>
                  <Input
                    placeholder="10"
                    type="text"
                    value={newHomework.grade}
                    onChange={(e) => setNewHomework({ ...newHomework, grade: e.target.value })}
                  />
                </div>
                <div>
                  <Input
                    type="date"
                    value={newHomework.dueDate}
                    onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                  />
                </div>
                <div className="col-span-full sm:col-span-2">
                  <Input
                    placeholder="Describe the homework task"
                    value={newHomework.description}
                    onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    value={newHomework.totalMarks}
                    onChange={(e) => setNewHomework({ ...newHomework, totalMarks: e.target.value })}
                  />
                </div>
                <div className="col-span-full sm:col-span-2">
                  <Input
                    placeholder="e.g. u_2"
                    value={newHomework.studentId}
                    onChange={(e) => setNewHomework({ ...newHomework, studentId: e.target.value })}
                  />
                </div>
                <div className="col-span-full">
                  <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
                    Assign Homework
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Recent Homework</h3>
              <div className="space-y-3">
                {homework.slice(0, 8).map((h) => (
                  <Card key={h.id} className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{h.title}</h4>
                      <p className="text-sm text-gray-500">{h.subject} • Grade {h.grade} • Due {h.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs text-rose-600 border-rose-200 bg-rose-50 capitalize">
                        {h.status}
                      </Badge>
                      <p className="text-xs text-gray-500">by {h.assignedBy}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="overview" className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <Card className="p-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">Top Performers</p>
              <div className="space-y-3">
                {[...students]
                  .sort((a, b) => (b.totalXp || 0) - (a.totalXp || 0))
                  .slice(0, 5)
                  .map((s, i) => (
                    <div key={s.id} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{s.name}</p>
                        <p className="text-xs text-gray-500">Grade {s.grade} • {s.totalXp || 0} XP</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{s.totalXp || 0}</span>
                    </div>
                  ))}
              </div>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">Streak Leaders</p>
              <div className="space-y-3">
                {[...students]
                  .sort((a, b) => (b.streak || 0) - (a.streak || 0))
                  .slice(0, 5)
                  .map((s, i) => (
                    <div key={s.id} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold">
                        🔥
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.streak || 0} day streak</p>
                      </div>
                      <span className="text-sm font-bold text-amber-600">{s.streak || 0}</span>
                    </div>
                  ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) {
  return (
    <Card className="p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white text-xl`}>
        {icon}
      </div>
    </Card>
  );
}


