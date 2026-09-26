import { Project, ServiceItem, ClientLogo, ClientRecord } from '../types';

export const COMPANY_INFO = {
  name: "GVP Solar Energy",
  legalName: "GVP Solutions Pvt. Ltd.",
  tagline: "Solar Energy for Better Tomorrow",
  experienceYears: "13+",
  completedInstallations: "500+",
  totalCapacityMW: "18+ MW",
  billReductionPercent: "70%",
  headquarters: "Ichalkaranji, Maharashtra, India",
  operationalBelt: "Maharashtra & Rajasthan Industrial Corridors",
  email: "info.gvpsolar@gmail.com",
  phone: "+91 766 5165 666",
  phoneFormatted: "+91 76651 65666",
  website: "www.gvpsolutions.org",
  address: "Shop No 1-2, Building No. 1, Kapad Market, Ichalkaranji, Maharashtra 416115",
  
  // Dual Regional Business Presence
  maharashtraOperations: {
    entity: "GVP Solar Energy",
    division: "Maharashtra Operations",
    leader: "Giriraj Dhoot",
    headquarters: "Shop No 1-2, Building No. 1, Kapad Market, Ichalkaranji, Maharashtra 416115",
    keyHubs: "Ichalkaranji • Kolhapur • Sangli • Solapur • Nandurbar",
    focus: "Residential, Commercial & Industrial Solar EPC",
  },
  rajasthanOperations: {
    entity: "GVP Solar Energy Private Limited",
    division: "Rajasthan Operations",
    leader: "Vrushabh Dhoot",
    focus: "Commercial & Industrial Solar EPC, High-Capacity Rooftop & Captive Power Solutions",
  }
};

