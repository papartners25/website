import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Link from "next/link";
import { Lock, Mail, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Real Estate Data Room",
  description: "Explore current opportunities with summaries and downloads.",
};

export default async function DataroomPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Not logged in – show access required UI with login link
    return (
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto py-12 md:py-20">
            <div className="surface rounded-2xl p-8 md:p-12 shadow-card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6">
                <Lock size={32} className="text-amber-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">Data Room Access Required</h1>
              <p className="text-slate-300 leading-relaxed mb-8">
                Please sign in to access confidential deal information in the data room.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-white text-slate-900 px-6 py-3 text-sm font-medium hover:bg-slate-100 transition-colors">
                  <LogIn size={16} />
                  Investor Login
                </Link>
                <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors">
                  <Mail size={16} />
                  Request Access
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // Authenticated investor – simple placeholder content for now
  return (
    <Section>
      <Container>
        <div className="surface rounded-2xl p-8 md:p-10 shadow-card">
          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3">Data Room</h1>
          <p className="text-slate-300 mb-6">Welcome. Deal documents and pro formas will appear here.</p>
          <Link href="/opportunities" className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-5 py-2.5 text-sm font-medium hover:bg-slate-100">
            Browse Opportunities
          </Link>
        </div>
      </Container>
    </Section>
  );
}


