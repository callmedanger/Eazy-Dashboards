import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { BRAND_NAME, NAV_LINKS } from '../config/siteConfig';
import { clock } from '../utils/clock';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Top of page
      if (window.scrollY < 120) {
        setActiveSection('hero');
        return;
      }

      // Bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Track sections accurately using rendered viewport bounding rect
      // Section only activates when the focal line (45% down the viewport) is inside its bounds
      const sections = ['hero', 'problem', 'transformation', 'how-it-works', 'features', 'industries', 'comparison', 'faq', 'contact'];
      const focalLine = window.innerHeight * 0.45;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    clock.scrollTo(href, { offset: -64 });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F9F9FB]/90 backdrop-blur-md shadow-xs border-b border-navy/10'
          : 'bg-[#F9F9FB]/75 backdrop-blur-xs border-b border-navy/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center group btn-press cursor-pointer"
          aria-label={`${BRAND_NAME} Home`}
        >
          <Logo variant="color" size="md" />
        </a>

        {/* Desktop Nav Links (Neutomni expanding hover underlines) */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs tracking-mono text-navy/80">
          {NAV_LINKS.slice(0, 5).map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`neutomni-link py-1 transition-colors duration-150 ${
                  isActive ? 'text-teal font-bold' : 'hover:text-navy'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-press hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy hover:bg-teal text-white font-mono text-xs tracking-mono font-medium shadow-sm transition-all duration-300"
          >
            <span>Book a Demo</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-teal group-hover:text-white" />
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded border border-navy/15 text-navy hover:bg-white/60 btn-press"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Origin-Aware, Smooth Spring Enter from Trigger) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-navy/10 bg-[#F5F4F0] px-4 pt-3 pb-6 shadow-xl menu-origin-top animate-in fade-in duration-150">
          <div className="flex flex-col gap-1 font-mono text-xs">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 rounded border border-navy/10 hover:border-teal hover:bg-white flex items-center justify-between text-navy btn-press"
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-teal font-semibold">{link.cell}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="mt-3 w-full py-2.5 px-4 rounded bg-teal text-white text-center font-mono text-xs font-semibold shadow-xs btn-press"
            >
              Book Free ERP Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
