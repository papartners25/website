import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/server';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { userId, email, fullName, phone, companyName, notes } = await request.json();

    const supabase = createAdminClient();

    // Generate approval tokens
    const approveToken = crypto.randomBytes(32).toString('hex');
    const denyToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

    // Store tokens in database
    const { error: insertError } = await supabase.from('approval_tokens').insert([
      {
        investor_id: userId,
        token: approveToken,
        action: 'approve',
        expires_at: expiresAt.toISOString(),
      },
      {
        investor_id: userId,
        token: denyToken,
        action: 'deny',
        expires_at: expiresAt.toISOString(),
      },
    ]);

    if (insertError) {
      console.error('Failed to store approval tokens:', insertError);
      return NextResponse.json({ error: 'Could not create approval tokens' }, { status: 500 });
    }

    // Send approval request email to admin
    const approveUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://papartners.co'}/api/investor/approve?token=${approveToken}`;
    const denyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://papartners.co'}/api/investor/deny?token=${denyToken}`;

    await resend.emails.send({
      from: 'PA Partners <onboarding@papartners.co>',
      to: process.env.ADMIN_EMAIL || 'info@papartners.co',
      subject: `New Investor Access Request: ${fullName}`,
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
                      <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Investor Access Request</h1>
                        <p style="margin: 10px 0 0; color: #94a3b8; font-size: 14px;">PA Partners Investor Portal</p>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <p style="margin: 0 0 20px; color: #e2e8f0; font-size: 16px; line-height: 1.6;">
                          A new user has requested access to the investor portal:
                        </p>

                        <!-- Investor Details Card -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255, 255, 255, 0.03); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 24px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding: 8px 0;">
                                    <strong style="color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</strong>
                                    <p style="margin: 4px 0 0; color: #ffffff; font-size: 16px;">${fullName}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0;">
                                    <strong style="color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                                    <p style="margin: 4px 0 0; color: #ffffff; font-size: 16px;">${email}</p>
                                  </td>
                                </tr>
                                ${phone ? `
                                <tr>
                                  <td style="padding: 8px 0;">
                                    <strong style="color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</strong>
                                    <p style="margin: 4px 0 0; color: #ffffff; font-size: 16px;">${phone}</p>
                                  </td>
                                </tr>
                                ` : ''}
                                ${companyName ? `
                                <tr>
                                  <td style="padding: 8px 0;">
                                    <strong style="color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Company</strong>
                                    <p style="margin: 4px 0 0; color: #ffffff; font-size: 16px;">${companyName}</p>
                                  </td>
                                </tr>
                                ` : ''}
                                ${notes ? `
                                <tr>
                                  <td style="padding: 8px 0;">
                                    <strong style="color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Additional Information</strong>
                                    <p style="margin: 4px 0 0; color: #cbd5e1; font-size: 14px; line-height: 1.6;">${notes}</p>
                                  </td>
                                </tr>
                                ` : ''}
                              </table>
                            </td>
                          </tr>
                        </table>

                        <!-- Action Buttons -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                          <tr>
                            <td width="48%" style="padding-right: 2%;">
                              <a href="${approveUrl}" style="display: block; text-align: center; background-color: #22c55e; color: #ffffff; padding: 16px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                                ✓ Approve Access
                              </a>
                            </td>
                            <td width="48%" style="padding-left: 2%;">
                              <a href="${denyUrl}" style="display: block; text-align: center; background-color: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 16px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; border: 1px solid rgba(239, 68, 68, 0.3);">
                                ✕ Deny Access
                              </a>
                            </td>
                          </tr>
                        </table>

                        <p style="margin: 20px 0 0; color: #64748b; font-size: 13px; line-height: 1.6;">
                          These links expire in 7 days. Click approve to grant the user access to the investor portal, or deny to reject their application.
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                        <p style="margin: 0; color: #64748b; font-size: 13px;">
                          PA Partners | Value-add real estate and applied AI solutions
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending approval request:', error);
    return NextResponse.json(
      { error: 'Failed to send approval request' },
      { status: 500 }
    );
  }
}
