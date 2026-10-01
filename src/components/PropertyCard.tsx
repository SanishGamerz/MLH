import React, { useState } from 'react';
import { Property, Currency } from '../types';
import { formatCompactPrice } from '../utils/formatters';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Sparkles,
  Calendar,
  Box,
  CreditCard,
  Star
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  currency: Currency;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  onAIEvaluate: (property: Property) => void;
  onOpen3DView: (property: Property) => void;
  onInstantBuy: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  isSaved,
  onToggleSave,
  onSelectProperty,
  onScheduleTour,
  onAIEvaluate,
  onOpen3DView,
  onInstantBuy
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const currentImage = property.images[currentImageIndex] || property.images[0];

  return (
    <div
      onClick={() => onSelectProperty(property)}
      className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Media Frame */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={currentImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Carousel arrows */}
        {property.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <div className="bg-slate-950/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wide">
            {property.propertyType}
          </div>
          {property.portalSource && (
            <div className="bg-amber-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              {property.portalSource.portalName}
            </div>
          )}
          {property.status === 'Token Reserved' && (
            <div className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              Token Reserved
            </div>
          )}
          {property.status === 'Under Offer' && (
            <div className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              Under Escrow
            </div>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(property.id);
          }}
          aria-label={isSaved ? 'Remove from saved' : 'Save property'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            isSaved
              ? 'bg-rose-500 text-white shadow-sm'
              : 'bg-black/40 text-white hover:bg-black/60 hover:text-rose-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* 3D Model Quick Trigger Button on Thumbnail */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen3DView(property);
          }}
          className="absolute bottom-3 left-3 inline-flex items-center gap-1 bg-slate-950/85 hover:bg-amber-500 hover:text-slate-950 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs transition-colors shadow-sm"
          title="Open interactive 3D model"
        >
          <Box className="w-3.5 h-3.5 text-amber-400 group-hover:text-slate-950" />
          <span>Live 3D View</span>
        </button>

        {/* Dots indicator */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1">
            {property.images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Rating */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="text-xl sm:text-2xl font-bold font-display text-slate-950 tabular-nums">
              {formatCompactPrice(property, currency)}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-600 font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{property.overallRating}</span>
              <span className="text-slate-400 text-[11px] font-normal">({property.totalReviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-1">
            {property.title}
          </h3>

          {/* Location */}
          <p className="text-xs text-slate-500 mb-3 line-clamp-1">
            {property.location.address}, {property.location.area}, {property.location.city}
          </p>

          {/* Specs grid */}
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-xs text-slate-700 mb-3">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold tabular-nums">{property.specs.beds}</span>
              <span className="text-slate-500 text-[11px]">Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold tabular-nums">{property.specs.baths}</span>
              <span className="text-slate-500 text-[11px]">Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold tabular-nums">{property.specs.sqft}</span>
              <span className="text-slate-500 text-[11px]">sq.ft</span>
            </div>
          </div>

          {/* Nepal Land Measurement / Road Access */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3.5 bg-slate-50 px-2.5 py-1.5 rounded-md">
            <span className="font-medium text-slate-700 truncate">Land: {property.specs.landMeasureNepal}</span>
            <span className="text-emerald-700 font-semibold shrink-0 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Title Verified</span>
            </span>
          </div>
        </div>

        {/* Footer with High-Converting Payment & Booking CTA Row */}
        <div>
          {/* Instant Buy / Escrow Button */}
          <div className="mb-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInstantBuy(property);
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Buy / Reserve (eSewa · Khalti · ConnectIPS)</span>
            </button>
          </div>

          {/* Secondary Actions: AI evaluate + Book Tour */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAIEvaluate(property);
              }}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Evaluate</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onScheduleTour(property);
              }}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-white bg-slate-900 hover:bg-slate-800 text-xs font-semibold transition-colors shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Tour</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
