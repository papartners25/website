import { NextResponse } from 'next/server';

// Redirect user to QuickBooks OAuth authorize URL
export async function GET() {
  // Minimal placeholder: in a real app, build URL with client_id, scopes, redirect_uri, and state
  const clientId = process.env.QB_CLIENT_ID || '';
  const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/integrations/quickbooks/callback`);
  const scope = encodeURIComponent('com.intuit.quickbooks.accounting');
  const state = Math.random().toString(36).slice(2);

  const authorizeUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;

  return NextResponse.redirect(authorizeUrl);
}


