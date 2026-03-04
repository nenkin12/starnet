"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  serviceType: string;
  message: string;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // TODO: Connect to form handling service (e.g., Formspree, API route)
    console.log("Form submitted:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <h3 className="text-xl font-semibold text-green-800">
          Thank You!
        </h3>
        <p className="mt-2 text-green-700">
          We&apos;ve received your message and will get back to you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City / Address
          </label>
          <input
            id="city"
            type="text"
            {...register("city")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            placeholder="Your city or address"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="serviceType"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Service Type
        </label>
        <select
          id="serviceType"
          {...register("serviceType")}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
        >
          <option value="">Select a service...</option>
          <option value="consultation">Starlink Consultation</option>
          <option value="residential">Residential Installation</option>
          <option value="commercial">Commercial / Business Installation</option>
          <option value="rv">RV / Mobile Installation</option>
          <option value="point-to-point">Point-to-Point Installation</option>
          <option value="plan-comparison">Plan Comparison Guidance</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message *
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message", { required: "Message is required" })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors resize-y"
          placeholder="Tell us about your installation needs..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
      >
        Send Message
      </button>
    </form>
  );
}
