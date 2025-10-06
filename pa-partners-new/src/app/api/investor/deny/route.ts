import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new NextResponse('Invalid token', { status: 400 });
    }

    const supabase = await createClient();

    // Verify token
    const { data: tokenData, error: tokenError } = await supabase
      .from('approval_tokens')
      .select('*')
      .eq('token', token)
      .eq('action', 'deny')
      .eq('used', false)
      .single();

    if (tokenError || !tokenData) {
      return new NextResponse(
        '<html><body style="font-family: sans-serif; text-align: center; padding: 50px;"><h1>Invalid or expired token</h1><p>This denial link is invalid or has already been used.</p></body></html>',
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Check if token expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return new NextResponse(
        '<html><body style="font-family: sans-serif; text-align: center; padding: 50px;"><h1>Token expired</h1><p>This denial link has expired.</p></body></html>',
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Get investor profile
    const { data: profile } = await supabase
      .from('investor_profiles')
      .select('*')
      .eq('id', tokenData.investor_id)
      .single();

    if (!profile) {
      return new NextResponse('Investor profile not found', { status: 404 });
    }

    // Update investor profile to denied
    await supabase
      .from('investor_profiles')
      .update({
        approval_status: 'denied',
        denied_reason: 'Application does not meet current criteria',
      })
      .eq('id', tokenData.investor_id);

    // Mark token as used
    await supabase
      .from('approval_tokens')
      .update({
        used: true,
        used_at: new Date().toISOString(),
      })
      .eq('token', token);

    // Send notification email to investor
    await resend.emails.send({
      from: 'PA Partners <onboarding@papartners.co>',
      to: profile.email,
      subject: 'Update on Your PA Partners Application',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Application Update</h1>
                        <p style="margin: 10px 0 0; color: #94a3b8; font-size: 14px;">PA Partners</p>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 0 40px 40px;">
                        <p style="margin: 0 0 24px; color: #e2e8f0; font-size: 16px; line-height: 1.6;">
                          Hello ${profile.full_name},
                        </p>

                        <p style="margin: 0 0 24px; color: #e2e8f0; font-size: 16px; line-height: 1.6;">
                          Thank you for your interest in PA Partners. After careful review, we're unable to approve your investor portal access at this time.
                        </p>

                        <p style="margin: 0 0 24px; color: #e2e8f0; font-size: 16px; line-height: 1.6;">
                          This decision is based on our current investment criteria and capacity. However, we appreciate your interest and encourage you to stay in touch as our opportunities evolve.
                        </p>

                        <!-- Contact Section -->
                        <div style="background-color: rgba(255, 255, 255, 0.03); border-left: 3px solid #64748b; border-radius: 8px; padding: 20px; margin: 30px 0;">
                          <h3 style="margin: 0 0 12px; color: #ffffff; font-size: 16px; font-weight: 600;">Have Questions?</h3>
                          <p style="margin: 0; color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                            If you'd like to discuss this decision or learn more about future opportunities, please don't hesitate to reach out to our team.
                          </p>
                        </div>

                        <p style="margin: 24px 0 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                          Contact us: 
                          <a href="mailto:info@papartners.co" style="color: #fbbf24; text-decoration: none;">info@papartners.co</a>
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                        <p style="margin: 0 0 8px; color: #64748b; font-size: 13px;">
                          PA Partners
                        </p>
                        <p style="margin: 0; color: #64748b; font-size: 12px;">
                          Value-add real estate and applied AI solutions
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    // Return success page
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Denied</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: #1e293b;
              border-radius: 16px;
              padding: 48px;
              max-width: 500px;
              text-align: center;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
            }
            .icon {
              width: 80px;
              height: 80px;
              background: rgba(239, 68, 68, 0.1);
              border: 2px solid rgba(239, 68, 68, 0.3);
              border-radius: 50%;
              margin: 0 auto 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 40px;
              color: #ef4444;
            }
            h1 {
              color: #ffffff;
              font-size: 28px;
              margin: 0 0 12px;
              font-weight: 600;
            }
            p {
              color: #94a3b8;
              font-size: 16px;
              line-height: 1.6;
              margin: 0;
            }
            .details {
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 12px;
              padding: 20px;
              margin: 24px 0;
              text-align: left;
            }
            .details p {
              color: #cbd5e1;
              font-size: 14px;
              margin: 8px 0;
            }
            .details strong {
              color: #ffffff;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">✕</div>
            <h1>Application Denied</h1>
            <p>You've denied access for ${profile.full_name}.</p>
            <div class="details">
              <p><strong>Investor:</strong> ${profile.full_name}</p>
              <p><strong>Email:</strong> ${profile.email}</p>
              <p><strong>Status:</strong> Denied</p>
            </div>
            <p>A notification email has been sent to the applicant.</p>
          </div>
        </body>
      </html>
      `,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('Error denying investor:', error);
    return new NextResponse(
      '<html><body style="font-family: sans-serif; text-align: center; padding: 50px;"><h1>Error</h1><p>An error occurred while processing the denial.</p></body></html>',
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
