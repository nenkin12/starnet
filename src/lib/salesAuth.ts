import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const SALES_COOKIE = "sales_team";

/** Deterministic token derived from the PIN — rotating the PIN in Netlify
 *  invalidates every device's cookie at once. */
export function salesToken(): string | null {
  const pin = process.env.SALES_TEAM_PIN;
  if (!pin) return null;
  return createHmac("sha256", pin).update("starnet-sales-team-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function pinMatches(pin: string): boolean {
  const expected = process.env.SALES_TEAM_PIN;
  return !!expected && safeEqual(pin, expected);
}

/**
 * Guard for sales API routes (middleware does not cover /api). Returns a
 * NextResponse to short-circuit with, or null when the request is authorized.
 */
export function requireSalesPin(req: NextRequest): NextResponse | null {
  const expected = salesToken();
  if (!expected) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  const cookie = req.cookies.get(SALES_COOKIE)?.value;
  if (!cookie || !safeEqual(cookie, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
