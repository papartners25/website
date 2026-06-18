import Image from "next/image";
import { ArrowUpRight, PackageCheck, Store, Wrench } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CTAButton from "@/components/common/CTAButton";
import CTABand from "@/components/common/CTABand";
import { newBusinessVentures } from "@/lib/offerings";

export const metadata = {
  title: "New Business Opportunities",
  description:
    "PA Partners forms and supports new operating companies, including FrunkVault, a direct-to-consumer e-commerce brand.",
};

const platformPrinciples = [
  {
    title: "Operator-Led Formation",
    description:
      "We favor businesses with tangible customer demand, clear margins, and a path from prototype to repeatable operations.",
    icon: Wrench,
  },
  {
    title: "Commercial Discipline",
    description:
      "Every venture gets the same underwriting mindset we bring to real estate: unit economics, capital needs, risk, and execution cadence.",
    icon: Store,
  },
  {
    title: "Brand & Fulfillment Readiness",
    description:
      "We support the practical pieces that decide whether a launch works: positioning, supplier coordination, checkout, fulfillment, and support.",
    icon: PackageCheck,
  },
];

export default function NewBusinessPage() {
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-amber-300">
                New Business Opportunities
              </p>
              <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl">
                Company formation beside the development platform.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
                PA Partners uses this space for new operating-company opportunities, venture incubation,
                and brands we are actively building or supporting.
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="/new-business/frunkvault-frunk.jpg"
                  alt="FrunkVault glass-fiber reinforced frunk protection installed in a Tesla front trunk"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-amber-200 backdrop-blur-sm">
                  Current venture
                </span>
              </div>
              <div className="relative p-6">
                <h2 className="text-2xl font-medium text-white">FrunkVault</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  A recently launched direct-to-consumer e-commerce brand building glass-fiber reinforced
                  frunk protection products for Tesla owners.
                </p>
                <div className="mt-5">
                  <CTAButton href="https://frunkvault.com" variant="primary" external>
                    Visit FrunkVault
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {platformPrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <article key={principle.title} className="surface rounded-xl p-6">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-amber-300 w-fit">
                    <Icon size={22} />
                  </div>
                  <h2 className="mt-5 text-lg font-medium text-white">{principle.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{principle.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-4">
            {newBusinessVentures.map((venture) => (
              <a
                key={venture.title}
                href={venture.href}
                target="_blank"
                rel="noopener noreferrer"
                className="surface group rounded-xl p-6 transition-colors hover:bg-white/[0.08]"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{venture.eyebrow}</p>
                    <h2 className="mt-2 text-2xl font-medium text-white">{venture.title}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">{venture.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                    Open site
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="Have an operating-company opportunity?"
        title="When product, distribution, and capital have to move together."
        description="We are selective, but we will review ventures where commercial discipline and capital planning need to advance side by side."
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
      />
    </>
  );
}
