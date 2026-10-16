import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../utils/clock';
import { Sliders, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const TransformationScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visualWrapperRef = useRef<HTMLDivElement | null>(null);
  const [sliderProgress, setSliderProgress] = useState(0.2); // Start showing mostly before
  const isDraggingRef = useRef(false);

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Small delay to ensure layout and images are settled
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        // Only update from scroll if not actively user-dragging
        if (!isDraggingRef.current) {
          // progress from 0 to 1
          const p = Math.max(0, Math.min(1, self.progress));
          setSliderProgress(p);
        }
      },
    });

    return () => {
      clearTimeout(timer);
      trigger.kill();
    };
  }, []);

  // Direct Interactive Pointer Drag Handler on Visual Frame
  const updatePositionFromClientX = useCallback((clientX: number) => {
    if (!visualWrapperRef.current) return;
    const rect = visualWrapperRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const clampedProgress = Math.max(0, Math.min(1, relativeX / rect.width));
    setSliderProgress(clampedProgress);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const setPreset = (val: number) => {
    setSliderProgress(val);
  };

  const percent = Math.round(sliderProgress * 100);

  return (
    <section
      id="transformation"
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#F5F4F0] via-[#11151D] to-[#0A0C10] px-4 sm:px-6 lg:px-8 py-16 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal/30 bg-teal/10 text-teal font-mono text-xs tracking-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE SHIFT: FROM KHATA TO CLOUD</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-display leading-tightest mb-3">
            From 10:00 PM reconciliation panic <br />
            <span className="text-teal">to complete peace of mind.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 font-body">
            Scroll down or drag the slider right to reveal the live dashboard.
          </p>

          {/* Quick Jump Buttons */}
          <div className="flex items-center justify-center gap-2 mt-4 font-mono text-xs">
            <button
              type="button"
              onClick={() => setPreset(0.05)}
              className={`px-3 py-1 rounded border transition-colors btn-press ${
                sliderProgress < 0.2
                  ? 'bg-error/20 border-error text-error font-bold'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
              }`}
            >
              Paper Chaos (0%)
            </button>
            <button
              type="button"
              onClick={() => setPreset(0.5)}
              className={`px-3 py-1 rounded border transition-colors btn-press ${
                sliderProgress >= 0.4 && sliderProgress <= 0.6
                  ? 'bg-white/20 border-white text-white font-bold'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
              }`}
            >
              Compare Split (50%)
            </button>
            <button
              type="button"
              onClick={() => setPreset(0.95)}
              className={`px-3 py-1 rounded border transition-colors btn-press ${
                sliderProgress > 0.8
                  ? 'bg-teal/20 border-teal text-teal font-bold'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
              }`}
            >
              Live Dashboard (100%)
            </button>
          </div>
        </div>

        {/* Dual Photography Frame with Reliable Clip-Path Split */}
        <div
          ref={visualWrapperRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black cursor-ew-resize select-none touch-none"
        >
          {/* Base Layer: BEFORE IMAGE (Stressed owner, registers, messy Excel) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <img
              src="/before.jpg"
              alt="Pakistani business owner stressed at desk with paper registers and messy Excel sheets"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Before Badge */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-md bg-black/80 backdrop-blur-md border border-error/50 text-error font-mono text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              <span>BEFORE: Paper Khatas & Broken Formulas</span>
            </div>
          </div>

          {/* Top Layer: AFTER IMAGE (Revealed from Left to Right as slider moves right!) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none transition-none"
            style={{
              clipPath: `polygon(0 0, ${sliderProgress * 100}% 0, ${sliderProgress * 100}% 100%, 0 100%)`,
            }}
          >
            <img
              src="/after.jpg"
              alt="Same Pakistani business owner relaxed with Eazy Dashboard live analytics"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* After Badge */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-md bg-black/80 backdrop-blur-md border border-teal/50 text-teal font-mono text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span>AFTER: Live Dashboard on Phone & Laptop</span>
            </div>
          </div>

          {/* Vertical Slider Divider Line & Draggable Handle */}
          <div
            className="absolute top-0 bottom-0 z-30 w-[3px] bg-teal pointer-events-none shadow-[0_0_12px_#1BA6A6]"
            style={{
              left: `${sliderProgress * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {/* Drag Handle Knob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center shadow-xl border-2 border-teal pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
              <Sliders className="w-4 h-4 text-teal" />
            </div>
          </div>
        </div>

        {/* Progress & Guidance Caption */}
        <div className="mt-4 flex items-center justify-between w-full max-w-4xl px-2 font-mono text-xs text-white/50">
          <span className="flex items-center gap-1.5 text-error font-medium">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>0% Chaos</span>
          </span>

          <span className="text-teal font-bold text-sm bg-white/5 px-3 py-1 rounded-full border border-teal/30">
            {percent}% Reconciled
          </span>

          <span className="flex items-center gap-1.5 text-teal font-medium">
            <span>100% Live Dashboard</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </section>
  );
};
