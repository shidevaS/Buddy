import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const id = token.replace('mock_token_', '');
  const user = db.getUserById(id);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, image: user.image, school: user.school, grade: user.grade, streak: user.streak, totalXp: user.totalXp, level: user.level } });
}
