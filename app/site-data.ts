export type Collection = {
  name: string;
  type: string;
  description: string;
  images: string[];
  href: string;
};

export type InteriorPageData = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionCopy: string;
  cards: { title: string; copy: string }[];
  note?: string;
  ctaTitle: string;
  ctaCopy: string;
  ctaLabel: string;
};

export const primaryNavigation = [
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
  { label: "Full-View", href: "/full-view-garage-doors-treasure-valley" },
  { label: "Repair", href: "/garage-door-repair-boise" },
  { label: "Projects", href: "/projects" },
];

export const brandNavigation = [
  { label: "All brands + design tools", href: "/garage-door-brands" },
  { label: "Amarr", href: "/amarr-garage-doors-boise" },
  { label: "Clopay", href: "/clopay-garage-doors-boise" },
  { label: "Wayne Dalton", href: "/wayne-dalton-garage-doors-boise" },
  { label: "Garaga", href: "/garaga-garage-doors-boise" },
  { label: "Garage door openers", href: "/garage-door-openers-boise" },
  { label: "Builders + contractors", href: "/builders-contractors" },
];

export const garagaCollections: Collection[] = [
  { name: "Vantage", type: "Mid-America steel", description: "A versatile steel platform available across contemporary, traditional, and carriage-inspired designs.", images: ["/catalog/garaga/vantage.webp"], href: "https://www.garaga.com/garage-doors/residential/shaker-nh-lp" },
  { name: "Princeton", type: "Townships overlay", description: "Defined carriage-house character with insulated steel construction and extensive design choices.", images: ["/catalog/garaga/princeton.webp"], href: "https://www.garaga.com/garage-doors/residential/princeton-p13" },
  { name: "Eastman", type: "Carriage-house steel", description: "A refined carriage profile with layered panel, glass, color, and decorative hardware options.", images: ["/catalog/garaga/eastman.webp"], href: "https://www.garaga.com/garage-doors/residential/eastman-e21" },
  { name: "Cambridge", type: "Overlay carriage house", description: "Architectural overlays and insulated construction for a deeper, more dimensional carriage-house look.", images: ["/catalog/garaga/cambridge.webp"], href: "https://www.garaga.com/garage-doors/residential/cambridge-cl" },
  { name: "California", type: "Full-view aluminum", description: "Aluminum framing and expansive glass for clean residential and architectural openings.", images: ["/catalog/garaga/california.webp"], href: "https://www.garaga.com/garage-doors/residential/california" },
  { name: "Village Collection", type: "Traditional steel", description: "Traditional panel profiles with practical insulation, color, window, and hardware choices.", images: ["/catalog/garaga/village-collection.webp"], href: "https://www.garaga.com/garage-doors/residential/village-a" },
  { name: "Standard+", type: "R-16 insulated steel", description: "A versatile insulated steel platform spanning traditional, contemporary, and flush panel designs.", images: ["/catalog/garaga/standard-plus.webp"], href: "https://www.garaga.com/garage-doors/residential/classic-xl" },
  { name: "Acadia 138", type: "R-12 insulated steel", description: "Straightforward steel construction with a wide range of panel and window combinations.", images: ["/catalog/garaga/acadia-138.webp"], href: "https://www.garaga.com/garage-doors/residential/north-hatley-sp" },
];

