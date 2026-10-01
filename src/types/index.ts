export type Currency = 'USD' | 'NPR';

export interface Agent {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
  licenseNo: string;
  rating: number;
  reviewsCount: number;
  propertiesListed: number;
  agency: string;
  badge: 'Top Producer' | 'Verified Partner' | 'Premier Broker';
}

export interface Review {
  id: string;
  author: string;
  role: 'Verified Buyer' | 'Diplomat Resident' | 'Tenant' | 'Architect / Surveyor' | 'Local Homeowner';
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  priceUSD: number;
  priceNPR: number;
  propertyType: 'Modern Villa' | 'Luxury Penthouse' | 'Scandinavian Residence' | 'Hillside Retreat' | 'Heritage Haveli' | 'Lakeview Residence';
  status: 'Available' | 'Under Offer' | 'Token Reserved' | 'Sold';
  featured: boolean;
  location: {
    address: string;
    city: string;
    district: string;
    area: string;
    province: string;
    roadAccess: string; // e.g. "24 ft wide pitched road"
    lat: number;
    lng: number;
  };
  specs: {
    beds: number;
    baths: number;
    sqft: number;
    landMeasureNepal: string; // e.g. "0-8-2-0 Aana" or "1-4-0-0 Ropani"
    yearBuilt: number;
    parkingSlots: number;
    floors: number;
    facing: 'North-East' | 'South' | 'South-East' | 'West' | 'East';
  };
  images: string[];
  amenities: string[];
  description: string;
  highlights: string[];
  agent: Agent;
  holdingTokenNPR: number;
  tourBookingFeeNPR: number;
  escrowDepositNPR: number; // 10% Earnest buy deposit
  legalVerified: boolean;
  lalpurjaVerified: boolean;
  droneTourAvailable: boolean;
  has3DModel: boolean;
  portalSource?: {
    portalName: 'HamroBazar' | '1Ropani' | 'NepalHomes' | 'GharBazar' | 'EstateEase Exclusive';
    portalListingId: string;
    syncedAt: string;
    verifiedLalpurjaNo: string;
  };
  reviews: Review[];
  overallRating: number;
  totalReviewsCount: number;
}

export interface TourBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyImage: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  timeSlot: string;
  tourType: 'In-Person Private Tour' | 'Virtual Video Walkthrough';
  notes?: string;
  status: 'Confirmed' | 'Pending Token' | 'Completed';
  bookedAt: string;
  paymentRef?: string;
}

export type NepalPaymentProvider = 'esewa' | 'khalti' | 'imepay' | 'connectips';

export interface PaymentTransaction {
  id: string;
  pidx: string;
  provider: NepalPaymentProvider;
  purpose: 'Tour Reservation Token' | 'Property Holding Advance' | 'Full Purchase Escrow Deposit' | 'Legal Due Diligence Check' | 'Agent Listing Fee';
  amountNPR: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  propertyId?: string;
  propertyTitle?: string;
  clientName: string;
  clientPhone: string;
  timestamp: string;
  receiptNumber: string;
  verificationCode: string;
  paymentDetails?: {
    mobile?: string;
    accountName?: string;
    bankName?: string;
    fee: number;
    tax: number;
  };
}

export interface MortgageCalculation {
  propertyPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  monthlyEMI: number;
  totalPayment: number;
  totalInterest: number;
}
