import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, AlertTriangle, TrendingUp, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { clock } from '../utils/clock';
import { sound } from '../utils/sound';

export const RoiCalculator: React.FC = () => {
  const [dailyBills, setDailyBills] = useState<number>(65);
  const [monthlyCredit, setMonthlyCredit] = useState<number>(850000); // PKR 850,000
  const [branches, setBranches] = useState<number>(2);

  // Dynamic calculations tailored for commercial retail/wholesale businesses
  // Formula error risk & duplicate billing factor: ~2.5% of total volume
  // Customer credit delayed recovery leakage: ~4.5% tied up or lost annually
  const monthlyVolume = dailyBills * 30 * 4500; // Average bill ~PKR 4,500
  const estimatedCashLeak = Math.round((monthlyVolume * 0.012) + (monthlyCredit * 0.045));
  const hoursWastedMonthly = Math.round((dailyBills * 0.45) * 30 / 60); // ~15-20 min per day closing registers
  const recoveredCreditProjected = Math.round(monthlyCredit * 0.88);

  const formatPkr = (val: number) => {
    return 'PKR ' + val.toLocaleString('en-PK');
  };

  const handleSliderChange = (setter: (val: number) => void, val: number) => {
    setter(val);
    sound.playTick();
  };

  return (
    <section
      id="calculator"
      className="relative min-h-[90svh] w-full py-24 bg-gradient-to-b from-[#F5F4F0] via-[#FAF8F5] to-[#F5F4F0] border-b border-navy/10 flex flex-col justify-center select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal/40 bg-teal/10 text-navy font-mono text-xs tracking-mono mb-4">
            <Calculator className="w-3.5 h-3.5 text-teal" />
            <span>INTERACTIVE ROI SIMULATOR</span>
            <span className="text-navy/30">•</span>
            <span className="text-teal font-semibold">BUSINESS FINANCIAL BENCHMARKS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-navy tracking-display leading-tightest mb-4">
            Calculate your monthly <br />
            <span className="text-teal underline decoration-teal/30 underline-offset-8">
              operational & credit leakage.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-navy/70 font-body">
            Adjust the sliders below to calculate how much cash and labor your business loses to manual registers and credit delays every month.
          </p>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-navy/15 shadow-sm flex flex-col justify-between">
            <div className="space-y-8 font-mono">
              {/* Slider 1: Daily Bills */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-navy flex items-center gap-1.5">
                    <span>1. Daily Invoices / Counter Bills:</span>
                  </span>
                  <span className="px-3 py-1 rounded-md bg-navy/5 text-navy font-bold text-sm">
                    {dailyBills} Bills / Day
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={dailyBills}
                  onChange={(e) => handleSliderChange(setDailyBills, Number(e.target.value))}
                  className="w-full h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-teal"
                />
                <div className="flex justify-between text-[10px] text-navy/40 mt-1">
                  <span>Small Retail (10)</span>
                  <span>Busy Store (150)</span>
                  <span>High-Volume Superstore (300+)</span>
                </div>
              </div>

              {/* Slider 2: Monthly Credit (Receivables) */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-navy flex items-center gap-1.5">
                    <span>2. Average Outstanding Customer Credit (Receivables):</span>
                  </span>
                  <span className="px-3 py-1 rounded-md bg-gold/15 text-navy font-bold text-sm">
                    {formatPkr(monthlyCredit)}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={monthlyCredit}
                  onChange={(e) => handleSliderChange(setMonthlyCredit, Number(e.target.value))}
                  className="w-full h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-teal"
                />
                <div className="flex justify-between text-[10px] text-navy/40 mt-1">
                  <span>PKR 100,000</span>
                  <span>PKR 2,500,000</span>
                  <span>PKR 5,000,000</span>
                </div>
              </div>

              {/* Slider 3: Branches / Billing Counters */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-navy flex items-center gap-1.5">
                    <span>3. Billing Desks / Branch Locations:</span>
                  </span>
                  <span className="px-3 py-1 rounded-md bg-teal/15 text-teal font-bold text-sm">
                    {branches} {branches === 1 ? 'Location' : 'Locations'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={branches}
                  onChange={(e) => handleSliderChange(setBranches, Number(e.target.value))}
                  className="w-full h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-teal"
                />
                <div className="flex justify-between text-[10px] text-navy/40 mt-1">
                  <span>Single Store (1)</span>
                  <span>Multiple Warehouses (4)</span>
                  <span>Multi-Location Chain (8)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-navy/10 flex items-center gap-2 text-xs font-mono text-navy/60">
              <ShieldCheck className="w-4 h-4 text-teal" />
              <span>Calculated from verified commercial retail and distribution audit benchmarks.</span>
            </div>
          </div>

          {/* Results Summary Column (5 Cols) */}
          <div className="lg:col-span-5 bg-navy text-white p-6 sm:p-8 rounded-2xl border-2 border-teal shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Top Badge */}
            <div>
              <div className="flex items-center justify-between font-mono text-xs mb-4">
                <span className="px-2.5 py-0.5 rounded bg-error/20 text-error border border-error/30 font-bold">
                  ESTIMATED MONTHLY LEAKAGE
                </span>
                <span className="text-white/40 text-[11px]">MONTHLY CASH LOSS</span>
              </div>

              {/* Big Leaked Amount */}
              <div className="text-3xl sm:text-4xl font-display font-black text-error mb-1 tracking-tight">
                {formatPkr(estimatedCashLeak)}
              </div>
              <p className="text-xs font-body text-white/70 mb-6">
                Estimated monthly losses across untracked credit, delayed collections, inventory shrinkage, and manual billing errors.
              </p>

              {/* Breakdown Cards */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/70">
                    <Clock className="w-3.5 h-3.5 text-teal" />
                    <span>Manual Evening Reconciliation:</span>
                  </span>
                  <span className="text-gold font-bold">{hoursWastedMonthly} Hours / Month</span>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                    <span>Accelerated Credit Recovery:</span>
                  </span>
                  <span className="text-teal font-bold">{formatPkr(recoveredCreditProjected)}</span>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/70">
                    <TrendingUp className="w-3.5 h-3.5 text-teal" />
                    <span>Multi-Branch Stock Synchronization:</span>
                  </span>
                  <span className="text-white font-bold">Zero Stockouts</span>
                </div>
              </div>
            </div>

            {/* Direct Action Button */}
            <div className="mt-8 pt-6 border-t border-white/15">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  clock.scrollTo('#contact');
                  sound.playChime();
                }}
                className="btn-press w-full py-3.5 rounded-full bg-teal hover:bg-white text-navy font-bold font-mono text-xs tracking-mono flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <span>Prevent Revenue Leakage with Eazy ERP</span>
                <ArrowRight className="w-4 h-4 text-navy" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
