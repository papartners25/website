import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Link from "next/link";
import { Lock, Mail, LogIn } from "lucide-react";

export const metadata = {
  title: "Real Estate Data Room",
  description: "Explore current opportunities with summaries and downloads.",
};

export default function DataroomPage() {
  // Temporary access control - remove when authentication is ready
  const DATAROOM_LOCKED = true;

  if (DATAROOM_LOCKED) {
    return (
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto py-12 md:py-20">
            <div className="surface rounded-2xl p-8 md:p-12 shadow-card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6">
                <Lock size={32} className="text-amber-400" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Data Room Access Required
              </h1>
              
              <p className="text-slate-300 leading-relaxed mb-8">
                Thank you for your interest in our investment opportunities. Our data room contains 
                confidential deal information and is accessible only to authorized investors and partners.
              </p>

              <div className="space-y-4 mb-8">
                <div className="surface rounded-xl p-5 text-left">
                  <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                    <LogIn size={18} className="text-amber-400" />
                    Current Investors
                  </h3>
                  <p className="text-sm text-slate-400">
                    If you&apos;re an existing investor, please use the investor login to access your portfolio 
                    and view available opportunities.
                  </p>
                </div>

                <div className="surface rounded-xl p-5 text-left">
                  <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                    <Mail size={18} className="text-amber-400" />
                    Prospective Partners
                  </h3>
                  <p className="text-sm text-slate-400">
                    If you&apos;re interested in learning more about our investment opportunities, we&apos;d be 
                    happy to connect. Please reach out and we&apos;ll provide you with the appropriate access.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-white text-slate-900 px-6 py-3 text-sm font-medium hover:bg-slate-100 transition-colors"
                >
                  <LogIn size={16} />
                  Investor Login
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Mail size={16} />
                  Request Access
                </Link>
              </div>

              <p className="mt-8 text-xs text-slate-500">
                Questions? Reach out to us at{" "}
                <a href="mailto:invest@papartners.co" className="text-slate-400 hover:text-white transition-colors">
                  invest@papartners.co
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // Original dataroom content (currently hidden)
  // Uncomment and set DATAROOM_LOCKED = false when authentication is ready
  /*
  return (
    <>
      <Section>
        <Container>
          <h1 className="text-2xl md:text-3xl font-medium text-white">Real Estate Data Room</h1>
          <p className="mt-2 text-slate-300 max-w-2xl">
            Browse select opportunities. Expand a card to preview the PDF summary and download the pro forma.
          </p>
          <div className="mt-8 grid gap-4">
            {DEALS.map((d) => (
              <DealCard key={d.id} deal={d} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <PortalPreview />
        </Container>
      </Section>
    </>
  );
  */
}


