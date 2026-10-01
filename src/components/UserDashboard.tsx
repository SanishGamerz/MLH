import React, { useState } from 'react';
import { Property, Currency, TourBooking, PaymentTransaction } from '../types';
import { formatCompactPrice } from '../utils/formatters';
import {
  X,
  Heart,
  Calendar,
  CreditCard,
  PlusCircle,
  Trash2,
  ExternalLink,
  MapPin,
  Clock,
  Printer,
  CheckCircle2,
  Upload,
  Building
} from 'lucide-react';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'saved' | 'tours' | 'payments' | 'list';
  savedProperties: Property[];
  currency: Currency;
  onRemoveSaved: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  tours: TourBooking[];
  payments: PaymentTransaction[];
  onAddNewListing: (propertyData: Partial<Property>) => void;
  onInitiatePaymentForTour: (tour: TourBooking) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  isOpen,
  onClose,
  initialTab = 'saved',
  savedProperties,
  currency,
  onRemoveSaved,
  onSelectProperty,
  tours,
  payments,
  onAddNewListing,
  onInitiatePaymentForTour
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'saved' | 'tours' | 'payments' | 'list'>(initialTab);

  // New Listing Form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<any>('Modern Villa');
  const [newPriceNPR, setNewPriceNPR] = useState<number>(65000000);
  const [newArea, setNewArea] = useState('Budhanilkantha');
  const [newBeds, setNewBeds] = useState(4);
  const [newBaths, setNewBaths] = useState(4);
  const [newSqft, setNewSqft] = useState(3800);
  const [newLand, setNewLand] = useState('0-10-0-0 Aana');
  const [newRoad, setNewRoad] = useState('20 ft pitched road');
  const [newDesc, setNewDesc] = useState('');
  const [listSuccess, setListSuccess] = useState(false);

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    onAddNewListing({
      title: newTitle,
      propertyType: newType,
      priceNPR: Number(newPriceNPR),
      priceUSD: Math.round(Number(newPriceNPR) / 134),
      location: {
        address: `${newArea} Central Colony`,
        area: newArea,
        city: 'Kathmandu',
        district: 'Kathmandu Valley',
        province: 'Bagmati Province',
        roadAccess: newRoad,
        lat: 27.7172,
        lng: 85.324
      },
      has3DModel: true,
      reviews: [],
      overallRating: 5.0,
      totalReviewsCount: 0,
      escrowDepositNPR: Math.round(Number(newPriceNPR) * 0.1),
      specs: {
        beds: Number(newBeds),
        baths: Number(newBaths),
        sqft: Number(newSqft),
        landMeasureNepal: newLand,
        yearBuilt: 2024,
        parkingSlots: 2,
        floors: 2.5,
        facing: 'South'
      },
      description: newDesc || `Modern architect-designed residence located in desirable ${newArea}. Built with earthquake-resistant frame and sunny South orientation.`,
      highlights: [
        'Complete Lalpurja verified with single owner clear title',
        '20 ft pitched road access with direct drainage and line water',
        'Seismic Grade-A certified build'
      ],
      amenities: [
        'Solar Water Heater',
        '2-Car Covered Garage',
        'Underground Water Tank 15,000L',
        'Modular Kitchen'
      ],
      agent: {
        name: 'EstateEase Private Listing Support',
        role: 'Verified Brokerage Desk',
        phone: '+977-9801234567',
        email: 'listings@estateease.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        licenseNo: 'REA-NP-2024-OWN',
        rating: 5.0,
        reviewsCount: 12,
        propertiesListed: 5,
        agency: 'EstateEase Direct Partner',
        badge: 'Verified Partner'
      }
    });

    setListSuccess(true);
    setTimeout(() => {
      setListSuccess(false);
      setActiveTab('saved');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <h2 className="text-base font-bold font-display">Client Portal & Dashboard</h2>
            <p className="text-xs text-slate-400">Manage saved residences, scheduled viewings, and verified receipts</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 text-xs font-semibold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'saved'
                ? 'border-amber-500 text-amber-700 font-bold bg-white -mb-px'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved Properties</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full tabular-nums">
              {savedProperties.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tours')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'tours'
                ? 'border-amber-500 text-amber-700 font-bold bg-white -mb-px'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Scheduled Tours</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full tabular-nums">
              {tours.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'payments'
                ? 'border-amber-500 text-amber-700 font-bold bg-white -mb-px'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Nepal Payment Receipts</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full tabular-nums">
              {payments.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'list'
                ? 'border-amber-500 text-amber-700 font-bold bg-white -mb-px'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>List a Property</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: Saved Properties */}
          {activeTab === 'saved' && (
            <div className="space-y-4">
              {savedProperties.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">No saved properties yet</h4>
                  <p className="text-xs max-w-sm mx-auto">
                    Click the heart icon on any residence card to save it for quick review and comparison.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedProperties.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-xs hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-[16/9] bg-slate-100">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={() => onRemoveSaved(p.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-base font-bold text-slate-900 font-display tabular-nums">
                            {formatCompactPrice(p, currency)}
                          </div>
                          <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{p.title}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{p.location.area}, {p.location.city}</p>
                          <div className="text-[11px] text-slate-600 mt-1 font-medium">
                            {p.specs.beds} Beds · {p.specs.baths} Baths · {p.specs.sqft} sq.ft
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => {
                              onClose();
                              onSelectProperty(p);
                            }}
                            className="text-xs text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Inspect Details</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                            Lalpurja Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Scheduled Tours */}
          {activeTab === 'tours' && (
            <div className="space-y-4">
              {tours.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <Calendar className="w-8 h-8 mx-auto text-slate-300" />
                  <div className="text-sm font-bold text-slate-800">No scheduled viewings</div>
                  <p className="text-xs">Browse homes and select "Schedule a Tour" to book a private walkthrough.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tours.map((tour) => (
                    <div
                      key={tour.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={tour.propertyImage}
                          alt={tour.propertyTitle}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-900">{tour.propertyTitle}</h4>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{tour.propertyLocation}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-700 font-semibold">
                            <span className="flex items-center gap-1 text-amber-600">
                              <Calendar className="w-3 h-3" />
                              <span>{tour.date}</span>
                            </span>
                            <span className="flex items-center gap-1 text-slate-600">
                              <Clock className="w-3 h-3" />
                              <span>{tour.timeSlot}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {tour.status}
                        </span>
                        {tour.status === 'Pending Token' && (
                          <button
                            onClick={() => onInitiatePaymentForTour(tour)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs"
                          >
                            Pay Token via eSewa
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Nepal Payment Receipts */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              {payments.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <CreditCard className="w-8 h-8 mx-auto text-slate-300" />
                  <div className="text-sm font-bold text-slate-800">No payment receipts</div>
                  <p className="text-xs">When you place a tour token or property holding deposit via eSewa/Khalti, receipts will be saved here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {payments.map((p) => (
                    <div
                      key={p.id}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{p.purpose}</span>
                          <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            {p.provider}
                          </span>
                        </div>
                        <div className="text-slate-500">
                          Receipt: <strong className="font-mono text-slate-800">{p.receiptNumber}</strong> · Ref: {p.verificationCode}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(p.timestamp).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <div className="text-right">
                          <div className="text-base font-bold text-emerald-700 font-display tabular-nums">
                            रू {p.amountNPR.toLocaleString()}
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        </div>
                        <button
                          onClick={() => window.print()}
                          className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600"
                          title="Print Receipt"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: List a Property Form */}
          {activeTab === 'list' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900">List Your Residence on EstateEase</h3>
                <p className="text-xs text-slate-500">
                  Connect directly with verified domestic and NRNA buyers. Every listing receives legal title audit and photography support.
                </p>
              </div>

              {listSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">Listing Submitted & Added to Portfolio!</h4>
                  <p className="text-xs text-emerald-700">
                    Your property has been successfully staged into the live portfolio.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Property Headline / Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Modern Glass Villa with Private Garden"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Property Type
                      </label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Modern Villa">Modern Villa</option>
                        <option value="Luxury Penthouse">Luxury Penthouse</option>
                        <option value="Scandinavian Residence">Scandinavian Residence</option>
                        <option value="Hillside Retreat">Hillside Retreat</option>
                        <option value="Heritage Haveli">Heritage Haveli</option>
                        <option value="Lakeview Residence">Lakeview Residence</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Asking Price (in Nepali Rupees NPR) *
                      </label>
                      <input
                        type="number"
                        required
                        step={1000000}
                        value={newPriceNPR}
                        onChange={(e) => setNewPriceNPR(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <span className="text-[10px] text-slate-400">
                        = रू {(newPriceNPR / 10000000).toFixed(2)} Crore (approx ${(newPriceNPR / 134).toLocaleString()} USD)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Area / Neighborhood *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Budhanilkantha"
                        value={newArea}
                        onChange={(e) => setNewArea(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Nepal Land Size
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 0-8-2-0 Aana"
                        value={newLand}
                        onChange={(e) => setNewLand(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Road Access Width
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 20 ft pitched road"
                        value={newRoad}
                        onChange={(e) => setNewRoad(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Bedrooms</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={newBeds}
                        onChange={(e) => setNewBeds(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Bathrooms</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={newBaths}
                        onChange={(e) => setNewBaths(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Sq. Footage</label>
                      <input
                        type="number"
                        step={100}
                        value={newSqft}
                        onChange={(e) => setNewSqft(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Description & Features
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Highlight architectural details, solar systems, boring water, or Lalpurja status..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Submit Property for Verification
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
