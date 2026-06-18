import Hero from "@/components/sections/Hero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import TeamList from "@/components/sections/TeamList";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <PortfolioGrid />
      <TeamList showHiring={true} />
      <ContactForm />
    </>
  );
}
