import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const realmId = url.searchParams.get('realmId');
  const error = url.searchParams.get('error');

  if (error) {
    return new NextResponse('QuickBooks authorization denied', { status: 400 });
  }
  if (!code) {
    return new NextResponse('Missing code', { status: 400 });
  }

  // Exchange code for tokens (placeholder – you must implement secure server-side exchange)
  // Document the needed envs: QB_CLIENT_ID, QB_CLIENT_SECRET
  const accessToken = 'qb_access_token_placeholder';
  const refreshToken = 'qb_refresh_token_placeholder';

  // Persist to integration_connections for the current admin (owner). In a real
  // app you'd resolve the current user from a session or a signed state param.
  // For now, store on the special owner profile by email.
  const admin = createAdminClient();
  const { data: owner } = await admin
    .from('investor_profiles')
    .select('id')
    .eq('email', 'invest@papartners.co')
    .single();

  if (!owner) {
    return new NextResponse('Owner not found', { status: 404 });
  }

  await admin
    .from('integration_connections')
    .insert({
      investor_id: owner.id,
      provider: 'quickbooks',
      status: 'connected',
      access_token: accessToken,
      refresh_token: refreshToken,
      meta: { realmId },
    });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return NextResponse.redirect(`${siteUrl}/dashboard`);
}


