import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// NEXT ACTION NOTE (for agent/owner):
// - Replace placeholder token exchange below with real POST to Intuit token endpoint:
//   POST https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer
//   headers: Authorization: Basic base64(client_id:client_secret), Content-Type: application/x-www-form-urlencoded
//   body: grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}
// - Securely store access_token, refresh_token, expires_in; compute token_expires_at
// - Consider encrypting tokens at rest or using a secrets manager
// - Ensure redirect URI matches Intuit app config: {NEXT_PUBLIC_SITE_URL}/api/integrations/quickbooks/callback

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


