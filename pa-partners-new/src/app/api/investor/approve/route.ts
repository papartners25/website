import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient, createAdminClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new NextResponse('Invalid token', { status: 400 });
    }

    const supabase = await createClient();

    // Verify token without consuming it
    const { data: tokenData, error: tokenError } = await supabase
      .from('approval_tokens')
      .select('*')
      .eq('token', token)
      .eq('action', 'approve')
      .eq('used', false)
      .single();

    if (tokenError || !tokenData) {
      return new NextResponse(
        '<html><body style="font-family: sans-serif; text-align: center; padding: 50px;"><h1>Invalid or expired token</h1><p>This approval link is invalid or has already been used.</p></body></html>',
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    if (new Date(tokenData.expires_at) < new Date()) {
      return new NextResponse(
        '<html><body style="font-family: sans-serif; text-align: center; padding: 50px;"><h1>Token expired</h1><p>This approval link has expired.</p></body></html>',
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Fetch profile for display
    const { data: profile } = await supabase
      .from('investor_profiles')
      .select('*')
      .eq('id', tokenData.investor_id)
      .single();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://papartners.co';

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Confirm Approval</title>
          <style>
            body { margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); min-height: 100vh; display:flex; align-items:center; justify-content:center; }
            .card { background:#1e293b; border-radius:16px; padding:40px; width:100%; max-width:520px; box-shadow:0 20px 25px -5px rgba(0,0,0,.3); color:#e2e8f0; }
            h1 { margin:0 0 8px; color:#fff; font-size:24px; font-weight:600; }
            p { margin:0 0 16px; color:#94a3b8; }
            .details { background: rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.1); border-radius:12px; padding:16px; margin:16px 0; }
            .actions { display:flex; gap:12px; margin-top:12px; }
            button { appearance:none; border:0; border-radius:8px; padding:14px 20px; font-weight:600; cursor:pointer; }
            .approve { background:#22c55e; color:#fff; }
            .cancel { background:rgba(148,163,184,.15); color:#cbd5e1; }
            form { margin:0; }
            a { color:#fbbf24; text-decoration:none; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Approve Investor?</h1>
            <p>You're about to approve access for <strong>${profile?.full_name ?? ''}</strong> (${profile?.email ?? ''}).</p>
            <div class="details">
              <p>This action will notify the investor and grant them portal access.</p>
            </div>
            <div class="actions">
              <form method="POST" action="${siteUrl}/api/investor/approve">
                <input type="hidden" name="token" value="${token}" />
                <button class="approve" type="submit">Approve Access</button>
              </form>
              <a class="cancel" href="${siteUrl}"><button class="cancel" type="button">Cancel</button></a>
            </div>
          </div>
        </body>
      </html>`,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('Error rendering approval confirmation:', error);
    return new NextResponse('Server error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token = String(formData.get('token') || '');

    if (!token) {
      return new NextResponse('Invalid token', { status: 400 });
    }

    const supabase = await createClient();

    // Verify token again and consume it
    const { data: tokenData } = await supabase
      .from('approval_tokens')
      .select('*')
      .eq('token', token)
      .eq('action', 'approve')
      .eq('used', false)
      .single();

    if (!tokenData || new Date(tokenData.expires_at) < new Date()) {
      return new NextResponse(
        '<html><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>Invalid or expired token</h1></body></html>',
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Approve investor
    const { data: profile } = await supabase
      .from('investor_profiles')
      .update({ approval_status: 'approved', approved_at: new Date().toISOString() })
      .eq('id', tokenData.investor_id)
      .select('*')
      .single();

    // Mark token as used
    await supabase
      .from('approval_tokens')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('token', token);

    // Confirm email so they can log in immediately
    try {
      const admin = createAdminClient();
      await admin.auth.admin.updateUserById(tokenData.investor_id, { email_confirm: true });
    } catch (e) {
      console.error('Failed to confirm investor email via admin API:', e);
    }

    // Send confirmation email
    await resend.emails.send({
      from: 'PA Partners <onboarding@papartners.co>',
      to: profile.email,
      subject: 'Welcome to PA Partners Investor Portal',
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#0f172a;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;padding:40px 20px;"><tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#1e293b;border-radius:16px;overflow:hidden;box-shadow:0 20px 25px -5px rgba(0,0,0,.3);">
      <tr><td style="padding:40px 40px 30px;text-align:center;"><div style="display:inline-block;background:linear-gradient(135deg,rgba(251,191,36,.1) 0%,rgba(251,191,36,.05) 100%);border:2px solid rgba(251,191,36,.2);border-radius:50%;width:80px;height:80px;margin-bottom:24px;"><div style="display:flex;align-items:center;justify-content:center;height:100%;"><span style="font-size:40px;">✓</span></div></div><h1 style="margin:0;color:#fff;font-size:28px;font-weight:600;">Access Approved!</h1><p style="margin:10px 0 0;color:#94a3b8;font-size:14px;">Welcome to PA Partners</p></td></tr>
      <tr><td style="padding:0 40px 40px;"><p style="margin:0 0 24px;color:#e2e8f0;font-size:16px;line-height:1.6;">Hello ${profile.full_name},</p><p style="margin:0 0 24px;color:#e2e8f0;font-size:16px;line-height:1.6;">Your investor portal access has been approved. You can now log in.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:30px 0;"><tr><td align="center"><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://papartners.co'}/login" style="display:inline-block;background-color:#fbbf24;color:#18181b;padding:16px 40px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">Log In to Portal</a></td></tr></table>
      <p style="margin:24px 0 0;color:#94a3b8;font-size:14px;line-height:1.6;">Need help? Email <a href="mailto:info@papartners.co" style="color:#fbbf24;text-decoration:none;">info@papartners.co</a></p></td></tr>
      <tr><td style="padding:30px;text-align:center;border-top:1px solid rgba(255,255,255,.1);"><p style="margin:0 0 8px;color:#64748b;font-size:13px;">PA Partners</p><p style="margin:0;color:#64748b;font-size:12px;">Value-add real estate and applied AI solutions</p></td></tr>
      </table></td></tr></table></body></html>`,
    });

    // Success page
    return new NextResponse(
      '<html><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>Investor Approved</h1><p>A confirmation email has been sent to the investor.</p></body></html>',
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('Error finalizing approval:', error);
    return new NextResponse('Server error', { status: 500 });
  }
}
