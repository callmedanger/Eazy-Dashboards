import React, { useState } from 'react';
import { FAQ_COPY } from '../config/siteConfig';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqScene: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative min-h-[100svh] w-full py-24 bg-sheet-grid-light flex flex-col justify-center border-b border-navy/10 overflow-hidden select-none"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-navy/15 bg-white text-navy font-mono text-xs tracking-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            <span>COMMON QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-navy tracking-display leading-tightest mb-4">
            Clear answers for busy{' '}
            <span className="font-editorial-italic font-normal text-teal">
              business owners.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-navy/70 font-body">
            Everything you need to know about setup, privacy, WhatsApp summaries, and pricing.
          </p>
        </div>

        {/* Fast Interruptible Accordion (<= 200ms) */}
        <div className="space-y-3 font-mono">
          {FAQ_COPY.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-xl border border-navy/15 bg-white shadow-xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left btn-press cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded border border-navy/15 bg-[#FAF8F5] text-navy/60 flex items-center justify-center text-xs font-bold shrink-0">
                      Q{index + 1}
                    </span>
                    <span className="text-sm sm:text-base font-display font-bold text-navy">
                      {item.q}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-teal shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
                  />
                </button>

                {/* Sub-200ms GPU-friendly Accordion Grid */}
                <div className={`accordion-grid ${isOpen ? 'open opacity-100' : 'opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-xs sm:text-sm font-body text-navy/75 leading-relaxed pl-10 border-l-2 border-teal/40 ml-5 mb-1">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
