import React from 'react';
import { Currency } from '../types';
import { Search, MapPin, Home, DollarSign, Bed, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroProps {
  currency: Currency;
  selectedLocation: string;
  onChangeLocation: (loc: string) => void;
  selectedType: string;
  onChangeType: (type: string) => void;
  maxPrice: number;
  onChangeMaxPrice: (price: number) => void;
  selectedBeds: number | 'all';
  onChangeBeds: (beds: number | 'all') => void;
  onSearch: () => void;
  totalPropertiesCount: number;
  filteredCount: number;
  onOpenAIAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currency,
  selectedLocation,
  onChangeLocation,
  selectedType,
  onChangeType,
  maxPrice,
  onChangeMaxPrice,
  selectedBeds,
  onChangeBeds,
  onSearch,
  totalPropertiesCount,
  filteredCount,
  onOpenAIAssistant
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center">
      {/* Background Image with Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_estate_banner_1790835980666.jpg"
          alt="Luxury architectural residence at twilight"
          className="w-full h-full object-cover object-center opacity-40 scale-102 transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-3xl">
          {/* Subtle natural kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-3">
            <span>Verified Residences</span>
            <span aria-hidden="true">·</span>
            <span>Nepal & Prime Metropolitan Estates</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance font-display leading-[1.08] mb-5">
            Find Your Dream Home Today
          </h1>

          <p className="text-base sm:text-lg text-slate-300 text-pretty max-w-2xl font-normal leading-relaxed mb-8">
            Explore verified luxury villas, sky penthouses, and architectural estates. Complete with legal Lalpurja title checks, smart AI valuations, and seamless digital token reservation via eSewa, Khalti, and ConnectIPS.
          </p>

          {/* Quick proof points adjacent to proposition */}
          <div className="grid grid-cols-3 gap-4 pb-8 border-b border-slate-800/80 mb-8 max-w-xl text-xs sm:text-sm">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-display tabular-nums">100%</div>
              <div className="text-slate-400 text-xs">Title Deed Verified</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-display tabular-nums">रु 4.2B+</div>
              <div className="text-slate-400 text-xs">Portfolio Volume</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-amber-400 font-display tabular-nums">Instant</div>
              <div className="text-slate-400 text-xs">eSewa/Khalti Token</div>
            </div>
          </div>
        </div>

        {/* Dynamic Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200/80 text-slate-900 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
            
            {/* Filter 1: Location */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Location</span>
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => onChangeLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
              >
                <option value="all">All Locations (Kathmandu & Pokhara)</option>
                <option value="Budhanilkantha">Budhanilkantha (Kathmandu)</option>
                <option value="Jhamsikhel">Jhamsikhel / Sanepa (Lalitpur)</option>
                <option value="Baluwatar">Baluwatar (Kathmandu)</option>
                <option value="Lazimpat">Lazimpat (Kathmandu)</option>
                <option value="Patan">Patan & Pulchowk (Lalitpur)</option>
                <option value="Pokhara">Lakeside & Fewa (Pokhara)</option>
              </select>
            </div>

            {/* Filter 2: Property Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-amber-500" />
                <span>Property Type</span>
              </label>
              <select
                value={selectedType}
                onChange={(e) => onChangeType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
              >
                <option value="all">All Property Types</option>
                <option value="Modern Villa">Modern Villa</option>
                <option value="Luxury Penthouse">Luxury Penthouse</option>
                <option value="Scandinavian Residence">Scandinavian Residence</option>
                <option value="Hillside Retreat">Hillside Retreat</option>
                <option value="Heritage Haveli">Heritage Haveli</option>
                <option value="Lakeview Residence">Lakeview Residence</option>
              </select>
            </div>

            {/* Filter 3: Price Cap */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                  <span>Max Budget</span>
                </span>
                <span className="font-bold text-slate-900 text-xs tabular-nums">
                  {currency === 'NPR'
                    ? `रू ${(maxPrice / 10000000).toFixed(1)} Cr`
                    : `$${(maxPrice / 134 / 1000).toFixed(0)}k`}
                </span>
              </label>
              <div className="pt-2">
                <input
                  type="range"
                  min={50000000}
                  max={130000000}
                  step={5000000}
                  value={maxPrice}
                  onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            {/* Filter 4: Bedrooms */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-amber-500" />
                <span>Bedrooms</span>
              </label>
              <select
                value={selectedBeds === 'all' ? 'all' : selectedBeds.toString()}
                onChange={(e) => onChangeBeds(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
              >
                <option value="all">Any Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                Showing <strong className="text-slate-800 tabular-nums">{filteredCount}</strong> of{' '}
                <strong className="text-slate-800 tabular-nums">{totalPropertiesCount}</strong> prime listings
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={onOpenAIAssistant}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Ask AI Advisor</span>
              </button>

              <button
                onClick={onSearch}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition-colors shadow-md whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Find Properties</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
