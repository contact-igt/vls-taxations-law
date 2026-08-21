"use client";

import { useId, useState } from "react";

const FAQS = [
  {
    q: "What does Taxation Laws & Practice cover?",
    a: "The programme covers the basics of Direct and Indirect Taxes under the Indian constitutional framework and tax-related adjudications before departmental authorities, appellate authorities, tribunals and the High Court.",
  },
  {
    q: "Does the programme cover Direct and Indirect Taxes?",
    a: "Yes. The basics of Direct and Indirect Taxes form part of Unit I.",
  },
  {
    q: "Is GST included?",
    a: "Yes. The curriculum includes the GST Council, the 101st Constitutional Amendment Act, GST assessment-related matters and GST appellate matters.",
  },
  {
    q: "Will Income Tax disputes be covered?",
    a: "The programme includes assessment-related matters, Commissioner of Income Tax (Appeal) proceedings and Income Tax Appellate Tribunal matters.",
  },
  {
    q: "Will ITAT be covered?",
    a: "Yes. Matters relating to the Income Tax Appellate Tribunal form part of the curriculum.",
  },
  {
    q: "Will CESTAT be covered?",
    a: "Yes. Matters before the Customs, Excise and Service Tax Appellate Tribunal form part of the curriculum.",
  },
  {
    q: "Are GST appellate matters covered?",
    a: "Yes. GST Appellate Tribunal matters are included.",
  },
  {
    q: "Does the programme cover High Court tax practice?",
    a: "The brochure includes Writs and Writ Appeals before the High Court in tax matters.",
  },
  {
    q: "What are the dates and fees?",
    a: "The live session is on 28 August 2026, 6 PM – 9 PM (3 hours), conducted both offline and online in Tamil and English. The fee is ₹499. Reserve your seat above to confirm your place.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-vls-border border-t border-vls-border">
      {FAQS.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-serif text-[18px] font-medium text-vls-black">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-xl text-vls-red transition-transform duration-150 ease-out ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 pr-10 text-[15px] leading-relaxed text-vls-muted"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