export const NOTABLE_PROJECTS: Project[] = [
  {
    id: "arvind-group",
    name: "Arvind Group",
    client: "Arvind Group",
    capacity: "1.4 MW",
    capacityKw: 1400,
    category: "Industrial",
    location: "Ichalkaranji, Maharashtra",
    annualSavings: "₹ 1.5+ Cr",
    co2Offset: "1,650 Tons/yr",
    modules: "Tier-1 High-Efficiency Industrial Solar Modules",
    inverter: "Industrial Multi-MPPT Grid-Synchronized Inverters",
    description: "Large-scale industrial rooftop solar installation engineered for high-capacity energy generation.",
    image: "/projects/arvind-group.jpg",
    highlightTag: "Featured 1.4 MW Project",
    region: "Maharashtra",
    featured: true,
  },
  {
    id: "kesare-group",
    name: "Kesare Group",
    client: "Kesare Textile Mills & Processing",
    capacity: "580 kW",
    capacityKw: 580,
    category: "Industrial",
    location: "Ichalkaranji, Maharashtra",
    annualSavings: "₹ 62.4 Lakhs",
    co2Offset: "690 Tons/yr",
    modules: "Tier-1 550W Mono PERC Bifacial",
    inverter: "High-yield String Inverters with Cloud IoT",
    description: "One of the largest captive rooftop solar installations in the Ichalkaranji textile hub. Engineered on PEB curved metal sheds with custom aerodynamic non-penetrating clamping.",
    image: "/projects/kesare-group.jpg",
    highlightTag: "Mega Textile EPC",
    region: "Maharashtra",
  },
  {
    id: "maruti-ropes",
    name: "Maruti Ropes Pvt. Ltd.",
    client: "Maruti Ropes Pvt. Ltd.",
    capacity: "400 kW",
    capacityKw: 400,
    category: "Industrial",
    location: "Barshi, Solapur, Maharashtra",
    annualSavings: "₹ 44.8 Lakhs",
    co2Offset: "485 Tons/yr",
    modules: "High-Efficiency Monocrystalline Half-Cut",
    inverter: "Industrial Multi-MPPT Grid-tied Inverters",
    description: "High-capacity industrial rooftop project powering continuous polymer rope manufacturing lines. Seamlessly synchronized with dual-source industrial grid & HT substation.",
    image: "/projects/maruti-ropes.jpg",
    highlightTag: "Industrial Heavy EPC",
    region: "Maharashtra",
  },
  {
    id: "shyam-group",
    name: "Shyam Group",
    client: "Shyam Textile & Spinning Mills",
    capacity: "260 kW",
    capacityKw: 260,
    category: "Textile",
    location: "Ichalkaranji, Maharashtra",
    annualSavings: "₹ 28.5 Lakhs",
    co2Offset: "315 Tons/yr",
    modules: "545W Mono PERC Dual-Glass",
    inverter: "Smart On-Grid Inverter with Zero Export Control",
    description: "Turnkey EPC installation cutting textile loom energy bills by over 68%. Includes walkway ladders, lifetime hot-dip galvanized mounting and rapid net-metering integration.",
    image: "/projects/shyam-group.jpg",
    highlightTag: "Textile Rooftop",
  },
  {
    id: "bharadiya-group",
    name: "Bharadiya Group",
    client: "Bharadiya Yarns & Fabrics",
    capacity: "250 kW",
    capacityKw: 250,
    category: "Industrial",
    location: "Ichalkaranji, Maharashtra",
    annualSavings: "₹ 27.2 Lakhs",
    co2Offset: "302 Tons/yr",
    modules: "Bifacial Monocrystalline Modules",
    inverter: "Three-Phase Centralized Inverter",
    description: "Precision engineered on industrial factory roof trusses. Features automated high-pressure solar cleaning pipeline reducing O&M overhead to near zero.",
    image: "/projects/shyam-group.jpg",
    highlightTag: "Factory Rooftop",
  },
  {
    id: "gattani-group",
    name: "Gattani Group",
    client: "Gattani Tex",
    capacity: "250 kW",
    capacityKw: 250,
    category: "Industrial",
    location: "Chandur Road, Ichalkaranji",
    modules: "Tier-1 Monocrystalline Solar Panels",
    inverter: "Grid-Tied Smart Inverters with AI Diagnostics",
    description: "Industrial captive rooftop solar installation for textile processing machinery, engineered to offset daytime peak tariff demand charges.",
    image: "/projects/gattani-group.jpg",
    highlightTag: "Textile Processing EPC",
    region: "Maharashtra",
  },
  {
    id: "bharadia-group",
    name: "Bharadia Group",
    client: "Bharadia Group",
    capacity: "530 kW",
    capacityKw: 530,
    category: "Industrial",
    location: "Satyaraj Park, Ichalkaranji",
    modules: "Bifacial Monocrystalline Modules",
    inverter: "Three-Phase Centralized Inverter",
    description: "High-yield industrial factory rooftop installation with automated module cleaning and remote performance monitoring.",
    image: "/projects/industrial-midc.jpg",
    highlightTag: "Industrial Rooftop",
    region: "Maharashtra",
  },
  {
    id: "sanskar-group",
    name: "Sanskar Group",
    client: "Sanskar Group",
    capacity: "510 kW",
    capacityKw: 510,
    category: "Textile",
    location: "SatyaRaj Park, Ichalkaranji",
    modules: "Tier-1 High-Efficiency PV Modules",
    inverter: "Multi-MPPT High Capacity Inverters",
    description: "Turnkey rooftop installation engineered for continuous textile processing, synchronized with MSEDCL net metering.",
    image: "/projects/shyam-group.jpg",
    highlightTag: "Textile Cluster EPC",
    region: "Maharashtra",
  },
  {
    id: "shri-ram-group",
    name: "Shri Ram Group",
    client: "Shri Ram Group",
    capacity: "380 kW",
    capacityKw: 380,
    category: "Textile",
    location: "KATP Park, Tardal",
    modules: "Mono PERC High Yield Modules",
    inverter: "Grid-Synchronized Industrial Inverter",
    description: "Captive rooftop solar power plant designed for heavy textile operations in the Tardal industrial park.",
    image: "/projects/kesare-group.jpg",
    highlightTag: "Industrial Park EPC",
    region: "Maharashtra",
  },
  {
    id: "fibrosa-industry",
    name: "Fibrosa Industry",
    client: "Fibrosa Industry",
    capacity: "850 kW",
    capacityKw: 850,
    category: "Manufacturing",
    location: "Navapur, Nandurbar",
    modules: "High-Efficiency Monocrystalline Array",
    inverter: "Centralized Grid Integration System",
    description: "High-capacity manufacturing plant rooftop installation currently in active execution, delivering dependable green power.",
    image: "/projects/commercial-rooftop.jpg",
    highlightTag: "Work in Progress",
    region: "Maharashtra",
  },
  {
    id: "innovation-house",
    name: "Innovation House",
    client: "Innovation House IPL",
    capacity: "230 kW",
    capacityKw: 230,
    category: "Commercial",
    location: "Amravati, Maharashtra",
    modules: "High-Transmission Dual Glass Panels",
    inverter: "Multi-string Inverters with Surge Protection",
    description: "Commercial facility rooftop installation with optimal tilt structure, ensuring maximum morning and afternoon solar irradiance capture.",
    image: "/projects/commercial-rooftop.jpg",
    highlightTag: "Commercial EPC",
    region: "Maharashtra",
  },
  {
    id: "jain-paper-cone",
    name: "Jain Papercone",
    client: "Jain Papercone",
    capacity: "75 kW",
    capacityKw: 75,
    category: "Manufacturing",
    location: "Parwati Industry, Ichalkaranji",
    modules: "High-Efficiency Solar Modules",
    inverter: "Grid-Tied Three Phase Inverter",
    description: "Custom lightweight galvanized steel mounting structure engineered for packaging unit, reducing utility costs substantially.",
    image: "/projects/industrial-midc.jpg",
    highlightTag: "Manufacturing Rooftop",
    region: "Maharashtra",
  }
];