export const amarrCollections: Collection[] = [
  {
    name: "Northwoods",
    type: "Wood-look plank",
    description: "Modern horizontal plank styling with digitally printed woodgrain and flexible window placement.",
    images: ["/catalog/amarr/northwoods.webp"],
    href: "https://www.amarr.com/us/en/garage-doors/explore-products/view-all-doors/northwoods",
  },
  {
    name: "Lincoln",
    type: "Classic steel",
    description: "A straightforward steel collection with classic panel and window combinations at an accessible price point.",
    images: ["/catalog/amarr/lincoln.webp"],
    href: "https://www.amarr.com/us/en/garage-doors/explore-products/view-all-doors/lincoln",
  },
  {
    name: "Olympus",
    type: "Insulated steel",
    description: "A high-performance insulated steel collection for classic style and stronger thermal performance.",
    images: ["/catalog/amarr/olympus.webp"],
    href: "https://www.amarr.com/us/en/garage-doors/explore-products/view-all-doors/olympus",
  },
  {
    name: "Designer's Choice",
    type: "Carriage house",
    description: "Carriage-house styling paired with strong energy efficiency for attached or temperature-sensitive garages.",
    images: ["/catalog/amarr/designers-choice.webp"],
    href: "https://www.amarr.com/us/en/garage-doors/explore-products/view-all-doors/designers-choice",
  },
  {
    name: "Hillcrest",
    type: "Carriage house",
    description: "Steel carriage-house designs with architectural detail and practical construction choices.",
    images: ["/catalog/amarr/hillcrest.webp"],
    href: "https://www.amarr.com/us/en/garage-doors/explore-products/view-all-doors/hillcrest",
  },
  {
    name: "Classica",
    type: "Stamped carriage house",
    description: "Three-section stamped-steel carriage styling with broad panel, window, color, and hardware combinations.",
    images: ["/catalog/amarr/classica.webp"],
    href: "https://www.amarr.com/us/en/garage-doors/explore-products/view-all-doors/classica",
  },
  {
    name: "Carriage Court",
    type: "Composite overlay",
    description: "Defined carriage-house designs using composite overlay trim on insulated steel-backed sections.",
    images: ["/catalog/amarr/carriage-court.webp"],
    href: "https://www.amarr.com/us/en/garage-doors/explore-products/view-all-doors/carriage-court",
  },
  {
    name: "Vista",
    type: "Full-view aluminum",
    description: "Clean aluminum framing and large glass sections for modern homes, studios, and architectural openings.",
    images: ["/catalog/amarr/vista.webp"],
    href: "https://www.amarr.com/us/en/garage-doors/explore-products/view-all-doors/vista",
  },
  {
    name: "Horizon",
    type: "Modern glass",
    description: "A modern aluminum collection built around narrow expanses of glass and strong horizontal lines.",
    images: ["/catalog/amarr/horizon.webp"],
    href: "https://www.amarr.com/us/en/garage-doors/explore-products/view-all-doors/horizon",
  },
];

