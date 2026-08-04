import { Building2, CheckCircle2, Landmark, MapPinned } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CTAButton from "@/components/common/CTAButton";
import { internalDevelopmentFocus } from "@/lib/offerings";

const developmentPrinciples = [
  {
    title: "Underwrite Before We Chase",
    description:
      "We begin with conservative assumptions, sensitivity cases, capital requirements, and a clear view of what must be true for a project to work.",
  },
  {
    title: "Design for Capital Reality",
    description:
      "Development concepts are shaped alongside debt, equity, incentives, reserves, and execution constraints rather than after the fact.",
  },
  {
    title: "Operate With Local Context",
    description:
      "We prioritize markets where demand, policy, site constraints, and partner capacity can be understood deeply enough to make decisions.",
  },
];

export default function RealEstateContent() {
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-amber-300">
              Internal Development
            </p>
            <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl">
              Multifamily and mixed-use work with a capital-first lens.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
              PA Partners continues to pursue internal development opportunities in multifamily and
              mixed-use real estate. Our work starts with underwriting discipline, then moves through site
              strategy, capital planning, partner coordination, and execution readiness.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/contact" variant="primary">
                Discuss a Site
              </CTAButton>
              <CTAButton href="/development-consulting" variant="secondary">
                Development Consulting
              </CTAButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-4">
            {internalDevelopmentFocus.map((focus) => (
              <div key={focus} className="surface rounded-xl p-5">
                <CheckCircle2 size={20} className="text-amber-300" />
                <p className="mt-4 text-sm font-medium text-white">{focus}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="surface rounded-xl p-6 md:p-8">
              <MapPinned className="text-amber-300" size={28} />
              <h2 className="mt-5 text-2xl font-medium text-white">Where We Focus</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                We look for projects where housing demand, location fundamentals, financing structure, and
                execution path can be aligned before capital is put at risk. That can include value-add
                residential work, ground-up multifamily, and mixed-use opportunities that benefit from
                thoughtful capital planning.
              </p>
            </div>
            <div className="grid gap-4">
              {developmentPrinciples.map((principle) => (
                <article key={principle.title} className="surface rounded-xl p-5">
                  <div className="flex gap-4">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-amber-300">
                      {principle.title.includes("Capital") ? <Landmark size={20} /> : <Building2 size={20} />}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{principle.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{principle.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
