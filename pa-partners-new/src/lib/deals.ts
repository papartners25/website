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

export const DEALS: Deal[] = [];

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

