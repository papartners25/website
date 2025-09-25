export type Deal = {
  id: string;
  name: string;
  location: string;
  summary: string;
  metrics: { irr?: string; equityMultiple?: string; hold?: string };
  pdfUrl: string;
  excelUrl: string;
};

export const DEALS: Deal[] = [
  {
    id: "south-of-mound",
    name: "South of Mound",
    location: "Columbus, OH",
    summary:
      "16-unit value-add multifamily two-building property in Columbus's South of Main neighborhood focused on interior renovations and operational efficiencies.",
    metrics: { irr: "20%+", equityMultiple: "3.0x+", hold: "2-5 yrs" },
    pdfUrl: "/deals/south-of-mound-summary.pdf",
    excelUrl: "/deals/south-of-mound-pro-forma.xlsx",
  },
];


