import React, { useState } from 'react';
import { Volume2, VolumeX, MessageSquare, Calculator, ArrowUpRight, Sparkles } from 'lucide-react';
import { clock } from '../utils/clock';
import { sound } from '../utils/sound';

interface FloatingDockProps {
  onOpenWhatsAppModal: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenWhatsAppModal }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const handleToggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleScrollTo = (id: string) => {
    sound.playClick();
    clock.scrollTo(id);
  };

  return (
    <aside
      aria-label="Quick Action Dock"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none max-w-[94vw]"
    >
      <div className="bg-[#0A0C10]/85 backdrop-blur-xl border border-white/20 text-white rounded-full px-3 sm:px-4 py-2 shadow-2xl flex items-center gap-2 sm:gap-3 font-mono text-xs">
        {/* Sound Toggle Button */}
        <button
          type="button"
          onClick={handleToggleSound}
          title={isMuted ? 'Turn on tactile interaction sound' : 'Mute tactile interaction sound'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 btn-press ${
            !isMuted
              ? 'bg-teal/20 text-teal border border-teal/40 font-bold'
              : 'text-white/60 hover:text-white bg-white/5 border border-white/10'
          }`}
        >
          {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-teal" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{!isMuted ? 'Sound FX On' : 'Sound FX'}</span>
        </button>

        <span className="text-white/20">|</span>

        {/* WhatsApp Preview Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onOpenWhatsAppModal();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors btn-press"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
          <span className="hidden sm:inline">WhatsApp Preview</span>
          <span className="sm:hidden">WhatsApp</span>
        </button>

        {/* ROI Calculator Shortcut */}
        <button
          type="button"
          onClick={() => handleScrollTo('#calculator')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors btn-press"
        >
          <Calculator className="w-3.5 h-3.5 text-gold" />
          <span className="hidden md:inline">Khata Leakage Calc</span>
          <span className="md:hidden">Calc</span>
        </button>

        <span className="text-white/20 hidden sm:inline">|</span>

        {/* Primary Demo Button */}
        <button
          type="button"
          onClick={() => {
            handleScrollTo('#contact');
            sound.playChime();
          }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal text-navy font-bold hover:bg-white transition-colors shadow-sm btn-press"
        >
          <span>Free Demo</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
