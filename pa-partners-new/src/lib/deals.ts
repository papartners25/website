export type Deal = {
  id: string;
  name: string;
  location: string;
  summary: string;
  metrics: { irr?: string; equityMultiple?: string; hold?: string };
  omUrl?: string;
  execSummaryUrl?: string;
  pdfUrl: string;
  excelUrl: string;
};

export const DEALS: Deal[] = [
  {
    id: "broadway-court",
    name: "Broadway Court",
    location: "Columbus, OH",
    summary:
      "This 30-unit value-add investment sits along Columbus's multi-billion-dollar LinkUS mobility corridor, offering immediate upside potential and a high cash-on-cash profile.",
    metrics: { irr: "20%+", equityMultiple: "2.72x", hold: "2-5 yrs" },
    omUrl: "/deals/broadway-court-om.pdf",
    execSummaryUrl: "/deals/broadway-court-executive-summary.pdf",
    pdfUrl: "/deals/broadway-court-summary.pdf",
    excelUrl: "/deals/broadway-court-pro-forma.xlsx",
  },
  {
    id: "oakland-park-apartments",
    name: "Oakland Park Apartments",
    location: "Columbus, OH",
    summary:
      "A 8-unit multifamily investment located in the heart of North Linden. This well-maintained brick building features all 2-bedroom, 1-bathroom units with strong in-place rents. Each unit is separately metered, and tenants are responsible for all utilities, minimizing ownership expenses. The property offers on-site parking and has undergone recent capital improvements, making it an ideal low-maintenance addition to any investment portfolio.",
    metrics: { irr: "18.9%", equityMultiple: "2.21x", hold: "2-5 yrs" },
    pdfUrl: "/deals/oakland-park-apts-investment-proforma.pdf",
    excelUrl: "/deals/oakland-park-apts-investment-proforma.xlsx",
  },
];


