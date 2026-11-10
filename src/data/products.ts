import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'origins-kinetic-01',
    name: 'ORIGINS 01 / KINETIC',
    subtitle: 'Daily High-Response Minimalist Silhouette',
    edition: 'Edition 01 / First Run',
    price: 340,
    currency: '$',
    category: 'Performance',
    modelPath: '/black_sneakers.glb',
    description:
      'Engineered around the principles of minimalism, refined style, and convenience. The Origins 01 features a sculptured sole chassis, seamless bonded micro-knit upper, and adaptive energy return foam designed to keep the product at the centre of everyday movement.',
    story:
      'Origins stands alone — an independent brand built on clean design and simplicity. Every touchpoint is crafted for a refined digital and physical experience, keeping the product at the centre of the journey.',
    featured: true,
    isActive: true,
    inventory: 48,
    isNew: true,
    availability: 'In Stock',
    rating: 4.96,
    reviewCount: 164,
    badge: 'CORE SILHOUETTE',
    accentColor: '#8B5E3C',
    availableSizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    availableColors: [
      { name: 'Pure Obsidian', hex: '#111111', accentHex: '#8B5E3C', badge: 'Core' },
      { name: 'Origins Mocha', hex: '#8B5E3C', accentHex: '#63452F', badge: 'Signature' },
      { name: 'Off-White Bone', hex: '#F5F4F0', accentHex: '#111111', badge: 'Studio' },
      { name: 'Basalt Slate', hex: '#2A2D34', accentHex: '#8B5E3C', badge: 'Limited' },
    ],
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Proprietary Dual-Density Bio-Polymer Midsole',
      'Seamless Hydrophobic Adaptive Collar',
      'Internal Torsion Composite Stabilizer',
      'Radial High-Traction Geometric Outsole'
    ],
    specifications: {
      upperMaterial: 'Bonded technical knit with full-grain leather trim',
      soleTechnology: 'Origins Kinetic Core + Composite shank plate',
      weight: '315g (Size 9 US)',
      drop: '8mm heel-to-toe offset',
      cushioning: 'Responsive Balanced High-Energy',
      origin: 'Crafted in Civitanova Marche, Italy',
      sustainability: '65% certified circular & bio-derived materials'
    },
    hotspots: [
      {
        id: 'hs-collar',
        title: 'Adaptive Ergonomic Collar',
        description: 'Memory foam anatomically molded to stabilize Achilles tendon with zero chafing.',
        position: [0, 0.45, -0.6]
      },
      {
        id: 'hs-midsole',
        title: 'Origins Core Cushioning',
        description: 'Supercritical nitrogen-infused polymer offering 78% continuous energy rebound.',
        position: [0.35, -0.2, 0]
      },
      {
        id: 'hs-toe',
        title: 'Reinforced Apex Shell',
        description: 'Ultra-thin welded toe bumper provides abrasion resistance and water deflection.',
        position: [0, -0.1, 0.8]
      },
      {
        id: 'hs-traction',
        title: 'Geometric Radial Outsole',
        description: 'Multi-directional siping pattern tested across wet urban pavement and polished stone.',
        position: [0, -0.5, 0.2]
      }
    ]
  },
  {
    id: 'origins-strata-02',
    name: 'ORIGINS 02 / STRATA',
    subtitle: 'Sculpted Architecture in Warm Mocha',
    edition: 'Atelier Reserve / Batch 02',
    price: 380,
    currency: '$',
    category: 'Limited Edition',
    modelPath: '/black_sneakers.glb',
    description:
      'Sculpted with layered organic topography inspired by desert rock formations. Finished in a rich warm brown accent palette with brushed brass eyelets and hand-buffed foxing.',
    story:
      'Origins Strata explores the balance between raw geological permanence and modern technical lightness. Hand-finished in limited allocations of 500 numbered pairs.',
    featured: true,
    isActive: true,
    inventory: 24,
    isNew: true,
    availability: 'Limited Stock',
    rating: 5.0,
    reviewCount: 92,
    badge: 'LIMITED 500',
    accentColor: '#8B5E3C',
    availableSizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    availableColors: [
      { name: 'Origins Mocha', hex: '#8B5E3C', accentHex: '#111111', badge: 'Signature' },
      { name: 'Canyon Clay', hex: '#63452F', accentHex: '#E8DDD4', badge: 'Atelier' },
      { name: 'Onyx Monochrome', hex: '#161616', accentHex: '#8B5E3C', badge: 'Dark' },
    ],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Vegetable-Tanned Tuscan Suede Overlays',
      'Recessed Micro-Perforated Airway Channels',
      'Solid Brass Custom Hardware',
      'Laser-Etched Edition Serial Number'
    ],
    specifications: {
      upperMaterial: 'Full-grain oiled nubuck & certified French suede',
      soleTechnology: 'Custom molded natural crepe rubber with cushioned EVA core',
      weight: '345g (Size 9 US)',
      drop: '10mm neutral stance',
      cushioning: 'Maximal Plush Footbed with Ortholite® Eco Hybrid',
      origin: 'Montopoli in Val d’Arno, Italy',
      sustainability: 'Gold-rated Leather Working Group tannery certification'
    },
    hotspots: [
      {
        id: 'hs-upper',
        title: 'Tuscan Suede Facets',
        description: 'Selected from first-choice cut hides, treated for natural stain repellency.',
        position: [0.2, 0.3, -0.1]
      },
      {
        id: 'hs-hardware',
        title: 'Brushed Brass Eyestays',
        description: 'CNC-machined architectural eyelets designed to never snag or corrode.',
        position: [0.1, 0.4, 0.2]
      }
    ]
  },
  {
    id: 'origins-stealth-03',
    name: 'ORIGINS 03 / MONOLITH',
    subtitle: 'All-Black Stealth Footwear',
    edition: 'Blackout Series',
    price: 310,
    currency: '$',
    category: 'Lifestyle',
    modelPath: '/black_sneakers.glb',
    description:
      'Total nocturnal reduction. An all-black study in contrasting textures — matte micro-ripstop, gloss rubberized mudguards, and deep charcoal reflective fibers.',
    story:
      'Designed for metropolitan nights, the Monolith discards unnecessary logos and visible branding. Its power lies purely in stance, silhouette volume, and tactile depth.',
    featured: true,
    isActive: true,
    inventory: 35,
    isNew: false,
    availability: 'In Stock',
    rating: 4.89,
    reviewCount: 210,
    badge: 'BESTSELLER',
    accentColor: '#111111',
    availableSizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    availableColors: [
      { name: 'Onyx Blackout', hex: '#111111', accentHex: '#8B5E3C', badge: 'Original' },
      { name: 'Phantom Ash', hex: '#3E4044', accentHex: '#111111', badge: 'Matte' },
      { name: 'Deep Espresso', hex: '#63452F', accentHex: '#8B5E3C', badge: 'Warm' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Subsurface Reflective Monofilament Grid',
      'DWR Water-Repellent Ballistic Shield',
      'Anodized Gunmetal Speed-Lace System',
      'Dissipative Insole Comfort Liner'
    ],
    specifications: {
      upperMaterial: 'Cordura® 500D Ballistic weave with matte TPU lamination',
      soleTechnology: 'Origins Stealth Dampening Pods',
      weight: '298g (Size 9 US)',
      drop: '6mm low-profile contact',
      cushioning: 'Firm Responsive Ground-Feel',
      origin: 'Porto, Portugal',
      sustainability: '100% recycled nylon yarn'
    }
  },
  {
    id: 'origins-hyper-04',
    name: 'ORIGINS 04 / ZERO-MASS',
    subtitle: 'Zero-Mass Biomechanical Prototype',
    edition: 'Concept Reserve',
    price: 440,
    currency: '$',
    category: 'Atelier Reserve',
    modelPath: '/black_sneakers.glb',
    description:
      'A laboratory concept made wearable. Utilizing computational lattice geometry, the Zero-Mass removes standard shoe bulk while increasing lateral torsional stability.',
    story:
      'Developed with biomechanists and industrial architects, Zero-Mass represents the frontier of modern footwear engineering.',
    featured: true,
    isActive: true,
    inventory: 15,
    isNew: true,
    availability: 'Pre-order',
    rating: 4.98,
    reviewCount: 42,
    badge: 'CONCEPT',
    accentColor: '#8B5E3C',
    availableSizes: [8, 9, 10, 11, 12],
    availableColors: [
      { name: 'Raw Monolith', hex: '#1E1E1E', accentHex: '#8B5E3C', badge: 'Lab 01' },
      { name: 'Titanium Chalk', hex: '#E2DFD8', accentHex: '#1E1E1E', badge: 'Lab 02' },
    ],
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      '3D Computed Lattice Suspension Matrix',
      'Aerospace-Grade Carbon Bridge',
      'Seamless Mono-Monofilament Upper',
      'Individual Hard-Anodized Collector Box'
    ],
    specifications: {
      upperMaterial: 'Monofilament composite yarn with skeletal lattice',
      soleTechnology: 'Selective Laser Sintered Elastomeric Polyurethane',
      weight: '240g (Size 9 US)',
      drop: '4mm precision track geometry',
      cushioning: 'Active Dynamic Fluid Suspension',
      origin: 'Munich, Germany',
      sustainability: 'Zero tooling waste, 100% recyclable mono-material structure'
    }
  },
  {
    id: 'origins-tempo-05',
    name: 'ORIGINS 05 / TEMPO',
    subtitle: 'Ultra-Endurance Studio & Street Runner',
    edition: 'Series 02',
    price: 295,
    currency: '$',
    category: 'Performance',
    modelPath: '/black_sneakers.glb',
    description:
      'Fine-tuned for explosive linear acceleration and steady tempo pacing. Delivers a glove-like anatomical wrap that disappears on your foot.',
    story:
      'Tested across 2,400 miles of varied urban surfaces by our athletic collective. Built to endure relentless daily wear while remaining runway-ready.',
    featured: false,
    isActive: true,
    inventory: 60,
    isNew: false,
    availability: 'In Stock',
    rating: 4.92,
    reviewCount: 312,
    accentColor: '#8B5E3C',
    availableSizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    availableColors: [
      { name: 'Pure Obsidian', hex: '#111111', accentHex: '#8B5E3C' },
      { name: 'Alabaster White', hex: '#F5F4F0', accentHex: '#111111' },
      { name: 'Warm Mocha', hex: '#8B5E3C', accentHex: '#63452F' },
    ],
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Engineered Breathable Vents',
      'Anatomical Heel Cup Lock',
      'Wet Traction Compound Outsole',
      'Reflective Tongue Pull Tab'
    ],
    specifications: {
      upperMaterial: 'Engineered jacquard mesh with micro-suede collar',
      soleTechnology: 'Dual-phase rebound EVA with TPU stability clip',
      weight: '280g (Size 9 US)',
      drop: '10mm daily runner',
      cushioning: 'Balanced Energized Cushion',
      origin: 'Civitanova Marche, Italy',
      sustainability: 'PFC-free water repellency, organic bamboo lining'
    }
  },
  {
    id: 'origins-slipstream-06',
    name: 'ORIGINS 06 / SLIPSTREAM',
    subtitle: 'Minimalist Clean Contour Slipstream',
    edition: 'Gallery Edition',
    price: 360,
    currency: '$',
    category: 'Lifestyle',
    modelPath: '/black_sneakers.glb',
    description:
      'Radical reductionism in physical form. Clean unbroken contours, hidden lace channels, and an understated heel stabilizer.',
    story:
      'Inspired by modernist Scandinavian furniture and brutalist architecture. A silhouette that complements tailored trousers as naturally as technical sportswear.',
    featured: false,
    isActive: true,
    inventory: 30,
    isNew: true,
    availability: 'In Stock',
    rating: 4.94,
    reviewCount: 88,
    badge: 'NEW',
    accentColor: '#8B5E3C',
    availableSizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    availableColors: [
      { name: 'Pure Obsidian', hex: '#111111', accentHex: '#8B5E3C' },
      { name: 'Dark Mocha', hex: '#63452F', accentHex: '#E8DDD4' },
      { name: 'Studio Off-White', hex: '#F5F4F0', accentHex: '#111111' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Internal Ghillie Lacing Tunnel',
      'Heel Counter Accent Plate',
      'Supple Nappa Calfskin Sockliner',
      'Hand-Finished Edge'
    ],
    specifications: {
      upperMaterial: 'Supple full-grain calf leather & technical elastane',
      soleTechnology: 'Low-profile vulcanized rubber with cushion core',
      weight: '330g (Size 9 US)',
      drop: '8mm classic stance',
      cushioning: 'Adaptive Memory Bed',
      origin: 'Porto, Portugal',
      sustainability: 'Non-toxic water-based bonding cements'
    }
  }
];

