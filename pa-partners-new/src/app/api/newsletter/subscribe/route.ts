import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, full_name } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json(
          { message: "You're already subscribed to our newsletter" },
          { status: 200 }
        );
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from("newsletter_subscribers")
          .update({
            status: "active",
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (updateError) {
          console.error("Error reactivating subscription:", updateError);
          return NextResponse.json(
            { error: "Failed to reactivate subscription" },
            { status: 500 }
          );
        }

        return NextResponse.json({
          message: "Welcome back! Your subscription has been reactivated.",
        });
      }
    }

    // Create new subscription
    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email: email.toLowerCase(),
        full_name: full_name || null,
        status: "active",
        source: "website",
      });

    if (insertError) {
      console.error("Error creating subscription:", insertError);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Successfully subscribed! You'll receive updates on new opportunities.",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

