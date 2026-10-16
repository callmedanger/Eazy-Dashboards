import React, { useState, useEffect, useRef } from 'react';
import { WORKFLOW_COPY } from '../config/siteConfig';
import { gsap, ScrollTrigger } from '../utils/clock';
import { UploadCloud, CheckCircle, BarChart3, Bell, Smartphone, ArrowRight, Layers } from 'lucide-react';

export const HowItWorksScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    // Natural scroll scrub without screen pinning so the analyzer card is completely visible
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 0.5,
      onUpdate: (self) => {
        const stepIndex = Math.min(3, Math.floor(self.progress * 4));
        setActiveStep(stepIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isReducedMotion]);

  const currentStepData = WORKFLOW_COPY.steps[activeStep];

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative min-h-[90svh] w-full py-12 sm:py-16 bg-sheet-grid-light flex flex-col justify-center border-b border-navy/10 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-navy/20 bg-white text-navy font-mono text-xs tracking-mono mb-3">
            <Layers className="w-3.5 h-3.5 text-teal" />
            <span>{WORKFLOW_COPY.badge}</span>
            <span className="text-navy/40">•</span>
            <span className="text-teal font-semibold">CELL: {currentStepData.cellRef}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-navy tracking-display leading-tightest mb-3">
            {WORKFLOW_COPY.headline}
          </h2>

          <p className="text-base sm:text-lg text-navy/70 font-body">
            {WORKFLOW_COPY.subheadline}
          </p>
        </div>

        {/* 4 Steps Navigation Spine */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {WORKFLOW_COPY.steps.map((s, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-3 sm:p-4 rounded-lg border text-left transition-all duration-200 btn-press cursor-pointer ${
                  isActive
                    ? 'bg-navy text-white border-navy shadow-md'
                    : isCompleted
                    ? 'bg-white text-navy border-teal/40 hover:border-teal'
                    : 'bg-white/60 text-navy/60 border-navy/10 hover:border-navy/30'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs mb-1">
                  <span className={isActive ? 'text-teal font-bold' : 'text-navy/40 font-bold'}>
                    STATE {s.step}
                  </span>
                  <span className="text-[10px] opacity-60">{s.cellRef}</span>
                </div>
                <div className="text-sm sm:text-base font-display font-bold leading-snug">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* The Persistent Transforming Object (The Sheet that becomes the Dashboard) */}
        <div className="w-full bg-white rounded-xl border border-navy/20 shadow-float overflow-hidden">
          {/* Persistent Chrome Bar */}
          <div className="h-10 bg-[#ECEAE4] border-b border-navy/15 flex items-center justify-between px-4 font-mono text-xs text-navy">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error" />
              <span className="w-2.5 h-2.5 rounded-full bg-gold" />
              <span className="w-2.5 h-2.5 rounded-full bg-teal" />
              <span className="ml-2 font-bold text-navy">
                Eazy_Transformation_Engine // {currentStepData.title.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-teal font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span>{currentStepData.statusText}</span>
            </div>
          </div>

          {/* Canvas Area that morphs continuously through 4 states */}
          <div className="p-5 sm:p-7 min-h-[300px] flex flex-col justify-center">
            {/* STATE 01: Upload (Raw Sheet Dropping In) */}
            {activeStep === 0 && (
              <div className="animate-in fade-in duration-300">
                <div className="border-2 border-dashed border-teal/50 rounded-lg p-8 bg-teal/5 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center text-teal mb-4 animate-bounce">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-navy mb-2">
                    Drop your Excel workbook, CSV or register ledger
                  </h4>
                  <p className="text-sm font-mono text-navy/60 max-w-md mb-4">
                    Sales_Karachi_2026.xlsx • 1,840 records detected • 12 columns
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 rounded bg-white border border-navy/10 text-xs font-mono text-navy">
                      .XLSX
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white border border-navy/10 text-xs font-mono text-navy">
                      .CSV
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white border border-navy/10 text-xs font-mono text-navy">
                      GOOGLE SHEETS
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white border border-navy/10 text-xs font-mono text-navy">
                      WHATSAPP LEDGER
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STATE 02: Map (Columns auto-labeled with smart badges) */}
            {activeStep === 1 && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-4 flex items-center justify-between text-xs font-mono text-navy/70">
                  <span className="font-bold text-navy">COLUMN PARSER & AUDIT VALIDATOR</span>
                  <span className="text-teal font-semibold">100% Schema Auto-Detected</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
                  {[
                    { col: 'Col A', name: 'Transaction Date', type: 'DATE (YYYY-MM-DD)', sample: '2026-10-02' },
                    { col: 'Col B', name: 'Party / Customer', type: 'TEXT (Urdu/Eng)', sample: 'Tariq Traders LHR' },
                    { col: 'Col C', name: 'Gross Sale (PKR)', type: 'CURRENCY (PKR)', sample: 'PKR 168,000' },
                    { col: 'Col D', name: 'Payment Status', type: 'ENUM (Paid / Credit)', sample: 'Partially Recovered' },
                  ].map((field) => (
                    <div key={field.col} className="p-3.5 rounded border border-teal/40 bg-teal/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-teal font-bold">{field.col}</span>
                        <CheckCircle className="w-3.5 h-3.5 text-teal" />
                      </div>
                      <div className="font-bold text-navy text-sm">{field.name}</div>
                      <div className="text-[10px] text-navy/50 mt-1">{field.type}</div>
                      <div className="mt-2 text-[11px] bg-white px-2 py-1 rounded border border-navy/10 text-navy">
                        Ex: {field.sample}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STATE 03: Live (Interactive KPI Cards & Visual Charts) */}
            {activeStep === 2 && (
              <div className="animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-[#FAF8F5] border border-navy/10">
                    <span className="text-[11px] font-mono text-navy/50 block">MONTHLY REVENUE</span>
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-navy">PKR 4,820,000</span>
                    <span className="text-teal font-mono text-xs block mt-1">+14.6% vs target</span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF8F5] border border-navy/10">
                    <span className="text-[11px] font-mono text-navy/50 block">CASH COLLECTED (REVENUE)</span>
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-gold">PKR 3,940,000</span>
                    <span className="text-navy/60 font-mono text-xs block mt-1">81.7% Recovery</span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF8F5] border border-navy/10">
                    <span className="text-[11px] font-mono text-navy/50 block">OUTSTANDING CUSTOMER CREDIT</span>
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-navy">PKR 880,000</span>
                    <span className="text-error font-mono text-xs block mt-1">4 accounts overdue</span>
                  </div>
                </div>

                {/* CSS Bar Chart */}
                <div className="p-4 rounded border border-navy/10 bg-white">
                  <div className="flex items-center justify-between text-xs font-mono text-navy/70 mb-2">
                    <span className="font-bold text-navy">WEEKLY REVENUE TREND (PKR LAKHS)</span>
                    <span className="text-teal font-medium">Auto-Refreshed</span>
                  </div>
                  <div className="h-28 flex items-end gap-4 pt-2">
                    {[
                      { week: 'W1', height: 50, val: '8.4L' },
                      { week: 'W2', height: 68, val: '11.2L' },
                      { week: 'W3', height: 85, val: '14.1L' },
                      { week: 'W4', height: 95, val: '14.5L' },
                    ].map((bar) => (
                      <div key={bar.week} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <span className="text-[10px] font-mono font-semibold text-navy/60">{bar.val}</span>
                        <div
                          className="w-full bg-teal rounded-t transition-all duration-300"
                          style={{ height: `${bar.height}%` }}
                        />
                        <span className="text-[10px] font-mono text-navy/50">{bar.week}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STATE 04: Alert (Phone WhatsApp preview & recovery alert) */}
            {activeStep === 3 && (
              <div className="animate-in fade-in duration-300 max-w-md mx-auto w-full">
                {/* Smartphone Preview Chrome */}
                <div className="rounded-2xl border-4 border-navy bg-[#0A0C10] p-4 text-white shadow-2xl">
                  {/* Phone Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px] font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal animate-ping" />
                      <span className="text-teal font-semibold">WhatsApp Cloud Bot</span>
                    </div>
                    <span className="text-white/40">9:00 PM Daily</span>
                  </div>

                  {/* Chat Bubble / Message Card */}
                  <div className="mt-3 p-3.5 rounded-lg bg-[#141A24] border border-white/10 font-mono text-xs">
                    <div className="text-gold font-bold text-sm mb-1">
                      📊 Eazy Daily Business Brief
                    </div>
                    <div className="text-white/80 space-y-1 text-[11px]">
                      <div>• Today&apos;s Revenue: <span className="text-white font-bold">PKR 312,500</span></div>
                      <div>• Cash in Hand: <span className="text-teal font-bold">PKR 240,000</span></div>
                      <div>• Overdue Credit: <span className="text-error font-bold">PKR 72,500</span></div>
                    </div>

                    {/* Smart Alert Badge */}
                    <div className="mt-3 p-2 rounded bg-error/15 border border-error/30 text-error flex items-center gap-2 text-[10px]">
                      <Bell className="w-3.5 h-3.5 shrink-0" />
                      <span>ALERT: 2 customers crossed 30-day payment term.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="bg-[#FAF8F5] border-t border-navy/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-navy/70">
              <span className="font-semibold text-navy">ACTION: </span>
              {currentStepData.action}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 0))}
                disabled={activeStep === 0}
                className="px-3 py-1.5 rounded border border-navy/20 font-mono text-xs text-navy disabled:opacity-30 btn-press"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev < 3 ? prev + 1 : 0))}
                className="px-4 py-1.5 rounded bg-navy text-white font-mono text-xs flex items-center gap-1.5 btn-press shadow-xs"
              >
                <span>{activeStep === 3 ? 'Restart Flow' : 'Next State'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
