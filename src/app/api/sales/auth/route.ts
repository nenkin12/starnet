import { NextRequest, NextResponse } from "next/server";
import { pinMatches, salesToken, SALES_COOKIE, requireSalesPin } from "@/lib/salesAuth";

/** GET — is this device already unlocked? */
export async function GET(req: NextRequest) {
  const denied = requireSalesPin(req);
  return NextResponse.json({ authed: denied === null });
}

/** POST { pin } — unlock this device with the shared team PIN. */
export async function POST(req: NextRequest) {
  const token = salesToken();
  if (!token) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let pin = "";
  try {
    const body = await req.json();
    pin = String(body?.pin ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!pinMatches(pin)) {
    // Blunt brute-force damper
    await new Promise((r) => setTimeout(r, 750));
    return NextResponse.json({ error: "Incorrect PIN" }, { status: 401 });
  }

  const res = NextResponse.json({ authed: true });
  res.cookies.set(SALES_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
