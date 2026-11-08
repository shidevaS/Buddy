import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ codingQuestions: db.getCodingQuestions() });
}

export async function GET_BY_ID(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const q = db.getCodingQuestionById(id || '');
  if (!q) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ codingQuestion: q });
}
