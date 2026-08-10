import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

const items = [
  {
    title: "Multifamily Development",
    caption: "Internal development and repositioning work in cash-flowing residential assets.",
    src: "/portfolio/multifamily-repositioning.png",
  },
  {
    title: "Mixed-Use Planning",
    caption: "Feasibility, capital planning, and execution support for layered urban projects.",
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "FrunkVault",
    caption: "A direct-to-consumer e-commerce brand developed through our new business platform.",
    src: "/new-business/frunkvault-frunk.jpg",
  },
];

export default function PortfolioGrid({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <Section>
      <Container>
        {withHeader && (
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-medium text-white">Selected Work</h2>
            <Link href="/portfolio" className="text-white/90 hover:text-white">
              View all →
            </Link>
          </div>
        )}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <figure key={it.title} className="overflow-hidden rounded-xl surface">
              <div className="relative aspect-[16/10]">
                <Image src={it.src} alt={it.title} fill className="object-cover" />
              </div>
              <figcaption className="p-4">
                <p className="text-sm font-medium text-white">{it.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{it.caption}</p>
                {it.title === "FrunkVault" && (
                  <a
                    href="https://shop.frunkvault.com/?utm_source=pa_partners&utm_medium=referral&utm_campaign=frunkvault&utm_content=homepage_selected_work"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-xs font-medium text-amber-300 transition-colors hover:text-amber-200"
                  >
                    Explore FrunkVault ↗
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
