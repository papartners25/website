import PortfolioGrid from "@/components/sections/PortfolioGrid";

export const metadata = {
  title: "Portfolio",
  description: "Selected real estate projects and visuals.",
};

export default function PortfolioPage() {
  return <PortfolioGrid withHeader={false} />;
}


