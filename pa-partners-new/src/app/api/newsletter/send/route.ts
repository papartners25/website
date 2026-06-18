import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Check if user is admin
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("investor_profiles")
      .select("email")
      .eq("id", session.user.id)
      .single();

    if (!profile || profile.email !== "invest@papartners.co") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { subject, content } = await request.json();

    if (!subject || !content) {
      return NextResponse.json(
        { error: "Subject and content are required" },
        { status: 400 }
      );
    }

    // Get active subscribers
    const { data: subscribers, error: fetchError } = await supabase
      .from("newsletter_subscribers")
      .select("email, full_name")
      .eq("status", "active");

    if (fetchError) {
      console.error("Error fetching subscribers:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch subscribers" },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: "No active subscribers found" },
        { status: 400 }
      );
    }

    // Send emails via Resend
    const emailPromises = subscribers.map((subscriber) =>
      resend.emails.send({
        from: "PA Partners <invest@papartners.co>",
        to: subscriber.email,
        subject,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0;">
              <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <div style="background: linear-gradient(to bottom right, #1e293b, #0f172a); border: 1px solid rgba(148, 163, 184, 0.1); border-radius: 12px; padding: 32px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);">
                  <div style="text-align: center; margin-bottom: 24px;">
                    <h1 style="color: #f1f5f9; font-size: 24px; font-weight: 600; margin: 0;">PA Partners</h1>
                    <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Partner Update</p>
                  </div>
                  
                  <div style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
                    ${content.replace(/\n/g, "<br>")}
                  </div>
                  
                  <div style="margin-top: 32px; text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://papartners.co"}/" style="display: inline-block; background-color: #ffffff; color: #0f172a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 14px;">
                      Visit PA Partners
                    </a>
                  </div>
                  
                  <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(148, 163, 184, 0.1); text-align: center;">
                    <p style="color: #64748b; font-size: 12px; margin: 0;">
                      © ${new Date().getFullYear()} PA Partners. All rights reserved.
                    </p>
                    <p style="color: #64748b; font-size: 12px; margin-top: 8px;">
                      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://papartners.co"}/contact" style="color: #94a3b8; text-decoration: underline;">Contact PA Partners</a>
                    </p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      })
    );

    const results = await Promise.allSettled(emailPromises);
    const successCount = results.filter((r) => r.status === "fulfilled").length;
    const failureCount = results.filter((r) => r.status === "rejected").length;

    // Log the send to database
    const { error: logError } = await supabase.from("newsletter_sends").insert({
      subject,
      content,
      sent_by: session.user.id,
      recipient_count: successCount,
    });

    if (logError) {
      console.error("Error logging newsletter send:", logError);
    }

    return NextResponse.json({
      message: `Newsletter sent to ${successCount} subscriber(s)`,
      success: successCount,
      failed: failureCount,
    });
  } catch (error) {
    console.error("Newsletter send error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
