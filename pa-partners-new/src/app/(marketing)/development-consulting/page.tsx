import { Building2, Calculator, Landmark, Layers3, Route } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CTAButton from "@/components/common/CTAButton";
import CTABand from "@/components/common/CTABand";
import { consultingCapabilities } from "@/lib/offerings";

export const metadata = {
  title: "Development Consulting",
  description:
    "Development consulting for capital stack architecture, public and private fund consultation, underwriting, and development planning.",
};

const process = [
  "Define mandate, asset thesis, capital needs, and decision timeline.",
  "Build underwriting, sources and uses, sensitivity cases, and lender-ready materials.",
  "Shape the capital stack across debt, equity, incentives, reserves, and execution risk.",
  "Support partner conversations, diligence responses, and milestone planning.",
];

const icons = [Landmark, Layers3, Calculator, Route];

export default function DevelopmentConsultingPage() {
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-amber-300">
              Development Consulting
            </p>
            <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl">
              Capital planning for development work that has to survive the real world.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
              PA Partners helps clients translate complex development opportunities into financeable,
              underwritable plans. We support sponsors, operators, and family offices with fund consultation,
              capital stack architecture, underwriting, feasibility, and partner-facing materials.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/contact" variant="primary">
                Discuss a Mandate
              </CTAButton>
              <CTAButton href="/real-estate" variant="secondary">
                View Development Focus
              </CTAButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {consultingCapabilities.map((capability, index) => {
              const Icon = icons[index] ?? Building2;
              return (
                <article key={capability.title} className="surface rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-amber-300">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-white">{capability.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{capability.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">How We Work</p>
              <h2 className="mt-3 text-2xl font-medium text-white md:text-3xl">
                A practical path from concept to capital conversation.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                The work is intentionally concrete: assumptions, risks, materials, and next decisions. We do
                not bury clients in abstract strategy when the deal needs a clear model, a credible capital
                story, and a path to execution.
              </p>
            </div>
            <div className="grid gap-3">
              {process.map((step, index) => (
                <div key={step} className="surface rounded-xl p-5">
                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-300">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="Start a capital conversation"
        title="Bring us in before the capital stack hardens."
        description="The earlier we understand the plan, the more useful we can be in structuring leverage, partner economics, contingencies, and the story investors or lenders need to believe."
        primaryLabel="Contact PA Partners"
        primaryHref="/contact"
      />
    </>
  );
}
