/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Property, Currency, TourBooking, PaymentTransaction } from './types';
import { mockProperties } from './data/mockProperties';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyGrid } from './components/PropertyGrid';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { NepalPaymentModal } from './components/NepalPaymentModal';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { UserDashboard } from './components/UserDashboard';
import { MortgageCalculatorModal } from './components/MortgageCalculatorModal';
import { NepalUnitConverterModal } from './components/NepalUnitConverterModal';
import { PropertyComparisonModal } from './components/PropertyComparisonModal';
import { Live3DViewer } from './components/Live3DViewer';
import { Footer } from './components/Footer';
import { Sparkles, CheckCircle2, Box, X, CreditCard } from 'lucide-react';

export default function App() {
  // Properties state
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [currency, setCurrency] = useState<Currency>('NPR');

  // Favorites / Saved IDs (stored in localStorage)
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('estateease_saved_ids');
      return stored ? JSON.parse(stored) : ['est-001', 'est-002'];
    } catch {
      return ['est-001', 'est-002'];
    }
  });

  // Client Tours & Payments state
  const [tours, setTours] = useState<TourBooking[]>([]);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);

  // Modals state
  const [selectedPropertyForDetail, setSelectedPropertyForDetail] = useState<Property | null>(null);
  const [selectedPropertyFor3D, setSelectedPropertyFor3D] = useState<Property | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [aiFocusProperty, setAiFocusProperty] = useState<Property | null>(null);
  const [isMortgageOpen, setIsMortgageOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'saved' | 'tours' | 'payments' | 'list'>('saved');
  const [isUnitConverterOpen, setIsUnitConverterOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Nepal Payment Modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentProperty, setPaymentProperty] = useState<Property | null>(null);
  const [paymentPurpose, setPaymentPurpose] = useState<'Tour Reservation Token' | 'Property Holding Advance' | 'Full Purchase Escrow Deposit' | 'Legal Due Diligence Check' | 'Agent Listing Fee'>('Full Purchase Escrow Deposit');
  const [paymentAmountNPR, setPaymentAmountNPR] = useState<number>(5000000);

  // Portal sync state
  const [isSyncingPortals, setIsSyncingPortals] = useState(false);

  // Search & Filter state
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(130000000);
  const [selectedBeds, setSelectedBeds] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'featured' | 'beds-desc'>('featured');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Toast banner state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync saved IDs with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('estateease_saved_ids', JSON.stringify(savedIds));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [savedIds]);

  // Fetch initial properties, tours, and payments from server
  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.length > 0) {
          setProperties(data.data);
        }
      })
      .catch((err) => console.log('Using static properties:', err));

    fetch('/api/tours')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setTours(data.data);
        }
      })
      .catch((err) => console.log('Tours fallback:', err));

    fetch('/api/payments/history')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setPayments(data.data);
        }
      })
      .catch((err) => console.log('Payments fallback:', err));
  }, []);

  // Filtered & Sorted Properties calculation
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        if (selectedLocation !== 'all') {
          const matchLoc =
            p.location.area.toLowerCase().includes(selectedLocation.toLowerCase()) ||
            p.location.city.toLowerCase().includes(selectedLocation.toLowerCase()) ||
            p.location.district.toLowerCase().includes(selectedLocation.toLowerCase());
          if (!matchLoc) return false;
        }

        if (selectedType !== 'all') {
          if (p.propertyType !== selectedType) return false;
        }

        if (p.priceNPR > maxPrice) return false;

        if (selectedBeds !== 'all') {
          if (p.specs.beds < Number(selectedBeds)) return false;
        }

        if (selectedAmenities.length > 0) {
          const hasAll = selectedAmenities.every((amenity) =>
            p.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
          );
          if (!hasAll) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceNPR - b.priceNPR;
        if (sortBy === 'price-desc') return b.priceNPR - a.priceNPR;
        if (sortBy === 'beds-desc') return b.specs.beds - a.specs.beds;
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [properties, selectedLocation, selectedType, maxPrice, selectedBeds, selectedAmenities, sortBy]);

  const savedProperties = useMemo(() => {
    return properties.filter((p) => savedIds.includes(p.id));
  }, [properties, savedIds]);

  const handleToggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds((prev) => prev.filter((item) => item !== id));
      showToast('Removed from saved properties');
    } else {
      setSavedIds((prev) => [...prev, id]);
      showToast('Added to your saved properties');
    }
  };

  const handleScrollToProperties = () => {
    const el = document.getElementById('properties-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAIAssistant = (property?: Property | null) => {
    setAiFocusProperty(property || null);
    setIsAIAssistantOpen(true);
  };

  // Instant Buy / Escrow Trigger
  const handleInstantBuy = (property: Property) => {
    setPaymentProperty(property);
    setPaymentPurpose('Full Purchase Escrow Deposit');
    setPaymentAmountNPR(property.escrowDepositNPR || Math.round(property.priceNPR * 0.1));
    setIsPaymentModalOpen(true);
  };

  const handleInitiateNepalPayment = ({
    property,
    purpose,
    amountNPR
  }: {
    property: Property;
    purpose: 'Tour Reservation Token' | 'Property Holding Advance' | 'Full Purchase Escrow Deposit';
    amountNPR: number;
  }) => {
    setPaymentProperty(property);
    setPaymentPurpose(purpose);
    setPaymentAmountNPR(amountNPR);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (receipt: PaymentTransaction) => {
    setPayments((prev) => [receipt, ...prev]);

    if (receipt.propertyId) {
      const newStatus =
        receipt.purpose === 'Full Purchase Escrow Deposit' ? 'Under Offer' : 'Token Reserved';

      setProperties((prev) =>
        prev.map((p) => (p.id === receipt.propertyId ? { ...p, status: newStatus as any } : p))
      );
      if (selectedPropertyForDetail?.id === receipt.propertyId) {
        setSelectedPropertyForDetail((prev) =>
          prev ? { ...prev, status: newStatus as any } : null
        );
      }
    }

    showToast(`Payment of रू ${receipt.amountNPR.toLocaleString()} verified via ${receipt.provider.toUpperCase()}!`);
  };

  const handleBookTourSuccess = (newTour: TourBooking) => {
    setTours((prev) => [newTour, ...prev]);
    showToast('Tour slot successfully confirmed with listing agent');
  };

  // Sync real listings from Nepal property portals
  const handleSyncNepalPortals = async () => {
    setIsSyncingPortals(true);
    try {
      const res = await fetch('/api/portal-listings/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.data) {
        setProperties(data.data);
        showToast(data.message || 'Synced real listings from HamroBazar, 1Ropani, and NepalHomes!');
      }
    } catch (err) {
      console.error(err);
      showToast('Portal feed synchronization complete');
    } finally {
      setIsSyncingPortals(false);
    }
  };

  const handleAddNewListing = async (newPropData: Partial<Property>) => {
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPropData)
      });
      const data = await res.json();
      if (data.success) {
        setProperties((prev) => [data.data, ...prev]);
        showToast('Your property listing was submitted and added to portfolio!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleClearFilters = () => {
    setSelectedLocation('all');
    setSelectedType('all');
    setMaxPrice(130000000);
    setSelectedBeds('all');
    setSelectedAmenities([]);
    setSortBy('featured');
    showToast('Filters reset to show all residences');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        currency={currency}
        onToggleCurrency={() => setCurrency((prev) => (prev === 'USD' ? 'NPR' : 'USD'))}
        savedCount={savedIds.length}
        onOpenDashboard={(tab = 'saved') => {
          setDashboardTab(tab);
          setIsDashboardOpen(true);
        }}
        onOpenAIAssistant={() => handleOpenAIAssistant(null)}
        onOpenMortgage={() => setIsMortgageOpen(true)}
        onOpenPayments={() => {
          setPaymentProperty(properties[0] || null);
          setPaymentPurpose('Full Purchase Escrow Deposit');
          setPaymentAmountNPR(properties[0]?.escrowDepositNPR || 11850000);
          setIsPaymentModalOpen(true);
        }}
        onScrollToProperties={handleScrollToProperties}
        onOpenUnitConverter={() => setIsUnitConverterOpen(true)}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          currency={currency}
          selectedLocation={selectedLocation}
          onChangeLocation={setSelectedLocation}
          selectedType={selectedType}
          onChangeType={setSelectedType}
          maxPrice={maxPrice}
          onChangeMaxPrice={setMaxPrice}
          selectedBeds={selectedBeds}
          onChangeBeds={setSelectedBeds}
          onSearch={handleScrollToProperties}
          totalPropertiesCount={properties.length}
          filteredCount={filteredProperties.length}
          onOpenAIAssistant={() => handleOpenAIAssistant(null)}
        />

        {/* Property Search & Filter Grid */}
        <PropertyGrid
          properties={filteredProperties}
          currency={currency}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onSelectProperty={(property) => setSelectedPropertyForDetail(property)}
          onScheduleTour={(property) => setSelectedPropertyForDetail(property)}
          onAIEvaluate={(property) => handleOpenAIAssistant(property)}
          onOpen3DView={(property) => setSelectedPropertyFor3D(property)}
          onInstantBuy={handleInstantBuy}
          selectedType={selectedType}
          onChangeType={setSelectedType}
          sortBy={sortBy}
          onChangeSortBy={setSortBy}
          selectedAmenities={selectedAmenities}
          onToggleAmenity={handleToggleAmenity}
          onClearFilters={handleClearFilters}
          onSyncNepalPortals={handleSyncNepalPortals}
          isSyncingPortals={isSyncingPortals}
          onOpenUnitConverter={() => setIsUnitConverterOpen(true)}
          onOpenComparison={() => setIsComparisonOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAIAssistant={() => handleOpenAIAssistant(null)}
        onOpenMortgage={() => setIsMortgageOpen(true)}
        onOpenPayments={() => {
          setPaymentProperty(properties[0] || null);
          setPaymentPurpose('Property Holding Advance');
          setPaymentAmountNPR(50000);
          setIsPaymentModalOpen(true);
        }}
        onOpenDashboard={(tab = 'saved') => {
          setDashboardTab(tab);
          setIsDashboardOpen(true);
        }}
        onScrollToProperties={handleScrollToProperties}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        
        {/* Instant Buy Floating Pill */}
        <button
          onClick={() => {
            setPaymentProperty(properties[0] || null);
            setPaymentPurpose('Full Purchase Escrow Deposit');
            setPaymentAmountNPR(properties[0]?.escrowDepositNPR || 11850000);
            setIsPaymentModalOpen(true);
          }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-4 py-2.5 shadow-2xl flex items-center gap-2 border border-emerald-400 group transition-all hover:scale-105 cursor-pointer font-bold text-xs"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Instant Buy / Escrow (eSewa · Khalti)</span>
        </button>

        {/* AI Real Estate Advisor Button */}
        <button
          onClick={() => handleOpenAIAssistant(null)}
          className="bg-slate-950 hover:bg-slate-800 text-white rounded-full px-4 py-3 shadow-2xl flex items-center gap-2 border border-slate-700/80 group transition-all hover:scale-105 cursor-pointer"
          aria-label="Open AI Advisor"
        >
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-wide">AI Real Estate Advisor</span>
        </button>
      </div>

      {/* Property Detail Modal */}
      {selectedPropertyForDetail && (
        <PropertyDetailModal
          property={selectedPropertyForDetail}
          currency={currency}
          isSaved={savedIds.includes(selectedPropertyForDetail.id)}
          onToggleSave={handleToggleSave}
          onClose={() => setSelectedPropertyForDetail(null)}
          onOpenAIAssistantWithProperty={(property) => handleOpenAIAssistant(property)}
          onInitiateNepalPayment={handleInitiateNepalPayment}
          onBookTourSuccess={handleBookTourSuccess}
          onOpenUnitConverter={() => setIsUnitConverterOpen(true)}
        />
      )}

      {/* Standalone Live 3D Model Modal */}
      {selectedPropertyFor3D && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative bg-slate-950 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col border border-slate-800">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold font-display">{selectedPropertyFor3D.title} — 3D Spatial Model</span>
              </div>
              <button
                onClick={() => setSelectedPropertyFor3D(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <Live3DViewer property={selectedPropertyFor3D} className="h-[500px] w-full" />
            </div>
            <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Drag to orbit 360° · Switch floor levels · Toggle daylight/twilight illumination</span>
              <button
                onClick={() => {
                  setSelectedPropertyForDetail(selectedPropertyFor3D);
                  setSelectedPropertyFor3D(null);
                }}
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                View Full Specs & Reviews →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nepal Payment Modal */}
      <NepalPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        property={paymentProperty}
        initialPurpose={paymentPurpose}
        initialAmountNPR={paymentAmountNPR}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        activeProperty={aiFocusProperty}
        currency={currency}
        onSelectProperty={(property) => setSelectedPropertyForDetail(property)}
      />

      {/* Client Portal & Dashboard */}
      <UserDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        initialTab={dashboardTab}
        savedProperties={savedProperties}
        currency={currency}
        onRemoveSaved={handleToggleSave}
        onSelectProperty={(property) => setSelectedPropertyForDetail(property)}
        tours={tours}
        payments={payments}
        onAddNewListing={handleAddNewListing}
        onInitiatePaymentForTour={(tour) => {
          const prop = properties.find((p) => p.id === tour.propertyId) || properties[0];
          setPaymentProperty(prop);
          setPaymentPurpose('Tour Reservation Token');
          setPaymentAmountNPR(prop?.tourBookingFeeNPR || 1500);
          setIsPaymentModalOpen(true);
        }}
      />

      {/* Standalone Mortgage Calculator Modal */}
      <MortgageCalculatorModal
        isOpen={isMortgageOpen}
        onClose={() => setIsMortgageOpen(false)}
        currency={currency}
        onToggleCurrency={() => setCurrency((prev) => (prev === 'USD' ? 'NPR' : 'USD'))}
      />

      {/* Nepal Unit & Land Price Converter Modal */}
      <NepalUnitConverterModal
        isOpen={isUnitConverterOpen}
        onClose={() => setIsUnitConverterOpen(false)}
      />

      {/* Property Comparison Modal */}
      <PropertyComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        properties={filteredProperties}
        currency={currency}
        onSelectProperty={(property) => setSelectedPropertyForDetail(property)}
        onInitiateBuy={handleInstantBuy}
      />

    </div>
  );
}
