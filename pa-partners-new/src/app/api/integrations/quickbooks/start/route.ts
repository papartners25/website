import { NextResponse } from 'next/server';

// Redirect user to QuickBooks OAuth authorize URL
export async function GET() {
  // NEXT ACTION NOTE (for agent/owner):
  // 1) In Intuit Developer portal, add redirect URI -> {NEXT_PUBLIC_SITE_URL}/api/integrations/quickbooks/callback
  // 2) Set envs: QB_CLIENT_ID, QB_CLIENT_SECRET, NEXT_PUBLIC_SITE_URL
  // 3) Implement real token exchange in callback route.
  // If QB_CLIENT_ID is not configured, short-circuit with a helpful message.
  const clientId = process.env.QB_CLIENT_ID || '';
  const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/integrations/quickbooks/callback`);
  const scope = encodeURIComponent('com.intuit.quickbooks.accounting');
  const state = Math.random().toString(36).slice(2);

  if (!clientId) {
    return new NextResponse('QuickBooks not configured: set QB_CLIENT_ID/QB_CLIENT_SECRET and redirect URI in Intuit portal.', { status: 500 });
  }

  const authorizeUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;

  return NextResponse.redirect(authorizeUrl);
}