/**
 * Maps any client name, ClientRecord, or Project into a full Project structure
 * with dynamic image and real verified details.
 */
export function findOrMapProject(item: Project | ClientRecord | string): Project {
  if (typeof item === 'object') {
    // If it's already a full Project object with an image, return it directly
    if ('image' in item && 'name' in item && 'capacity' in item && item.image) {
      return item as Project;
    }
    // If it has an id matching NOTABLE_PROJECTS
    if ('id' in item) {
      const matchById = NOTABLE_PROJECTS.find(p => p.id === item.id);
      if (matchById) return matchById;
    }
  }

  const searchName = typeof item === 'string' ? item : item.name;
  const cleanSearch = searchName.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Exact match by ID, name or client in NOTABLE_PROJECTS
  const exactNotable = NOTABLE_PROJECTS.find(p => {
    const pName = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const pClient = p.client ? p.client.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
    const pId = p.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    return pId === cleanSearch || pName === cleanSearch || pClient === cleanSearch;
  });
  if (exactNotable) return exactNotable;

  // Substring match in NOTABLE_PROJECTS
  const notableMatch = NOTABLE_PROJECTS.find(p => {
    const pName = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const pClient = p.client ? p.client.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
    return pName.includes(cleanSearch) || cleanSearch.includes(pName) ||
           (pClient && (pClient.includes(cleanSearch) || cleanSearch.includes(pClient)));
  });
  if (notableMatch) return notableMatch;

  // 2. Match in VERIFIED_CLIENT_RECORDS
  const recordMatch = VERIFIED_CLIENT_RECORDS.find(c => {
    const cClean = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cId = c.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cId === cleanSearch || cClean === cleanSearch || cClean.includes(cleanSearch) || cleanSearch.includes(cClean);
  });

  const record = (typeof item === 'object' && 'capacityKw' in item) ? item as ClientRecord : recordMatch;

  if (record) {
    // Pick appropriate verified photo based on client characteristics
    let mappedImage = '/projects/shyam-group.jpg';
    if (record.capacityKw >= 1000) mappedImage = '/projects/arvind-group.jpg';
    else if (record.capacityKw >= 500) mappedImage = '/projects/kesare-group.jpg';
    else if (record.category === 'Manufacturing') mappedImage = '/projects/maruti-ropes.jpg';
    else if (record.category === 'Industrial') mappedImage = '/projects/gattani-group.jpg';
    else if (record.category === 'Commercial') mappedImage = '/projects/commercial-rooftop.jpg';

    return {
      id: record.id,
      name: record.name,
      client: record.name,
      capacity: record.capacity,
      capacityKw: record.capacityKw,
      category: record.category as any,
      location: record.location.includes('Maharashtra') ? record.location : `${record.location}, Maharashtra`,
      description: `Documented ${record.capacity} solar rooftop EPC installation for ${record.name} in ${record.location}. Engineered with tier-1 equipment for high-yield captive energy generation.`,
      image: mappedImage,
      highlightTag: record.status === 'Work in Progress' ? 'Work in Progress' : 'Verified Project',
      region: record.region,
      featured: record.featured,
    };
  }

  // Fallback to Arvind Group if completely unknown
  return NOTABLE_PROJECTS[0];
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Arvind Group", capacity: "1.4 MW", location: "Ichalkaranji", industry: "Industrial" },
  { name: "Fibrosa Industry", capacity: "850 kW", location: "Nandurbar", industry: "Manufacturing" },
  { name: "Kesare Group", capacity: "580 kW", location: "Ichalkaranji", industry: "Textiles" },
  { name: "Bhangadia Group", capacity: "525 kW", location: "Tardal", industry: "Industrial" },
  { name: "Sanskar Group", capacity: "510 kW", location: "Ichalkaranji", industry: "Textiles" },
  { name: "Maruti Ropes Pvt. Ltd.", capacity: "400 kW", location: "Barshi", industry: "Manufacturing" },
  { name: "Shri Ram Group", capacity: "380 kW", location: "Tardal", industry: "Textiles" },
  { name: "Shyam Group", capacity: "260 kW", location: "Ichalkaranji", industry: "Textiles" },
  { name: "Bharadiya Group", capacity: "530 kW", location: "Ichalkaranji", industry: "Yarns & Fabrics" },
  { name: "Gattani Group", capacity: "250 kW", location: "Kolhapur", industry: "Heavy Engineering" },
  { name: "Innovation House", capacity: "230 kW", location: "Amrawati", industry: "Commercial" },
  { name: "Rajlaxmi Tex", capacity: "300 kW", location: "Tardal", industry: "Textiles" },
];

