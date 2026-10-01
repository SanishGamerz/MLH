import React from 'react';
import { Currency } from '../types';
import { Heart, Sparkles, PlusCircle, CreditCard, Box, Calculator } from 'lucide-react';

interface NavbarProps {
  currency: Currency;
  onToggleCurrency: () => void;
  savedCount: number;
  onOpenDashboard: (tab?: 'saved' | 'tours' | 'payments' | 'list') => void;
  onOpenAIAssistant: () => void;
  onOpenMortgage: () => void;
  onOpenPayments: () => void;
  onScrollToProperties: () => void;
  onOpenUnitConverter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onToggleCurrency,
  savedCount,
  onOpenDashboard,
  onOpenAIAssistant,
  onOpenMortgage,
  onOpenPayments,
  onScrollToProperties,
  onOpenUnitConverter
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Brand title, single clean text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl font-bold tracking-tight text-slate-900 font-display flex items-center gap-1.5 focus-visible:outline-none"
        >
          <span>EstateEase</span>
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block mb-1" aria-hidden="true" />
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={onScrollToProperties}
            className="hover:text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
          >
            Explore Properties
          </button>

          <button
            onClick={onOpenAIAssistant}
            className="hover:text-slate-950 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Advisor</span>
          </button>

          <button
            onClick={onOpenMortgage}
            className="hover:text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
          >
            Mortgage & EMI
          </button>

          <button
            onClick={onOpenUnitConverter}
            className="hover:text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
          >
            Aana Calculator
          </button>

          <button
            onClick={() => onOpenDashboard('tours')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
          >
            Scheduled Tours
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions & functional toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Toggle */}
          <button
            onClick={onToggleCurrency}
            title={`Switch to ${currency === 'USD' ? 'Nepali Rupee (NPR रू)' : 'US Dollar (USD $)'}`}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span className="text-slate-400 font-normal">Currency:</span>
            <span className={currency === 'NPR' ? 'text-amber-600 font-bold' : 'text-slate-900 font-bold'}>
              {currency === 'NPR' ? 'NPR रू' : 'USD $'}
            </span>
          </button>

          {/* Saved properties trigger */}
          <button
            onClick={() => onOpenDashboard('saved')}
            className="relative p-2 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Saved Favorites"
            aria-label="View saved favorite properties"
          >
            <Heart className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center tabular-nums">
                {savedCount}
              </span>
            )}
          </button>

          {/* High-visibility Buy & Escrow action */}
          <button
            onClick={onOpenPayments}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Buy & Escrow</span>
          </button>

          {/* Client Portal Button */}
          <button
            onClick={() => onOpenDashboard('saved')}
            className="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            Client Portal
          </button>
        </div>

      </div>
    </header>
  );
};
