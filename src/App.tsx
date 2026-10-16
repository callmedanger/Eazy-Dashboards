import React, { useState, useEffect } from 'react';
import { clock } from './utils/clock';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroScene } from './components/HeroScene';
import { ProblemScene } from './components/ProblemScene';
import { TransformationScene } from './components/TransformationScene';
import { HowItWorksScene } from './components/HowItWorksScene';
import { FeaturesScene } from './components/FeaturesScene';
import { IndustriesScene } from './components/IndustriesScene';
import { RoiCalculator } from './components/RoiCalculator';
import { ComparisonAndProofScene } from './components/ComparisonAndProofScene';
import { FaqScene } from './components/FaqScene';
import { ContactAndFooterScene } from './components/ContactAndFooterScene';
import { FloatingDock } from './components/FloatingDock';
import { WhatsAppSimulatorModal } from './components/WhatsAppSimulatorModal';

export const App: React.FC = () => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  useEffect(() => {
    // ONE CLOCK: Initialize Lenis, GSAP ScrollTrigger, and ticker synchronization
    const lenis = clock.init();

    return () => {
      clock.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F5F4F0] text-[#0A0C10] selection:bg-[#1BA6A6]/20 selection:text-[#0B2A5B]">
      {/* High-craft initial spreadsheet preloader (UNTOUCHED) */}
      <Preloader />

      {/* Precision Canvas Cursor (Fine pointers only, never touch) */}
      <CustomCursor />

      {/* Scene 1: Glass Navbar */}
      <Navbar />

      {/* Main Content: Scenes */}
      <main className="relative">
        {/* Scene 2: Hero (UNTOUCHED - Messy Sheet 1:1 Marquee Drag to Live Dashboard) */}
        <HeroScene />

        {/* Scene 3: Problem (Dark, 5 Typographic Pain Rows with Cell Micro-Visuals) */}
        <ProblemScene />

        {/* Scene 4: The Transformation (Before & After Slider) */}
        <TransformationScene />

        {/* Scene 5: How It Works (4-State Transforming Object Spine) */}
        <HowItWorksScene />

        {/* Scene 6: Features (Dark Bento Grid with Spotlight Glow Borders & Micro-Visuals) */}
        <FeaturesScene />

        {/* Interactive Revenue Leakage & ROI Calculator */}
        <RoiCalculator />

        {/* Scene 7: Industries (Light, Drag-able Tab Strip, 7 Pakistani Sectors, Financial Strip) */}
        <IndustriesScene />

        {/* Scene 8: Why Not Excel/ERP (Dark Comparison Matrix) */}
        <ComparisonAndProofScene />

        {/* Scene 10: FAQ (Fast <=200ms Interruptible Accordion) */}
        <FaqScene />

        {/* Scene 11 & 12: Contact & Footer (Dark Onboarding Form & Inspection Lens Logo) */}
        <ContactAndFooterScene />
      </main>

      {/* Modern Floating Action Dock (Sound, WhatsApp, ROI shortcut, Demo) */}
      <FloatingDock onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)} />

      {/* WhatsApp 9:00 PM Daily Brief Simulator Modal */}
      <WhatsAppSimulatorModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />
    </div>
  );
};

export default App;
