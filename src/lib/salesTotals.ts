import { SALES_CATALOG, type CatalogItem } from "@/data/salesCatalog";

export interface SalesSelection {
  installationId: string;
  unitId: string;
  mountId: string;
  addonIds: string[];
  planIds: string[];
  additionalEquipment: number; // free-form $, added to balance
  discount: number; // stored positive, subtracted from balance
  tripFee: number; // added to balance
}

export interface TotalLine {
  label: string;
  price: number;
  depositAmount: number;
}

export interface SalesTotals {
  lines: TotalLine[];
  totalJobValue: number;
  depositDue: number;
  balanceDue: number;
}

const itemById = new Map<string, CatalogItem>();
for (const group of SALES_CATALOG) {
  for (const item of group.items) itemById.set(item.id, item);
}

export function findCatalogItem(id: string): CatalogItem | undefined {
  return itemById.get(id);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Compute the itemized totals from selection IDS + free-form dollar fields.
 * The deposit derives exclusively from catalog `depositAmount`s, so the
 * server can recompute the Stripe charge without trusting client math.
 */
export function computeTotals(sel: SalesSelection): SalesTotals {
  const ids = [
    sel.installationId,
    sel.unitId,
    sel.mountId,
    ...sel.addonIds,
    ...sel.planIds,
  ].filter(Boolean);

  const lines: TotalLine[] = [];
  let total = 0;
  let deposit = 0;

  for (const id of ids) {
    const item = itemById.get(id);
    if (!item) continue;
    total += item.price;
    deposit += item.depositAmount ?? 0;
    if (item.price > 0 || item.depositAmount) {
      lines.push({
        label: item.label,
        price: item.price,
        depositAmount: item.depositAmount ?? 0,
      });
    }
  }

  const additional = Math.max(0, sel.additionalEquipment || 0);
  const tripFee = Math.max(0, sel.tripFee || 0);
  const discount = Math.max(0, sel.discount || 0);

  if (additional > 0)
    lines.push({ label: "Additional Equipment / Installation", price: additional, depositAmount: 0 });
  if (tripFee > 0)
    lines.push({ label: "Additional Trip Fee", price: tripFee, depositAmount: 0 });
  if (discount > 0)
    lines.push({ label: "Discount", price: -discount, depositAmount: 0 });

  total = total + additional + tripFee - discount;

  const totalJobValue = round2(Math.max(0, total));
  const depositDue = round2(deposit);
  const balanceDue = round2(Math.max(0, totalJobValue - depositDue));

  return { lines, totalJobValue, depositDue, balanceDue };
}

/** Human-readable itemization stored in Airtable "Order Summary". */
export function formatOrderSummary(totals: SalesTotals): string {
  const rows = totals.lines.map((l) => {
    const dep = l.depositAmount > 0 ? ` (deposit $${l.depositAmount.toFixed(2)})` : "";
    return `${l.label} — $${l.price.toFixed(2)}${dep}`;
  });
  rows.push("");
  rows.push(`Total Job Value: $${totals.totalJobValue.toFixed(2)}`);
  rows.push(`Deposit Due Today: $${totals.depositDue.toFixed(2)}`);
  rows.push(`Balance Due at Completion: $${totals.balanceDue.toFixed(2)}`);
  return rows.join("\n");
}
