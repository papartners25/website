import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

const items = [
  {
    title: "Value-Add Multifamily",
    src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Urban Infill",
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Agentic AI",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function PortfolioGrid({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <Section>
      <Container>
        {withHeader && (
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-medium text-white">Selected Portfolio</h2>
            <Link href="/portfolio" className="text-white/90 hover:text-white">View all →</Link>
          </div>
        )}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <figure key={it.title} className="overflow-hidden rounded-xl surface">
              <div className="relative aspect-[16/10]">
                <Image src={it.src} alt={it.title} fill className="object-cover" />
              </div>
              <figcaption className="p-3 text-sm text-slate-300">{it.title}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}


