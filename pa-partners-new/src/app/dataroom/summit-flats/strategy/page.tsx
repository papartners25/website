import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import StrategySplit from "@/components/dataroom/StrategySplit";
import { DEALS } from "@/lib/deals";

export const metadata = {
  title: "Summit Flats – Tax Strategy",
  description: "Strategic tax planning and value-add exit analysis with document previews and downloads.",
};

export default async function SummitFlatsStrategyPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto py-12 md:py-20">
            <div className="surface rounded-2xl p-8 md:p-12 shadow-card text-center">
              <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">Investor Login Required</h1>
              <p className="text-slate-300 leading-relaxed mb-6">Log in to access Summit Flats strategy materials.</p>
              <Link href="/login?next=/dataroom/summit-flats/strategy" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-slate-900 px-6 py-3 text-sm font-medium hover:bg-slate-100 transition-colors">
                Login to Continue
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  const deal = DEALS.find((d) => d.id === "summit-flats");
  const subject = encodeURIComponent(`${deal?.name ? deal.name.split(" (")[0] : "Deal"} Inquiry`);
  const mailtoHref = `mailto:investors@papartners.co?subject=${subject}`;

  return (
    <Section>
      <Container>
        <div className="surface rounded-xl p-6 md:p-7 shadow-card mb-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dataroom" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-3">
                <ArrowLeft size={16} />
                Back to Opportunities
              </Link>
              <h1 className="text-2xl font-semibold text-white">Summit Flats – Tax Strategy</h1>
              <p className="text-sm text-slate-400 mt-1">Interactive analysis plus all deal downloads in one place</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors"
              >
                <Mail size={16} />
                <span className="hidden sm:inline">Investor Relations</span>
              </a>
            </div>
          </div>
        </div>

        <StrategySplit deal={deal} />
      </Container>
    </Section>
  );
}


