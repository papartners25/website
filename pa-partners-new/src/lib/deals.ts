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
  footerNote?: string;
  hideSummaryTab?: boolean;
};

export const DEALS: Deal[] = [
  {
    id: "south-of-mound",
    name: "South of Mound",
    location: "Columbus, OH",
    summary:
      "This value-add opportunity allows us to acquire a stabilized, cash-flowing asset in a B- neighborhood with immediate positive returns while executing a straightforward renovation program to drive rents from current levels of $800-$900 per unit to market-leading rates of $1,250+ per unit. To emphasize deal stability, our pro forma underwrites to an initial stabilized rent of $960/unit with 3.2% annual growth.",
    metrics: { irr: "23.8%", equityMultiple: "2.70x", hold: "2-5 yrs" },
    omUrl: "/deals/south-of-mound-investment-memorandum.pdf",
    execSummaryUrl: "/deals/south-of-mound-executive-summary.pdf",
    pdfUrl: "/deals/south-of-mound-executive-summary.pdf",
    excelUrl: "/deals/south_of_mound_investment_proforma.xlsx",
    footerNote: "Target IRR with a 3-year hold (expected) is 30.7%.",
    hideSummaryTab: true,
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

// Helpers to derive aggregate stats from deals
export function parseIrrPercent(irr?: string): number | undefined {
  if (!irr) return undefined;
  const match = irr.match(/([0-9]+(?:\.[0-9]+)?)/);
  if (!match) return undefined;
  const value = parseFloat(match[1]);
  return Number.isFinite(value) ? value : undefined;
}

export function parseHoldRange(hold?: string): { min: number; max: number } | undefined {
  if (!hold) return undefined;
  // Accept formats like "2-5 yrs", "2-5 years", "2–5 yrs" (en dash), or single value "3 yrs"
  const rangeMatch = hold.match(/(\d+)\s*[\-–]\s*(\d+)/);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1], 10);
    const max = parseInt(rangeMatch[2], 10);
    if (Number.isFinite(min) && Number.isFinite(max)) return { min, max };
  }
  const singleMatch = hold.match(/(\d+)/);
  if (singleMatch) {
    const v = parseInt(singleMatch[1], 10);
    if (Number.isFinite(v)) return { min: v, max: v };
  }
  return undefined;
}

export function computeDealStats(deals: Deal[]): {
  availableDeals: number;
  irrRange?: { min: number; max: number };
  holdRange?: { min: number; max: number };
} {
  const availableDeals = deals.length;

  const irrValues: number[] = [];
  const holdRanges: Array<{ min: number; max: number }> = [];

  for (const d of deals) {
    const irr = parseIrrPercent(d.metrics.irr);
    if (typeof irr === "number") irrValues.push(irr);
    const hr = parseHoldRange(d.metrics.hold);
    if (hr) holdRanges.push(hr);
  }

  const irrRange = irrValues.length
    ? { min: Math.min(...irrValues), max: Math.max(...irrValues) }
    : undefined;

  const holdRange = holdRanges.length
    ? {
        min: Math.min(...holdRanges.map((r) => r.min)),
        max: Math.max(...holdRanges.map((r) => r.max)),
      }
    : undefined;

  return { availableDeals, irrRange, holdRange };
}


