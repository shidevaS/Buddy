import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const grade = searchParams.get('grade');
  const list = grade ? db.getSubjectsByGrade(grade) : db.getSubjects();
  return NextResponse.json({ subjects: list });
}
