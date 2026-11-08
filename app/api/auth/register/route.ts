import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { name, email, password, role = 'student', school, grade } = await req.json();
    if (db.getUserByEmail(email)) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    const user = {
      id: `u_${Date.now()}`,
      name,
      email,
      role: role as 'student' | 'parent' | 'tutor' | 'admin',
      school,
      grade,
      streak: 0,
      totalXp: 0,
      level: 1,
      createdAt: new Date().toISOString(),
    };
    db.createUser(user as any);
    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: `mock_token_${user.id}`,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
