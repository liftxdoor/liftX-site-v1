import type { Metadata } from "next";
import InteriorPage from "../InteriorPage";

const slugs = [
  "residential",
  "commercial",
  "full-view-garage-doors-treasure-valley",
  "garage-door-repair-boise",
  "garage-door-installation-boise",
  "garage-door-openers-boise",
  "projects",
  "garage-door-brands",
  "amarr-garage-doors-boise",
  "clopay-garage-doors-boise",
  "wayne-dalton-garage-doors-boise",
  "garaga-garage-doors-boise",
  "common-questions",
  "builders-contractors",
  "warranty",
  "contact",
];

const titles: Record<string, string> = {
  residential: "Residential Garage Door Systems Boise",
  commercial: "Commercial Overhead Door Systems Boise",
  "full-view-garage-doors-treasure-valley": "Full-View Garage Door Experts Treasure Valley",
  "garage-door-repair-boise": "Garage Door Repair Boise",
  "garage-door-installation-boise": "Garage Door Installation Boise",
  "garage-door-openers-boise": "Garage Door Openers Boise",
  projects: "Real LIFTX Projects",
  "garage-door-brands": "Garage Door Brands & Design Tools",
  "amarr-garage-doors-boise": "Amarr Garage Doors & Collections Boise",
  "clopay-garage-doors-boise": "Clopay Garage Doors & Collections Boise",
  "wayne-dalton-garage-doors-boise": "Wayne Dalton Garage Doors Boise",
  "garaga-garage-doors-boise": "Garaga Garage Doors & Collections Boise",
  "common-questions": "Garage Door Questions",
  "builders-contractors": "Garage Doors for Builders & Contractors",
  warranty: "LIFTX Warranty",
  contact: "Contact LIFTX",
};

const descriptions: Record<string, string> = {
  residential: "Residential garage door replacement, installation, design guidance, and repair across Boise and the Treasure Valley.",
  commercial: "Commercial overhead doors, Full-View systems, operators, repair, and site coordination across Boise and the Treasure Valley.",
  "full-view-garage-doors-treasure-valley": "Explore Avante, VertiStack Avante, Vista, California, and custom Full-View aluminum-and-glass door systems installed by LIFTX.",
  "garage-door-repair-boise": "Inspection-driven garage door repair for springs, cables, track, operators, controls, and complete systems in Boise and the Treasure Valley.",
  "garage-door-installation-boise": "Garage door replacement and new-construction installation planned around the opening, architecture, clearance, and daily use.",
  "garage-door-openers-boise": "Garage door opener selection, installation, replacement, controls, and diagnostics across Boise and the Treasure Valley.",
  projects: "See real residential, commercial, Full-View, installation, and repair work completed by LIFTX across Southwest Idaho.",
  "garage-door-brands": "Compare trusted garage door brands, collections, and manufacturer design tools with practical guidance from LIFTX.",
  "amarr-garage-doors-boise": "Explore Amarr residential and Full-View garage door collections, including Vista, Northwoods, Olympus, Classica, and more.",
  "clopay-garage-doors-boise": "Explore Clopay garage door collections, including Avante, VertiStack Avante, Modern Steel, Canyon Ridge, and more.",
  "wayne-dalton-garage-doors-boise": "Explore Wayne Dalton residential, commercial, and Full-View garage door systems with local planning and installation by LIFTX.",
  "garaga-garage-doors-boise": "Explore Garaga garage door collections, including California, Vantage, Princeton, Eastman, Cambridge, and more.",
  "common-questions": "Straight answers to common garage door questions about repair, safety, design, pricing, operators, warranties, and recommendations.",
  "builders-contractors": "Garage door planning, opening verification, product coordination, installation, and closeout support for builders and contractors.",
  warranty: "Understand LIFTX workmanship coverage, manufacturer warranties, documentation, and the practical next step when something needs attention.",
  contact: "Call, text, or send project details to LIFTX for garage door service, installation, Full-View systems, and commercial overhead doors.",
};

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = titles[slug] ?? "Garage Door Systems";
  const description = descriptions[slug] ?? descriptions.residential;
  return {
    title,
    description,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `/${slug}`,
      siteName: "LIFTX",
      title: `${title} | LIFTX`,
      description,
      images: [
        {
          url: "/gallery/full-view-github-hero.jpg",
          width: 1600,
          height: 900,
          alt: "Garage door and Full-View work by LIFTX",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | LIFTX`,
      description,
      images: ["/gallery/full-view-github-hero.jpg"],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <InteriorPage slug={slug} />;
}
