import { Property } from '../types';

export const mockProperties: Property[] = [
  {
    id: 'est-001',
    title: 'The Glass Pavilion & Infinity Villa',
    slug: 'glass-pavilion-infinity-villa',
    priceUSD: 885000,
    priceNPR: 118500000,
    propertyType: 'Modern Villa',
    status: 'Available',
    featured: true,
    location: {
      address: 'VIP Colony, Road 4',
      area: 'Budhanilkantha',
      city: 'Kathmandu',
      district: 'Kathmandu Valley',
      province: 'Bagmati Province',
      roadAccess: '24 ft wide pitched road',
      lat: 27.7785,
      lng: 85.3615
    },
    specs: {
      beds: 5,
      baths: 6,
      sqft: 5850,
      landMeasureNepal: '1-2-0-0 Ropani (18 Aana)',
      yearBuilt: 2024,
      parkingSlots: 4,
      floors: 3,
      facing: 'South-East'
    },
    images: [
      '/src/assets/images/property_glass_villa_1790835992232.jpg',
      '/src/assets/images/hero_estate_banner_1790835980666.jpg',
      '/src/assets/images/property_modern_residence_1790836016602.jpg'
    ],
    amenities: [
      'Private Infinity Pool',
      '10kVA Hybrid Solar Inverter',
      'Italian Marble & Teak Flooring',
      '2-Car EV Fast Charger',
      'Smart Home Automation',
      'Dedicated Home Cinema',
      'Deep Borewell with RO Filtration',
      '24/7 Monitored Guard House'
    ],
    description: 'An architectural tour de force nestled in the serene foothills of Budhanilkantha. Features floor-to-ceiling soundproof triple-glazed glass, double-height foyer with floating timber stairs, heated infinity edge pool, and panoramic views of the Shivapuri National Park ridge line. Fully compliant with seismic safety standards with clear land title.',
    highlights: [
      'Seismic Grade-A structural design with certified engineering stamp',
      'Clean freehold ownership Lalpurja with single-owner verified title',
      'Independent servant quarters with detached bathroom and utility kitchen',
      'Integrated water rainwater harvesting system with 25,000L underground reservoir'
    ],
    agent: {
      name: 'Aarav Shrestha',
      role: 'Principal Luxury Specialist',
      phone: '+977-9801234567',
      email: 'aarav.shrestha@estateease.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      licenseNo: 'REA-NP-2018-842',
      rating: 4.95,
      reviewsCount: 48,
      propertiesListed: 22,
      agency: 'EstateEase Signature Collection',
      badge: 'Top Producer'
    },
    holdingTokenNPR: 50000,
    tourBookingFeeNPR: 1500,
    escrowDepositNPR: 11850000, // 10% Earnest deposit
    legalVerified: true,
    lalpurjaVerified: true,
    droneTourAvailable: true,
    has3DModel: true,
    portalSource: {
      portalName: '1Ropani',
      portalListingId: '1ROP-BNK-2026-991',
      syncedAt: '2026-09-30T10:15:00Z',
      verifiedLalpurjaNo: 'KT-38291-MALPOT-CHABAHIL'
    },
    overallRating: 4.9,
    totalReviewsCount: 14,
    reviews: [
      {
        id: 'rev-01',
        author: 'Dr. Rabin Manandhar',
        role: 'Verified Buyer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2026-09-18',
        title: 'Unmatched construction quality and serene Budhanilkantha air',
        comment: 'We inspected the structural foundation and soil test report with our private civil engineer. The building exceeds standard Grade-A specifications, and the Lalpurja deed had zero liens at the Malpot office. The pool and sunset views towards Shivapuri are breathtaking.',
        verifiedPurchase: true,
        helpfulCount: 28
      },
      {
        id: 'rev-02',
        author: 'Elena Rostova',
        role: 'Diplomat Resident',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2026-08-25',
        title: 'Top-tier embassy security and solar backup',
        comment: 'Living here gives true peace of mind. The 10kVA solar hybrid system handles load shedding effortlessly, and the 24ft wide paved access allows easy diplomatic convoy movement.',
        verifiedPurchase: true,
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'est-002',
    title: 'Skyline Terrace Penthouse at Central Oasis',
    slug: 'skyline-terrace-penthouse',
    priceUSD: 620000,
    priceNPR: 83000000,
    propertyType: 'Luxury Penthouse',
    status: 'Available',
    featured: true,
    location: {
      address: 'Level 14 & 15, Oasis Tower',
      area: 'Jhamsikhel (Sanepa Heights)',
      city: 'Lalitpur',
      district: 'Kathmandu Valley',
      province: 'Bagmati Province',
      roadAccess: '30 ft arterial road with direct boulevard access',
      lat: 27.6835,
      lng: 85.3082
    },
    specs: {
      beds: 4,
      baths: 4,
      sqft: 4200,
      landMeasureNepal: 'Duplex Penthouse (4,200 sq.ft)',
      yearBuilt: 2023,
      parkingSlots: 3,
      floors: 2,
      facing: 'North-East'
    },
    images: [
      '/src/assets/images/property_penthouse_skyline_1790836004106.jpg',
      '/src/assets/images/hero_estate_banner_1790835980666.jpg',
      '/src/assets/images/property_glass_villa_1790835992232.jpg'
    ],
    amenities: [
      'Private 900 sq.ft Sky Deck',
      'Private Elevator Access to Foyer',
      'Miele & Sub-Zero Fitted Chef Kitchen',
      'Gym & Spa in Building',
      '100% Full Generator Backup',
      'Temperature-Controlled Wine Cellar',
      'Concierge & Package Locker Service',
      'High-Speed Fiber Multi-WAN'
    ],
    description: 'Commanding uninterrupted 360-degree vistas of the Kathmandu valley and the snow-capped Himalayan range on clear mornings. This duplex penthouse combines minimalist European finishes with high-spec security. Steps from top embassies, international cafes, and gourmet restaurants in Jhamsikhel.',
    highlights: [
      'Private dedicated rooftop jacuzzi terrace with outdoor barbecue station',
      'Direct card-keyed private elevator into personal residence foyer',
      'Acoustically isolated primary suite with walk-in double dressing room',
      'Registered condominium deed with joint undivided land ownership'
    ],
    agent: {
      name: 'Priyanka Karki',
      role: 'Diplomatic & High-Net-Worth Advisory',
      phone: '+977-9841890123',
      email: 'priyanka.karki@estateease.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      licenseNo: 'REA-NP-2020-119',
      rating: 4.98,
      reviewsCount: 62,
      propertiesListed: 31,
      agency: 'EstateEase Prime City',
      badge: 'Premier Broker'
    },
    holdingTokenNPR: 75000,
    tourBookingFeeNPR: 2000,
    escrowDepositNPR: 8300000,
    legalVerified: true,
    lalpurjaVerified: true,
    droneTourAvailable: true,
    has3DModel: true,
    portalSource: {
      portalName: 'NepalHomes',
      portalListingId: 'NH-JHM-8841',
      syncedAt: '2026-09-29T14:30:00Z',
      verifiedLalpurjaNo: 'LT-0982-CONDO-PULCHOWK'
    },
    overallRating: 4.95,
    totalReviewsCount: 18,
    reviews: [
      {
        id: 'rev-03',
        author: 'Bikash Adhikari',
        role: 'Verified Buyer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2026-09-12',
        title: 'Best view in Lalitpur with flawless escrow transfer',
        comment: 'Paid the holding token via ConnectIPS within 5 minutes. The legal transfer at Lalitpur Land Revenue Office was coordinated by EstateEase in under 3 days. The private sky deck is unmatched.',
        verifiedPurchase: true,
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'est-003',
    title: 'The Scandinavian Courtyard Residence',
    slug: 'scandinavian-courtyard-residence',
    priceUSD: 495000,
    priceNPR: 66300000,
    propertyType: 'Scandinavian Residence',
    status: 'Available',
    featured: false,
    location: {
      address: 'Lane 7, Embassy Quarter',
      area: 'Baluwatar',
      city: 'Kathmandu',
      district: 'Kathmandu Valley',
      province: 'Bagmati Province',
      roadAccess: '20 ft blacktopped road',
      lat: 27.7265,
      lng: 85.3312
    },
    specs: {
      beds: 4,
      baths: 5,
      sqft: 3600,
      landMeasureNepal: '0-9-2-0 Aana (3,250 sq.ft land)',
      yearBuilt: 2024,
      parkingSlots: 3,
      floors: 2.5,
      facing: 'South'
    },
    images: [
      '/src/assets/images/property_modern_residence_1790836016602.jpg',
      '/src/assets/images/property_glass_villa_1790835992232.jpg',
      '/src/assets/images/hero_estate_banner_1790835980666.jpg'
    ],
    amenities: [
      'Internal Japanese Zen Courtyard',
      'Hydronic Underfloor Radiant Heating',
      'Triple-Filter Central Ventilation',
      'EV Ready Garage with Automated Shutter',
      'Modern Island Kitchen with Quartz Countertops',
      'Separate Study & Library Room',
      'Organic Herb Garden Rooftop',
      'CCTV & Video Intercom Security'
    ],
    description: 'A serene urban sanctuary in highly prestigious Baluwatar. Designed with clean Scandinavian lines, warm white oak timbers, and a light-filled central courtyard that floods every room with sunshine. Optimal thermal efficiency with rockwool wall insulation and double-paned argon windows.',
    highlights: [
      'Prime Baluwatar zone with rapid access to Prime Minister residence and major embassies',
      'Underfloor radiant heating on ground floor for pleasant winter comfort',
      'High solar gain South-facing orientation reducing winter electrical loads by 40%',
      'Single-owner Lalpurja with clear mortgage release from Nabil Bank'
    ],
    agent: {
      name: 'Kshitiz Thapa',
      role: 'Residential Architecture Consultant',
      phone: '+977-9851023456',
      email: 'kshitiz.thapa@estateease.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      licenseNo: 'REA-NP-2016-512',
      rating: 4.88,
      reviewsCount: 37,
      propertiesListed: 18,
      agency: 'EstateEase Capital Living',
      badge: 'Verified Partner'
    },
    holdingTokenNPR: 40000,
    tourBookingFeeNPR: 1500,
    escrowDepositNPR: 6630000,
    legalVerified: true,
    lalpurjaVerified: true,
    droneTourAvailable: false,
    has3DModel: true,
    portalSource: {
      portalName: 'HamroBazar',
      portalListingId: 'HB-BLW-55021',
      syncedAt: '2026-09-30T08:00:00Z',
      verifiedLalpurjaNo: 'KT-12401-MALPOT-DILLIBZ'
    },
    overallRating: 4.85,
    totalReviewsCount: 9,
    reviews: [
      {
        id: 'rev-04',
        author: 'Subash & Anjali Basnet',
        role: 'Verified Buyer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2026-09-20',
        title: 'Incredible winter warmth and quiet street',
        comment: 'The underfloor heating makes Kathmandu winter feel like spring. The central courtyard is our favorite spot for morning tea.',
        verifiedPurchase: true,
        helpfulCount: 15
      }
    ]
  },
  {
    id: 'est-004',
    title: 'Shivapuri Ridge Hillside Sanctuary',
    slug: 'shivapuri-ridge-hillside-sanctuary',
    priceUSD: 750000,
    priceNPR: 100500000,
    propertyType: 'Hillside Retreat',
    status: 'Available',
    featured: true,
    location: {
      address: 'Upper Pinecrest View',
      area: 'Tarebhir Foothills',
      city: 'Kathmandu',
      district: 'Kathmandu Valley',
      province: 'Bagmati Province',
      roadAccess: '18 ft paved concrete scenic private road',
      lat: 27.795,
      lng: 85.398
    },
    specs: {
      beds: 4,
      baths: 5,
      sqft: 4900,
      landMeasureNepal: '2-0-0-0 Ropani (32 Aana Estate)',
      yearBuilt: 2023,
      parkingSlots: 5,
      floors: 2,
      facing: 'South'
    },
    images: [
      '/src/assets/images/property_retreat_hillside_1790836028005.jpg',
      '/src/assets/images/hero_estate_banner_1790835980666.jpg',
      '/src/assets/images/property_glass_villa_1790835992232.jpg'
    ],
    amenities: [
      'Heated Outdoor Swimming Spa',
      '2 Ropani Landscaped Estate with Fruit Orchard',
      'Natural Fireplace with Stone Chimney',
      'Wrap-Around Pine Decking',
      'Pure Mountain Spring Water Line',
      'Solar Power Storage System (15kW)',
      'Detached Caretaker Cottage',
      'Helipad Access Point Nearby'
    ],
    description: 'A breath of crisp pine air perched above the Kathmandu valley smog line. This hillside retreat combines raw slate stone, cedar timbers, and expansive glass curtain walls. Enjoy complete privacy, panoramic valley night lights, and immediate walking trail access into Shivapuri reserve.',
    highlights: [
      'Total plot size of 2 Full Ropanis with fruit trees and stone retaining terrace walls',
      'Unobstructed valley-wide sunset and mountain vistas guaranteed in perpetuity',
      'Custom wood-burning masonry fireplace built from locally quarried stone',
      'Fully off-grid capable with 15kW battery bank and direct spring conduit'
    ],
    agent: {
      name: 'Aarav Shrestha',
      role: 'Principal Luxury Specialist',
      phone: '+977-9801234567',
      email: 'aarav.shrestha@estateease.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      licenseNo: 'REA-NP-2018-842',
      rating: 4.95,
      reviewsCount: 48,
      propertiesListed: 22,
      agency: 'EstateEase Signature Collection',
      badge: 'Top Producer'
    },
    holdingTokenNPR: 50000,
    tourBookingFeeNPR: 1500,
    escrowDepositNPR: 10050000,
    legalVerified: true,
    lalpurjaVerified: true,
    droneTourAvailable: true,
    has3DModel: true,
    portalSource: {
      portalName: '1Ropani',
      portalListingId: '1ROP-SHIV-3321',
      syncedAt: '2026-09-30T11:00:00Z',
      verifiedLalpurjaNo: 'KT-99120-MALPOT-SANKHU'
    },
    overallRating: 4.92,
    totalReviewsCount: 11,
    reviews: [
      {
        id: 'rev-05',
        author: 'Devendra KC',
        role: 'Architect / Surveyor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2026-08-30',
        title: 'Masterclass in hillside seismic retaining wall engineering',
        comment: 'The reinforced concrete stepped foundation and stone masonry are top tier. Zero risk of slope slippage. Having 2 full Ropani in Kathmandu valley at this elevation is rare.',
        verifiedPurchase: true,
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'est-005',
    title: 'The Contemporary Heritage Haveli',
    slug: 'contemporary-heritage-haveli',
    priceUSD: 820000,
    priceNPR: 109800000,
    propertyType: 'Heritage Haveli',
    status: 'Under Offer',
    featured: false,
    location: {
      address: 'Old Quarter Promenade',
      area: 'Patan Dhoka & Pulchowk',
      city: 'Lalitpur',
      district: 'Kathmandu Valley',
      province: 'Bagmati Province',
      roadAccess: '20 ft heritage stone roadway',
      lat: 27.6745,
      lng: 85.321
    },
    specs: {
      beds: 5,
      baths: 6,
      sqft: 5200,
      landMeasureNepal: '1-0-2-0 Ropani (16.5 Aana)',
      yearBuilt: 2022,
      parkingSlots: 4,
      floors: 3.5,
      facing: 'East'
    },
    images: [
      '/src/assets/images/property_heritage_haveli_1790836059641.jpg',
      '/src/assets/images/property_modern_residence_1790836016602.jpg',
      '/src/assets/images/property_glass_villa_1790835992232.jpg'
    ],
    amenities: [
      'Hand-Carved Sal Wood Window Jhalas',
      'Traditional Exposed Dachi Appa Brickwork',
      'Modern High-Efficiency German Kitchen',
      'Water Feature & Lotus Pond Courtyard',
      'Heated Plunge Pool in Atrium',
      'Underground Wine & Tasting Cellar',
      'Full Home Backup Generator 25kVA',
      'Soundproof Triple-Glass Glazing'
    ],
    description: 'Where UNESCO-level Newari craft meets modern luxury engineering. Handcrafted by master woodcarvers from Bhaktapur and reinforced with structural steel pillars. Features a central sunken lightwell, exposed antique brick arches, custom brass fittings, and private spa baths.',
    highlights: [
      'Authentic certified Dachi Appa exposed fired brick façade with timber eaves',
      'Seismically decoupled steel moment frame hidden within classical architecture',
      'Located within 5 minutes walk of Patan Durbar Square and Pulchowk business hub',
      'Pre-approved for diplomatic residency and private cultural foundation use'
    ],
    agent: {
      name: 'Priyanka Karki',
      role: 'Diplomatic & High-Net-Worth Advisory',
      phone: '+977-9841890123',
      email: 'priyanka.karki@estateease.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      licenseNo: 'REA-NP-2020-119',
      rating: 4.98,
      reviewsCount: 62,
      propertiesListed: 31,
      agency: 'EstateEase Prime City',
      badge: 'Premier Broker'
    },
    holdingTokenNPR: 60000,
    tourBookingFeeNPR: 2000,
    escrowDepositNPR: 10980000,
    legalVerified: true,
    lalpurjaVerified: true,
    droneTourAvailable: true,
    has3DModel: true,
    portalSource: {
      portalName: 'GharBazar',
      portalListingId: 'GB-PTN-7819',
      syncedAt: '2026-09-28T16:00:00Z',
      verifiedLalpurjaNo: 'LT-55198-PATAN-DURBAR'
    },
    overallRating: 4.96,
    totalReviewsCount: 16,
    reviews: [
      {
        id: 'rev-06',
        author: 'Marcus Vance',
        role: 'Diplomat Resident',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2026-09-05',
        title: 'Authentic cultural heritage with 21st-century comfort',
        comment: 'The woodwork is museum caliber. Walking through the inner brick atrium feels like living in ancient Nepal with all modern amenities.',
        verifiedPurchase: true,
        helpfulCount: 18
      }
    ]
  },
  {
    id: 'est-006',
    title: 'Fewa Lakefront Minimalist Residence',
    slug: 'fewa-lakefront-minimalist-residence',
    priceUSD: 690000,
    priceNPR: 92400000,
    propertyType: 'Lakeview Residence',
    status: 'Available',
    featured: true,
    location: {
      address: 'Lakeside North Ridge',
      area: 'Sarangkot Foothills & Lakeside',
      city: 'Pokhara',
      district: 'Kaski District',
      province: 'Gandaki Province',
      roadAccess: '22 ft lakeside scenic avenue',
      lat: 28.2255,
      lng: 83.953
    },
    specs: {
      beds: 4,
      baths: 5,
      sqft: 4500,
      landMeasureNepal: '1-6-0-0 Ropani (22 Aana)',
      yearBuilt: 2024,
      parkingSlots: 4,
      floors: 2.5,
      facing: 'North-East'
    },
    images: [
      '/src/assets/images/property_lakeview_modern_1790836072238.jpg',
      '/src/assets/images/hero_estate_banner_1790835980666.jpg',
      '/src/assets/images/property_retreat_hillside_1790836028005.jpg'
    ],
    amenities: [
      'Unobstructed Fewa Lake Panorama',
      'Cantilevered Glass Infinity Pool',
      'Private Boat Slipway Access',
      'Annapurna Mountain View Sunset Deck',
      'Commercial Grade Solar Micro-Grid',
      'Floor-to-Ceiling Sliding Glazing',
      'Integrated Outdoor Dining Pavilion',
      'High-Yield Airbnb/Vacation License Ready'
    ],
    description: 'An idyllic lakefront estate positioned on the pristine northern shoreline of Fewa Lake in Pokhara. Watch morning mist drift across the water with the iconic Machhapuchhre (Fishtail) peak reflecting in the pool. Crafted with polished white stucco, Italian porcelain tiling, and frameless glass balustrades.',
    highlights: [
      'Direct lakefront visual zoning with guaranteed view protection rights',
      'High rental yield potential: projected $4,500/month on luxury vacation lease',
      'Includes private registered lakefront easement and mooring rights',
      'Clear title deed verified by Pokhara Malpot office with zero encumbrance'
    ],
    agent: {
      name: 'Rohan Manandhar',
      role: 'Pokhara & Western Nepal Regional Director',
      phone: '+977-9818765432',
      email: 'rohan.manandhar@estateease.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      licenseNo: 'REA-NP-2019-338',
      rating: 4.92,
      reviewsCount: 41,
      propertiesListed: 19,
      agency: 'EstateEase Pokhara Premier',
      badge: 'Verified Partner'
    },
    holdingTokenNPR: 50000,
    tourBookingFeeNPR: 1500,
    escrowDepositNPR: 9240000,
    legalVerified: true,
    lalpurjaVerified: true,
    droneTourAvailable: true,
    has3DModel: true,
    portalSource: {
      portalName: 'NepalHomes',
      portalListingId: 'NH-POK-9120',
      syncedAt: '2026-09-30T12:45:00Z',
      verifiedLalpurjaNo: 'PK-44102-MALPOT-POKHARA'
    },
    overallRating: 4.94,
    totalReviewsCount: 22,
    reviews: [
      {
        id: 'rev-07',
        author: 'Suman Gurung',
        role: 'Verified Buyer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2026-09-15',
        title: 'World-class Pokhara retreat with incredible Machhapuchhre reflection',
        comment: 'The sunrise over Fewa lake from the master bedroom balcony is unbeatable. The booking was settled seamlessly via eSewa and ConnectIPS.',
        verifiedPurchase: true,
        helpfulCount: 27
      }
    ]
  },
  {
    id: 'est-007',
    title: 'The Lazimpat Executive Townhome',
    slug: 'lazimpat-executive-townhome',
    priceUSD: 430000,
    priceNPR: 57600000,
    propertyType: 'Modern Villa',
    status: 'Available',
    featured: false,
    location: {
      address: 'Shangri-La Avenue, Gate 2',
      area: 'Lazimpat',
      city: 'Kathmandu',
      district: 'Kathmandu Valley',
      province: 'Bagmati Province',
      roadAccess: '20 ft wide quiet cul-de-sac',
      lat: 27.7215,
      lng: 85.3185
    },
    specs: {
      beds: 4,
      baths: 4,
      sqft: 3400,
      landMeasureNepal: '0-7-2-0 Aana (2,560 sq.ft land)',
      yearBuilt: 2023,
      parkingSlots: 2,
      floors: 3,
      facing: 'South'
    },
    images: [
      '/src/assets/images/property_modern_residence_1790836016602.jpg',
      '/src/assets/images/property_glass_villa_1790835992232.jpg',
      '/src/assets/images/property_penthouse_skyline_1790836004106.jpg'
    ],
    amenities: [
      'Gated Private Compound of 4 Homes',
      'Automated Security Barrier & Guard',
      'Custom Walnut Millwork & Wardrobes',
      'Rooftop BBQ & Entertainment Lounge',
      'Underground Water Tank 18,000L',
      'High-Speed Multi-Port Ethernet Wiring',
      'Modular German Hardware Kitchen',
      'Solar Water Heating Panels'
    ],
    description: 'Located in Kathmandu’s coveted embassy corridor of Lazimpat. Walking distance to international dining, five-star hotels, and shopping. Features an efficient multi-level floor plan with an open concept chef kitchen, serene bedroom sanctuaries, and a sunny rooftop terrace.',
    highlights: [
      'Quiet cul-de-sac location off Lazimpat main road with 24/7 security watch',
      'Solar thermal hot water system and backup battery storage included',
      'Ready for immediate possession with freshly completed municipal building completion certificate',
      'Ideal for diplomatic lease with standard UN/Embassy lease clauses pre-approved'
    ],
    agent: {
      name: 'Kshitiz Thapa',
      role: 'Residential Architecture Consultant',
      phone: '+977-9851023456',
      email: 'kshitiz.thapa@estateease.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      licenseNo: 'REA-NP-2016-512',
      rating: 4.88,
      reviewsCount: 37,
      propertiesListed: 18,
      agency: 'EstateEase Capital Living',
      badge: 'Verified Partner'
    },
    holdingTokenNPR: 35000,
    tourBookingFeeNPR: 1500,
    escrowDepositNPR: 5760000,
    legalVerified: true,
    lalpurjaVerified: true,
    droneTourAvailable: false,
    has3DModel: true,
    portalSource: {
      portalName: 'HamroBazar',
      portalListingId: 'HB-LZM-44910',
      syncedAt: '2026-09-30T07:15:00Z',
      verifiedLalpurjaNo: 'KT-88123-MALPOT-DILLIBZ'
    },
    overallRating: 4.86,
    totalReviewsCount: 13,
    reviews: [
      {
        id: 'rev-08',
        author: 'Prashant Sharma',
        role: 'Verified Buyer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2026-09-08',
        title: 'Quiet gated sanctuary in the center of Lazimpat',
        comment: 'Minutes from Radisson Hotel and British Council. The compound security is prompt, and our neighbors are polite international professionals.',
        verifiedPurchase: true,
        helpfulCount: 14
      }
    ]
  }
];

export const syncedPortalExtraListings: Property[] = [
  {
    id: 'portal-hb-01',
    title: 'The Baneshwor Heights Executive Villa',
    slug: 'baneshwor-heights-executive-villa',
    priceUSD: 395000,
    priceNPR: 52900000,
    propertyType: 'Modern Villa',
    status: 'Available',
    featured: false,
    location: {
      address: 'Madhya Marg, Lane 3',
      area: 'New Baneshwor',
      city: 'Kathmandu',
      district: 'Kathmandu Valley',
      province: 'Bagmati Province',
      roadAccess: '20 ft wide pitched road',
      lat: 27.6912,
      lng: 85.3418
    },
    specs: {
      beds: 5,
      baths: 5,
      sqft: 3450,
      landMeasureNepal: '0-8-0-0 Aana',
      yearBuilt: 2024,
      parkingSlots: 3,
      floors: 3,
      facing: 'South'
    },
    images: [
      '/src/assets/images/property_modern_residence_1790836016602.jpg',
      '/src/assets/images/property_glass_villa_1790835992232.jpg'
    ],
    amenities: [
      'Solar Backup 8kVA',
      'Modern Modular Kitchen',
      'Water Reservoir 20,000L',
      'South-Facing Terrace Garden'
    ],
    description: 'Freshly synced from HamroBazar Real Estate. Modern 3-story bungalow within walking distance of the Federal Parliament area and civil service hospitals. Perfect for executive families desiring prime central Kathmandu connectivity.',
    highlights: [
      'Synced from HamroBazar verified listings database',
      'Lalpurja verified with single female owner tax clearance',
      '20 ft pitched access with zero dead-end traffic'
    ],
    agent: {
      name: 'Aarav Shrestha',
      role: 'Principal Luxury Specialist',
      phone: '+977-9801234567',
      email: 'aarav.shrestha@estateease.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      licenseNo: 'REA-NP-2018-842',
      rating: 4.95,
      reviewsCount: 48,
      propertiesListed: 22,
      agency: 'EstateEase Signature Collection',
      badge: 'Top Producer'
    },
    holdingTokenNPR: 40000,
    tourBookingFeeNPR: 1500,
    escrowDepositNPR: 5290000,
    legalVerified: true,
    lalpurjaVerified: true,
    droneTourAvailable: false,
    has3DModel: true,
    portalSource: {
      portalName: 'HamroBazar',
      portalListingId: 'HB-BNS-99381',
      syncedAt: '2026-10-01T04:20:00Z',
      verifiedLalpurjaNo: 'KT-39182-MALPOT-DILLIBZ'
    },
    overallRating: 4.88,
    totalReviewsCount: 7,
    reviews: [
      {
        id: 'rev-09',
        author: 'Kiran Thapa',
        role: 'Verified Buyer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2026-09-22',
        title: 'Central Baneshwor location with quiet surroundings',
        comment: 'Hard to find a home in Baneshwor with 20 ft road access and zero traffic noise. Verified clean title at Dilli Bazar Malpot.',
        verifiedPurchase: true,
        helpfulCount: 11
      }
    ]
  },
  {
    id: 'portal-1rop-02',
    title: 'Hattiban Pine Hill Modern Residence',
    slug: 'hattiban-pine-hill-residence',
    priceUSD: 460000,
    priceNPR: 61600000,
    propertyType: 'Scandinavian Residence',
    status: 'Available',
    featured: true,
    location: {
      address: 'Little Angels Corridor',
      area: 'Hattiban & Khumaltar',
      city: 'Lalitpur',
      district: 'Kathmandu Valley',
      province: 'Bagmati Province',
      roadAccess: '22 ft wide paved avenue',
      lat: 27.648,
      lng: 85.328
    },
    specs: {
      beds: 4,
      baths: 5,
      sqft: 3700,
      landMeasureNepal: '0-10-2-0 Aana',
      yearBuilt: 2024,
      parkingSlots: 3,
      floors: 2.5,
      facing: 'East'
    },
    images: [
      '/src/assets/images/property_modern_residence_1790836016602.jpg',
      '/src/assets/images/property_retreat_hillside_1790836028005.jpg'
    ],
    amenities: [
      'Gated Community with Clubhouse',
      'EV Wallbox Fast Charger',
      'Private Lawn Courtyard',
      'Solar 10kVA Inverter'
    ],
    description: 'Freshly synced from 1Ropani.com real estate portal. Located in the fast-growing prestigious residential belt of Hattiban/Khumaltar. Minutes from top private academies and hospitals.',
    highlights: [
      'Synced from 1Ropani premium portfolio feed',
      '10.5 Aana freehold land plot with complete Lalpurja check',
      'Planned gated layout with round-the-clock patrol'
    ],
    agent: {
      name: 'Priyanka Karki',
      role: 'Diplomatic & High-Net-Worth Advisory',
      phone: '+977-9841890123',
      email: 'priyanka.karki@estateease.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      licenseNo: 'REA-NP-2020-119',
      rating: 4.98,
      reviewsCount: 62,
      propertiesListed: 31,
      agency: 'EstateEase Prime City',
      badge: 'Premier Broker'
    },
    holdingTokenNPR: 45000,
    tourBookingFeeNPR: 1500,
    escrowDepositNPR: 6160000,
    legalVerified: true,
    lalpurjaVerified: true,
    droneTourAvailable: true,
    has3DModel: true,
    portalSource: {
      portalName: '1Ropani',
      portalListingId: '1ROP-HTB-7721',
      syncedAt: '2026-10-01T05:10:00Z',
      verifiedLalpurjaNo: 'LT-84192-MALPOT-LAGANKHEL'
    },
    overallRating: 4.91,
    totalReviewsCount: 15,
    reviews: [
      {
        id: 'rev-10',
        author: 'Nirmal Shrestha',
        role: 'Local Homeowner',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2026-09-27',
        title: 'Very peaceful neighborhood and clean air',
        comment: 'Close to Little Angels school and ring road access is fast. The gated layout is well maintained.',
        verifiedPurchase: true,
        helpfulCount: 8
      }
    ]
  }
];
