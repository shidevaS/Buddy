import { NextResponse } from 'next/server';
import { db } from '@/lib/store';
import type { Homework } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId');
  const list = studentId ? db.getHomeworkByStudent(studentId) : db.getHomework();
  return NextResponse.json({ homework: list });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const homework: Homework = {
      id: `hw_${Date.now()}`,
      title: body.title,
      subject: body.subject,
      subjectId: body.subjectId,
      grade: body.grade,
      description: body.description,
      dueDate: body.dueDate,
      status: 'pending',
      assignedBy: body.assignedBy,
      studentId: body.studentId,
      totalMarks: body.totalMarks,
    };
    db.createHomework(homework);
    return NextResponse.json({ homework }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...patch } = await req.json();
    const updated = db.updateHomework(id, patch);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ homework: updated });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
