import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = db.getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role, image: user.image },
      token: `mock_token_${user.id}`,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