export const clopayCollections: Collection[] = [
  {
    name: "Classic Steel",
    type: "Traditional steel",
    description: "Raised-panel steel designs with broad color, window, and insulation choices.",
    images: ["/catalog/clopay/classic-steel.webp", "/catalog/clopay/classic-steel-02.webp"],
    href: "https://www.clopaydoor.com/classic",
  },
  {
    name: "Bridgeport Steel",
    type: "Recessed steel",
    description: "Symmetrical recessed panels with the look of traditional stile-and-rail construction.",
    images: [
      "/catalog/clopay/bridgeport-steel.webp",
      "/catalog/clopay/bridgeport-steel-02.webp",
      "/catalog/clopay/bridgeport-steel-03.webp",
      "/catalog/clopay/bridgeport-steel-04.webp",
      "/catalog/clopay/bridgeport-steel-05.webp",
    ],
    href: "https://www.clopaydoor.com/Bridgeport",
  },
  {
    name: "Gallery Steel",
    type: "Carriage-house steel",
    description: "Grooved steel panels with flexible color, window, and decorative hardware options.",
    images: [
      "/catalog/clopay/gallery-steel.webp",
      "/catalog/clopay/gallery-steel-02.webp",
      "/catalog/clopay/gallery-steel-03.webp",
      "/catalog/clopay/gallery-steel-04.webp",
    ],
    href: "https://www.clopaydoor.com/gallerysteel",
  },
  {
    name: "Modern Steel",
    type: "Contemporary steel",
    description: "Flush or grooved steel panels with modern window layouts and understated lines.",
    images: [
      "/catalog/clopay/modern-steel.webp",
      "/catalog/clopay/modern-steel-02.webp",
      "/catalog/clopay/modern-steel-03.webp",
    ],
    href: "https://www.clopaydoor.com/modern-steel-collection",
  },
  {
    name: "Modern Steel Ultra-Grain Plank",
    type: "Wood-look plank",
    description: "Horizontal printed plank finishes that add warmth to a low-maintenance flush steel door.",
    images: [
      "/catalog/clopay/modern-steel-ultra-grain-plank.webp",
      "/catalog/clopay/modern-steel-ultra-grain-plank-02.webp",
      "/catalog/clopay/modern-steel-ultra-grain-plank-03.webp",
    ],
    href: "https://www.clopaydoor.com/modern-steel-plank",
  },
  {
    name: "Canyon Ridge Elements",
    type: "Painted wood look",
    description: "Textured composite overlays over insulated steel for a painted-wood appearance with less upkeep.",
    images: [
      "/catalog/clopay/canyon-ridge-elements.webp",
      "/catalog/clopay/canyon-ridge-elements-02.webp",
      "/catalog/clopay/canyon-ridge-elements-03.webp",
    ],
    href: "https://www.clopaydoor.com/elements",
  },
  {
    name: "Canyon Ridge Carriage House 5-Layer",
    type: "Faux-wood carriage house",
    description: "Insulated steel, cladding, and composite overlays for a substantial carriage-house profile.",
    images: [
      "/catalog/clopay/canyon-ridge-carriage-house-5-layer.webp",
      "/catalog/clopay/canyon-ridge-carriage-house-5-layer-02.webp",
      "/catalog/clopay/canyon-ridge-carriage-house-5-layer-03.webp",
      "/catalog/clopay/canyon-ridge-carriage-house-5-layer-04.webp",
    ],
    href: "https://www.clopaydoor.com/canyon-ridge-5-layer",
  },
  {
    name: "Canyon Ridge Modern",
    type: "Modern faux wood",
    description: "Clean modern layouts paired with insulated steel and moisture-resistant composite cladding.",
    images: [
      "/catalog/clopay/canyon-ridge-modern.webp",
      "/catalog/clopay/canyon-ridge-modern-02.webp",
      "/catalog/clopay/canyon-ridge-modern-03.webp",
    ],
    href: "https://www.clopaydoor.com/canyon-ridge-modern-garage-doors",
  },
  {
    name: "Coachman",
    type: "Carriage-house composite",
    description: "Composite overlay designs on an insulated steel base for crisp, durable carriage-house styling.",
    images: [
      "/catalog/clopay/coachman.webp",
      "/catalog/clopay/coachman-02.webp",
      "/catalog/clopay/coachman-03.webp",
    ],
    href: "https://www.clopaydoor.com/coachman",
  },
  {
    name: "Avante",
    type: "Full-view aluminum",
    description: "Aluminum framing with broad glass and panel choices for residential and architectural openings.",
    images: [
      "/catalog/clopay/avante.webp",
      "/catalog/clopay/avante-02.webp",
      "/catalog/clopay/avante-03.webp",
      "/catalog/clopay/avante-04.webp",
      "/catalog/clopay/avante-05.webp",
    ],
    href: "https://www.clopaydoor.com/avante",
  },
  {
    name: "Avante Sleek",
    type: "Minimal full-view",
    description: "Slim horizontal lines and reduced vertical framing for a cleaner full-view system.",
    images: [
      "/catalog/clopay/avante-sleek.webp",
      "/catalog/clopay/c-power-clear.webp",
      "/catalog/clopay/c-power-private.webp",
    ],
    href: "https://www.clopaydoor.com/avantesleek",
  },
  {
    name: "VertiStack Avante",
    type: "Stacking full-view",
    description: "Sections stack compactly above the opening instead of traveling horizontally across the ceiling.",
    images: [
      "/catalog/clopay/vertistack-avante.webp",
      "/catalog/clopay/vertistack-avante-02.webp",
    ],
    href: "https://www.clopaydoor.com/vertistack-avante",
  },
];

