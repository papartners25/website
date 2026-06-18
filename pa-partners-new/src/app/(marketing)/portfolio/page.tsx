import PortfolioGrid from "@/components/sections/PortfolioGrid";
import PortalPreview from "@/components/common/PortalPreview";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export const metadata = {
  title: "Portfolio",
  description: "Selected PA Partners work across consulting, internal development, and new business formation.",
};

export default function PortfolioPage() {
  return (
    <>
      <Section>
        <Container>
          <div className="surface rounded-xl p-6 md:p-8 shadow-card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-medium text-white">Selected Work</h1>
                <p className="text-slate-300 mt-2 text-sm md:text-base">
                  Our work spans development consulting, internal multifamily and mixed-use planning, and
                  new business formation. Current venture activity includes{" "}
                  <a className="underline hover:text-white" href="https://frunkvault.com" target="_blank" rel="noopener noreferrer">
                    FrunkVault
                  </a>
                  , a direct-to-consumer e-commerce brand.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Portal Preview Section */}
      <Section>
        <Container>
          <div className="max-w-5xl mx-auto">
            <PortalPreview />
          </div>
        </Container>
      </Section>

      <PortfolioGrid withHeader={false} />
    </>
  );
}


