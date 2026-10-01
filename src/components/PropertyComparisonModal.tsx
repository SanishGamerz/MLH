import React from 'react';
import { Property, Currency } from '../types';
import { formatCompactPrice } from '../utils/formatters';
import { X, Check, ArrowRight, ShieldCheck, Box, CreditCard } from 'lucide-react';

interface PropertyComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  currency: Currency;
  onSelectProperty: (property: Property) => void;
  onInitiateBuy: (property: Property) => void;
}

export const PropertyComparisonModal: React.FC<PropertyComparisonModalProps> = ({
  isOpen,
  onClose,
  properties,
  currency,
  onSelectProperty,
  onInitiateBuy
}) => {
  if (!isOpen) return null;

  const compareList = properties.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <h2 className="text-base font-bold font-display">Residence Comparison Matrix</h2>
            <p className="text-xs text-slate-400">Side-by-side architectural, land valuation, and legal comparison</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-x-auto flex-1">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-4 gap-4 pb-4 border-b border-slate-200">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider self-end pb-2">
                Metrics & Specs
              </div>
              {compareList.map((p) => (
                <div key={p.id} className="space-y-2">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.title}</h4>
                  <div className="text-base font-extrabold text-slate-950 font-display tabular-nums">
                    {formatCompactPrice(p, currency)}
                  </div>
                  <button
                    onClick={() => onInitiateBuy(p)}
                    className="w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <CreditCard className="w-3 h-3" />
                    <span>Buy / Token</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100 text-xs">
              
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-semibold text-slate-600">Location</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-slate-800 font-medium">
                    {p.location.area}, {p.location.city}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-semibold text-slate-600">Nepal Land Measure</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-amber-800 font-bold">
                    {p.specs.landMeasureNepal}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-semibold text-slate-600">Built-Up Area</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-slate-800 font-medium tabular-nums">
                    {p.specs.sqft} sq.ft
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-semibold text-slate-600">Bedrooms / Baths</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-slate-800 font-medium tabular-nums">
                    {p.specs.beds} Beds · {p.specs.baths} Baths
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-semibold text-slate-600">Road Access</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-slate-800 font-medium">
                    {p.location.roadAccess}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-semibold text-slate-600">Title Deed Status</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Lalpurja Verified</span>
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-semibold text-slate-600">Portal Source</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded w-fit">
                    {p.portalSource?.portalName || 'EstateEase Exclusive'}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-semibold text-slate-600">User Rating</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-amber-600 font-bold">
                    ★ {p.overallRating} ({p.totalReviewsCount} reviews)
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