export const brandResources = [
  {
    name: "Amarr",
    label: "LIFTX dealer brand",
    description: "Residential and commercial collections across traditional, modern, carriage, insulated, and Full-View systems.",
    logo: "/catalog/brands/amarr.png",
    page: "/amarr-garage-doors-boise",
    builder: "https://www.amarr.com/us/en/design-your-garage-door",
  },
  {
    name: "Clopay",
    label: "LIFTX dealer brand",
    description: "Broad steel, composite, modern, aluminum, glass, and specialty choices with an extensive visualizer.",
    logo: "/catalog/brands/clopay.png",
    page: "/clopay-garage-doors-boise",
    builder: "https://www.clopaydoor.com/ezdoor",
  },
  {
    name: "Wayne Dalton",
    label: "LIFTX dealer brand",
    description: "Residential and commercial products across steel, wood, aluminum, modern, and specialty applications.",
    logo: "/brands/wayne-dalton.png",
    page: "/wayne-dalton-garage-doors-boise",
    builder: "https://www.wayne-dalton.com/garage-door-design-center",
  },
  {
    name: "Hörmann",
    label: "Additional manufacturer",
    description: "Residential, commercial, Full-View, and high-performance systems with a broad specialty range.",
    page: "https://www.hormann.us/residential/",
    builder: "https://www.hormann.us/residential/",
  },
  {
    name: "Garaga",
    label: "Manufacturer collections",
    description: "Residential and commercial collections across modern, carriage, traditional, Full-View, and insulated systems.",
    logo: "/brands/garaga.webp",
    page: "/garaga-garage-doors-boise",
    builder: "https://designcentre.garaga.com/ca",
  },
  {
    name: "Haas Door",
    label: "Additional design resource",
    description: "Compare styles, colors, windows, overlays, trim, and accessories.",
    page: "https://www.haasdoor.com/residential/index.html",
    builder: "https://www.haasdoor.com/haascreate",
  },
  {
    name: "LiftMaster",
    label: "Operators + access",
    description: "Residential openers, wall-mount systems, commercial operators, controls, and access equipment.",
    logo: "/catalog/brands/liftmaster.png",
    page: "/garage-door-openers-boise",
    builder: "https://www.liftmaster.com/garage-door-opener-selector",
  },
];

