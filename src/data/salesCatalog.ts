/**
 * Sales form catalog — single source of truth for everything sellable on the
 * internal sales form (/sales). Prices in DOLLARS.
 *
 * `price` is the item's contribution to the TOTAL job value.
 * `depositAmount` is what gets charged TODAY via the Stripe link ("$349 of
 * $799" ⇒ price 799, depositAmount 349; PAID IN FULL items set both equal).
 * Items without depositAmount are collected with the balance at completion.
 *
 * EDIT HERE to change reps, prices, or products — the form UI, totals, and
 * Stripe amounts all derive from this file.
 */

export interface CatalogItem {
  id: string;
  label: string;
  price: number;
  depositAmount?: number;
  description?: string;
}

export interface CatalogGroup {
  id: "installation" | "unit" | "mount" | "addons" | "plans";
  label: string;
  type: "radio" | "checkbox";
  required?: boolean;
  items: CatalogItem[];
}

export const SALES_PEOPLE = ["Caleb", "Scott", "Jesse", "Ben"];

export const ROOF_MATERIALS = [
  "Asphalt Shingle",
  "Metal",
  "Standing Seam Metal",
  "Tile",
  "Flat/TPO",
  "Wood",
  "Other",
];

export const OPENER_SCRIPT =
  "Hi, this is __________ with Starnet Pros. I'm reaching out regarding the " +
  "Starlink request you submitted. Do you have any questions or would you " +
  "like to schedule an installation?";

export const TERMS_TEXT =
  "We stand by our work with a 30-day guarantee covering all aspects of your " +
  "installation. Your deposit, paid today, is fully refundable up to 48 hours " +
  "before your scheduled installation date. If, for any reason beyond our " +
  "control, the installation cannot be completed, you will owe nothing beyond " +
  "the initial deposit & any equipment purchased will be returned and issued " +
  "a full refund for the equipment purchased. The remaining balance will only " +
  "be charged once your installation is successfully completed. Typically " +
  "within 24-48 hours.";

