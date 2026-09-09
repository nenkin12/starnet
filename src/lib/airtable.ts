/** Minimal Airtable REST helpers for the Sales table. */

export const SALES_BASE_ID = "appD9fZSV5pwb5JFb";
export const SALES_TABLE_ID = "tblN6BWtTHr4JUVUd";
export const SALES_PHOTOS_FIELD_ID = "fld5Yv960Ty41LQ2a";

function apiKey(): string | null {
  return process.env.AIRTABLE_API_KEY ?? null;
}

async function airtableFetch(url: string, init: RequestInit): Promise<Response> {
  const key = apiKey();
  if (!key) throw new Error("AIRTABLE_API_KEY not set");
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

export async function createSalesRecord(
  fields: Record<string, unknown>
): Promise<string> {
  const res = await airtableFetch(
    `https://api.airtable.com/v0/${SALES_BASE_ID}/${SALES_TABLE_ID}`,
    {
      method: "POST",
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    }
  );
  if (!res.ok) {
    throw new Error(`Airtable create failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.records[0].id as string;
}

export async function patchSalesRecord(
  recordId: string,
  fields: Record<string, unknown>
): Promise<void> {
  const res = await airtableFetch(
    `https://api.airtable.com/v0/${SALES_BASE_ID}/${SALES_TABLE_ID}/${recordId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ fields, typecast: true }),
    }
  );
  if (!res.ok) {
    throw new Error(`Airtable patch failed (${res.status}): ${await res.text()}`);
  }
}

export async function getSalesRecord(
  recordId: string
): Promise<Record<string, unknown>> {
  const res = await airtableFetch(
    `https://api.airtable.com/v0/${SALES_BASE_ID}/${SALES_TABLE_ID}/${recordId}`,
    { method: "GET" }
  );
  if (!res.ok) {
    throw new Error(`Airtable get failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.fields as Record<string, unknown>;
}

/** Upload one attachment (base64) — note the content.airtable.com host. */
export async function uploadSalesPhoto(
  recordId: string,
  contentType: string,
  filename: string,
  base64: string
): Promise<void> {
  const res = await airtableFetch(
    `https://content.airtable.com/v0/${SALES_BASE_ID}/${recordId}/${SALES_PHOTOS_FIELD_ID}/uploadAttachment`,
    {
      method: "POST",
      body: JSON.stringify({ contentType, filename, file: base64 }),
    }
  );
  if (!res.ok) {
    throw new Error(`Airtable upload failed (${res.status}): ${await res.text()}`);
  }
}
