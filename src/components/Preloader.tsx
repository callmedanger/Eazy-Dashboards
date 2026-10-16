import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from '../utils/clock';
import { Scissors } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const duration = 1400; // 1.4s
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);

      if (rawProgress < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        // Hold at 100% briefly, then trigger the neutomni split curtain opening
        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
          setTimeout(() => {
            ScrollTrigger.refresh();
            setShouldRender(false);
          }, 800);
        }, 200);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  if (!shouldRender) return null;

  // Split digits for rolling odometer
  const hundreds = Math.floor(progress / 100);
  const tens = Math.floor((progress % 100) / 10);
  const ones = progress % 10;

  return (
    <div
      className={`fixed inset-0 z-[999999] pointer-events-none select-none overflow-hidden transition-opacity duration-300 ${
        isDone ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* ================= TOP COVER (60% Height) ================= */}
      <div
        className={`absolute top-0 left-0 right-0 h-[60%] bg-[#0A0C10] flex flex-col justify-between p-6 sm:p-10 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isDone ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between font-mono text-[11px] text-white/50 tracking-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
            <span className="text-white font-semibold">EAZY Dashboard // INITIALIZING</span>
          </div>
          <div>PAKISTAN EDITION</div>
        </div>

        {/* Center: Oversized Brand Typography (neutomni style) */}
        <div className="max-w-4xl mx-auto w-full text-center">
          <div className="overflow-hidden">
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-display text-white transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] translate-y-0">
              EAZY <span className="text-teal"> Dashboard</span>
            </h1>
          </div>
          <p className="font-mono text-xs sm:text-sm text-white/60 tracking-mono mt-3 uppercase">
            Powering Pakistani Business Off Excel & Paper Khatas
          </p>
        </div>

        {/* Empty bottom spacer inside top cover */}
        <div />
      </div>

      {/* ================= SPLIT CUTTING LINE (Neutomni Scissor Cut) ================= */}
      <div
        className={`absolute top-[60%] left-0 right-0 z-20 pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isDone ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transform: 'translateY(-50%)' }}
      >
        {/* Dashed Background Line */}
        <div className="w-full border-t border-dashed border-white/20 relative">
          {/* Solid Teal Cutting Line that expands with progress */}
          <div
            className="absolute top-[-1px] left-0 h-[2px] bg-teal shadow-[0_0_10px_#1BA6A6] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />

          {/* Cutting Scissors and Text moving across the line */}
          <div
            className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2 transition-all duration-75 text-white"
            style={{ left: `${Math.min(94, Math.max(2, progress))}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="w-7 h-7 rounded-full bg-navy border border-teal text-teal flex items-center justify-center shadow-lg transform -rotate-45">
              <Scissors className="w-3.5 h-3.5 text-teal" />
            </div>
            <span className="hidden sm:inline font-mono text-[10px] text-teal tracking-widest uppercase font-bold whitespace-nowrap bg-black/60 px-2 py-0.5 rounded border border-teal/30">
              CUT ALONG LINE
            </span>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM COVER (40% Height) ================= */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[40%] bg-[#0A0C10] flex flex-col justify-between p-6 sm:p-10 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isDone ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      >
        {/* Rolling Odometer Counter (Neutomni Style) */}
        <div className="max-w-4xl mx-auto w-full pt-4 flex flex-col items-center">
          <div className="flex items-center gap-1 font-mono font-bold text-4xl sm:text-5xl text-white">
            {/* Hundreds */}
            <div className="h-12 w-8 overflow-hidden relative border border-white/10 rounded bg-[#11151D] flex items-center justify-center">
              <span className="transition-transform duration-150">{hundreds}</span>
            </div>

            {/* Tens */}
            <div className="h-12 w-8 overflow-hidden relative border border-white/10 rounded bg-[#11151D] flex items-center justify-center">
              <span className="transition-transform duration-100">{tens}</span>
            </div>

            {/* Ones */}
            <div className="h-12 w-8 overflow-hidden relative border border-white/10 rounded bg-[#11151D] flex items-center justify-center">
              <span className="transition-transform duration-75 text-teal">{ones}</span>
            </div>

            <span className="text-teal text-2xl font-bold ml-1">%</span>
          </div>

          <div className="mt-3 font-mono text-xs text-white/50 tracking-mono">
            {progress < 40 && 'Auditing inventory catalog & pricing tiers...'}
            {progress >= 40 && progress < 80 && 'Migrating customer khatas & supplier balances...'}
            {progress >= 80 && 'POS Billing & Live Dashboard Ready.'}
          </div>
        </div>

        {/* Bottom Utility Footer */}
        <div className="flex items-center justify-between font-mono text-[11px] text-white/40 border-t border-white/10 pt-3">
          <span>MODULES: POS • INVENTORY • KHATA • MOBILE</span>
          <span className="text-teal font-semibold">SECURE CLOUD 256-BIT</span>
        </div>
      </div>
    </div>
  );
};
