import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
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

    // Get count of active subscribers
    const { count, error } = await supabase
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    if (error) {
      console.error("Error counting subscribers:", error);
      return NextResponse.json(
        { error: "Failed to count subscribers" },
        { status: 500 }
      );
    }

    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error("Subscriber count error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