export const interiorPages: Record<string, InteriorPageData> = {
  residential: {
    eyebrow: "Residential door systems",
    title: "The door should belong to the house.",
    intro: "Replacement, new construction, repair, operators, and specialty configurations—planned around the opening, the architecture, and how the system will be used.",
    image: "/gallery/amarr-northwoods-onyx-finished-02.webp",
    imageAlt: "Black Amarr Northwoods door installed by LIFTX",
    sectionEyebrow: "Residential capabilities",
    sectionTitle: "One opening. The complete system.",
    sectionCopy: "The sections, track, springs, hardware, opener, structure, and controls need to work together. LIFTX evaluates the complete assembly before recommending a direction.",
    cards: [
      { title: "New + replacement doors", copy: "Steel, carriage-house, plank, Full-View, and architectural systems sized and configured for the opening." },
      { title: "Repair + maintenance", copy: "Springs, cables, rollers, track, sections, seals, balance, and complete-system diagnostics." },
      { title: "Openers + access", copy: "Ceiling-mount, wall-mount, controls, remotes, keypads, sensors, and compatible access equipment." },
    ],
    ctaTitle: "Start with the opening.",
    ctaCopy: "Send a photo, rough size, and what you want the space to do. We will help narrow the right next step.",
    ctaLabel: "Plan a residential project",
  },
  commercial: {
    eyebrow: "Commercial systems · Treasure Valley",
    title: "Commercial systems. Full-view specialists.",
    intro: "LIFTX installs aluminum-and-glass, specialty, high-speed, operator, and access systems around traffic, clearance, structure, controls, weather, and building use.",
    image: "/images/commercial-full-view-interior.jpeg",
    imageAlt: "Commercial full-view doors installed by LIFTX",
    sectionEyebrow: "Commercial capabilities",
    sectionTitle: "The door is part of the building—not a product dropped into it.",
    sectionCopy: "LIFTX coordinates opening conditions, track geometry, power, controls, equipment access, and scheduling before the system is ordered.",
    cards: [
      { title: "Full-View + architectural", copy: "Aluminum-and-glass systems for automotive, showroom, studio, hospitality, residential, and architectural openings." },
      { title: "Specialty + high-speed", copy: "High-cycle, car-wash, high-performance, rolling, sheet, and application-specific systems." },
      { title: "Operators + controls", copy: "Commercial operators, chain hoists, controls, monitored safety devices, and access integration." },
    ],
    ctaTitle: "Send the opening and operating requirements.",
    ctaCopy: "Plans, photos, schedules, and equipment requirements help LIFTX develop the right scope before pricing.",
    ctaLabel: "Plan a commercial project",
  },
  "garage-door-repair-boise": {
    eyebrow: "Garage door repair · Boise",
    title: "Find the cause. Fix the system.",
    intro: "Inspection-driven residential and commercial repair across Boise and the Treasure Valley—with the condition documented and the recommendation explained first.",
    image: "/gallery/matched-torsion-springs-finished-02.webp",
    imageAlt: "Matched torsion spring repair completed by LIFTX",
    sectionEyebrow: "Service + repair",
    sectionTitle: "The symptom is where the inspection starts.",
    sectionCopy: "A door that is stuck, crooked, noisy, heavy, or reversing can have several causes. LIFTX checks the system before deciding what needs attention.",
    cards: [
      { title: "Springs + counterbalance", copy: "Broken, fatigued, mismatched, or incorrectly sized spring systems inspected and repaired as a matched setup." },
      { title: "Cables, track + hardware", copy: "Off-track doors, damaged rollers, loose hardware, cable problems, alignment, and structural attachment." },
      { title: "Operators + controls", copy: "Power, sensors, wiring, controls, rail, trolley, settings, attachment, and compatibility checks." },
    ],
    note: "Never operate a door with a broken spring. The opener is not designed to lift the full weight of the door.",
    ctaTitle: "Tell us what the door is doing.",
    ctaCopy: "A photo or short video can help prepare the right parts and determine whether the door should stay closed until service.",
    ctaLabel: "Request service",
  },
  "garage-door-installation-boise": {
    eyebrow: "New doors · Boise",
    title: "Designed, measured, and installed as one system.",
    intro: "Residential, commercial, and specialty door installation for replacement, remodel, and new construction across the Treasure Valley.",
    image: "/images/white-full-view-residential.jpeg",
    imageAlt: "White full-view residential garage doors installed by LIFTX",
    sectionEyebrow: "Installation process",
    sectionTitle: "The expensive problems are usually decided before install day.",
    sectionCopy: "Opening size, headroom, sideroom, structure, finish, track, power, controls, delivery, and sequencing are confirmed before the order is released.",
    cards: [
      { title: "Site verification", copy: "Field dimensions, clearance, framing, floor, jamb finish, power, and access conditions documented." },
      { title: "Product configuration", copy: "Construction, insulation, design, glass, track, hardware, operator, and accessory decisions aligned." },
      { title: "Installation + closeout", copy: "System assembled, balanced, adjusted, tested, documented, and explained at completion." },
    ],
    ctaTitle: "Bring us the opening.",
    ctaCopy: "Send rough dimensions, photos, or plans. LIFTX will identify what still needs to be verified.",
    ctaLabel: "Request an installation estimate",
  },
  "garage-door-openers-boise": {
    eyebrow: "Openers + access",
    title: "Test the door and the operator as separate systems.",
    intro: "Residential openers, commercial operators, wall-mount systems, controls, remotes, keypads, sensors, and access equipment.",
    image: "/gallery/liftmaster-2220l-spring-install-prep-01.webp",
    imageAlt: "LiftMaster opener and matched spring components prepared for installation",
    sectionEyebrow: "Start with the diagnosis",
    sectionTitle: "Is the problem the opener, the door—or both?",
    sectionCopy: "The opener moves the door; the springs carry most of its weight. Similar symptoms can come from controls, sensors, the operator, balance, attachment, or mechanical resistance.",
    cards: [
      { title: "Diagnosis + repair", copy: "Power, photo eyes, wiring, controls, travel, force, rail, trolley, motor behavior, attachment, and balance." },
      { title: "New opener installation", copy: "Chain-drive, belt-drive, wall-mount, and commercial systems selected for the actual door and use." },
      { title: "Controls + access", copy: "Remotes, keypads, wall controls, safety sensors, monitored devices, and compatible access setup." },
    ],
    note: "A new opener will not correct a heavy or unbalanced door. The counterbalance and mechanical system must be safe first.",
    ctaTitle: "Tell us what the operator is doing.",
    ctaCopy: "Include the brand or model if visible and a short video of the symptom when possible.",
    ctaLabel: "Request opener service",
  },
  "builders-contractors": {
    eyebrow: "Builders + contractors",
    title: "Overhead-door coordination from plans to closeout.",
    intro: "Estimating, specifications, field verification, scheduling, and installation coordination for builders, contractors, property managers, and commercial projects.",
    image: "/images/full-view-new-construction-angle.jpeg",
    imageAlt: "Full-view system installed during new construction",
    sectionEyebrow: "Project coordination",
    sectionTitle: "The opening, door, track, operator, power, and schedule must align.",
    sectionCopy: "LIFTX reviews plans and field conditions before ordering, identifies missing information early, and communicates around site readiness, lead times, equipment, electrical needs, and sequencing.",
    cards: [
      { title: "Plan + spec review", copy: "Openings, headroom, track, glass, insulation, hardware, operators, controls, and finish." },
      { title: "Field verification", copy: "As-built dimensions, framing, floor, jambs, power, access, delivery, and equipment conditions." },
      { title: "Scheduling + closeout", copy: "Lead times, delivery, installation sequence, testing, documentation, and warranty handoff." },
    ],
    ctaTitle: "Send the plans and schedule.",
    ctaCopy: "LIFTX will identify the information required to develop an accurate scope and estimate.",
    ctaLabel: "Send project details",
  },
  warranty: {
    eyebrow: "LIFTX warranty",
    title: "The work should still make sense after we leave.",
    intro: "LIFTX provides a one-year craftsmanship warranty on residential and commercial installation work, alongside the applicable manufacturer warranty.",
    image: "/gallery/full-view-commercial-door-installation-02.webp",
    imageAlt: "Commercial full-view door installation by LIFTX",
    sectionEyebrow: "Coverage + care",
    sectionTitle: "Craftsmanship, manufacturer coverage, and clear boundaries.",
    sectionCopy: "Coverage is documented with the job. Manufacturer terms vary by product, while LIFTX workmanship coverage applies to the installation performed by LIFTX.",
    cards: [
      { title: "One-year craftsmanship", copy: "Residential and commercial workmanship coverage for installation performed by LIFTX." },
      { title: "Manufacturer warranty", copy: "Applicable manufacturer coverage remains tied to the selected door, operator, hardware, and components." },
      { title: "Maintenance option", copy: "Three planned visits during the first year for visual checks, alignment, balance, hardware, and lubrication." },
    ],
    note: "Third-party service, structural movement, weather damage, abuse, and operator internal failures are outside LIFTX craftsmanship coverage.",
    ctaTitle: "Have a warranty question?",
    ctaCopy: "Send the job address, product, and what you are seeing so LIFTX can review the right record.",
    ctaLabel: "Contact LIFTX",
  },
};

