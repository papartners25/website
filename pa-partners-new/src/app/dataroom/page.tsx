import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { DEALS } from "@/lib/deals";
import DealCard from "@/components/dataroom/DealCard";

export const metadata = {
  title: "Real Estate Data Room",
  description: "Explore current opportunities with summaries and downloads.",
};

export default function DataroomPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-2xl md:text-3xl font-medium text-white">Real Estate Data Room</h1>
        <p className="mt-2 text-slate-300 max-w-2xl">
          Browse select opportunities. Expand a card to preview the PDF summary and download the pro forma.
        </p>
        <p className="mt-1 text-slate-400 text-sm">Admin: edit deals in <code className="font-mono">src/lib/deals.ts</code>. Upload files to <code className="font-mono">public/deals/</code>.</p>
        <div className="mt-8 grid gap-4">
          {DEALS.map((d) => (
            <DealCard key={d.id} deal={d} />
          ))}
        </div>
      </Container>
    </Section>
  );
}


