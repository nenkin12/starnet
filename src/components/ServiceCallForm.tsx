"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

const dishModels = [
  {
    id: "Standard Round (Gen 1)",
    name: "Round Dish",
    gen: "Gen 1",
    years: "2020 – 2021",
    hint: "Circular 23″ dish on a tripod or mast",
  },
  {
    id: "Standard Actuated (Gen 2)",
    name: "Rectangular Dish with Motor",
    gen: "Gen 2",
    years: "2021 – 2023",
    hint: "Rectangular dish that tilts itself on a motorized mast",
  },
  {
    id: "Standard (Gen 3)",
    name: "Standard Kickstand Dish",
    gen: "Gen 3",
    years: "2023 – present",
    hint: "Larger rectangular dish with a kickstand — no motor",
  },
  {
    id: "Starlink Mini",
    name: "Starlink Mini",
    gen: "Mini",
    years: "2024 – present",
    hint: "Compact, laptop-sized dish with the router built in",
  },
];

interface ServiceCallFormData {
  name: string;
  email: string;
  phone: string;
  zip: string;
  issueSummary: string;
  additionalSystems: string;
  smsConsent: boolean;
}

export default function ServiceCallForm() {
  const [dishModel, setDishModel] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceCallFormData>();

  const onSubmit = async (data: ServiceCallFormData) => {
    const payload = {
      dishModel: dishModel ?? "Not sure",
      name: data.name,
      email: data.email,
      phone: data.phone,
      zip: data.zip,
      issueSummary: data.issueSummary,
      additionalSystems: data.additionalSystems || "",
      smsConsent: data.smsConsent ? "yes" : "no",
    };
    // Primary: sync to Airtable via our API route
    try {
      await fetch("/api/servicecall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Netlify Forms below still captures the submission
    }
    // Backup: Netlify Forms (post urlencoded against the hidden static form)
    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "servicecall", ...payload }).toString(),
      });
    } catch {
      // Still show success — Netlify logs the submission server-side
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <h3 className="text-xl font-semibold text-green-800">
          Service Request Received
        </h3>
        <p className="mt-2 text-green-700">
          Thanks — a technician coordinator will reach out within one business
          day to schedule your service call.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Step 1 — identify the unit */}
      <div className="mb-2 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          1
        </span>
        <h2 className="text-xl font-bold text-gray-900">
          Which Starlink do you have?
        </h2>
      </div>
      <p className="text-sm text-gray-600 mb-6 ml-11">
        Select your model — the shape and the year you got it are the easiest
        tells.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {dishModels.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setDishModel(m.id)}
            aria-pressed={dishModel === m.id}
            className={`text-left rounded-xl border-2 p-4 transition-all ${
              dishModel === m.id
                ? "border-blue-600 ring-2 ring-blue-600/20 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                  dishModel === m.id
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {dishModel === m.id && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-gray-900">{m.name}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      dishModel === m.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {m.gen}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">{m.years}</p>
                <p className="mt-1 text-sm text-gray-600">{m.hint}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setDishModel("Not sure")}
        aria-pressed={dishModel === "Not sure"}
        className={`w-full rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all mb-10 ${
          dishModel === "Not sure"
            ? "border-blue-600 bg-blue-50 text-blue-700"
            : "border-dashed border-gray-300 text-gray-600 hover:border-blue-300"
        }`}
      >
        I&apos;m not sure which one I have
      </button>

      {/* Step 2 — issue + contact */}
      <div
        className={dishModel ? "" : "pointer-events-none opacity-40 select-none"}
        aria-hidden={!dishModel}
      >
        <div className="mb-2 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            2
          </span>
          <h2 className="text-xl font-bold text-gray-900">
            Tell us what&apos;s going on
          </h2>
        </div>
        <p className="text-sm text-gray-600 mb-6 ml-11">
          A short summary is all we need — slow speeds, dropouts, no power,
          storm damage, relocation, etc.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="issueSummary"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Describe your issue *
            </label>
            <textarea
              id="issueSummary"
              rows={4}
              {...register("issueSummary", {
                required: "Please describe your issue",
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
              placeholder="e.g. Internet drops out every evening, the app shows 'obstructed'…"
            />
            {errors.issueSummary && (
              <p className="mt-1 text-sm text-red-600">
                {errors.issueSummary.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="additionalSystems"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Do you have additional systems connected to your Starlink, such
              as a mesh, point-to-point system, or cameras?
            </label>
            <input
              id="additionalSystems"
              type="text"
              {...register("additionalSystems")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
              placeholder="e.g. Eero mesh, point-to-point link to the barn, 4 security cameras"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="sc-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                id="sc-name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="sc-phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone *
              </label>
              <input
                id="sc-phone"
                type="tel"
                {...register("phone", { required: "Phone is required" })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                placeholder="(555) 555-5555"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="sc-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email *
              </label>
              <input
                id="sc-email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="sc-zip"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Service ZIP Code *
              </label>
              <input
                id="sc-zip"
                type="text"
                inputMode="numeric"
                {...register("zip", { required: "ZIP code is required" })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                placeholder="30308"
              />
              {errors.zip && (
                <p className="mt-1 text-sm text-red-600">{errors.zip.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-gray-50 border border-gray-200 p-4">
            <input
              id="sc-smsConsent"
              type="checkbox"
              {...register("smsConsent")}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="sc-smsConsent"
              className="text-xs text-gray-600 leading-relaxed"
            >
              By checking this box, I agree to receive text messages and phone
              calls from Starnet Pros regarding my inquiry, appointment
              confirmations and reminders, scheduling updates, and service
              updates at the phone number provided, including calls made with
              automated technology. No marketing or promotional messages will
              be sent. Message frequency varies. Message &amp; data rates may
              apply. Reply STOP to opt out at any time, or HELP for help.
              Consent is not a condition of purchase. See our{" "}
              <a href="/privacy-policy" className="text-blue-600 underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-blue-600 underline">
                Terms &amp; Conditions
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={!dishModel}
            className="w-full rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            Request My Service Call
          </button>
        </form>
      </div>
    </div>
  );
}
