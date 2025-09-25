import Hero from "@/components/sections/Hero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import TeamList from "@/components/sections/TeamList";
import ContactForm from "@/components/sections/ContactForm";
import DataroomPrompt from "@/components/common/DataroomPrompt";

export default function Home() {
  return (
    <>
      <DataroomPrompt />
      <Hero />
      <ServicesOverview />
      <PortfolioGrid />
      <TeamList showHiring={true} />
      <ContactForm />
    </>
  );
}
