import React, { useState, useRef, useEffect, useCallback } from 'react';
import { HERO_COPY, BRAND_NAME } from '../config/siteConfig';
import { clock } from '../utils/clock';
import { ArrowDown, Sparkles, AlertCircle, CheckCircle2, RotateCcw, Smartphone, Zap } from 'lucide-react';

interface CellData {
  row: number;
  col: number;
  colLetter: string;
  val: string;
  isError?: boolean;
  errorLabel?: string;
  isMoney?: boolean;
}

export const HeroScene: React.FC = () => {
  const [isMorphed, setIsMorphed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [highlightedErrors, setHighlightedErrors] = useState<string[]>([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Spreadsheet table rows (Realistic Pakistani sales data)
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const colHeaders = ['Date', 'Invoice #', 'Customer / Party', 'Item Description', 'Rate (PKR)', 'Qty', 'Total (PKR)'];

  const rows: CellData[][] = [
    [
      { row: 1, col: 0, colLetter: 'A', val: '02-Oct-2026' },
      { row: 1, col: 1, colLetter: 'B', val: 'INV-8021' },
      { row: 1, col: 2, colLetter: 'C', val: 'Tariq Traders (LHR)' },
      { row: 1, col: 3, colLetter: 'D', val: '50kg Atta Sacks' },
      { row: 1, col: 4, colLetter: 'E', val: '4,200', isMoney: true },
      { row: 1, col: 5, colLetter: 'F', val: '40' },
      { row: 1, col: 6, colLetter: 'G', val: '168,000', isMoney: true },
    ],
    [
      { row: 2, col: 0, colLetter: 'A', val: '02-Oct-2026' },
      { row: 2, col: 1, colLetter: 'B', val: 'INV-8022' },
      { row: 2, col: 2, colLetter: 'C', val: 'Bilal Ahmed & Co' },
      { row: 2, col: 3, colLetter: 'D', val: 'Mustard Oil 16L' },
      { row: 2, col: 4, colLetter: 'E', val: '7,800', isMoney: true },
      { row: 2, col: 5, colLetter: 'F', val: '10' },
      { row: 2, col: 6, colLetter: 'G', val: '#REF!', isError: true, errorLabel: 'Formula Broken' },
    ],
    [
      { row: 3, col: 0, colLetter: 'A', val: '03-Oct-2026' },
      { row: 3, col: 1, colLetter: 'B', val: 'INV-8021', isError: true, errorLabel: 'Duplicate Invoice' },
      { row: 3, col: 2, colLetter: 'C', val: 'Tariq Traders (LHR)' },
      { row: 3, col: 3, colLetter: 'D', val: '50kg Atta Sacks' },
      { row: 3, col: 4, colLetter: 'E', val: '4,200', isMoney: true },
      { row: 3, col: 5, colLetter: 'F', val: '40' },
      { row: 3, col: 6, colLetter: 'G', val: '168,000', isMoney: true },
    ],
    [
      { row: 4, col: 0, colLetter: 'A', val: '03-Oct-2026' },
      { row: 4, col: 1, colLetter: 'B', val: 'INV-8024' },
      { row: 4, col: 2, colLetter: 'C', val: '[BLANK CUSTOMER]', isError: true, errorLabel: 'Missing Party' },
      { row: 4, col: 3, colLetter: 'D', val: 'Basmati Rice 25kg' },
      { row: 4, col: 4, colLetter: 'E', val: '8,900', isMoney: true },
      { row: 4, col: 5, colLetter: 'F', val: '25' },
      { row: 4, col: 6, colLetter: 'G', val: '222,500', isMoney: true },
    ],
    [
      { row: 5, col: 0, colLetter: 'A', val: '04-Oct-2026' },
      { row: 5, col: 1, colLetter: 'B', val: 'INV-8025' },
      { row: 5, col: 2, colLetter: 'C', val: 'Usman & Sons' },
      { row: 5, col: 3, colLetter: 'D', val: 'Sugar 50kg Bags' },
      { row: 5, col: 4, colLetter: 'E', val: '6,400', isMoney: true },
      { row: 5, col: 5, colLetter: 'F', val: '30' },
      { row: 5, col: 6, colLetter: 'G', val: '192,000', isMoney: true },
    ],
    [
      { row: 6, col: 0, colLetter: 'A', val: '04-Oct-2026' },
      { row: 6, col: 1, colLetter: 'B', val: 'INV-8026' },
      { row: 6, col: 2, colLetter: 'C', val: 'Al-Madina Supermart' },
      { row: 6, col: 3, colLetter: 'D', val: 'Premium Tea Crates' },
      { row: 6, col: 4, colLetter: 'E', val: '12,500', isMoney: true },
      { row: 6, col: 5, colLetter: 'F', val: '15' },
      { row: 6, col: 6, colLetter: 'G', val: '187,500', isMoney: true },
    ],
    [
      { row: 7, col: 0, colLetter: 'A', val: 'SUBTOTAL' },
      { row: 7, col: 1, colLetter: 'B', val: '6 Rows' },
      { row: 7, col: 2, colLetter: 'C', val: 'Manual Khata Count' },
      { row: 7, col: 3, colLetter: 'D', val: 'Sum = #VALUE!' },
      { row: 7, col: 4, colLetter: 'E', val: '-' },
      { row: 7, col: 5, colLetter: 'F', val: '160' },
      { row: 7, col: 6, colLetter: 'G', val: 'PKR 770,000 (MISMATCH)', isError: true, errorLabel: 'Sum Discrepancy' },
    ],
  ];

  // Direct 1:1 Pointer Events dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMorphed) return;
    const container = tableContainerRef.current;
    if (!container) return;

    // Use setPointerCapture for resilient tracking
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    dragStartRef.current = { x, y };
    setIsDragging(true);
    setSelectionBox({ x1: x, y1: y, x2: x, y2: y });
    setSelectedCells(new Set());
    setHighlightedErrors([]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current || !tableContainerRef.current) return;
    const rect = tableContainerRef.current.getBoundingClientRect();
    const currentX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const currentY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const x1 = Math.min(dragStartRef.current.x, currentX);
    const x2 = Math.max(dragStartRef.current.x, currentX);
    const y1 = Math.min(dragStartRef.current.y, currentY);
    const y2 = Math.max(dragStartRef.current.y, currentY);

    setSelectionBox({ x1, y1, x2, y2 });

    // Intersection test with table cells (1:1 direct calculation)
    const cellElements = tableContainerRef.current.querySelectorAll<HTMLElement>('[data-cell-id]');
    const newSelected = new Set<string>();
    const foundErrors: string[] = [];

    cellElements.forEach((cell) => {
      const cellLeft = cell.offsetLeft;
      const cellTop = cell.offsetTop;
      const cellRight = cellLeft + cell.offsetWidth;
      const cellBottom = cellTop + cell.offsetHeight;

      const intersects =
        x1 < cellRight &&
        x2 > cellLeft &&
        y1 < cellBottom &&
        y2 > cellTop;

      if (intersects) {
        const id = cell.getAttribute('data-cell-id')!;
        newSelected.add(id);

        if (cell.getAttribute('data-is-error') === 'true') {
          const err = cell.getAttribute('data-error-label')!;
          if (!foundErrors.includes(err)) foundErrors.push(err);
        }
      }
    });

    setSelectedCells(newSelected);
    setHighlightedErrors(foundErrors);
  };

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    // If selection covers substantial cells (or any error cell was enclosed), trigger morph!
    if (selectedCells.size >= 2 || highlightedErrors.length > 0) {
      triggerMorph();
    } else {
      setSelectionBox(null);
      setSelectedCells(new Set());
    }
  }, [isDragging, selectedCells, highlightedErrors]);

  const triggerMorph = () => {
    setIsMorphed(true);
    setSelectionBox(null);
  };

  const handleReset = () => {
    setIsMorphed(false);
    setSelectedCells(new Set());
    setHighlightedErrors([]);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full pt-28 pb-16 flex flex-col justify-between bg-sheet-grid-light overflow-hidden select-none"
    >
      {/* Hero Central Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center my-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal/30 bg-teal/5 text-navy font-mono text-xs tracking-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
          <span className="font-semibold">{HERO_COPY.badge}</span>
          <span className="text-navy/40">•</span>
          <span>Pakistani SME Analytics</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-navy tracking-display leading-display mb-4">
          Your business deserves <br className="hidden sm:block" />
          <span className="text-teal underline decoration-teal/30 underline-offset-8">better than Sheet1.</span>
        </h1>

        <p className="text-lg sm:text-xl text-navy/75 max-w-2xl mx-auto font-body leading-relaxed mb-6">
          {HERO_COPY.subheadline}
        </p>

        {/* Primary CTA & Interactive Hint */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              clock.scrollTo('#contact');
            }}
            className="btn-press px-6 py-3.5 rounded bg-navy hover:bg-navy-deep text-white font-mono text-xs sm:text-sm tracking-mono font-semibold shadow-md flex items-center gap-2 border border-navy"
          >
            <span>{HERO_COPY.primaryCta}</span>
            <Zap className="w-4 h-4 text-teal" />
          </a>

          {/* Touch / Quick Trigger Button */}
          <button
            type="button"
            onClick={isMorphed ? handleReset : triggerMorph}
            className="btn-press px-5 py-3 rounded border border-teal bg-white/80 hover:bg-white text-navy font-mono text-xs sm:text-sm tracking-mono font-medium shadow-xs flex items-center gap-2"
          >
            {isMorphed ? (
              <>
                <RotateCcw className="w-4 h-4 text-navy/60" />
                <span>Reset to Messy Sheet</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-teal" />
                <span className="sm:hidden">{HERO_COPY.touchPrompt}</span>
                <span className="hidden sm:inline">1-Click Auto Reconcile</span>
              </>
            )}
          </button>
        </div>

        {/* Desktop Drag Prompt */}
        {!isMorphed && (
          <p className="hidden md:block mt-3 text-xs font-mono text-navy/50 tracking-mono">
            💡 {HERO_COPY.selectionPrompt}
          </p>
        )}
      </div>

      {/* Signature Spreadsheet / Live Dashboard Morph Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative">
        <div className="bg-white rounded-lg border border-navy/20 shadow-float overflow-hidden">
          {/* Sheet Chrome Bar */}
          <div className="h-9 bg-[#ECEAE4] border-b border-navy/15 flex items-center justify-between px-3 text-xs font-mono text-navy/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error" />
              <span className="w-2.5 h-2.5 rounded-full bg-gold" />
              <span className="w-2.5 h-2.5 rounded-full bg-teal" />
              <span className="ml-2 font-semibold text-navy">
                {isMorphed ? 'Eazy_Live_Dashboard [SYNCED]' : 'Sales_FINAL_v7_edit.xlsx [UNSAVED RECONCILIATION]'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              {highlightedErrors.length > 0 && !isMorphed && (
                <span className="text-error font-semibold flex items-center gap-1 animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{highlightedErrors.length} Issue(s) Enclosed: {highlightedErrors.join(', ')}</span>
                </span>
              )}
              {isMorphed && (
                <span className="text-teal font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Clean Ledger: 0 Errors</span>
                </span>
              )}
            </div>
          </div>

          {/* Morphing Area */}
          <div className="relative min-h-[380px] sm:min-h-[420px] overflow-hidden">
            {/* STATE 1: Messy Excel Sheet with 1:1 Marquee Drag */}
            <div
              ref={tableContainerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className={`w-full overflow-x-auto transition-opacity ${
                isMorphed ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100'
              }`}
              style={{ touchAction: 'none', cursor: 'cell' }}
            >
              <table className="w-full text-left border-collapse text-xs font-mono select-none">
                <thead>
                  <tr className="bg-[#F2F0E8] border-b border-navy/15 text-navy/70">
                    <th className="w-10 px-2 py-2 border-r border-navy/15 text-center bg-[#E5E2D8] text-[10px] font-bold">
                      #
                    </th>
                    {columns.map((col, idx) => (
                      <th
                        key={col}
                        className="px-3 py-2 border-r border-navy/15 font-semibold text-[11px] text-navy"
                      >
                        <span className="text-teal mr-1">{col}</span>
                        <span className="text-navy/70 text-[10px]">{colHeaders[idx]}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((rowArr, rowIdx) => {
                    const rowNum = rowIdx + 1;
                    return (
                      <tr
                        key={rowNum}
                        className={`border-b border-navy/10 ${
                          rowIdx === rows.length - 1 ? 'bg-[#FAF8F5] font-semibold' : 'hover:bg-teal/5'
                        }`}
                      >
                        <td className="w-10 px-2 py-2 border-r border-navy/15 text-center bg-[#F2F0E8] text-[10px] text-navy/50 font-bold">
                          {rowNum}
                        </td>
                        {rowArr.map((cell) => {
                          const cellId = `${cell.colLetter}${cell.row}`;
                          const isSelected = selectedCells.has(cellId);
                          const isError = cell.isError;

                          return (
                            <td
                              key={cellId}
                              data-cell-id={cellId}
                              data-is-error={isError ? 'true' : 'false'}
                              data-error-label={cell.errorLabel || ''}
                              className={`px-3 py-2 border-r border-navy/10 transition-colors duration-75 relative ${
                                isError
                                  ? 'error-cell text-error bg-error/10 font-bold'
                                  : isSelected
                                  ? 'bg-teal/15 text-navy'
                                  : 'text-navy/90'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className={cell.isMoney ? 'font-mono text-navy font-semibold' : ''}>
                                  {cell.val}
                                </span>
                                {isError && (
                                  <span className="px-1.5 py-0.2 bg-error text-white text-[9px] rounded font-mono uppercase tracking-wider">
                                    {cell.errorLabel}
                                  </span>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* 1:1 Marquee Selection Box */}
              {isDragging && selectionBox && (
                <div
                  className="absolute pointer-events-none border-2 border-teal bg-teal/20 transition-none"
                  style={{
                    left: `${selectionBox.x1}px`,
                    top: `${selectionBox.y1}px`,
                    width: `${selectionBox.x2 - selectionBox.x1}px`,
                    height: `${selectionBox.y2 - selectionBox.y1}px`,
                  }}
                >
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-teal border border-white" />
                </div>
              )}
            </div>

            {/* STATE 2: Clean Live Dashboard Panel (Morphs in with clip-path 500ms cubic-bezier) */}
            <div
              className={`w-full h-full p-6 bg-white ${
                isMorphed
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none absolute inset-0'
              }`}
              style={{
                clipPath: isMorphed
                  ? 'inset(0% 0% 0% 0%)'
                  : 'inset(25% 25% 25% 25%)',
                transition: 'clip-path 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 400ms cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              {/* Header metrics */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-navy/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-teal text-white text-[10px] font-mono font-bold tracking-mono">
                      LIVE RECONCILED
                    </span>
                    <span className="text-xs font-mono text-navy/60">Updated just now via WhatsApp Cloud</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-navy tracking-tight mt-1">
                    Today&apos;s Cleansed Revenue:{' '}
                    <span className="text-gold font-mono font-bold">PKR 938,000</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded border border-teal/30 bg-teal/5 text-right font-mono text-xs">
                    <span className="text-navy/50 block text-[10px]">RECOVERY RATE</span>
                    <span className="text-teal font-bold">100% RECONCILED</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="btn-press px-3 py-1.5 rounded border border-navy/20 hover:border-navy text-navy font-mono text-xs flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-navy/60" />
                    <span>Compare Sheet</span>
                  </button>
                </div>
              </div>

              {/* Grid of Clean KPI Cards & Chart */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 rounded border border-navy/10 bg-[#FAF8F5]">
                  <span className="text-navy/50 text-xs font-mono block">DEDUPLICATED SALES</span>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-navy mt-1">4 Verified Parties</div>
                  <div className="text-teal text-xs font-mono mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>INV-8021 duplicate merged</span>
                  </div>
                </div>

                <div className="p-4 rounded border border-navy/10 bg-[#FAF8F5]">
                  <span className="text-navy/50 text-xs font-mono block">FIXED FORMULA VALUE</span>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-gold mt-1">PKR 78,000</div>
                  <div className="text-teal text-xs font-mono mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>#REF! calculated correctly</span>
                  </div>
                </div>

                <div className="p-4 rounded border border-navy/10 bg-[#FAF8F5]">
                  <span className="text-navy/50 text-xs font-mono block">MOBILE WHATSAPP DIGEST</span>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-teal mt-1">Scheduled 9:00 PM</div>
                  <div className="text-navy/70 text-xs font-mono mt-1 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-teal" />
                    <span>Direct to Owner&apos;s Phone</span>
                  </div>
                </div>
              </div>

              {/* Mini Interactive CSS Chart */}
              <div className="mt-5 p-4 rounded border border-navy/10 bg-white">
                <div className="flex items-center justify-between text-xs font-mono text-navy/60 mb-3">
                  <span className="font-semibold text-navy">HOURLY SALES VELOCITY (PKR)</span>
                  <span className="text-teal font-medium">Synced with Counter Register</span>
                </div>
                <div className="h-28 flex items-end gap-3 pt-4">
                  {[
                    { time: '10 AM', val: 65, pkr: '168k' },
                    { time: '12 PM', val: 40, pkr: '78k' },
                    { time: '2 PM', val: 88, pkr: '222k' },
                    { time: '4 PM', val: 74, pkr: '192k' },
                    { time: '6 PM', val: 96, pkr: '187k' },
                    { time: '8 PM', val: 45, pkr: '91k' },
                  ].map((bar) => (
                    <div key={bar.time} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <span className="text-[10px] font-mono text-navy/40 group-hover:text-teal group-hover:font-bold">
                        {bar.pkr}
                      </span>
                      <div
                        className="w-full bg-navy group-hover:bg-teal rounded-t transition-all duration-300 relative"
                        style={{ height: `${bar.val}%` }}
                      />
                      <span className="text-[10px] font-mono text-navy/60">{bar.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="w-full flex justify-center items-center gap-2 pt-6 pb-2 text-xs font-mono text-navy/50">
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-teal" />
        <span>Scroll to see the transformation</span>
      </div>
    </section>
  );
};
