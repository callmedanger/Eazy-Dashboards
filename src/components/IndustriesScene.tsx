import React, { useState } from 'react';
import { ShoppingBag, Truck, Dumbbell, Stethoscope, CheckCircle2, ArrowRight } from 'lucide-react';
import { clock } from '../utils/clock';

export const IndustriesScene: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const industries = [
    {
      id: 'retail',
      name: 'Retail Marts & Superstores',
      icon: ShoppingBag,
      headline: 'Built for high-volume counter speed.',
      points: [
        'Scan barcodes and print thermal receipts in under 3 seconds.',
        'Track fast-moving vs slow-moving stock with automated reorder alerts.',
        'Cashier shifts reconciliation at day-end matching register to drawer cash.',
      ],
      metric: '42,000+ Items Supported',
      preview: {
        title: 'Supermart Counter Billing',
        stat1: 'Today\'s Footfall: 680 Customers',
        stat2: 'Avg Checkout Time: 3.2 sec',
      },
    },
    {
      id: 'distribution',
      name: 'Wholesale & Distribution',
      icon: Truck,
      headline: 'Built for route delivery and khata recovery.',
      points: [
        'Manage multiple delivery vans and rider inventory collections.',
        'Customer-wise udhaar ledger with automatic credit limits.',
        'Direct PDF bill dispatch to retailers via WhatsApp.',
      ],
      metric: 'Zero Recovery Leakage',
      preview: {
        title: 'Distribution & Fleet Ledger',
        stat1: 'Active Vans on Route: 6',
        stat2: 'Today\'s Cash Recovered: PKR 1.4M',
      },
    },
    {
      id: 'gyms',
      name: 'Gyms & Fitness Centers',
      icon: Dumbbell,
      headline: 'Built for renewals and member attendance.',
      points: [
        'Automated WhatsApp renewal reminders 3 days before expiry.',
        'Biometric fingerprint & face-scanner integration at turnstile gate.',
        'Trainer commissions calculated instantly from member packages.',
      ],
      metric: '92% On-Time Renewals',
      preview: {
        title: 'Club Member Cockpit',
        stat1: 'Active Members: 410',
        stat2: 'Renewals Due This Week: 28',
      },
    },
    {
      id: 'clinics',
      name: 'Clinics & Pharmacies',
      icon: Stethoscope,
      headline: 'Built for patient queue and batch expiry.',
      points: [
        'Token number display for patient OPD and consultant fee sharing.',
        'Pharmacy batch-number tracking with near-expiry red flags.',
        'Private doctor notes and prescription printing.',
      ],
      metric: 'Zero Expired Medicine Loss',
      preview: {
        title: 'Medical Center Management',
        stat1: 'Patients Seen Today: 94',
        stat2: 'Pharmacy Cash Billed: PKR 265,000',
      },
    },
  ];

  const current = industries[activeTab];
  const IconComponent = current.icon;

  return (
    <section
      id="industries"
      className="relative min-h-[100svh] w-full py-24 bg-sheet-grid-light flex flex-col justify-center border-b border-navy/10 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-navy/15 bg-white text-navy font-mono text-xs tracking-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            <span>CUSTOMIZED FOR YOUR TRADE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-display leading-tightest text-navy mb-4">
            Tailored for Pakistani businesses that{' '}
            <span className="font-editorial-italic font-normal text-teal">
              run on daily numbers.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-navy/70 font-body">
            Choose your sector below to see how Eazy ERP adapts to your daily routine.
          </p>
        </div>

        {/* 4 Clean Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {industries.map((ind, idx) => {
            const TabIcon = ind.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-3 rounded-xl font-mono text-xs tracking-mono transition-all duration-200 btn-press flex items-center gap-2 ${
                  isSelected
                    ? 'bg-navy text-white font-bold shadow-md'
                    : 'bg-white text-navy/70 border border-navy/15 hover:border-navy/40 hover:text-navy'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isSelected ? 'text-teal' : 'text-navy/50'}`} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card (Neutomni Style) */}
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-navy/15 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Benefits & Highlights */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-mono text-teal font-bold uppercase tracking-wider mb-2">
                <IconComponent className="w-4 h-4" />
                <span>{current.name}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-navy mb-6 leading-snug">
                {current.headline}
              </h3>

              <div className="space-y-4 mb-8">
                {current.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-navy/80 font-body">{pt}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  clock.scrollTo('#contact');
                }}
                className="neutomni-link inline-flex items-center gap-2 text-navy font-mono text-xs font-bold uppercase tracking-wider"
              >
                <span>Request Custom Demo for {current.name}</span>
                <span>→</span>
              </a>
            </div>

            {/* Right 5 cols: Sleek Clean Preview Box */}
            <div className="lg:col-span-5 bg-[#F9F9FB] rounded-xl border border-navy/10 p-6 sm:p-8 font-mono">
              <div className="text-xs text-navy/50 mb-2 uppercase tracking-wider">
                MODULE PREVIEW // {current.id.toUpperCase()}
              </div>
              <div className="text-xl font-display font-bold text-navy mb-4">
                {current.preview.title}
              </div>

              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-lg bg-white border border-navy/10 text-xs text-navy/80 font-medium">
                  {current.preview.stat1}
                </div>
                <div className="p-3 rounded-lg bg-white border border-navy/10 text-xs text-navy/80 font-medium">
                  {current.preview.stat2}
                </div>
              </div>

              <div className="pt-4 border-t border-navy/10 flex items-center justify-between text-xs">
                <span className="text-navy/50">INDUSTRY BENCHMARK:</span>
                <span className="text-teal font-bold">{current.metric}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
