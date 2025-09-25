import Image from "next/image";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

const team = [
  {
    name: "Evan Spencer",
    title: "Managing Partner",
    image:
      "/team/evan-spencer.jpg",
    imageClassName: "object-[center_20%]",
    bio:
      "Evan Spencer boasts a decade of seasoned expertise within the domains of private equity and real estate investments. A dynamic professional known for his strategic acumen, Evan thrives on cultivating synergistic partnerships with driven entrepreneurs and visionary real estate leaders. His unwavering commitment lies in facilitating the realization of their aspirations and objectives.",
  },
];

export default function TeamList({ showHiring = true }: { showHiring?: boolean }) {
  return (
    <Section>
      <Container>
        <h2 className="text-2xl md:text-3xl font-medium text-white text-center">
          Our Team
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {team.map((m) => (
            <article
              key={m.name}
              className="rounded-xl surface overflow-hidden"
            >
              <div className="relative aspect-[16/10]">
                <Image src={m.image} alt={m.name} fill className={`object-cover ${
                  // Allow per-member object positioning for better cropping
                  (m as any).imageClassName ? (m as any).imageClassName : ""
                }`} />
              </div>
              <div className="p-5">
                <h3 className="text-white font-medium">{m.name}</h3>
                <p className="text-slate-300 text-sm">{m.title}</p>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">{m.bio}</p>
              </div>
            </article>
          ))}
          {showHiring && (
            <article className="rounded-xl surface overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1600&auto=format&fit=crop" alt="Currently Hiring" fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-white font-medium">Currently Hiring</h3>
                <p className="text-slate-300 text-sm mt-1">Administrative Associate</p>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  We’re looking for a focused professional whose key responsibility is to
                  co-manage daily tasks within the company’s commercial real estate
                  portfolio, and other related assignments. This role combines project
                  management, critical thinking, and problem solving skill sets to help
                  bring our projects to market.
                </p>
              </div>
            </article>
          )}
        </div>
      </Container>
    </Section>
  );
}


