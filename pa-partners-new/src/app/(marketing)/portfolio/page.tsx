import PortfolioGrid from "@/components/sections/PortfolioGrid";
import PortalPreview from "@/components/common/PortalPreview";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export const metadata = {
  title: "Portfolio",
  description: "Selected real estate projects and visuals.",
};

export default function PortfolioPage() {
  return (
    <>
      {/* Portal Preview Section */}
      <Section>
        <Container>
          <PortalPreview />
        </Container>
      </Section>

      <PortfolioGrid withHeader={false} />
    </>
  );
}



