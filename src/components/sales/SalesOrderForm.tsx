"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  SALES_CATALOG,
  SALES_PEOPLE,
  ROOF_MATERIALS,
  OPENER_SCRIPT,
  TERMS_TEXT,
  type CatalogGroup,
} from "@/data/salesCatalog";
import { computeTotals, type SalesSelection } from "@/lib/salesTotals";

/* ---------------------------------- types --------------------------------- */

interface SalesFormData {
  salesPerson: string;
  customerName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  acceptsDeliveries: "yes" | "no" | "";
  deliveryNotes: string;
  homeSqft: string;
  roofMaterial: string;
  stories: string;
  notesForTech: string;
  equipmentSource: "On Site" | "Ordered" | "";
  over2400: "yes" | "no" | "";
  additionalEquipment: string;
  discount: string;
  tripFee: string;
  termsAccepted: boolean;
}

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC","PR"];

const inputCls =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors";
const labelCls = "block text-sm font-medium text-gray-700 mb-1";

/* -------------------------------- PIN gate -------------------------------- */

function PinGate({ onUnlocked }: { onUnlocked: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/sales/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        onUnlocked();
      } else if (res.status === 503) {
        setError("Form not configured yet — SALES_TEAM_PIN is not set.");
      } else {
        setError("Incorrect PIN — try again.");
      }
    } catch {
      setError("Network error — try again.");
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-sm mt-16">
      <form onSubmit={submit} className="rounded-2xl bg-white border border-gray-200 p-8 shadow-sm text-center">
        <h1 className="text-xl font-bold text-gray-900">Team Access</h1>
        <p className="mt-1 text-sm text-gray-500">Enter the Starnet sales team PIN.</p>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className={`${inputCls} mt-5 text-center text-lg tracking-widest`}
          placeholder="••••••"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy || !pin}
          className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
        >
          {busy ? "Checking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}

/* --------------------------- catalog group field --------------------------- */

function CatalogGroupField({
  group,
  selection,
  onSelect,
}: {
  group: CatalogGroup;
  selection: string | string[];
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-900 mb-2">
        {group.label}
        {group.required && <span className="text-red-500"> *</span>}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {group.items.map((item) => {
          const selected = Array.isArray(selection)
            ? selection.includes(item.id)
            : selection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              aria-pressed={selected}
              className={`flex items-start justify-between gap-2 rounded-lg border-2 px-3 py-2.5 text-left transition-all ${
                selected
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <span className="text-sm text-gray-900">{item.label}</span>
              <span className="flex flex-col items-end flex-shrink-0">
                <span className={`text-sm font-semibold ${item.price > 0 ? "text-gray-900" : "text-gray-400"}`}>
                  {item.price > 0 ? `$${item.price.toFixed(2).replace(/\.00$/, "")}` : "$0"}
                </span>
                {item.depositAmount != null && item.depositAmount > 0 && item.depositAmount < item.price && (
                  <span className="text-[11px] text-blue-600 font-medium">
                    ${item.depositAmount} due today
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ photo helpers ------------------------------ */

interface PendingPhoto {
  file: File;
  previewUrl: string;
  status: "pending" | "uploading" | "done" | "failed";
}

/** Downscale to ≤1600px JPEG so uploads clear the 4MB API cap (also converts HEIC). */
async function compressPhoto(file: File): Promise<{ base64: string; contentType: string; filename: string }> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("decode failed"));
    };
    img.src = url;
  });
  return {
    base64: dataUrl.split(",")[1],
    contentType: "image/jpeg",
    filename: file.name.replace(/\.[^.]+$/, "") + ".jpg",
  };
}

/* --------------------------------- form ----------------------------------- */

function StepHeading({ n, title, subtitle }: { n: number; title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {n}
        </span>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-gray-500 mt-1 ml-11">{subtitle}</p>}
    </div>
  );
}

export default function SalesOrderForm() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  // Catalog selections
  const [installationId, setInstallationId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [mountId, setMountId] = useState("");
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [planIds, setPlanIds] = useState<string[]>([]);
  const [photos, setPhotos] = useState<PendingPhoto[]>([]);
  const [openerOpen, setOpenerOpen] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<{
    recordId: string;
    checkoutUrl: string | null;
    depositDue: number;
  } | null>(null);
  const [photoProgress, setPhotoProgress] = useState("");
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SalesFormData>({
    defaultValues: { acceptsDeliveries: "", equipmentSource: "", over2400: "" },
  });

  useEffect(() => {
    fetch("/api/sales/auth")
      .then((r) => r.json())
      .then((d) => setAuthed(!!d.authed))
      .catch(() => setAuthed(false));
  }, []);

  const watched = watch(["additionalEquipment", "discount", "tripFee", "acceptsDeliveries"]);
  const [wAdditional, wDiscount, wTripFee, wAcceptsDeliveries] = watched;

  const totals = useMemo(() => {
    const sel: SalesSelection = {
      installationId,
      unitId,
      mountId,
      addonIds,
      planIds,
      additionalEquipment: parseFloat(wAdditional || "0") || 0,
      discount: parseFloat(wDiscount || "0") || 0,
      tripFee: parseFloat(wTripFee || "0") || 0,
    };
    return computeTotals(sel);
  }, [installationId, unitId, mountId, addonIds, planIds, wAdditional, wDiscount, wTripFee]);

  function toggleIn(list: string[], id: string): string[] {
    return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  }

  function onPickPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 10 - photos.length);
    setPhotos((prev) => [
      ...prev,
      ...files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        status: "pending" as const,
      })),
    ]);
    e.target.value = "";
  }

  async function uploadPhotos(recordId: string, list: PendingPhoto[]) {
    let done = 0;
    for (let i = 0; i < list.length; i++) {
      setPhotoProgress(`Uploading photo ${i + 1} of ${list.length}…`);
      setPhotos((prev) => prev.map((p, j) => (j === i ? { ...p, status: "uploading" } : p)));
      try {
        const { base64, contentType, filename } = await compressPhoto(list[i].file);
        const res = await fetch("/api/sales/photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recordId, base64, contentType, filename }),
        });
        if (!res.ok) throw new Error(String(res.status));
        done++;
        setPhotos((prev) => prev.map((p, j) => (j === i ? { ...p, status: "done" } : p)));
      } catch {
        setPhotos((prev) => prev.map((p, j) => (j === i ? { ...p, status: "failed" } : p)));
      }
    }
    setPhotoProgress(
      done === list.length ? "" : `${done} of ${list.length} photos uploaded — some failed.`
    );
  }

  const onSubmit = async (data: SalesFormData) => {
    if (!installationId) {
      setSubmitError("Choose an installation type.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salesPerson: data.salesPerson,
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip,
          acceptsDeliveries: data.acceptsDeliveries === "yes",
          deliveryNotes: data.deliveryNotes,
          homeSqft: data.homeSqft,
          roofMaterial: data.roofMaterial,
          stories: data.stories,
          notesForTech: data.notesForTech,
          equipmentSource: data.equipmentSource,
          over2400: data.over2400 === "yes",
          installationId,
          unitId,
          mountId,
          addonIds,
          planIds,
          additionalEquipment: parseFloat(data.additionalEquipment || "0") || 0,
          discount: parseFloat(data.discount || "0") || 0,
          tripFee: parseFloat(data.tripFee || "0") || 0,
          termsAccepted: data.termsAccepted === true,
        }),
      });
      const payload = await res.json();
      if (!res.ok && !payload.recordId) {
        setSubmitError(payload.error || "Submission failed — try again.");
        setSubmitting(false);
        return;
      }
      setResult({
        recordId: payload.recordId,
        checkoutUrl: payload.checkoutUrl ?? null,
        depositDue: payload.depositDue ?? totals.depositDue,
      });
      if (payload.recordId && photos.length > 0) {
        await uploadPhotos(payload.recordId, photos);
      }
      if (!res.ok) {
        setSubmitError("Order saved, but the payment link failed — use Retry below.");
      }
    } catch {
      setSubmitError("Network error — try again.");
    }
    setSubmitting(false);
  };

  async function retryPaymentLink() {
    if (!result?.recordId) return;
    setSubmitError("");
    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId: result.recordId }),
      });
      const payload = await res.json();
      if (res.ok && payload.checkoutUrl) {
        setResult({ ...result, checkoutUrl: payload.checkoutUrl });
      } else {
        setSubmitError(payload.error || "Retry failed.");
      }
    } catch {
      setSubmitError("Network error — try again.");
    }
  }

  async function copyLink() {
    if (!result?.checkoutUrl) return;
    await navigator.clipboard.writeText(result.checkoutUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  /* ------------------------------ render states ----------------------------- */

  if (authed === null) {
    return <p className="text-center text-gray-400 mt-16">Loading…</p>;
  }
  if (!authed) {
    return <PinGate onUnlocked={() => setAuthed(true)} />;
  }

  if (result) {
    return (
      <div className="mx-auto max-w-lg mt-8">
        <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
          <h3 className="text-xl font-semibold text-green-800">Order Saved</h3>
          <p className="mt-2 text-green-700">
            The order is in Airtable{result.depositDue > 0 ? ` — deposit due today: ` : "."}
            {result.depositDue > 0 && (
              <strong>${result.depositDue.toFixed(2)}</strong>
            )}
          </p>
          {photoProgress && <p className="mt-2 text-sm text-amber-700">{photoProgress}</p>}
          {result.checkoutUrl ? (
            <div className="mt-6">
              <p className="text-sm text-green-700 mb-2">
                Send this payment link to the customer:
              </p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={result.checkoutUrl}
                  className="w-full rounded-lg border border-green-300 bg-white px-3 py-2 text-xs text-gray-700"
                  onFocus={(e) => e.target.select()}
                />
                <button
                  type="button"
                  onClick={copyLink}
                  className="flex-shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
                >
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>
          ) : result.depositDue > 0 ? (
            <button
              type="button"
              onClick={retryPaymentLink}
              className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Retry Payment Link
            </button>
          ) : (
            <p className="mt-4 text-sm text-green-700">No deposit due — nothing to charge today.</p>
          )}
          {submitError && <p className="mt-3 text-sm text-red-600">{submitError}</p>}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 block mx-auto text-sm text-blue-600 underline"
          >
            Start a new order
          </button>
        </div>
      </div>
    );
  }

  /* --------------------------------- form UI -------------------------------- */

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-8">
        {/* 1 — Opener + rep */}
        <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <StepHeading n={1} title="Opener" />
          <button
            type="button"
            onClick={() => setOpenerOpen(!openerOpen)}
            className="text-xs text-blue-600 underline mb-2"
          >
            {openerOpen ? "Hide script" : "Show script"}
          </button>
          {openerOpen && (
            <p className="rounded-lg bg-blue-50 border border-blue-100 p-4 text-sm text-gray-700 italic mb-4">
              &ldquo;{OPENER_SCRIPT}&rdquo;
            </p>
          )}
          <label htmlFor="salesPerson" className={labelCls}>Sales Person *</label>
          <select
            id="salesPerson"
            {...register("salesPerson", { required: "Required" })}
            className={inputCls}
          >
            <option value="">Select…</option>
            {SALES_PEOPLE.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.salesPerson && <p className="mt-1 text-sm text-red-600">{errors.salesPerson.message}</p>}
        </section>

        {/* 2 — Customer */}
        <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <StepHeading n={2} title="Customer" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Full Name *</label>
              <input {...register("customerName", { required: "Required" })} className={inputCls} placeholder="Customer name" />
              {errors.customerName && <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input
                type="email"
                {...register("email", { required: "Required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })}
                className={inputCls}
                placeholder="customer@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Phone *</label>
              <input type="tel" {...register("phone", { required: "Required" })} className={inputCls} placeholder="(555) 555-5555" />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>
        </section>

        {/* 3 — Property */}
        <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <StepHeading n={3} title="Property" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Street Address *</label>
              <input {...register("street", { required: "Required" })} className={inputCls} placeholder="123 Main St" />
              {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>}
            </div>
            <div>
              <label className={labelCls}>City *</label>
              <input {...register("city", { required: "Required" })} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>State *</label>
                <select {...register("state", { required: "Required" })} className={inputCls}>
                  <option value="">--</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>ZIP *</label>
                <input
                  {...register("zip", { required: "Required", pattern: { value: /^\d{5}$/, message: "5 digits" } })}
                  className={inputCls}
                  placeholder="30308"
                  inputMode="numeric"
                />
                {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip.message}</p>}
              </div>
            </div>

            <div className="sm:col-span-2 rounded-lg bg-gray-50 border border-gray-200 p-4">
              <p className="text-sm font-medium text-gray-800 mb-2">
                Ask: &ldquo;Does this address accept UPS / FedEx / Amazon deliveries? Shipping takes about 2–4 days.&rdquo; *
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" value="yes" {...register("acceptsDeliveries", { required: true })} /> Yes
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" value="no" {...register("acceptsDeliveries", { required: true })} /> No
                </label>
              </div>
              {wAcceptsDeliveries === "no" && (
                <textarea
                  {...register("deliveryNotes")}
                  rows={2}
                  className={`${inputCls} mt-3`}
                  placeholder="What does the address not accept?"
                />
              )}
            </div>

            <div>
              <label className={labelCls}>Sqft of Home *</label>
              <input
                {...register("homeSqft", { required: "Required" })}
                className={inputCls}
                inputMode="numeric"
                placeholder="2000"
              />
              {errors.homeSqft && <p className="mt-1 text-sm text-red-600">{errors.homeSqft.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Roof Material *</label>
              <select {...register("roofMaterial", { required: "Required" })} className={inputCls}>
                <option value="">Select…</option>
                {ROOF_MATERIALS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Stories *</label>
              <select {...register("stories", { required: "Required" })} className={inputCls}>
                <option value="">Select…</option>
                {["1", "2", "3", "4"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>
                Notes for Tech * <span className="font-normal text-gray-500">— goals beyond a standard install, cable routing, requested router location</span>
              </label>
              <textarea {...register("notesForTech", { required: "Required" })} rows={3} className={inputCls} />
              {errors.notesForTech && <p className="mt-1 text-sm text-red-600">{errors.notesForTech.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Photos of Property</label>
              <input type="file" accept="image/*" multiple onChange={onPickPhotos} className="text-sm" />
              {photos.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {photos.map((p, i) => (
                    <div key={i} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.previewUrl} alt="" className="h-16 w-16 rounded-lg object-cover border border-gray-200" />
                      {p.status === "failed" && (
                        <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-red-600/70 text-[10px] text-white">failed</span>
                      )}
                      {p.status === "done" && (
                        <span className="absolute bottom-0 right-0 rounded-tl bg-green-600 px-1 text-[10px] text-white">✓</span>
                      )}
                      {p.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                          className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-gray-800 text-white text-xs leading-none"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4 — Equipment */}
        <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm space-y-6">
          <StepHeading n={4} title="Equipment" subtitle="Items marked 'due today' are collected with the deposit; everything else is billed at completion." />
          {SALES_CATALOG.map((group) => (
            <CatalogGroupField
              key={group.id}
              group={group}
              selection={
                group.id === "installation" ? installationId
                : group.id === "unit" ? unitId
                : group.id === "mount" ? mountId
                : group.id === "addons" ? addonIds
                : planIds
              }
              onSelect={(id) => {
                if (group.id === "installation") setInstallationId(id === installationId ? "" : id);
                else if (group.id === "unit") setUnitId(id === unitId ? "" : id);
                else if (group.id === "mount") setMountId(id === mountId ? "" : id);
                else if (group.id === "addons") setAddonIds((prev) => toggleIn(prev, id));
                else setPlanIds((prev) => toggleIn(prev, id));
              }}
            />
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <label className={labelCls}>Is the equipment on site or ordered? *</label>
              <select {...register("equipmentSource", { required: "Required" })} className={inputCls}>
                <option value="">Select…</option>
                <option value="On Site">On site</option>
                <option value="Ordered">Ordered</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Home over 2,400 sqft? *</label>
              <select {...register("over2400", { required: "Required" })} className={inputCls}>
                <option value="">Select…</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Additional Equipment / Installation ($)</label>
              <input {...register("additionalEquipment")} className={inputCls} inputMode="decimal" placeholder="0" />
            </div>
            <div>
              <label className={labelCls}>Discount ($)</label>
              <input {...register("discount")} className={inputCls} inputMode="decimal" placeholder="0" />
            </div>
            <div>
              <label className={labelCls}>Additional Trip Fee ($)</label>
              <input {...register("tripFee")} className={inputCls} inputMode="decimal" placeholder="0" />
            </div>
          </div>
        </section>

        {/* 5 — Terms */}
        <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <StepHeading n={5} title="Terms of Service" subtitle="Read to the customer before collecting payment." />
          <p className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 leading-relaxed max-h-44 overflow-y-auto">
            {TERMS_TEXT}
          </p>
          <label className="mt-4 flex items-start gap-3">
            <input type="checkbox" {...register("termsAccepted", { required: true })} className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600" />
            <span className="text-sm text-gray-700">
              The customer agrees to these terms for their Starlink installation. *
            </span>
          </label>
          {errors.termsAccepted && <p className="mt-1 text-sm text-red-600">Customer must agree to the terms.</p>}
        </section>
      </div>

      {/* 6 — Order summary (sticky) */}
      <div className="xl:col-span-1">
        <div className="xl:sticky xl:top-6 rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
          {totals.lines.length === 0 ? (
            <p className="text-sm text-gray-400">Select equipment to see totals.</p>
          ) : (
            <ul className="space-y-2 mb-4">
              {totals.lines.map((l, i) => (
                <li key={i} className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-600">{l.label}</span>
                  <span className={`font-medium flex-shrink-0 ${l.price < 0 ? "text-green-600" : "text-gray-900"}`}>
                    {l.price < 0 ? `−$${Math.abs(l.price).toFixed(2)}` : `$${l.price.toFixed(2)}`}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <p className="flex justify-between text-sm text-gray-600">
              <span>Total Job Value</span>
              <span className="font-semibold text-gray-900">${totals.totalJobValue.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-base">
              <span className="font-semibold text-blue-700">Deposit Due Today</span>
              <span className="font-bold text-blue-700">${totals.depositDue.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-sm text-gray-600">
              <span>Balance at Completion</span>
              <span className="font-semibold text-gray-900">${totals.balanceDue.toFixed(2)}</span>
            </p>
          </div>
          {submitError && <p className="mt-4 text-sm text-red-600">{submitError}</p>}
          {photoProgress && <p className="mt-2 text-sm text-gray-500">{photoProgress}</p>}
          <button
            type="submit"
            disabled={submitting || !installationId}
            className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            {submitting ? "Saving…" : "Save Order & Create Payment Link"}
          </button>
          <p className="mt-2 text-xs text-gray-400 text-center">
            Saves to Airtable and generates a Stripe deposit link.
          </p>
        </div>
      </div>
    </form>
  );
}
