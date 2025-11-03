export type Deal = {
  id: string;
  name: string;
  location: string;
  summary: string;
  metrics: { irr?: string; equityMultiple?: string; hold?: string };
  omUrl?: string;
  execSummaryUrl?: string;
  briefUrl?: string;
  pdfUrl: string;
  excelUrl: string;
  imageUrl?: string;
  secondaryImageUrl?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  footerNote?: string;
  hideSummaryTab?: boolean;
  strategyUrl?: string;
};

export const DEALS: Deal[] = [
  {
    id: "summit-flats",
    name: "Summit Flats (32 units)",
    location: "Columbus, OH (Weinland Park)",
    summary: `Situated in Columbus’s Weinland Park, Summit Flats is steps from the Short North and minutes to OSU and downtown—an irreplaceable, walkable location with year‑round renter demand. This off‑market, 32‑unit property offers a straightforward value‑add through modern interior finishes, refreshed common areas, and professional operations. Ongoing neighborhood revitalization, strong connectivity, and lifestyle amenities support healthy leasing velocity and durable rent growth, while the scale enables efficient management and meaningful curb‑appeal upgrades. We view this as a high‑conviction opportunity in a prime urban submarket with multiple exit pathways.`,
    metrics: { irr: "26.4%", equityMultiple: "1.60x", hold: "2-4 yrs" },
    execSummaryUrl: "/deals/summit-flats-executive-summary.pdf",
    omUrl: "/deals/summit-flats-investment-memorandum.pdf",
    pdfUrl: "/deals/summit-flats-executive-summary.pdf",
    excelUrl: "/deals/summit-flats-pro-forma.xlsx",
    imageUrl: "/deals/summit-flats-rendering.png",
    secondaryImageUrl: "/deals/summit-flats-rendering-2.png",
    imageFit: "contain",
    imagePosition: "center",
    strategyUrl: "/dataroom/summit-flats/strategy",
  },
  {
    id: "south-of-mound",
    name: "South of Mound (16 units)",
    location: "Columbus, OH",
    summary:
      "This value-add opportunity allows us to acquire a stabilized, cash-flowing asset in a B- neighborhood with immediate positive returns while executing a straightforward renovation program to drive rents from current levels of $800-$900 per unit to market-leading rates of $1,250+ per unit. To emphasize deal stability, our pro forma underwrites to an initial stabilized rent of $960/unit with 3.2% annual growth.",
    metrics: { irr: "23.8%", equityMultiple: "2.70x", hold: "2-4 yrs" },
    omUrl: "/deals/south-of-mound-investment-memorandum.pdf",
    execSummaryUrl: "/deals/south-of-mound-executive-summary.pdf",
    pdfUrl: "/deals/south-of-mound-executive-summary.pdf",
    excelUrl: "/deals/south-of-mound-pro-forma-2025-10-17.xlsx",
    hideSummaryTab: true,
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


