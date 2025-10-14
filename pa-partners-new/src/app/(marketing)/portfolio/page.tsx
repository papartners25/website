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
      {/* Intro blurb: portfolio spans real estate and software */}
      <Section>
        <Container>
          <div className="surface rounded-xl p-6 md:p-8 shadow-card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-medium text-white">Our Portfolio</h1>
                <p className="text-slate-300 mt-2 text-sm md:text-base">
                  We invest across real estate and software. Current software ventures include
                  <a className="underline hover:text-white ml-1" href="https://betterlink.help" target="_blank" rel="noopener noreferrer">Betterlink.help</a>{" "}and
                  <a className="underline hover:text-white ml-1" href="https://stewietrader.com" target="_blank" rel="noopener noreferrer">StewieTrader.com</a>.
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
            <p className="text-center text-slate-400 text-sm mt-4">
              For detailed holdings, distributions, and tax docs, use the investor login.{' '}
              <a href="/login" className="underline hover:text-white">Access Portal →</a>
            </p>
          </div>
        </Container>
      </Section>

      <PortfolioGrid withHeader={false} />
    </>
  );
}



