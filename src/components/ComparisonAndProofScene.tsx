import React from 'react';
import { Check, X, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { clock } from '../utils/clock';

export const ComparisonAndProofScene: React.FC = () => {
  return (
    <section
      id="comparison"
      className="relative min-h-[100svh] w-full py-24 bg-sheet-grid-dark text-white flex flex-col justify-center border-t border-b border-white/10 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal/40 bg-teal/10 text-teal font-mono text-xs tracking-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span>HONEST COMPARISON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-display leading-[1.1] text-white mb-4">
            Why not keep Excel or <br />
            <span className="font-editorial-italic font-normal text-teal">
              buy a foreign ERP?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-body">
            An unbiased breakdown so you can decide what actually fits your Pakistani operations.
          </p>
        </div>

        {/* 3 Clean Editorial Cards (Neutomni Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Excel & Paper Registers */}
          <div className="p-8 rounded-2xl bg-[#11151D] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-error font-bold tracking-wider uppercase mb-2">
                01 // THE OLD WAY
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                Paper & Excel Sheets
              </h3>
              <p className="text-xs text-white/60 font-body mb-6">
                Works for a small kiosk, but creates bottlenecks as soon as you have more than one person billing.
              </p>

              <div className="space-y-3 font-mono text-xs text-white/70">
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                  <span>Formula errors happen silently</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                  <span>No live view on your phone</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                  <span>Customer udhaar recovery is manual</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                  <span>Stock discrepancies go undetected</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 font-mono text-xs text-error font-semibold">
              Result: You are trapped at the shop late every night.
            </div>
          </div>

          {/* Card 2: Foreign ERPs (SAP/Odoo) */}
          <div className="p-8 rounded-2xl bg-[#11151D] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-white/50 font-bold tracking-wider uppercase mb-2">
                02 // THE EXPENSIVE WAY
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                Foreign Heavy ERPs
              </h3>
              <p className="text-xs text-white/60 font-body mb-6">
                Built for multinational corporations with dedicated IT teams, not local Pakistani shops and distributors.
              </p>

              <div className="space-y-3 font-mono text-xs text-white/70">
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                  <span>Costs $2,000+ in foreign currency</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                  <span>Takes 3 to 6 months to implement</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                  <span>Too complicated for local counter staff</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-error shrink-0 mt-0.5" />
                  <span>No Pakistani WhatsApp / Raast features</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 font-mono text-xs text-white/50 font-semibold">
              Result: High monthly cost, staff refuses to use it.
            </div>
          </div>

          {/* Card 3: Eazy ERP (Featured Card) */}
          <div className="p-8 rounded-2xl bg-[#0B2A5B] border-2 border-teal shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-teal text-navy font-mono text-[10px] font-extrabold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
              BEST FIT
            </div>

            <div>
              <div className="font-mono text-xs text-teal font-bold tracking-wider uppercase mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>03 // THE RIGHT FIT</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                Eazy ERP & Dashboard
              </h3>
              <p className="text-xs text-white/80 font-body mb-6">
                Purpose-built for Pakistani businesses. Simple, fast counter billing, automated WhatsApp recovery, and live mobile control.
              </p>

              <div className="space-y-3 font-mono text-xs text-white">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Affordable fixed PKR pricing (no $ bills)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Up and running within 48 to 72 hours</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Simple Urdu & English interface</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Daily WhatsApp sales summaries to owner</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/20">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  clock.scrollTo('#contact');
                }}
                className="btn-press w-full py-3 rounded-full bg-teal hover:bg-white text-navy font-bold font-mono text-xs tracking-mono flex items-center justify-center gap-2 transition-colors"
              >
                <span>Get Started in PKR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
