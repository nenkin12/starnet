"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-white overflow-hidden"
        >
          <button
            type="button"
            className="flex w-full items-center justify-between px-6 py-4 text-left"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            <span className="font-semibold text-gray-900 pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-gray-600 leading-relaxed text-sm">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
