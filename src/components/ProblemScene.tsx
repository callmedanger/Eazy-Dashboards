import React from 'react';
import { FileQuestion, AlertTriangle, Smartphone, EyeOff } from 'lucide-react';

export const ProblemScene: React.FC = () => {
  const problems = [
    {
      num: '01',
      tag: 'THE EXCEL TRAP',
      title: '5 files, 5 versions — none match.',
      desc: 'Your cashier, accountant, and partner all edit different copies of the same sheet. By 8:00 PM, nobody knows which total is real.',
      callout: 'Hours lost fixing formulas',
      icon: FileQuestion,
    },
    {
      num: '02',
      tag: 'UNRECOVERED UDHAAR',
      title: 'Ledgers scattered across paper registers.',
      desc: 'Customer balances are scribbled on notebooks. When a customer walks in, you cannot verify their pending dues in 5 seconds.',
      callout: 'Thousands stuck in khata',
      icon: AlertTriangle,
    },
    {
      num: '03',
      tag: 'THE GODOWN BLINDSPOT',
      title: 'Stock leaves without an instant entry.',
      desc: 'You only find out an item is out of stock when a customer asks for it and walks away to your competitor across the road.',
      callout: 'Silent loss of daily sales',
      icon: EyeOff,
    },
  ];

  return (
    <section
      id="problem"
      className="relative min-h-[100svh] w-full py-24 bg-sheet-grid-dark text-white flex flex-col justify-center border-t border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-error/40 bg-error/10 text-error font-mono text-xs tracking-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
            <span>THE PROBLEM WITH PAPER & EXCEL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-display leading-[1.1] text-white mb-4">
            Your numbers are scattered.{' '}
            <span className="font-editorial-italic font-normal text-error">
              Your decisions are late.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-body leading-relaxed">
            Running a growing business on spreadsheets and paper registers creates silent leaks in stock, cash, and recovery.
          </p>
        </div>

        {/* 3 Clean Editorial Problem Cards (Neutomni Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="p-8 rounded-2xl bg-[#11151D] border border-white/10 hover:border-error/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-6 text-white/40">
                    <span className="text-error font-bold text-sm">{p.num}</span>
                    <span className="text-[10px] uppercase tracking-widest">{p.tag}</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-error transition-colors leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-sm font-body text-white/65 leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-error">
                  <span className="font-semibold">{p.callout}</span>
                  <Icon className="w-4 h-4 opacity-70" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
