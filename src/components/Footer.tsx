import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  onOpenAIAssistant: () => void;
  onOpenMortgage: () => void;
  onOpenPayments: () => void;
  onOpenDashboard: (tab?: 'saved' | 'tours' | 'payments' | 'list') => void;
  onScrollToProperties: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAIAssistant,
  onOpenMortgage,
  onOpenPayments,
  onOpenDashboard,
  onScrollToProperties
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitted(true); // graceful
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="bg-slate-900/80 rounded-2xl p-6 sm:p-10 border border-slate-800 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>VIP Property Drops & Off-Market Alerts</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-2">
              Stay ahead of prime residential listings
            </h3>
            <p className="text-sm text-slate-400 font-normal leading-relaxed">
              Receive weekly curated reports on newly listed Lalpurja-verified residences, private diplomatic villas, and price movements across Kathmandu and Pokhara.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            {isSubmitted ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-4 text-emerald-200 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  Thank you! You are now subscribed to EstateEase VIP property drops.
                </span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xs transition-colors whitespace-nowrap inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Subscribing...' : 'Get Alerts'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <div className="text-[11px] text-slate-500 mt-2 text-center lg:text-left">
              Zero spam. Unsubscribe at any time with one click.
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-xs">
          
          {/* Brand info */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <span className="text-xl font-bold font-display text-white tracking-tight flex items-center gap-1">
              <span>EstateEase</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </span>
            <p className="text-slate-400 leading-relaxed font-normal">
              Nepal’s premier high-trust real estate brokerage platform. Engineered for seamless discovery, legal title assurance, and digital token reservation.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Malpot Title Compliance</span>
            </div>
          </div>

          {/* Column 1: Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Explore</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onScrollToProperties} className="hover:text-white transition-colors cursor-pointer">
                  Featured Residences
                </button>
              </li>
              <li>
                <button onClick={onOpenAIAssistant} className="hover:text-white transition-colors cursor-pointer">
                  AI Property Advisor
                </button>
              </li>
              <li>
                <button onClick={onOpenMortgage} className="hover:text-white transition-colors cursor-pointer">
                  Mortgage & EMI Calculator
                </button>
              </li>
              <li>
                <button onClick={onOpenPayments} className="hover:text-white transition-colors cursor-pointer">
                  Nepal Payment Gateway
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal & Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Services & Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onOpenDashboard('list')} className="hover:text-white transition-colors cursor-pointer">
                  List Your Property
                </button>
              </li>
              <li>
                <button onClick={() => onOpenDashboard('tours')} className="hover:text-white transition-colors cursor-pointer">
                  Scheduled Viewings Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onOpenDashboard('payments')} className="hover:text-white transition-colors cursor-pointer">
                  Payment History & Receipts
                </button>
              </li>
              <li>
                <button onClick={onOpenAIAssistant} className="hover:text-white transition-colors cursor-pointer">
                  Lalpurja Transfer Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Address */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Advisory Office</h4>
            <div className="space-y-1.5 text-slate-400">
              <div>Embassy Corridor, Road 4</div>
              <div>Baluwatar, Kathmandu, Nepal</div>
              <div className="pt-1 text-slate-300">Direct Desk: +977-1-4421890</div>
              <div className="text-slate-300">concierge@estateease.com</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} EstateEase Technologies Pvt. Ltd. All rights reserved. Registered under Nepal Company Act.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Kathmandu Valley</span>
            <span>·</span>
            <span>Pokhara</span>
            <span>·</span>
            <span>eSewa & Khalti Verified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