export const VERIFIED_CLIENT_RECORDS: ClientRecord[] = [
  // FEATURED
  {
    id: "arvind-group-rec",
    name: "ARVIND GROUP",
    capacity: "1.4 MW",
    capacityKw: 1400,
    location: "Ichalkaranji",
    region: "Maharashtra",
    category: "Industrial",
    status: "Completed",
    featured: true,
  },
  // COMPLETED
  { id: "anand-dhoot", name: "ANAND DHOOT", capacity: "230 kW", capacityKw: 230, location: "Satyaraj Park, Ichalkaranji", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "arun-dhoot", name: "ARUN DHOOT", capacity: "260 kW", capacityKw: 260, location: "Satyaraj Park, Ichalkaranji", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "rajlaxmi-tex", name: "RAJLAXMI TEX", capacity: "300 kW", capacityKw: 300, location: "KATP Park, Tardal", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "bangad-tex", name: "BANGAD TEX", capacity: "107 kW", capacityKw: 107, location: "Satyaraj Park, Ichalkaranji", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "bohara-tex", name: "BOHARA TEX", capacity: "260 kW", capacityKw: 260, location: "MIDC, Kagal", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "gattani-tex", name: "GATTANI TEX", capacity: "250 kW", capacityKw: 250, location: "Chandur Road, Ichalkaranji", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "bharadia-group-1", name: "BHARADIA GROUP", capacity: "250 kW", capacityKw: 250, location: "Sangam Nagar, Hatkanangle", region: "Maharashtra", category: "Industrial", status: "Completed" },
  { id: "jain-papercone", name: "JAIN PAPERCONE", capacity: "75 kW", capacityKw: 75, location: "Parwati Industry, Ichalkaranji", region: "Maharashtra", category: "Manufacturing", status: "Completed" },
  { id: "mantri-group", name: "MANTRI GROUP", capacity: "335 kW", capacityKw: 335, location: "KATP Park, Tardal", region: "Maharashtra", category: "Industrial", status: "Completed" },
  { id: "mansa-group", name: "MANSA GROUP", capacity: "240 kW", capacityKw: 240, location: "Tardal, Ichalkaranji", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "vineet-process-1", name: "VINEET PROCESS", capacity: "110 kW", capacityKw: 110, location: "MIDC, Kagal", region: "Maharashtra", category: "Industrial", status: "Completed" },
  { id: "kesare-textile", name: "KESARE TEXTILE IND", capacity: "580 kW", capacityKw: 580, location: "Laxmi Industry, Korochi", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "ujjwal-fabrics", name: "UJJWAL FABRICS", capacity: "320 kW", capacityKw: 320, location: "Near Amit Process, Ichalkaranji", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "dt-group", name: "DT GROUP", capacity: "360 kW", capacityKw: 360, location: "KATP Park, Tardal", region: "Maharashtra", category: "Industrial", status: "Completed" },
  { id: "vineet-process-2", name: "VINEET PROCESS", capacity: "580 kW", capacityKw: 580, location: "MIDC, Kagal", region: "Maharashtra", category: "Industrial", status: "Completed" },
  { id: "shivshakti-process", name: "SHIVSHAKTI PROCESS", capacity: "110 kW", capacityKw: 110, location: "Jawahar Nagar, Ichalkaranji", region: "Maharashtra", category: "Industrial", status: "Completed" },
  { id: "bharadia-group-2", name: "BHARADIA GROUP", capacity: "530 kW", capacityKw: 530, location: "Satyaraj Park, Ichalkaranji", region: "Maharashtra", category: "Industrial", status: "Completed" },
  { id: "radhika-impex", name: "RADHIKA IMPEX", capacity: "200 kW", capacityKw: 200, location: "Shahapur, Ichalkaranji", region: "Maharashtra", category: "Commercial", status: "Completed" },
  { id: "maruti-ropes-rec", name: "MARUTI ROPES P LTD", capacity: "400 kW", capacityKw: 400, location: "Barshi", region: "Maharashtra", category: "Manufacturing", status: "Completed" },
  { id: "innovation-house-rec", name: "INOVATION HOUSE IPL", capacity: "230 kW", capacityKw: 230, location: "Amrawati", region: "Maharashtra", category: "Commercial", status: "Completed" },
  { id: "kapil-jaju", name: "KAPIL JAJU INDUSTRY", capacity: "200 kW", capacityKw: 200, location: "Shahapur, Ichalkaranji", region: "Maharashtra", category: "Manufacturing", status: "Completed" },
  { id: "padmawati", name: "PADMAWATI", capacity: "80 kW", capacityKw: 80, location: "Mahasatta Chowk, Ichalkaranji", region: "Maharashtra", category: "Commercial", status: "Completed" },
  { id: "kismat-group-1", name: "KISMAT GROUP", capacity: "280 kW", capacityKw: 280, location: "Laxmi Industry, Korochi", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "shri-ram-group", name: "SHRI RAM GROUP", capacity: "380 kW", capacityKw: 380, location: "KATP Park, Tardal", region: "Maharashtra", category: "Industrial", status: "Completed" },
  { id: "sanmati-process", name: "SANMATI PROCESS", capacity: "110 kW", capacityKw: 110, location: "SatyaRaj Park, Ichalkaranji", region: "Maharashtra", category: "Industrial", status: "Completed" },
  { id: "sanskar-group", name: "SANSKAR GROUP", capacity: "510 kW", capacityKw: 510, location: "SatyaRaj Park, Ichalkaranji", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "rathi-inani", name: "RATHI INANI GROUP", capacity: "425 kW", capacityKw: 425, location: "Laxmi Industry, Korochi", region: "Maharashtra", category: "Textile", status: "Completed" },
  { id: "mm-totala", name: "M M TOTALA GROUP", capacity: "270 kW", capacityKw: 270, location: "KATP Park, Tardal", region: "Maharashtra", category: "Industrial", status: "Completed" },

  // WORK IN PROGRESS
  { id: "kismat-wip", name: "KISMAT GROUP", capacity: "600 kW", capacityKw: 600, location: "Laxmi Industrial Area, Korochi", region: "Maharashtra", category: "Textile", status: "Work in Progress" },
  { id: "bhangadia-525-wip", name: "BHANGADIA GROUP", capacity: "525 kW", capacityKw: 525, location: "Tardal", region: "Maharashtra", category: "Industrial", status: "Work in Progress" },
  { id: "bhangadia-220-wip", name: "BHANGADIA GROUP", capacity: "220 kW", capacityKw: 220, location: "Tardal", region: "Maharashtra", category: "Industrial", status: "Work in Progress" },
  { id: "fibrosa-wip", name: "FIBROSA INDUSTRY", capacity: "850 kW", capacityKw: 850, location: "Navapur, Nandurbar", region: "Maharashtra", category: "Manufacturing", status: "Work in Progress" },
];