export const SALES_CATALOG: CatalogGroup[] = [
  {
    id: "installation",
    label: "What type of installation is this?",
    type: "radio",
    required: true,
    items: [
      { id: "resi-deposit", label: "Residential Installation Deposit ($349 of $799)", price: 799, depositAmount: 349 },
      { id: "resi-full", label: "Residential Installation (PAID IN FULL)", price: 799, depositAmount: 799 },
      { id: "resi-package-deposit", label: "Starlink Residential Package Deposit ($750 of $1500)", price: 1500, depositAmount: 750 },
      { id: "comm-deposit", label: "Starlink Commercial Package Deposit ($750 of $1500)", price: 1500, depositAmount: 750 },
      { id: "comm-lite-1000", label: "Starlink Commercial (LITE) Package Deposit ($500 of $1000)", price: 1000, depositAmount: 500 },
      { id: "comm-lite-1200", label: "Starlink Commercial (LITE) Package Deposit ($500 of $1200)", price: 1200, depositAmount: 500 },
      { id: "marine-2500", label: "Marine Installation Deposit ($1000 of $2500)", price: 2500, depositAmount: 1000 },
      { id: "marine-1200", label: "Marine Installation Deposit ($500 of $1200)", price: 1200, depositAmount: 500 },
      { id: "rv-1200", label: "RV Installation ($500 of $1200)", price: 1200, depositAmount: 500 },
      { id: "rv-1500", label: "RV Installation ($500 of $1500)", price: 1500, depositAmount: 500 },
      { id: "survey-249", label: "Survey ($249)", price: 249, depositAmount: 249 },
      { id: "survey-349", label: "Survey ($349)", price: 349, depositAmount: 349 },
      { id: "mini-kit", label: "Starlink Mini Kit", price: 599, depositAmount: 599 },
      { id: "equipment-only", label: "Equipment Only", price: 0 },
      { id: "auto-sale", label: "Auto Sale", price: 0 },
      { id: "paid-via-estimate", label: "Paid via Estimate", price: 0 },
    ],
  },
  {
    id: "unit",
    label: "What Starlink unit is getting installed?",
    type: "radio",
    required: true,
    items: [
      { id: "unit-gen3-customer", label: "Starlink Gen 3 Unit (Customer Ordered)", price: 0 },
      { id: "unit-gen3-onsite", label: "Starlink Gen 3 Unit (ON SITE)", price: 0 },
      { id: "unit-gen2-onsite", label: "Starlink Gen 2 Unit (ON SITE)", price: 0 },
      { id: "unit-gen2-hp-onsite", label: "Starlink Gen 2 High Performance (ON SITE)", price: 0 },
      { id: "unit-hp-customer", label: "High Performance Business Unit (Customer Ordered)", price: 0 },
      { id: "unit-hp", label: "High Performance Business Unit", price: 2499 },
      { id: "unit-mini", label: "Starlink Mini", price: 699 },
      { id: "unit-ax-triband", label: "STARLINK - Standard 4 X AX Tri Band Wi-Fi System", price: 499 },
    ],
  },
  {
    id: "mount",
    label: "What mount is getting installed?",
    type: "radio",
    required: true,
    items: [
      { id: "mount-none", label: "No Mount / N/A", price: 0 },
      { id: "mount-pivot-customer", label: "Starlink Pivot Mount (Customer Ordered)", price: 0 },
      { id: "mount-pivot-onsite", label: "Starlink Pivot Mount (ON SITE)", price: 0 },
      { id: "mount-pivot", label: "Starlink Pivot Mount", price: 149 },
      { id: "mount-wall-customer", label: "Starlink Wall Mount (Customer Ordered)", price: 0 },
      { id: "mount-wall-onsite", label: "Starlink Wall Mount (ON SITE)", price: 0 },
      { id: "mount-wall", label: "Starlink Wall Mount", price: 149 },
      { id: "mount-jpole", label: "J Pole Mount w/ Pipe Adapter", price: 179 },
      { id: "mount-lshaped", label: "L Shaped Mount w/ Pipe Adapter", price: 179 },
      { id: "mount-under-eave", label: "Under Eave Mount w/ Pipe Adapter", price: 179 },
      { id: "mount-flat-roof", label: "Flat Roof Mount w/ Pipe Adapter", price: 319 },
      { id: "mount-standing-seam", label: "Standing Seam Metal Roof Mount", price: 229 },
      { id: "mount-ridgeline", label: "Ridgeline Mount", price: 189 },
      { id: "mount-pipe-adapter", label: "Pipe Adapter", price: 68 },
      { id: "mount-pole-trench", label: "Pole Install with Trenched Cable", price: 319 },
      { id: "mount-mini-mobile", label: "Starlink Mini Mobile Mount", price: 119 },
      { id: "mount-mini-rv-pole", label: "Starlink Mini RV Pole Mount", price: 189 },
      { id: "mount-marine", label: "Marine Mount", price: 419 },
    ],
  },
  {
    id: "addons",
    label: "Add-ons — Mesh, P2P & Equipment",
    type: "checkbox",
    items: [
      { id: "deco-deposit", label: "Deco Mesh System & Installation ($250 of $500) — covers 6,600 sqft", price: 500, depositAmount: 250 },
      { id: "deco-full", label: "Deco Mesh System & Installation (PAID IN FULL) — covers 6,600 sqft", price: 500, depositAmount: 500 },
      { id: "p2p", label: "Point2Point Equipment & Integration ($450 of $900)", price: 900, depositAmount: 450 },
      { id: "battery-backup", label: "Battery Backup for Starlink System", price: 119 },
      { id: "single-mesh", label: "Single Mesh Installation", price: 79 },
      { id: "starlink-router", label: "Starlink Router", price: 349 },
      { id: "outdoor-ap", label: "Outdoor AP Router (covers 500ft radius)", price: 529 },
      { id: "extension-pole", label: "Extension Pole", price: 39 },
      { id: "eufy-outdoor", label: "Eufy Outdoor Security Camera System (Solar) — Equipment & Installation", price: 379 },
      { id: "eufy-indoor", label: "Eufy Indoor Security Camera System — Equipment & Installation", price: 179 },
      { id: "nanobeam-2pk", label: "airMAX NanoBeam 5AC 2-pack with Installation", price: 800 },
      { id: "tplink-ap", label: "TP-Link Access Point #24729", price: 179 },
      { id: "access-switch", label: "Access Switch #2384", price: 79 },
      { id: "inverter", label: "Inverter (for RV / vehicle installs)", price: 149 },
    ],
  },
  {
    id: "plans",
    label: "Warranty / Service Plans / Other",
    type: "checkbox",
    items: [
      { id: "warranty-3yr", label: "Equipment Warranty — 3 Year", price: 189 },
      { id: "plan-5yr", label: "5 Year Service Plan Guarantee", price: 500 },
      { id: "color-match", label: "Color Match Home", price: 149 },
      { id: "starguard", label: "StarGuard Security (Monthly)", price: 7.99, description: "Billed monthly — not part of today's deposit" },
    ],
  },
];
