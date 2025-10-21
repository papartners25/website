import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ ok: true, provider: 'docusign' });
  } catch (e) {
    return new NextResponse('Bad Request', { status: 400 });
  }
}


