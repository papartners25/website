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
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className={`object-cover ${m.imageClassName ? m.imageClassName : ""}`}
                />
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
                <Image src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1600&auto=format&fit=crop" alt="Administrative Assistant opportunity" fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-white font-medium">Future Opportunity</h3>
                <p className="text-slate-300 text-sm mt-1">Administrative Assistant</p>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  We’re selectively exploring an administrative assistant role as the
                  business grows. If you’re interested in supporting a small, hands-on
                  real estate team, we welcome a brief introduction and will connect as
                  needs align.
                </p>
              </div>
            </article>
          )}
        </div>
      </Container>
    </Section>
  );
}