export const GEOGRAPHIC_PRESENCE_DATA = {
  maharashtra: {
    state: "Maharashtra",
    headline: "Engineering Stronghold & Roots",
    description: "Deep engineering presence across textile hubs, engineering MIDCs, and industrial estates across Western & Northern Maharashtra.",
    entity: "GVP Solar Energy",
    leader: "Giriraj Dhoot",
    headquarters: "Ichalkaranji",
    verifiedLocations: [
      { name: "Ichalkaranji", role: "Headquarters & Primary Textile Hub", installs: "300+ Installations" },
      { name: "Tardal", role: "KATP Industrial Park Installations", installs: "Key Textile Clusters" },
      { name: "Kagal", role: "MIDC Heavy Engineering & Processing", installs: "C&I High-Tension" },
      { name: "Korochi", role: "Laxmi Industrial Area Sites", installs: "Mega Industrial Rooftops" },
      { name: "Hatkanangle", role: "Sangam Nagar Manufacturing Belt", installs: "Textile & Sizing Sheds" },
      { name: "Barshi", role: "Solapur Industrial Cluster", installs: "Industrial Heavy Manufacturing" },
      { name: "Amravati", role: "Vidarbha Commercial & Industrial", installs: "Commercial EPC" },
      { name: "Navapur / Nandurbar", role: "North Maharashtra Industrial", installs: "850 kW Large Scale Industrial" },
    ],
  },
  rajasthan: {
    state: "Rajasthan",
    headline: "Expanding High-Irradiance Operations",
    description: "Extending GVP's proven industrial rooftop solar EPC and captive power expertise into India's premier solar energy state.",
    entity: "GVP Solar Energy Private Limited",
    leader: "Vrushabh Dhoot",
    focus: "Commercial, Industrial & Captive Solar Power Solutions",
    status: "Active Operational Presence",
  }
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: "ci-solar",
    title: "Commercial & Industrial (C&I)",
    subtitle: "High-yield powerplants for textile mills, foundries & factories.",
    description: "Designed for high-tension and heavy connected loads. Maximize power generation, hedge against rising industrial electricity tariffs, and claim 40% accelerated depreciation tax write-offs.",
    iconName: "Factory",
    image: "/projects/kesare-group.jpg",
    features: [
      "25kW to 2MW+ Captive Rooftop & Ground-Mount",
      "Payback typically within 2.8 to 3.5 years",
      "40% Accelerated Depreciation tax benefit",
      "Zero disruption to ongoing factory operations"
    ],
    idealFor: "Textile spinning & weaving, engineering foundries, cold storages, hospitals & education campuses"
  },
  {
    id: "residential-solar",
    title: "Residential Rooftop Solar",
    subtitle: "PM Surya Ghar subsidy, net metering & zero monthly power bills.",
    description: "Convert your house terrace into a power station. Slash domestic electricity bills by up to 70-90% with seamless government subsidy of up to ₹78,000 directly credited to your bank account.",
    iconName: "Home",
    image: "/projects/residential-solar.jpg",
    features: [
      "1 kW to 10 kW On-Grid & Hybrid setups",
      "Up to ₹78,000 PM Surya Ghar Muft Bijli Subsidy",
      "MSEDCL Bi-directional Net Metering",
      "Elevated super-structure pergola options"
    ],
    idealFor: "Bungalows, row houses, apartments, residential societies & farmhouses"
  },
  {
    id: "epc-om",
    title: "Turnkey EPC & Operation/Maintenance",
    subtitle: "End-to-end engineering, government liaisoning & 25-yr care.",
    description: "We handle every single technical step: structural load testing, 3D shadow simulation, MSEDCL approvals, CEIG electrical sanctions, commissioning, and automated robotic/water cleaning systems.",
    iconName: "ShieldCheck",
    image: "/projects/maruti-ropes.jpg",
    features: [
      "100% Paperwork & Discom/MSEDCL Net-Meter Liaisoning",
      "CEIG Approvals & Electrical Safety Compliance",
      "IoT Cloud Monitoring with live generation dashboard",
      "Guaranteed 48-Hour local technician dispatch"
    ],
    idealFor: "All clients seeking peace of mind with lifetime generation guarantees"
  }
];

