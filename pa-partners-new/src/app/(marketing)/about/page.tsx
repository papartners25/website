export const metadata = {
  title: "About",
  description:
    "PA Partners is a boutique private equity firm focused on value‑add real estate and AI agent solutions.",
};

import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Section className="pt-8 md:pt-14">
        <Container className="text-center">
          <div className="flex flex-col items-center gap-4">
            <Image src="/logo/pa-partners-logo.png" alt="PA Partners" width={720} height={180} className="h-28 md:h-36 w-auto opacity-90" />
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white">Purpose‑Built Investing</h1>
          </div>
          <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-slate-300">
            We allocate private capital into durable, cash‑flowing real estate and build applied AI agent
            solutions that automate standard business workflows. Our edge is discipline: conservative
            underwriting, operational value creation, and a bias toward measurable outcomes.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="surface rounded-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-medium text-white">Real Estate Strategy</h2>
              <ul className="mt-4 space-y-3 text-slate-300 text-sm leading-relaxed">
                <li>• Target value‑add assets with in‑place cash flow and clear improvement levers.</li>
                <li>• Emphasize interior renovations, expense discipline, and operating efficiencies.</li>
                <li>• Focus on downside protection: prudent leverage and stress‑tested underwriting.</li>
                <li>• Align incentives with investors through transparent reporting and stewardship.</li>
              </ul>
            </div>
            <div className="surface rounded-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-medium text-white">AI Agent Solutions</h2>
              <ul className="mt-4 space-y-3 text-slate-300 text-sm leading-relaxed">
                <li>• Build agentic tools that eliminate repetitive work in standard business processes.</li>
                <li>• Ship pragmatically: human‑in‑the‑loop, measurable ROI, security by default.</li>
                <li>• Monetize via clear value capture: time saved, error reduction, and throughput.</li>
                <li>• Leverage real‑world ops experience to design useful, reliable agents.</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="surface rounded-xl p-5">
              <h3 className="text-white font-medium">Disciplined Underwriting</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Every investment begins with conservative assumptions, real operating plans, and multiple
                ways to win without heroics.
              </p>
            </div>
            <div className="surface rounded-xl p-5">
              <h3 className="text-white font-medium">Operational Value Creation</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                We prioritize levers we control: renovations, pricing, expense discipline, and data‑driven
                decision making.
              </p>
            </div>
            <div className="surface rounded-xl p-5">
              <h3 className="text-white font-medium">Alignment & Stewardship</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Clear communication, transparent reporting, and partnership‑minded governance for long‑term
                relationships.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-2xl md:text-3xl font-medium text-white text-center">AI Agent Portfolio</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <a
              href="https://betterlink.help"
              target="_blank"
              rel="noopener noreferrer"
              className="surface rounded-xl p-6 md:p-8 block hover:bg-white/5 transition-colors"
            >
              <h3 className="text-white font-medium">Betterlink.help</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Agentic support workflows that connect customers to the right answers faster—reducing
                ticket volume and improving CSAT.
              </p>
            </a>
            <a
              href="https://stewietrader.com"
              target="_blank"
              rel="noopener noreferrer"
              className="surface rounded-xl p-6 md:p-8 block hover:bg-white/5 transition-colors"
            >
              <h3 className="text-white font-medium">StewieTrader.com</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Research and execution agents designed to streamline market workflows and enhance
                decision quality.
              </p>
            </a>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="surface rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-medium">Partner with PA Partners</h3>
              <p className="text-slate-300 text-sm mt-1">Explore our active opportunities and learn how we operate.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dataroom" className="inline-flex items-center rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-medium hover:bg-slate-100">
                View Dataroom
              </Link>
              <Link href="/contact" className="inline-flex items-center rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-200 hover:text-white hover:bg-white/5">
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
