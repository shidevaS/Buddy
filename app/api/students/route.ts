import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const students = db.getStudents().map(({ id, name, email, school, grade, streak, totalXp, level, image, createdAt }) => ({
    id, name, email, school, grade, streak, totalXp, level, image, createdAt,
  }));
  return NextResponse.json({ students });
}
