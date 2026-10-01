import React, { useState } from 'react';
import { Property, Currency } from '../types';
import { PropertyCard } from './PropertyCard';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  X,
  RefreshCw,
  Box,
  Scale,
  Calculator,
  Download,
  Building
} from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  currency: Currency;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  onAIEvaluate: (property: Property) => void;
  onOpen3DView: (property: Property) => void;
  onInstantBuy: (property: Property) => void;
  selectedType: string;
  onChangeType: (type: string) => void;
  sortBy: 'price-asc' | 'price-desc' | 'featured' | 'beds-desc';
  onChangeSortBy: (sort: 'price-asc' | 'price-desc' | 'featured' | 'beds-desc') => void;
  selectedAmenities: string[];
  onToggleAmenity: (amenity: string) => void;
  onClearFilters: () => void;
  onSyncNepalPortals: () => void;
  isSyncingPortals: boolean;
  onOpenUnitConverter: () => void;
  onOpenComparison: () => void;
}

const ALL_AMENITIES = [
  'Private Infinity Pool',
  '2-Car EV Fast Charger',
  '10kVA Hybrid Solar Inverter',
  'Smart Home Automation',
  'Dedicated Home Cinema',
  'Hydronic Underfloor Radiant Heating',
  '24/7 Monitored Guard House'
];

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  currency,
  savedIds,
  onToggleSave,
  onSelectProperty,
  onScheduleTour,
  onAIEvaluate,
  onOpen3DView,
  onInstantBuy,
  selectedType,
  onChangeType,
  sortBy,
  onChangeSortBy,
  selectedAmenities,
  onToggleAmenity,
  onClearFilters,
  onSyncNepalPortals,
  isSyncingPortals,
  onOpenUnitConverter,
  onOpenComparison
}) => {
  const [showAmenitiesDrawer, setShowAmenitiesDrawer] = useState(false);

  const propertyTypes = [
    { label: 'All Homes', value: 'all' },
    { label: 'Modern Villas', value: 'Modern Villa' },
    { label: 'Penthouses', value: 'Luxury Penthouse' },
    { label: 'Scandinavian', value: 'Scandinavian Residence' },
    { label: 'Hillside', value: 'Hillside Retreat' },
    { label: 'Heritage Haveli', value: 'Heritage Haveli' },
    { label: 'Lakeview', value: 'Lakeview Residence' }
  ];

  return (
    <section id="properties-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      
      {/* Live Nepal Portals Sync Notification & Quick Tool Strip */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 mb-10 shadow-lg border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-display">Nepal Portals Live Listings Feed</span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Live Data
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Aggregated from <strong>HamroBazar</strong>, <strong>1Ropani.com</strong>, <strong>NepalHomes</strong>, and <strong>GharBazar</strong> with verified Lalpurja records.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
          <button
            onClick={onOpenUnitConverter}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Ropani/Aana Calculator</span>
          </button>

          <button
            onClick={onOpenComparison}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Compare Homes</span>
          </button>

          <button
            onClick={onSyncNepalPortals}
            disabled={isSyncingPortals}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingPortals ? 'animate-spin' : ''}`} />
            <span>{isSyncingPortals ? 'Syncing...' : 'Sync Nepal Portals'}</span>
          </button>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-amber-600 tracking-wider uppercase mb-1">
            Curated Portfolio
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
            Featured Residences & Estates
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Every property is verified for structural integrity, clear land title (Lalpurja), and road access standards.
          </p>
        </div>

        {/* Results counter & Sort Control */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          <div className="text-xs text-slate-500 font-medium">
            <span className="font-bold text-slate-900 tabular-nums">{properties.length}</span> properties found
          </div>

          <div className="relative inline-flex items-center">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => onChangeSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="beds-desc">Most Bedrooms</option>
            </select>
          </div>

          <button
            onClick={() => setShowAmenitiesDrawer(!showAmenitiesDrawer)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              selectedAmenities.length > 0 || showAmenitiesDrawer
                ? 'border-amber-500 bg-amber-50 text-amber-900'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Amenities</span>
            {selectedAmenities.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                {selectedAmenities.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Segmented Control for Property Types */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {propertyTypes.map((type) => {
          const isActive = selectedType === type.value;
          return (
            <button
              key={type.value}
              onClick={() => onChangeType(type.value)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {type.label}
            </button>
          );
        })}
      </div>

      {/* Expandable Amenities Filter Box */}
      {showAmenitiesDrawer && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Filter by Key Amenities & Features
            </span>
            {selectedAmenities.length > 0 && (
              <button
                onClick={onClearFilters}
                className="text-xs text-amber-600 hover:text-amber-800 font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {ALL_AMENITIES.map((amenity) => {
              const isChecked = selectedAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  onClick={() => onToggleAmenity(amenity)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isChecked
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                  <span>{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Property Cards Grid */}
      {properties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No matching properties</h3>
          <p className="text-xs text-slate-500 mb-6">
            We couldn't find any homes matching your exact filter combination. Try resetting your price or amenities filters.
          </p>
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Clear Filters & View All
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              currency={currency}
              isSaved={savedIds.includes(property.id)}
              onToggleSave={onToggleSave}
              onSelectProperty={onSelectProperty}
              onScheduleTour={onScheduleTour}
              onAIEvaluate={onAIEvaluate}
              onOpen3DView={onOpen3DView}
              onInstantBuy={onInstantBuy}
            />
          ))}
        </div>
      )}

    </section>
  );
};
