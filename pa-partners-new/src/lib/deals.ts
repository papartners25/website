export type Deal = {
  id: string;
  name: string;
  location: string;
  summary: string;
  metrics: { irr?: string; equityMultiple?: string; hold?: string };
  omUrl?: string;
  pdfUrl: string;
  excelUrl: string;
};

export const DEALS: Deal[] = [
  {
    id: "broadway-court",
    name: "Broadway Court",
    location: "Columbus, OH",
    summary:
      "This 30-unit value-add investment sits along Columbus's multi-billion-dollar LinkUS mobility corridor, offering immediate upside potential.",
    metrics: { irr: "20%+", equityMultiple: "3.59x", hold: "2-5 yrs" },
    omUrl: "/deals/broadway-court-om.pdf",
    pdfUrl: "/deals/broadway-court-summary.pdf",
    excelUrl: "/deals/broadway-court-pro-forma.xlsx",
  },
  {
    id: "south-of-mound",
    name: "South of Mound",
    location: "Columbus, OH",
    summary:
      "16-unit value-add multifamily two-building property in Columbus's South of Main neighborhood focused on interior renovations and operational efficiencies.",
    metrics: { irr: "20%+", equityMultiple: "2.87x", hold: "2-5 yrs" },
    pdfUrl: "/deals/south-of-mound-summary.pdf",
    excelUrl: "/deals/south-of-mound-pro-forma.xlsx",
  },
];


