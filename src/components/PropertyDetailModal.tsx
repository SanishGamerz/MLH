import React, { useState } from 'react';
import { Property, Currency, Review } from '../types';
import { formatCompactPrice, formatCurrency, calculateEMI } from '../utils/formatters';
import { Live3DViewer } from './Live3DViewer';
import {
  X,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Compass,
  Car,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  Calculator,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Building2,
  Check,
  Box,
  Star,
  ThumbsUp,
  Send,
  Building
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  currency: Currency;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onClose: () => void;
  onOpenAIAssistantWithProperty: (property: Property) => void;
  onInitiateNepalPayment: (options: {
    property: Property;
    purpose: 'Tour Reservation Token' | 'Property Holding Advance' | 'Full Purchase Escrow Deposit';
    amountNPR: number;
  }) => void;
  onBookTourSuccess: (bookingData: any) => void;
  onOpenUnitConverter: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  currency,
  isSaved,
  onToggleSave,
  onClose,
  onOpenAIAssistantWithProperty,
  onInitiateNepalPayment,
  onBookTourSuccess,
  onOpenUnitConverter
}) => {
  if (!property) return null;

  // View mode: 'photos' | '3d'
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | '3d'>('photos');

  // Gallery active index & lightbox
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Mortgage Calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(20);

  // Tour Booking Form state
  const [tourDate, setTourDate] = useState<string>('2026-10-06');
  const [tourTimeSlot, setTourTimeSlot] = useState<string>('10:00 AM - 11:30 AM');
  const [tourType, setTourType] = useState<'In-Person Private Tour' | 'Virtual Video Walkthrough'>('In-Person Private Tour');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [tourBookedSuccess, setTourBookedSuccess] = useState<boolean>(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState<boolean>(false);

  // User Review Form state
  const [reviewsList, setReviewsList] = useState<Review[]>(property.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Calculate EMI based on active currency value
  const propertyBasePrice = currency === 'NPR' ? property.priceNPR : property.priceUSD;
  const emiCalc = calculateEMI(propertyBasePrice, downPaymentPercent, interestRate, loanTermYears);

  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    setIsBookingSubmitting(true);
    try {
      const res = await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          propertyTitle: property.title,
          propertyLocation: `${property.location.address}, ${property.location.area}`,
          propertyImage: property.images[0],
          clientName,
          clientEmail,
          clientPhone,
          date: tourDate,
          timeSlot: tourTimeSlot,
          tourType
        })
      });
      const data = await res.json();
      if (data.success) {
        setTourBookedSuccess(true);
        onBookTourSuccess(data.data);
      }
    } catch (err) {
      console.error('Error booking tour:', err);
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    setIsSubmittingReview(true);
    try {
      const res = await fetch(`/api/properties/${property.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: reviewAuthor,
          rating: reviewRating,
          title: reviewTitle,
          comment: reviewComment
        })
      });
      const data = await res.json();
      if (data.success) {
        setReviewsList((prev) => [data.data, ...prev]);
        setReviewAuthor('');
        setReviewTitle('');
        setReviewComment('');
        setShowReviewForm(false);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
              {property.propertyType}
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Lalpurja Verified</span>
            </span>
            {property.portalSource && (
              <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Source: {property.portalSource.portalName}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Media Mode Switcher (Photos vs Live 3D) */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveMediaTab('photos')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeMediaTab === 'photos' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Photos ({property.images.length})
              </button>
              <button
                onClick={() => setActiveMediaTab('3d')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeMediaTab === '3d' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Live 3D View</span>
              </button>
            </div>

            <button
              onClick={() => onOpenAIAssistantWithProperty(property)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-xs font-semibold text-amber-900 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Ask AI</span>
            </button>

            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved ? 'border-rose-300 bg-rose-50 text-rose-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-8">
          
          {/* SECTION 1: MEDIA VIEWPORT (PHOTOS OR LIVE 3D VIEWER) */}
          {activeMediaTab === '3d' ? (
            <div className="space-y-2">
              <Live3DViewer property={property} className="h-[460px] w-full" />
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Interactive 3D Architectural Model with orbit controls & daytime/twilight illumination</span>
                <button
                  onClick={() => setActiveMediaTab('photos')}
                  className="text-amber-600 hover:text-amber-700 font-semibold"
                >
                  ← Back to High-Res Photos
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 shadow-inner group">
                <img
                  src={property.images[activeImageIndex] || property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setIsLightboxOpen(true)}
                  referrerPolicy="no-referrer"
                />

                {property.images.length > 1 && (
                  <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between">
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                      className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev + 1) % property.images.length)}
                      className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                  Photo {activeImageIndex + 1} of {property.images.length} (Click to expand)
                </div>
              </div>

              {/* Thumbnails strip */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 sm:w-24 aspect-[4/3] rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      idx === activeImageIndex ? 'border-amber-500 scale-95 shadow-xs' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: TITLE, PRICING & PROMINENT BUY / ESCROW BOX */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{property.overallRating} out of 5</span>
                  <span className="text-slate-400 font-normal">({reviewsList.length} verified reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  {property.location.address}, {property.location.area}, {property.location.city} ({property.location.district})
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Road Access: <strong className="text-slate-800">{property.location.roadAccess}</strong>
              </div>
            </div>

            {/* HIGH-CONVERTING BUY & PAYMENT BOX */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 min-w-[320px] shadow-xl space-y-4">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                    Listing Price
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums">
                    {formatCompactPrice(property, currency)}
                  </div>
                  <div className="text-xs text-slate-400">
                    {currency === 'NPR' ? `Approx $${property.priceUSD.toLocaleString()} USD` : `रू ${(property.priceNPR / 10000000).toFixed(2)} Crore NPR`}
                  </div>
                </div>
              </div>

              {/* Instant Action Options */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                
                {/* 1. Full Purchase Escrow Option */}
                <button
                  onClick={() =>
                    onInitiateNepalPayment({
                      property,
                      purpose: 'Full Purchase Escrow Deposit',
                      amountNPR: property.escrowDepositNPR || Math.round(property.priceNPR * 0.1)
                    })
                  }
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Buy with 10% Earnest Escrow</span>
                </button>
                <div className="text-[10px] text-center text-slate-400">
                  Earnest Escrow: रू {(property.escrowDepositNPR || Math.round(property.priceNPR * 0.1)).toLocaleString()} · Secure via ConnectIPS / Khalti
                </div>

                {/* 2. Holding Token (7-Day Freeze) */}
                <button
                  onClick={() =>
                    onInitiateNepalPayment({
                      property,
                      purpose: 'Property Holding Advance',
                      amountNPR: property.holdingTokenNPR
                    })
                  }
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pay Holding Token (रू {property.holdingTokenNPR.toLocaleString()})</span>
                </button>
                <div className="text-[10px] text-center text-slate-400">
                  7-Day Off-Market Freeze via eSewa / Khalti / IME Pay
                </div>
              </div>

              {/* Unit Converter Trigger */}
              <button
                onClick={onOpenUnitConverter}
                className="w-full text-center text-xs text-amber-400 hover:text-amber-300 font-medium pt-1 block cursor-pointer"
              >
                📐 Calculate Price per Aana / Convert Units
              </button>
            </div>
          </div>

          {/* SECTION 3: KEY SPECS */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Property Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <Bed className="w-3.5 h-3.5 text-slate-400" />
                  <span>Bedrooms</span>
                </div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{property.specs.beds} Beds</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <Bath className="w-3.5 h-3.5 text-slate-400" />
                  <span>Bathrooms</span>
                </div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{property.specs.baths} Baths</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Built-up Area</span>
                </div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{property.specs.sqft} sq.ft</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Nepal Land Area</span>
                </div>
                <div className="text-sm font-bold text-slate-900 truncate" title={property.specs.landMeasureNepal}>
                  {property.specs.landMeasureNepal}
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <Car className="w-3.5 h-3.5 text-slate-400" />
                  <span>Parking</span>
                </div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{property.specs.parkingSlots} Cars</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <Compass className="w-3.5 h-3.5 text-slate-400" />
                  <span>Orientation</span>
                </div>
                <div className="text-sm font-bold text-slate-900">{property.specs.facing}</div>
              </div>
            </div>
          </div>

          {/* SECTION 4: DESCRIPTION & AGENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                About The Residence
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {property.description}
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Architectural & Structural Highlights
                </h4>
                <div className="space-y-2">
                  {property.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-amber-500 font-bold shrink-0">✦</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities tags */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Included Amenities & Infrastructure
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {property.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Verified Agent Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 h-fit">
              <div className="flex items-center gap-3">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-12 h-12 rounded-full object-cover shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{property.agent.name}</h4>
                  <div className="text-xs text-slate-500">{property.agent.role}</div>
                  <div className="text-[11px] text-amber-600 font-semibold">{property.agent.badge}</div>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">License:</span>
                  <span className="font-mono text-slate-800">{property.agent.licenseNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rating:</span>
                  <span className="font-semibold text-slate-900">★ {property.agent.rating} ({property.agent.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {property.agent.phone}</span>
                </a>

                <a
                  href={`mailto:${property.agent.email}?subject=Inquiry regarding ${encodeURIComponent(property.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Listing Agent</span>
                </a>
              </div>
            </div>
          </div>

          {/* SECTION 5: USER REVIEWS & COMMUNITY RATINGS */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                  Community Feedback
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
                  <span>Verified Resident & Buyer Reviews</span>
                  <span className="text-sm font-semibold text-slate-500">({reviewsList.length})</span>
                </h3>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span>{showReviewForm ? 'Cancel' : 'Write a Review'}</span>
              </button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4 shadow-xs">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Share Your Verified Assessment
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Subash Shrestha"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Star Rating (1 - 5)</label>
                    <div className="flex items-center gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating ? 'text-amber-500 fill-current' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-slate-700 mb-1">Review Headline</label>
                  <input
                    type="text"
                    placeholder="e.g. Great natural light, peaceful residential lane"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                  />
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-slate-700 mb-1">Detailed Review *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Detail the neighborhood, road access, construction quality, water supply, or legal paperwork..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  {isSubmittingReview ? 'Publishing...' : 'Submit Verified Review'}
                </button>
              </form>
            )}

            {/* Reviews Feed */}
            <div className="space-y-4">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={rev.avatar} alt={rev.author} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-xs font-bold text-slate-900">{rev.author}</strong>
                          <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.2 rounded">
                            {rev.role}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-800">{rev.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{rev.comment}</p>

                  <div className="text-[11px] text-slate-400 pt-1 flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3 text-slate-400" />
                    <span>{rev.helpfulCount} people found this helpful</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6: INTERACTIVE MORTGAGE & EMI CALCULATOR WIDGET */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Financing & Loan Estimation
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  Monthly Mortgage & EMI Calculator
                </h3>
              </div>
              <div className="text-xs text-slate-400">
                Compliant with Nepal Rastra Bank 70% LTV directives
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Down Payment ({downPaymentPercent}%)</span>
                    <span className="font-bold text-amber-400 tabular-nums">
                      {currency === 'NPR'
                        ? `रू ${(emiCalc.downPaymentAmount / 10000000).toFixed(2)} Cr`
                        : `$${emiCalc.downPaymentAmount.toLocaleString()}`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={60}
                    step={5}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Annual Interest Rate ({interestRate}%)</span>
                    <span className="font-bold text-amber-400 tabular-nums">{interestRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min={8.0}
                    max={14.0}
                    step={0.25}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Loan Term ({loanTermYears} Years)</span>
                    <span className="font-bold text-amber-400 tabular-nums">{loanTermYears * 12} Months</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={25}
                    step={5}
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>

              <div className="bg-slate-800/90 rounded-xl p-4 flex flex-col justify-between border border-slate-700">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Estimated Monthly EMI</div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-white mt-1 tabular-nums">
                    {currency === 'NPR'
                      ? `रू ${emiCalc.monthlyEMI.toLocaleString('en-IN')}`
                      : `$${emiCalc.monthlyEMI.toLocaleString()}`}
                    <span className="text-xs font-normal text-slate-400 ml-1">/mo</span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-300 border-t border-slate-700 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Principal Loan:</span>
                      <span className="font-semibold tabular-nums">
                        {currency === 'NPR'
                          ? `रू ${(emiCalc.loanAmount / 10000000).toFixed(2)} Cr`
                          : `$${emiCalc.loanAmount.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Interest:</span>
                      <span className="font-semibold tabular-nums">
                        {currency === 'NPR'
                          ? `रू ${(emiCalc.totalInterest / 10000000).toFixed(2)} Cr`
                          : `$${emiCalc.totalInterest.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700 text-[11px] text-slate-400">
                  💡 A-Class Nepal banks require 2.5x debt-service coverage ratio.
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 7: SCHEDULE A TOUR BOOKING */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-7">
            <div className="max-w-2xl mb-6">
              <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">
                Private Inspection
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900">
                Schedule a Private Tour or Video Walkthrough
              </h3>
            </div>

            {tourBookedSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-emerald-900">Tour Booking Confirmed!</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Your viewing slot for <strong>{tourDate}</strong> at <strong>{tourTimeSlot}</strong> has been logged. Our lead specialist {property.agent.name} will call your mobile shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() =>
                      onInitiateNepalPayment({
                        property,
                        purpose: 'Tour Reservation Token',
                        amountNPR: property.tourBookingFeeNPR
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay VIP Token (रू {property.tourBookingFeeNPR.toLocaleString()}) via eSewa / Khalti</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTourSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Inspection Date</label>
                    <input
                      type="date"
                      value={tourDate}
                      onChange={(e) => setTourDate(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                    <select
                      value={tourTimeSlot}
                      onChange={(e) => setTourTimeSlot(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                    >
                      <option value="09:00 AM - 10:30 AM">09:00 AM - 10:30 AM (Morning)</option>
                      <option value="11:00 AM - 12:30 PM">11:00 AM - 12:30 PM (Midday)</option>
                      <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM (Afternoon)</option>
                      <option value="04:30 PM - 06:00 PM">04:30 PM - 06:00 PM (Sunset / Dusk)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Format</label>
                    <select
                      value={tourType}
                      onChange={(e) => setTourType(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                    >
                      <option value="In-Person Private Tour">In-Person Private Tour</option>
                      <option value="Virtual Video Walkthrough">Virtual Video Walkthrough</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Sanish Tiwari"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (Nepal / WhatsApp) *</label>
                    <input
                      type="tel"
                      placeholder="+977 98XXXXXXXX"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
                  <div className="text-xs text-slate-500">
                    No charge for initial standard booking. Dedicated agent assignment guaranteed.
                  </div>

                  <button
                    type="submit"
                    disabled={isBookingSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {isBookingSubmitting ? 'Confirming...' : 'Confirm Tour Booking'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={property.images[activeImageIndex] || property.images[0]}
            alt={property.title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}

    </div>
  );
};
