import React, { useState } from 'react';
import { X, MessageSquare, CheckCheck, Smartphone, Send, ArrowRight, Bell, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface WhatsAppSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppSimulatorModal: React.FC<WhatsAppSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'credit' | 'stock'>('daily');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0B141A] rounded-3xl border-2 border-teal/40 shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Phone Notch & WhatsApp Header */}
        <div className="bg-[#1F2C34] px-4 py-3 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center text-white font-bold font-mono">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                <span>Eazy ERP Cloud Bot</span>
                <span className="w-2 h-2 rounded-full bg-[#00A884] animate-pulse" />
              </div>
              <div className="text-[11px] text-white/50 font-mono">Official Verified Business</div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#111B21] px-3 py-2 flex gap-1 border-b border-white/5 font-mono text-[11px]">
          <button
            onClick={() => {
              setActiveTab('daily');
              sound.playTick();
            }}
            className={`flex-1 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'daily' ? 'bg-[#00A884] text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            9:00 PM Summary
          </button>
          <button
            onClick={() => {
              setActiveTab('credit');
              sound.playTick();
            }}
            className={`flex-1 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'credit' ? 'bg-[#00A884] text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            Credit Recovery
          </button>
          <button
            onClick={() => {
              setActiveTab('stock');
              sound.playTick();
            }}
            className={`flex-1 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'stock' ? 'bg-[#00A884] text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            Warehouse Alert
          </button>
        </div>

        {/* WhatsApp Chat Area */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        >
          <div className="text-center">
            <span className="px-2.5 py-1 rounded bg-[#182229] text-[10px] text-white/40 uppercase">
              Today • Closing Time 21:00
            </span>
          </div>

          {activeTab === 'daily' && (
            <div className="bg-[#005C4B] p-4 rounded-xl rounded-tl-none border border-white/10 text-white max-w-[90%] shadow-md animate-in fade-in">
              <div className="font-bold text-sm text-[#53BDEB] mb-2 flex items-center justify-between">
                <span>📊 Eazy Daily Business Brief</span>
                <span className="text-[10px] text-white/60">21:00</span>
              </div>

              <div className="space-y-1.5 text-[11px] leading-relaxed">
                <div>Good evening! Here is today&apos;s closing business summary:</div>
                <div className="border-t border-white/15 my-2 pt-2" />
                <div className="flex justify-between">
                  <span className="text-white/70">• Today&apos;s Total Sales:</span>
                  <span className="font-bold text-[#E9EDEF]">PKR 684,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">• Cash in Counter Drawer:</span>
                  <span className="font-bold text-[#25D366]">PKR 412,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">• Online Bank / Raast:</span>
                  <span className="font-bold text-[#E9EDEF]">PKR 272,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">• Total Bills Invoiced:</span>
                  <span className="font-bold text-[#E9EDEF]">84 Invoices</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">• Today&apos;s Net Margin:</span>
                  <span className="font-bold text-[#FFD700]">31.4% (Net Profit)</span>
                </div>
                <div className="border-t border-white/15 my-2 pt-2 text-[10px] text-[#25D366] flex items-center gap-1 font-semibold">
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Drawer cash verified with register closing.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'credit' && (
            <div className="bg-[#005C4B] p-4 rounded-xl rounded-tl-none border border-white/10 text-white max-w-[90%] shadow-md animate-in fade-in">
              <div className="font-bold text-sm text-[#53BDEB] mb-2 flex items-center justify-between">
                <span>💰 1-Click Credit Reminder</span>
                <span className="text-[10px] text-white/60">Auto-Generated</span>
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <div>
                  <span className="text-white/70">Customer: </span>
                  <span className="font-bold">Bilal Ahmed & Co (Shop #4)</span>
                </div>
                <div className="p-2.5 rounded bg-[#0B141A]/50 border border-white/10 text-[10px] space-y-1">
                  <div>Pending Balance: <span className="text-[#FF7043] font-bold">PKR 145,000</span></div>
                  <div>Last Bill: INV-8019 (24-Sep-2026)</div>
                  <div>Terms: 15-Day Cycle (Crossed 30 Days)</div>
                </div>
                <div className="text-[11px] italic text-white/80">
                  &ldquo;Dear Customer, your outstanding monthly account balance of PKR 145,000 is pending. Please arrange payment via Bank or Raast transfer. Thank you!&rdquo;
                </div>
                <div className="pt-2 flex items-center justify-between text-[10px] text-[#25D366]">
                  <span>Detailed Itemized PDF Attached ✓</span>
                  <CheckCheck className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stock' && (
            <div className="bg-[#005C4B] p-4 rounded-xl rounded-tl-none border border-white/10 text-white max-w-[90%] shadow-md animate-in fade-in">
              <div className="font-bold text-sm text-[#FF7043] mb-2 flex items-center justify-between">
                <span>⚠️ Low Stock & Expiry Alert</span>
                <span className="text-[10px] text-white/60">Warehouse #2</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded bg-black/40 border border-[#FF7043]/30 text-[10px] space-y-1">
                  <div className="text-white font-bold">• Basmati Rice 25kg Bags</div>
                  <div className="text-white/70">Remaining: <span className="text-[#FF7043] font-bold">4 Bags</span> (Minimum safe level: 25 Bags)</div>
                  <div className="text-white/70">Estimated Run-out: <span className="text-[#FF7043] font-bold">Tomorrow afternoon</span></div>
                </div>
                <div className="text-[10px] text-white/80">
                  Supplier contact: 0300-1234567. 1-tap reorder PO prepared.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Direct Action */}
        <div className="bg-[#1F2C34] p-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-[11px] font-mono text-white/60">
            Automated daily reports on your phone.
          </div>
          <button
            onClick={() => {
              sound.playChime();
              onClose();
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-full bg-[#00A884] hover:bg-[#06cf9c] text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>Get WhatsApp Setup</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
