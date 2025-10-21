import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // TODO: validate body.apiKey/accountId and perform OAuth/secure storage
    return NextResponse.json({ ok: true, provider: 'quickbooks' });
  } catch (e) {
    return new NextResponse('Bad Request', { status: 400 });
  }
}