export const projectMedia = [
  { src: "/gallery/amarr-northwoods-onyx-finished-01.webp", title: "Northwoods Onyx", type: "Residential" },
  { src: "/gallery/amarr-northwoods-onyx-finished-02.webp", title: "Northwoods Onyx", type: "Residential" },
  { src: "/gallery/amarr-northwoods-onyx-finished-03.webp", title: "Northwoods Onyx", type: "Residential" },
  { src: "/gallery/amarr-northwoods-onyx-finished-04.webp", title: "Northwoods Onyx", type: "Residential" },
  { src: "/gallery/car-wash-full-view-door-01 2.webp", title: "Tidal Wave Auto Spa", type: "Commercial" },
  { src: "/gallery/commercial-full-view-glass-door-exterior-01.webp", title: "Commercial glass system", type: "Commercial" },
  { src: "/gallery/full-view-commercial-door-exterior-01.webp", title: "Full-view exterior", type: "Commercial" },
  { src: "/gallery/full-view-commercial-door-exterior-02.webp", title: "Full-view exterior", type: "Commercial" },
  { src: "/gallery/full-view-commercial-door-exterior-03.webp", title: "Full-view exterior", type: "Commercial" },
  { src: "/gallery/full-view-commercial-door-exterior-04.webp", title: "Full-view exterior", type: "Commercial" },
  { src: "/gallery/full-view-commercial-door-exterior-05.webp", title: "Full-view exterior", type: "Commercial" },
  { src: "/gallery/full-view-commercial-door-interior-01.webp", title: "Full-view interior", type: "Commercial" },
  { src: "/gallery/full-view-commercial-door-interior-02.webp", title: "Full-view interior", type: "Commercial" },
  { src: "/gallery/full-view-commercial-door-interior-03.webp", title: "Full-view interior", type: "Commercial" },
  { src: "/gallery/full-view-commercial-door-installation-01.webp", title: "Installation sequence", type: "Behind the build" },
  { src: "/gallery/full-view-commercial-door-installation-02.webp", title: "Installation sequence", type: "Behind the build" },
  { src: "/gallery/full-view-door-sections-staged-01.webp", title: "Sections staged", type: "Behind the build" },
  { src: "/gallery/full-view-garage-door-interior-finished-01.webp", title: "Residential full-view", type: "Residential" },
  { src: "/gallery/shop-sectional-door-exterior-finished-01.webp", title: "Shop sectional", type: "Commercial" },
  { src: "/gallery/shop-sectional-door-interior-finished-01.webp", title: "Shop sectional", type: "Commercial" },
  { src: "/gallery/broken-torsion-spring-gap-01.webp", title: "Broken torsion spring", type: "Service" },
  { src: "/gallery/broken-torsion-spring-gap-02.webp", title: "Broken torsion spring", type: "Service" },
  { src: "/gallery/matched-torsion-springs-finished-01.webp", title: "Matched spring system", type: "Service" },
  { src: "/gallery/matched-torsion-springs-finished-02.webp", title: "Matched spring system", type: "Service" },
  { src: "/gallery/off-track-garage-door-before-01.webp", title: "Off-track condition", type: "Service" },
  { src: "/gallery/off-track-garage-door-repair-progress-01.webp", title: "Off-track repair", type: "Service" },
  { src: "/gallery/off-track-garage-door-after-01.webp", title: "System restored", type: "Service" },
  { src: "/gallery/torsion-spring-replacement-progress-01.webp", title: "Torsion replacement", type: "Service" },
  { src: "/gallery/liftmaster-2220l-spring-install-prep-01.webp", title: "Operator + spring prep", type: "Service" },
];

