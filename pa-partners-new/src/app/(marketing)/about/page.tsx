import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export const metadata = {
  title: "About",
  description:
    "PA Partners provides development consulting, capital stack architecture, underwriting support, and internal multifamily and mixed-use development.",
};

const principles = [
  {
    title: "Capital Discipline",
    description:
      "We organize opportunities around sources and uses, downside cases, leverage constraints, reserves, and partner economics.",
  },
  {
    title: "Operator Practicality",
    description:
      "Our work is designed for the people who have to close, build, operate, report, and make decisions under pressure.",
  },
  {
    title: "Aligned Execution",
    description:
      "We prefer clear mandates, transparent assumptions, and communication that helps teams move with conviction.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-8 md:pt-14">
        <Container className="text-center">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/logo/pa-partners-logo.png"
              alt="PA Partners"
              width={720}
              height={180}
              className="h-28 w-auto opacity-90 md:h-36"
            />
            <h1 className="text-3xl font-medium tracking-tight text-white md:text-5xl">
              Capital Strategy for Builders
            </h1>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-300 md:text-lg">
            PA Partners is a boutique development consulting and investment platform. We help clients
            structure capital, evaluate projects, and prepare for public and private fund conversations while
            continuing to pursue internal multifamily, mixed-use, and new business opportunities.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="surface rounded-xl p-6">
                <h2 className="text-lg font-medium text-white">{principle.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{principle.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="surface rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-medium text-white md:text-2xl">Development Consulting</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
                <li>• Public and private fund consultation.</li>
                <li>• Capital stack architecture across debt, equity, incentives, and reserves.</li>
                <li>• Underwriting, sensitivity analysis, feasibility, and decision memos.</li>
                <li>• Development planning from concept through capital conversations.</li>
              </ul>
            </div>
            <div className="surface rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-medium text-white md:text-2xl">Principal Activity</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
                <li>• Internal multifamily and mixed-use development evaluation.</li>
                <li>• Site-level feasibility and partner coordination.</li>
                <li>• New operating-company formation through our business opportunities platform.</li>
                <li>• Current venture activity includes FrunkVault, a direct-to-consumer e-commerce brand.</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="surface rounded-xl p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-medium text-white">Partner with PA Partners</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Bring us into a capital stack, underwriting question, development plan, or new business
                  opportunity.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/development-consulting"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-100"
                >
                  Consulting Services
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5 hover:text-white"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
