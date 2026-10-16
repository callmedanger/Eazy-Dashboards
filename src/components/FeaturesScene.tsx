import React, { useState } from 'react';
import { FEATURES_COPY } from '../config/siteConfig';
import { sound } from '../utils/sound';

export const FeaturesScene: React.FC = () => {
  const [urduToggled, setUrduToggled] = useState(false);
  const [roleView, setRoleView] = useState<'owner' | 'manager' | 'branch'>('owner');

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="features"
      className="relative min-h-[100svh] w-full py-24 bg-sheet-grid-dark text-white flex flex-col justify-center border-t border-b border-white/10 overflow-hidden select-none"
    >
      {/* Micro Grid Coordinate */}
      <div className="absolute top-4 left-6 font-mono text-[11px] text-white/30 tracking-mono">
        ROW: 06 | SECTION: BENTO_CAPABILITIES | CELL: A10
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-teal/40 bg-teal/10 text-teal font-mono text-xs tracking-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span>fx = ENGINE_MODULES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-display leading-tightest text-white mb-4">
            Built for how Pakistani businesses <br />
            <span className="text-teal underline decoration-teal/40 underline-offset-8">
              actually operate.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-body">
            No bloated enterprise modules. Every feature directly eliminates a specific daily spreadsheet pain.
          </p>
        </div>

        {/* Bento Grid with Varied Card Sizes and Live Micro-Visuals (No Icons) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Card 1: Live Dashboards (Large 2-col) */}
          <div
            onMouseMove={handleCardMouseMove}
            onClick={() => sound.playClick()}
            className="md:col-span-2 rounded-xl border border-white/10 bg-[#11151D] p-6 flex flex-col justify-between card-press cursor-pointer spotlight-card"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <span className="px-2 py-0.5 rounded bg-teal/20 text-teal border border-teal/30 font-semibold">
                  A10 • REAL-TIME
                </span>
                <span className="text-white/40">Sub-second sync</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                Live Cloud Dashboards
              </h3>
              <p className="text-sm text-white/70 font-body mb-6">
                Real-time revenue, gross margin, expenses, and cash at hand updated the moment an invoice is punched at the counter.
              </p>
            </div>

            {/* Live Micro-Visual: Live Ticking Numbers & Sparkline */}
            <div className="p-4 rounded-lg bg-[#141A24] border border-white/10 font-mono">
              <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                <span>PKR REVENUE (LIVE PULSE)</span>
                <span className="text-teal font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                  +PKR 14,200 just now
                </span>
              </div>
              <div className="text-2xl font-bold text-gold">PKR 3,842,500</div>
              <div className="mt-3 flex items-end gap-1.5 h-12">
                {[40, 60, 45, 75, 55, 90, 80, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-teal rounded-t transition-all duration-300 hover:bg-white"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Roles and Permissions (1-col) */}
          <div
            onMouseMove={handleCardMouseMove}
            onClick={() => sound.playClick()}
            className="rounded-xl border border-white/10 bg-[#11151D] p-6 flex flex-col justify-between card-press cursor-pointer spotlight-card"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 border border-white/15 font-semibold">
                  C10 • SECURITY
                </span>
                <span className="text-white/40">Role Matrix</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Roles & Permissions
              </h3>
              <p className="text-xs text-white/70 font-body mb-4">
                Keep sensitive profit margins invisible to cashiers while granting full visibility to owners.
              </p>
            </div>

            {/* Live Micro-Visual: Interactive Role Switcher */}
            <div className="p-3 rounded-lg bg-[#141A24] border border-white/10 font-mono text-xs">
              <div className="flex gap-1 mb-3">
                {(['owner', 'manager', 'branch'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playTick();
                      setRoleView(r);
                    }}
                    className={`flex-1 py-1 rounded text-[10px] uppercase font-bold transition-colors ${
                      roleView === r ? 'bg-teal text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-white/50">Gross Revenue:</span>
                  <span className="text-white font-bold">VISIBLE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Net Profit Margin:</span>
                  <span className={roleView === 'owner' ? 'text-gold font-bold' : 'text-error font-bold'}>
                    {roleView === 'owner' ? '34.8%' : '████ MASKED'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Daily WhatsApp Reports (1-col) */}
          <div
            onMouseMove={handleCardMouseMove}
            onClick={() => sound.playClick()}
            className="rounded-xl border border-white/10 bg-[#11151D] p-6 flex flex-col justify-between card-press cursor-pointer spotlight-card"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <span className="px-2 py-0.5 rounded bg-teal/20 text-teal border border-teal/30 font-semibold">
                  D10 • AUTOMATION
                </span>
                <span className="text-teal font-semibold">WhatsApp Bot</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Daily WhatsApp Reports
              </h3>
              <p className="text-xs text-white/70 font-body mb-4">
                Every evening at 9:00 PM, get a clean summary sent directly to the owner&apos;s personal phone.
              </p>
            </div>

            {/* Live Micro-Visual: WhatsApp Notification Preview */}
            <div className="p-3 rounded-lg bg-[#075E54]/30 border border-[#25D366]/40 font-mono text-xs text-white">
              <div className="flex items-center justify-between text-[10px] text-[#25D366] mb-1 font-bold">
                <span>EAZY BOT</span>
                <span>21:00</span>
              </div>
              <div className="text-[11px] leading-snug">
                Today&apos;s Sale: <span className="text-white font-bold">PKR 284,000</span>
                <br />
                Cash Recovered: <span className="text-[#25D366] font-bold">PKR 220,000</span>
              </div>
            </div>
          </div>

          {/* Card 4: Staff Data-Entry Forms (1-col) */}
          <div className="rounded-xl border border-white/10 bg-[#11151D] p-6 flex flex-col justify-between card-press cursor-pointer">
            <div>
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 border border-white/15 font-semibold">
                  B10 • ERROR-PROOF
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Staff Data-Entry Forms
              </h3>
              <p className="text-xs text-white/70 font-body mb-4">
                Staff fill clean numeric inputs. Accidental formula deletion is physically impossible.
              </p>
            </div>

            {/* Live Micro-Visual: Formula Lock */}
            <div className="p-3 rounded bg-[#141A24] border border-white/10 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/60">Formulas:</span>
                <span className="text-teal font-bold">🔒 LOCKED (SERVER-SIDE)</span>
              </div>
              <div className="h-6 bg-white/5 rounded border border-white/15 px-2 flex items-center text-[10px] text-white/50">
                Amount: PKR [18,500] ✓
              </div>
            </div>
          </div>

          {/* Card 5: Smart Financial Alerts (1-col) */}
          <div className="rounded-xl border border-white/10 bg-[#11151D] p-6 flex flex-col justify-between card-press cursor-pointer">
            <div>
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <span className="px-2 py-0.5 rounded bg-error/20 text-error border border-error/30 font-semibold">
                  E10 • RED WARNING ONLY
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Smart Financial Alerts
              </h3>
              <p className="text-xs text-white/70 font-body mb-4">
                Red appears ONLY for critical cash risks: overdue credit lines, stockouts, and tax anomalies.
              </p>
            </div>

            {/* Live Micro-Visual: Red Alert Banner */}
            <div className="p-3 rounded bg-error/15 border border-error/40 font-mono text-xs text-error">
              <div className="text-[10px] font-bold">OVERDUE RECOVERY WARNING</div>
              <div className="text-[11px] text-white/80 mt-1">
                Tariq Traders: PKR 168k unpaid past 45 days.
              </div>
            </div>
          </div>

          {/* Card 6: Two-Way Excel Sync (1-col) */}
          <div className="rounded-xl border border-white/10 bg-[#11151D] p-6 flex flex-col justify-between card-press cursor-pointer">
            <div>
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 border border-white/15 font-semibold">
                  F10 • HYBRID SYNC
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Two-Way Excel Sync
              </h3>
              <p className="text-xs text-white/70 font-body mb-4">
                Keep your desktop Excel file if you prefer. We continuously sync updates in both directions.
              </p>
            </div>

            {/* Live Micro-Visual: 2-way sync bridge */}
            <div className="p-3 rounded bg-[#141A24] border border-white/10 font-mono text-xs flex items-center justify-between">
              <span className="text-white/60">.XLSX</span>
              <span className="text-teal font-bold animate-pulse">⇄ SYNCED ⇄</span>
              <span className="text-teal">EAZY CLOUD</span>
            </div>
          </div>

          {/* Card 7: Urdu + English Localization (1-col) */}
          <div className="rounded-xl border border-white/10 bg-[#11151D] p-6 flex flex-col justify-between card-press cursor-pointer">
            <div>
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <span className="px-2 py-0.5 rounded bg-teal/20 text-teal border border-teal/30 font-semibold">
                  H10 • LOCALIZED
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUrduToggled(!urduToggled);
                  }}
                  className="text-[10px] font-mono text-teal underline"
                >
                  Toggle Language
                </button>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                {urduToggled ? 'اردو اور انگریزی' : 'Urdu + English'}
              </h3>
              <p className="text-xs text-white/70 font-body mb-4">
                Native terminology tailored for local bazaars: Wasooli, Khata, Udhaar, and Munafa.
              </p>
            </div>

            {/* Live Micro-Visual: Dual terminology */}
            <div className="p-3 rounded bg-[#141A24] border border-white/10 font-mono text-xs flex items-center justify-between">
              <span className="text-white/60">Cash Collected:</span>
              <span className="text-gold font-bold font-sans">
                {urduToggled ? 'وصولی: PKR 39.4L' : 'Wasooli: PKR 39.4L'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
