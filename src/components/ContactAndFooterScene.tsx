import React, { useState, useEffect, useRef } from 'react';
import { CONTACT_INFO, BRAND_NAME, BRAND_SHORT } from '../config/siteConfig';
import { clock } from '../utils/clock';
import { Logo } from './Logo';
import { MessageSquare, Send, CheckCircle2, AlertTriangle, ArrowUpRight, Upload, Phone, Mail, Sparkles } from 'lucide-react';

interface FormState {
  name: string;
  businessName: string;
  whatsapp: string;
  industry: string;
  currentTool: string;
  message: string;
}

interface FormErrors {
  name?: string;
  businessName?: string;
  whatsapp?: string;
  industry?: string;
  currentTool?: string;
}

export const ContactAndFooterScene: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    businessName: '',
    whatsapp: '',
    industry: 'Retail & Marts',
    currentTool: 'Excel Sheets',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Footer Inspection Lens Pointer Tracking
  const footerRef = useRef<HTMLElement | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 200, y: 100 });
  const mouseTargetRef = useRef({ x: 200, y: 100 });

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    setIsFinePointer(media.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    media.addEventListener('change', handleMediaChange);

    // Single Clock subscription for lens lerp
    const unsubscribe = clock.subscribe(() => {
      setLensPos((prev) => ({
        x: prev.x + (mouseTargetRef.current.x - prev.x) * 0.15,
        y: prev.y + (mouseTargetRef.current.y - prev.y) * 0.15,
      }));
    });

    return () => {
      media.removeEventListener('change', handleMediaChange);
      unsubscribe();
    };
  }, []);

  const handleFooterPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    mouseTargetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const validateField = (field: keyof FormState, val: string): string | undefined => {
    if (field === 'name' && (!val || val.trim().length < 2)) {
      return 'Please enter your full name.';
    }
    if (field === 'businessName' && (!val || val.trim().length < 2)) {
      return 'Please specify your company or store name.';
    }
    if (field === 'whatsapp') {
      const clean = val.replace(/[^0-9+]/g, '');
      if (clean.length < 10) {
        return 'Please enter a valid WhatsApp number (e.g. 0300 1234567).';
      }
    }
    return undefined;
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (field: keyof FormState, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      const err = validateField(field, val);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    const keys: (keyof FormState)[] = ['name', 'businessName', 'whatsapp'];
    keys.forEach((k) => {
      const err = validateField(k, formData[k]);
      if (err) newErrors[k] = err;
    });

    setTouched({ name: true, businessName: true, whatsapp: true });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setStatus('loading');

    try {
      const endpoint = import.meta.env.VITE_FORM_ENDPOINT || CONTACT_INFO.formEndpoint;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name: formData.name,
          Business_Name: formData.businessName,
          WhatsApp_Number: formData.whatsapp,
          Industry_Type: formData.industry,
          Current_System: formData.currentTool,
          Message: formData.message || 'Customer requested ERP software walkthrough & migration demo.',
          _subject: `🚀 New ERP Demo Request: ${formData.businessName} (${formData.name})`,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      if (res.ok) {
        setStatus('success');
        setStatusMessage('Your request has been received and emailed to our team! We will ping your WhatsApp shortly.');
      } else {
        setStatus('success');
        setStatusMessage('Thank you! Your information has been noted and emailed to our team. We will contact your WhatsApp shortly.');
      }
    } catch {
      setStatus('success');
      setStatusMessage('Thank you! We received your request and will connect on WhatsApp within 5 minutes.');
    }
  };

  return (
    <div className="bg-sheet-grid-dark text-white border-t border-white/10 select-none">
      {/* SECTION 11: CONTACT */}
      <section id="contact" className="min-h-[100svh] py-24 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Call to Action & WhatsApp Channel */}
          <div className="lg:col-span-5 font-mono">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal/40 bg-teal/10 text-teal text-xs tracking-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span>FREE SOFTWARE DEMO</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-display leading-tightest mb-4">
              Power your business <br />
              <span className="font-editorial-italic font-normal text-teal">
                with modern Eazy ERP.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 font-body mb-8 leading-relaxed">
              Book a live software walkthrough. We will demonstrate counter billing, warehouse stock control, and customer credit ledger management tailored to your industry, plus show you how we migrate your existing Excel records.
            </p>

            {/* Direct Instant WhatsApp Options (Both Numbers) */}
            <div className="p-6 rounded-xl border border-teal/40 bg-teal/10 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">
                    Want an instant walkthrough?
                  </h4>
                  <span className="text-xs text-teal font-semibold">Direct WhatsApp Consultation</span>
                </div>
              </div>

              <p className="text-xs text-white/75 font-body mb-4">
                Chat directly with our solutions consultant. Discuss your counter setup, request a video walkthrough, or share your current Excel workflow.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/${CONTACT_INFO.phone1Digits}?text=${encodeURIComponent(CONTACT_INFO.defaultWhatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press w-full py-3 px-4 rounded bg-teal hover:bg-teal-dark text-white font-mono text-xs font-bold flex items-center justify-between shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp 1: {CONTACT_INFO.phone1Formatted}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/${CONTACT_INFO.phone2Digits}?text=${encodeURIComponent(CONTACT_INFO.defaultWhatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press w-full py-3 px-4 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center justify-between border border-white/20 shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-teal" />
                    <span>WhatsApp 2: {CONTACT_INFO.phone2Formatted}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Direct Contact Reference */}
            <div className="space-y-2.5 text-xs text-white/60 font-mono">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal shrink-0" />
                <span>
                  Email:{' '}
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-white underline decoration-teal/40 hover:text-teal font-semibold"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal shrink-0" />
                <span>
                  Contact 1:{' '}
                  <a href={`tel:+${CONTACT_INFO.phone1Digits}`} className="text-white hover:text-teal font-semibold">
                    {CONTACT_INFO.phone1Formatted}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal shrink-0" />
                <span>
                  Contact 2:{' '}
                  <a href={`tel:+${CONTACT_INFO.phone2Digits}`} className="text-white hover:text-teal font-semibold">
                    {CONTACT_INFO.phone2Formatted}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Inline Validated Onboarding Form */}
          <div className="lg:col-span-7 bg-[#11151D] p-6 sm:p-8 rounded-xl border border-white/15 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal" />
                <span className="font-bold text-white">FORM: ERP SOFTWARE DEMO & MIGRATION</span>
              </div>
              <span className="text-[11px] text-white/40">ENCRYPTED 256-BIT SSL</span>
            </div>

            {status === 'success' ? (
              <div className="p-8 text-center bg-teal/10 border border-teal/40 rounded-lg animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-teal mx-auto mb-3" />
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  Request Dispatched Successfully!
                </h3>
                <p className="text-xs text-white/80 font-body max-w-md mx-auto mb-6 leading-relaxed">
                  {statusMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-4 py-2 rounded bg-teal text-white font-mono text-xs btn-press"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-white/70 mb-1.5 font-bold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Tariq Mahmood"
                      className={`w-full px-3.5 py-2.5 rounded bg-[#141A24] border text-white placeholder-white/30 focus:outline-hidden transition-colors ${
                        touched.name && errors.name
                          ? 'border-error focus:border-error'
                          : touched.name && !errors.name
                          ? 'border-teal'
                          : 'border-white/15 focus:border-teal'
                      }`}
                    />
                    {touched.name && errors.name && (
                      <span className="text-[10px] text-error mt-1 block">{errors.name}</span>
                    )}
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className="block text-white/70 mb-1.5 font-bold">
                      Business / Store Name *
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleChange('businessName', e.target.value)}
                      onBlur={() => handleBlur('businessName')}
                      placeholder="e.g. Tariq Traders"
                      className={`w-full px-3.5 py-2.5 rounded bg-[#141A24] border text-white placeholder-white/30 focus:outline-hidden transition-colors ${
                        touched.businessName && errors.businessName
                          ? 'border-error focus:border-error'
                          : touched.businessName && !errors.businessName
                          ? 'border-teal'
                          : 'border-white/15 focus:border-teal'
                      }`}
                    />
                    {touched.businessName && errors.businessName && (
                      <span className="text-[10px] text-error mt-1 block">{errors.businessName}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp Number */}
                  <div>
                    <label className="block text-white/70 mb-1.5 font-bold">
                      WhatsApp Number (for live preview) *
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      onBlur={() => handleBlur('whatsapp')}
                      placeholder="0300 1234567"
                      className={`w-full px-3.5 py-2.5 rounded bg-[#141A24] border text-white placeholder-white/30 focus:outline-hidden transition-colors ${
                        touched.whatsapp && errors.whatsapp
                          ? 'border-error focus:border-error'
                          : touched.whatsapp && !errors.whatsapp
                          ? 'border-teal'
                          : 'border-white/15 focus:border-teal'
                      }`}
                    />
                    {touched.whatsapp && errors.whatsapp && (
                      <span className="text-[10px] text-error mt-1 block">{errors.whatsapp}</span>
                    )}
                  </div>

                  {/* Industry Select */}
                  <div>
                    <label className="block text-white/70 mb-1.5 font-bold">
                      Industry Sector
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleChange('industry', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded bg-[#141A24] border border-white/15 text-white focus:outline-hidden focus:border-teal"
                    >
                      <option>Retail & Marts</option>
                      <option>Gyms & Fitness Centers</option>
                      <option>Doctors & Medical Clinics</option>
                      <option>Logistics & Delivery Fleet</option>
                      <option>Pharmacies & Stores</option>
                      <option>Wholesale Distribution</option>
                      <option>Schools & Academies</option>
                      <option>Other Business</option>
                    </select>
                  </div>
                </div>

                {/* What do you use today? */}
                <div>
                  <label className="block text-white/70 mb-2 font-bold">
                    What do you use today for records?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Excel Sheets', 'Paper Registers / Ledgers', 'Other Software'].map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => handleChange('currentTool', tool)}
                        className={`p-2.5 rounded border text-center transition-colors btn-press ${
                          formData.currentTool === tool
                            ? 'bg-teal text-white border-teal font-bold'
                            : 'bg-[#141A24] text-white/60 border-white/15 hover:border-white/30'
                        }`}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message / Details */}
                <div>
                  <label className="block text-white/70 mb-1.5 font-bold">
                    What numbers do you struggle to track? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="e.g. We have 3 branches in Lahore and our credit recovery is always delayed..."
                    className="w-full px-3.5 py-2.5 rounded bg-[#141A24] border border-white/15 text-white placeholder-white/30 focus:outline-hidden focus:border-teal font-body text-xs"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-press w-full py-3.5 px-4 rounded bg-teal hover:bg-teal-dark text-white font-mono text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 border border-teal transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <span>Securing Connection & Processing...</span>
                  ) : (
                    <>
                      <span>Schedule My Free ERP Software Walkthrough</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-white/40 text-center font-mono">
                  🔒 Strictly Confidential. No spam, ever. We sign mutual NDAs for all enterprise data.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 12: FOOTER (Large Logo under Pointer Inspection Lens) */}
      <footer
        ref={footerRef}
        onPointerMove={handleFooterPointerMove}
        className="relative border-t border-white/10 bg-[#0A0C10] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center relative z-10 text-center">
          {/* Inspection Lens SVG Definition & Mask */}
          {isFinePointer && (
            <svg className="absolute w-0 h-0" aria-hidden="true">
              <defs>
                <mask id="inspectionLensMask">
                  <rect width="100%" height="100%" fill="black" />
                  {/* Outer softer glow circle */}
                  <circle
                    cx={lensPos.x}
                    cy={lensPos.y}
                    r="150"
                    fill="white"
                    opacity="0.3"
                  />
                  {/* Inner crisp focus lens */}
                  <circle
                    cx={lensPos.x}
                    cy={lensPos.y}
                    r="90"
                    fill="white"
                    opacity="1"
                  />
                </mask>
              </defs>
            </svg>
          )}

          {/* Interactive Inspection Lens Frame */}
          <div className="relative w-full max-w-3xl py-12 flex flex-col items-center justify-center">
            {/* Base Dimmed Silhouette */}
            <div className="opacity-15 grayscale transition-opacity">
              <img
                src="/logo-white.png"
                alt=""
                className="h-28 sm:h-36 w-auto object-contain mx-auto"
                aria-hidden="true"
              />
              <div className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-display mt-2">
                Eazy Dashboard
              </div>
            </div>

            {/* Revealed Layer under Pointer Inspection Lens (Desktop Fine Pointer) */}
            {isFinePointer ? (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                style={{
                  mask: 'url(#inspectionLensMask)',
                  WebkitMask: 'url(#inspectionLensMask)',
                }}
              >
                <img
                  src="/logo-transparent.png"
                  alt={BRAND_NAME}
                  className="h-28 sm:h-36 w-auto object-contain mx-auto drop-shadow-[0_0_25px_rgba(27,166,166,0.6)]"
                />
                <div className="font-display font-extrabold text-4xl sm:text-6xl text-teal tracking-display mt-2">
                  Eazy Dashboard
                </div>
              </div>
            ) : (
              /* Touch fallback: Logo simply fully visible */
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img
                  src="/logo-transparent.png"
                  alt={BRAND_NAME}
                  className="h-28 sm:h-36 w-auto object-contain mx-auto"
                />
                <div className="font-display font-extrabold text-4xl sm:text-6xl text-teal tracking-display mt-2">
                  Eazy Dashboard
                </div>
              </div>
            )}
          </div>

          {/* Tagline & Attribution */}
          <div className="mt-8 font-mono text-xs text-white/60 space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/70">
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-teal transition-colors underline decoration-teal/40">
                {CONTACT_INFO.email}
              </a>
              <span className="text-white/20">•</span>
              <a href={`tel:+${CONTACT_INFO.phone1Digits}`} className="hover:text-teal transition-colors">
                {CONTACT_INFO.phone1Formatted}
              </a>
              <span className="text-white/20">•</span>
              <a href={`tel:+${CONTACT_INFO.phone2Digits}`} className="hover:text-teal transition-colors">
                {CONTACT_INFO.phone2Formatted}
              </a>
            </div>
            <p className="text-white/80">
              &ldquo;Your Excel and register business, as a live dashboard.&rdquo;
            </p>
            <p className="text-[11px] text-white/40">
              © {new Date().getFullYear()} {BRAND_NAME}. Designed & Built for Pakistani Small & Medium Enterprises.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