export const faqGroups = [
  {
    title: "Repair + safety",
    items: [
      ["Can I open the door with a broken spring?", "No. A broken spring leaves the door extremely heavy and can damage the opener or create a serious safety hazard. Keep it closed until it is inspected."],
      ["Do you replace one spring or both?", "LIFTX replaces torsion springs as a matched pair when the system uses two springs. Both have completed the same cycles, and matching the pair protects balance and service life."],
      ["Can you temporarily secure a damaged door?", "Often, yes. When a permanent repair cannot be completed immediately, LIFTX may be able to safely close or secure the opening and return with the required parts."],
    ],
  },
  {
    title: "Service + pricing",
    items: [
      ["How is service time billed?", "The first hour is billed in full upon arrival. If a product is purchased and installed during the same visit, that first-hour charge may be waived as described in the estimate."],
      ["Is a deposit required?", "Yes. Approved work requires a deposit before materials or equipment are ordered. The amount is shown clearly in the written estimate."],
      ["When is the remaining balance due?", "The remaining balance is due when the work is completed unless the written estimate shows progress payments for a larger project."],
    ],
  },
  {
    title: "New doors + design",
    items: [
      ["Can LIFTX help me choose a collection?", "Yes. Start with the look you want, then LIFTX will help compare construction, insulation, glass, track, opener compatibility, lead time, and installed price."],
      ["Do I need exact measurements before contacting LIFTX?", "No. Rough opening sizes and photos are enough to start. Exact field measurements are verified before ordering."],
      ["Can I use a manufacturer door builder?", "Yes. The Brands + Design Tools page links directly to each available manufacturer visualizer. Send LIFTX the saved design or collection name for verification."],
    ],
  },
  {
    title: "Warranty + maintenance",
    items: [
      ["What workmanship warranty does LIFTX provide?", "LIFTX provides a one-year craftsmanship warranty on residential and commercial installation work, plus the applicable manufacturer warranty."],
      ["Does third-party service affect the warranty?", "Third-party repair or maintenance can void LIFTX craftsmanship coverage when it changes or damages the covered work."],
      ["What does the maintenance plan include?", "Three visits during the first year for visual inspection of load-bearing components, alignment, level and plumb, hardware, balance, and lubrication."],
    ],
  },
];