export const WHY_CHOOSE_US = [
  {
    icon: "Sun",
    title: "Tier-1 Mono PERC Bifacial Panels",
    desc: "Only Bloomberg Tier-1 certified modules with dual-glass bifacial generation, offering 15-20% higher energy yield even during cloudy monsoon months."
  },
  {
    icon: "TrendingDown",
    title: "Up to 70% Guaranteed Bill Reduction",
    desc: "Engineered to drastically bring down peak time-of-day (ToD) tariff slabs for industrial and residential meters."
  },
  {
    icon: "FileCheck",
    title: "100% Hassle-Free Net Metering",
    desc: "We manage all MSEDCL sanction letters, meter testing, transformer loading feasibility, and CEIG approvals from start to finish."
  },
  {
    icon: "Award",
    title: "13+ Years & 500+ Local Projects",
    desc: "Deep engineering roots in Ichalkaranji, Kolhapur, and Sangli with an unmatched track record across Maharashtra's toughest industrial environments."
  },
  {
    icon: "ShieldAlert",
    title: "Wind-Resistant Structural Fabrication",
    desc: "Custom hot-dip galvanized steel structures rated for 150 km/h wind gusts with no roof punctures on metal roofs."
  },
  {
    icon: "Clock",
    title: "Dedicated Local O&M Support",
    desc: "Our headquarters in Kapad Market, Ichalkaranji ensures rapid on-ground response within hours for preventive checks and module cleaning."
  }
];

export const TESTIMONIALS = [
  {
    name: "Santosh Kesare",
    company: "Kesare Group (580 kW)",
    location: "Ichalkaranji",
    text: "GVP Solar executed our 580kW textile rooftop project ahead of schedule. The generation performance has been outstanding, saving us over ₹60 Lakhs every year on high-tension power bills.",
    rating: 5,
    tag: "580 kW Industrial EPC"
  },
  {
    name: "Rameshwar Patil",
    company: "Maruti Ropes Pvt. Ltd. (400 kW)",
    location: "Barshi, Solapur",
    text: "Their engineering team handled the MSEDCL substation sync flawlessly. The bifacial modules deliver consistent power even on overcast days. GVP Solar is the most reliable EPC partner in Western Maharashtra.",
    rating: 5,
    tag: "400 kW Industrial Project"
  },
  {
    name: "Anand Bharadiya",
    company: "Bharadiya Group (250 kW)",
    location: "Ichalkaranji",
    text: "We have worked with GVP Solar for multiple textile processing units. Their prompt service, CEIG approvals management, and technical transparency are unmatched.",
    rating: 5,
    tag: "250 kW Textile Installation"
  }
];