export const CATEGORIES = [
  'All',
  'Performance',
  'Lifestyle',
  'Limited Edition',
  'Atelier Reserve'
] as const;

export const PDF_MODULES = [
  { id: '01', title: 'HOME', desc: 'Hero 3D, Scroll Storytelling, Featured Grid & Manifesto' },
  { id: '02', title: 'SIGN IN & REGISTRATION', desc: 'Secure customer authentication & account profile' },
  { id: '03', title: 'ABOUT ORIGINS', desc: 'Product Overview, Purpose & Scope, Brand Perspective' },
  { id: '04', title: 'EXPLORE & CATEGORIES', desc: 'Dynamic collection filtering, search & 3D models' },
  { id: '05', title: 'PRODUCT DETAILS', desc: 'Interactive split-screen 3D inspect, sizes & cart' },
  { id: '06', title: 'CART & CHECKOUT', desc: 'Shopping bag, coupon codes, and address dispatch' },
  { id: '07', title: 'PAYMENT & ORDERS', desc: 'Payment simulation, tracking number & order history' },
  { id: '08', title: 'ADMIN PANEL', desc: 'Catalogue management, inventory & product controls' },
];

export const REVIEWS = [
  {
    author: 'Hanshal S.',
    role: 'Creative Technologist, London',
    rating: 5,
    text: 'Origins represents the ideal execution of digital luxury. The 3D inspect experience and minimal typography set a new benchmark for online footwear.',
    productName: 'ORIGINS 01 / KINETIC'
  },
  {
    author: 'Aditya T.',
    role: 'Architectural Designer, Tokyo',
    rating: 5,
    text: 'The balance of generous whitespace, oversized typography, and real-time WebGL is impeccable. The shoe arrived in pristine packaging matching the digital render.',
    productName: 'ORIGINS 02 / STRATA'
  },
  {
    author: 'Sumedh T.',
    role: 'Product Strategist, New York',
    rating: 5,
    text: 'A clean, refined brand that lets the product speak for itself. True minimalism without compromising performance or biomechanical comfort.',
    productName: 'ORIGINS 03 / MONOLITH'
  }
];
export const BRAND_VALUES = [
  {
    number: '01',
    title: 'Biomechanical Minimalism',
    description:
      'We do not simply draw shoes. We sculpt motion envelopes around the skeletal kinetic chain, balancing weight distribution to tenth-of-a-gram tolerances.'
  },
  {
    number: '02',
    title: 'Small-Batch Italian Craft',
    description:
      'Every production run is capped at limited allocations. Hand-buffed by multi-generational master cobblers in Civitanova Marche and Val d’Arno.'
  },
  {
    number: '03',
    title: 'Future-Circular Materials',
    description:
      'From supercritical nitrogen bio-polymers to certified organic vegetable-tanned leathers, luxury and planetary stewardship are indivisible.'
  },
  {
    number: '04',
    title: 'Immersive Product Truth',
    description:
      'Interactive real-time 3D models let you inspect every stitch, radius, and texture before taking your first step into something different.'
  }
];
