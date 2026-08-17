/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import { DedicatedCta, TextChase } from "./ConversionCta";
import { ArrowIcon, DragHorizontalIcon } from "./UiIcons";

type MediaCategory = "residential" | "commercial" | "service" | "process";

type MediaItem = {
  src: string;
  title: string;
  eyebrow: string;
  category: MediaCategory;
  detail: string;
  alt: string;
  mobileSrc?: string;
  video?: string;
};

const navigation = [
  ["Residential", "/residential"],
  ["Commercial", "/commercial"],
  ["Full-View", "/full-view-garage-doors-treasure-valley"],
  ["Repair", "/garage-door-repair-boise"],
  ["Projects", "/projects"],
  ["Brands", "/garage-door-brands"],
  ["FAQ", "/common-questions"],
];

const manufacturerBrands = [
  {
    name: "Amarr",
    logo: "/brands/amarr.png",
    href: "/amarr-garage-doors-boise",
    className: "amarr",
  },
  {
    name: "Clopay",
    logo: "/brands/clopay.png",
    href: "/clopay-garage-doors-boise",
    className: "clopay",
  },
  {
    name: "Wayne Dalton",
    logo: "/brands/wayne-dalton.png",
    href: "/wayne-dalton-garage-doors-boise",
    className: "wayneDalton",
  },
  {
    name: "LiftMaster",
    logo: "/brands/liftmaster.png",
    href: "/garage-door-openers-boise",
    className: "liftmaster",
  },
  {
    name: "Garaga",
    logo: "/brands/garaga.webp",
    href: "/garaga-garage-doors-boise",
    className: "garaga",
  },
];

const systems = [
  {
    id: "residential",
    number: "01",
    label: "Residential",
    title: "The door should belong to the house.",
    copy: "Replacement, new construction, and repair—planned around the opening, the architecture, and how the system will actually be used.",
    image: "/gallery/amarr-northwoods-onyx-finished-02.webp",
    alt: "Black Amarr Northwoods residential garage door installed by LIFTX",
    details: ["Architectural + full-view", "New + replacement", "Operators + conversions"],
    href: "/residential",
  },
  {
    id: "commercial",
    number: "02",
    label: "Commercial full-view",
    title: "The Full-View Experts of the Treasure Valley.",
    copy: "Avante, VertiStack Avante, Vista, California, Amarr 3552, and custom aluminum-and-glass systems—specified and installed around the opening.",
    image: "/gallery/full-view-github-project.jpg",
    alt: "Black aluminum-and-glass full-view door installed by LIFTX",
    details: ["Aluminum + glass", "Stacking + specialty track", "Glazing + controls"],
    href: "/full-view-garage-doors-treasure-valley",
  },
  {
    id: "builders",
    number: "03",
    label: "New construction",
    title: "The details get handled early.",
    copy: "Openings, clearance, power, track, finish, and sequencing verified before they become expensive jobsite problems.",
    image: "/images/full-view-new-construction-angle.jpeg",
    alt: "Full-view door installed in a new-construction building",
    details: ["Site verification", "Specialty track", "Builder coordination"],
    href: "/builders-contractors",
  },
  {
    id: "service",
    number: "04",
    label: "Service + repair",
    title: "Find the cause. Fix the system.",
    copy: "Inspection-driven service for springs, cables, track, operators, controls, and complete door systems—with the finding explained first.",
    image: "/gallery/matched-torsion-springs-finished-02.webp",
    alt: "Matched torsion springs after service by LIFTX",
    details: ["Residential + commercial", "Emergency response", "Condition-based repair"],
    href: "/garage-door-repair-boise",
  },
];

const archive: MediaItem[] = [
  {
    src: "/gallery/amarr-northwoods-onyx-finished-01-poster.webp",
    video: "/gallery/amarr-northwoods-onyx-finished-01.mp4",
    title: "Northwoods Onyx in motion",
    eyebrow: "Residential / Video",
    category: "residential",
    detail: "Finished system",
    alt: "Video of a finished black Amarr Northwoods garage door",
  },
  ...[1, 2, 3, 4].map((number) => ({
    src: `/gallery/amarr-northwoods-onyx-finished-0${number}.webp`,
    title: `Northwoods Onyx / ${String(number).padStart(2, "0")}`,
    eyebrow: "Residential",
    category: "residential" as const,
    detail: "Finished installation",
    alt: "Black Amarr Northwoods residential garage door installed by LIFTX",
  })),
  {
    src: "/gallery/full-view-garage-door-interior-finished-01.webp",
    title: "Residential full-view",
    eyebrow: "Residential",
    category: "residential",
    detail: "Interior finish",
    alt: "Finished residential full-view garage door viewed from inside",
  },
  {
    src: "/gallery/car-wash-full-view-door-01 2.webp",
    title: "Tidal Wave Auto Spa",
    eyebrow: "Commercial",
    category: "commercial",
    detail: "Specialty service",
    alt: "Illuminated car wash door at Tidal Wave Auto Spa",
  },
  {
    src: "/gallery/commercial-full-view-glass-door-exterior-01.webp",
    title: "Commercial glass system",
    eyebrow: "Commercial",
    category: "commercial",
    detail: "Full-view exterior",
    alt: "Commercial full-view glass door installed by LIFTX",
  },
  ...[1, 2, 3, 4, 5].map((number) => ({
    src: `/gallery/full-view-commercial-door-exterior-0${number}.webp`,
    mobileSrc:
      number === 5
        ? "/gallery/full-view-commercial-door-exterior-05-mobile.webp"
        : undefined,
    title: `Full-view exterior / ${String(number).padStart(2, "0")}`,
    eyebrow: "Commercial",
    category: "commercial" as const,
    detail: "Exterior finish",
    alt: "Black full-view commercial door installed by LIFTX",
  })),
  ...[1, 2, 3].map((number) => ({
    src: `/gallery/full-view-commercial-door-interior-0${number}.webp`,
    title: `Full-view interior / ${String(number).padStart(2, "0")}`,
    eyebrow: "Commercial",
    category: "commercial" as const,
    detail: "Interior finish",
    alt: "Black full-view commercial door viewed from inside",
  })),
  ...[1, 2].map((number) => ({
    src: `/gallery/shop-sectional-door-${number === 1 ? "exterior" : "interior"}-finished-01.webp`,
    title: `Shop sectional / ${String(number).padStart(2, "0")}`,
    eyebrow: "Commercial",
    category: "commercial" as const,
    detail: number === 1 ? "Exterior finish" : "Interior finish",
    alt: "Large shop sectional door installed by LIFTX",
  })),
  ...[1, 2].map((number) => ({
    src: `/gallery/full-view-commercial-door-installation-0${number}.webp`,
    title: `Full-view installation / ${String(number).padStart(2, "0")}`,
    eyebrow: "Behind the build",
    category: "process" as const,
    detail: "Installation sequence",
    alt: "Full-view commercial door during installation by LIFTX",
  })),
  {
    src: "/gallery/full-view-door-sections-staged-01.webp",
    title: "Sections staged",
    eyebrow: "Behind the build",
    category: "process",
    detail: "Installation sequence",
    alt: "Full-view door sections staged before installation",
  },
  ...[1, 2].map((number) => ({
    src: `/gallery/broken-torsion-spring-gap-0${number}.webp`,
    title: `Broken torsion spring / ${String(number).padStart(2, "0")}`,
    eyebrow: "Service + repair",
    category: "service" as const,
    detail: "Failure documented",
    alt: "Broken torsion spring documented during a LIFTX inspection",
  })),
  {
    src: "/gallery/liftmaster-2220l-spring-install-prep-01.webp",
    title: "Operator + spring prep",
    eyebrow: "Service + repair",
    category: "service",
    detail: "Parts staged",
    alt: "LiftMaster operator and spring components staged for installation",
  },
  ...[1, 2].map((number) => ({
    src: `/gallery/matched-torsion-springs-finished-0${number}.webp`,
    title: `Matched spring system / ${String(number).padStart(2, "0")}`,
    eyebrow: "Service + repair",
    category: "service" as const,
    detail: "Finished repair",
    alt: "Matched torsion springs after repair by LIFTX",
  })),
  {
    src: "/gallery/off-track-garage-door-before-01.webp",
    title: "Off-track door / Before",
    eyebrow: "Service + repair",
    category: "service",
    detail: "Condition documented",
    alt: "Garage door off track before repair",
  },
  {
    src: "/gallery/off-track-garage-door-repair-progress-01.webp",
    title: "Off-track door / Progress",
    eyebrow: "Service + repair",
    category: "service",
    detail: "Repair sequence",
    alt: "Garage door being repaired after coming off track",
  },
  {
    src: "/gallery/off-track-garage-door-after-01.webp",
    title: "Off-track door / Reset",
    eyebrow: "Service + repair",
    category: "service",
    detail: "System restored",
    alt: "Garage door reset and restored after off-track repair",
  },
  {
    src: "/gallery/torsion-spring-replacement-progress-01.webp",
    title: "Torsion replacement",
    eyebrow: "Service + repair",
    category: "service",
    detail: "Repair sequence",
    alt: "Torsion spring replacement in progress",
  },
];

const filterLabels: { id: "all" | MediaCategory; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "process", label: "Behind the build" },
  { id: "service", label: "Service + repair" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSystem, setActiveSystem] = useState(0);
  const [filter, setFilter] = useState<"all" | MediaCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [compare, setCompare] = useState(52);

  const visibleMedia = useMemo(
    () => (filter === "all" ? archive : archive.filter((item) => item.category === filter)),
    [filter],
  );

  const selected = visibleMedia[selectedIndex] ?? visibleMedia[0];
  const system = systems[activeSystem];

  const chooseFilter = (nextFilter: "all" | MediaCategory) => {
    setFilter(nextFilter);
    setSelectedIndex(0);
  };

  const moveGallery = (direction: number) => {
    setSelectedIndex((current) =>
      (current + direction + visibleMedia.length) % visibleMedia.length,
    );
  };

  const renderSelectedMedia = (expanded = false) => {
    if (selected.video) {
      return (
        <video
          className={expanded ? "expandedMedia" : "archiveMedia"}
          src={selected.video}
          poster={selected.src}
          autoPlay
          muted
          loop
          playsInline
          controls={expanded}
        />
      );
    }

    return (
      <picture>
        {selected.mobileSrc && <source media="(max-width: 720px)" srcSet={selected.mobileSrc} />}
        <img
          className={expanded ? "expandedMedia" : "archiveMedia"}
          src={selected.src}
          alt={selected.alt}
        />
      </picture>
    );
  };

  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="LIFTX home">
          <img src="/images/liftx-wordmark.png" alt="LIFTX" />
        </a>

        <nav className="desktopNav" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>

        <a className="headerCta" href="/contact">
          Start a project <ArrowIcon direction="up-right" />
        </a>

        <button
          className="menuTrigger"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <img src="/images/liftx-mark.png" alt="" aria-hidden="true" />
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
        </button>
      </header>

      <div className={`mobileMenu ${menuOpen ? "isOpen" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navigation.map(([label, href], index) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{label}
            </a>
          ))}
        </nav>
        <div className="mobileMenuFooter">
          <p>Boise · Treasure Valley · Valley County</p>
          <a href="/contact">Contact LIFTX <ArrowIcon direction="right" /></a>
        </div>
      </div>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow"><span /> Idaho door systems</p>
          <h1>Built into the building.<em>Not just the opening.</em></h1>
          <p className="heroIntro">
            Residential, commercial, and specialty systems—measured precisely,
            explained clearly, and installed without the sales routine.
          </p>
          <div className="heroActions">
            <a className="primaryButton" href="#archive">See the work <ArrowIcon direction="down-right" /></a>
            <a className="textLink" href="/contact">Request service <ArrowIcon direction="right" /></a>
          </div>
        </div>

        <div className="heroVisual">
          <img src="/images/full-view-studio-interior.jpeg" alt="Finished LIFTX full-view systems inside a studio" />
          <div className="heroShade" />
          <div className="heroCaption">
            <span>Featured system</span>
            <strong>Full-view studio doors</strong>
            <small>Garden City, Idaho</small>
          </div>
          <div className="heroMotion">
            <video
              src="/gallery/amarr-northwoods-onyx-finished-01.mp4"
              poster="/gallery/amarr-northwoods-onyx-finished-01-poster.webp"
              autoPlay muted loop playsInline
              aria-label="Finished Amarr Northwoods Onyx door in motion"
            />
            <span><i /> REAL WORK / MOTION</span>
          </div>
        </div>

        <div className="heroRail">
          {systems.slice(0, 3).map((item) => (
            <a href="#systems" key={item.id} onClick={() => setActiveSystem(systems.indexOf(item))}>
              <span>{item.number}</span>{item.label}<ArrowIcon direction="up-right" />
            </a>
          ))}
        </div>
      </section>

      <section className="positioningSection" id="about">
        <div className="sectionLabel"><span>01</span>The LIFTX standard</div>
        <div className="positioningStatement">
          <h2>Good work starts with the right questions—not a bigger estimate.</h2>
          <div className="positioningAside">
            <p>We inspect first. Then we explain what matters, what can wait, and what we would do if it were ours.</p>
            <a href="#process">How we work <ArrowIcon direction="right" /></a>
          </div>
        </div>
        <div className="brandStrip" aria-label="Manufacturer partners">
          {manufacturerBrands.map((manufacturer) => (
            <a
              className={`manufacturerBrand ${manufacturer.className}`}
              href={manufacturer.href}
              key={manufacturer.name}
              aria-label={`Explore ${manufacturer.name} with LIFTX`}
            >
              <span className="manufacturerName">{manufacturer.name}</span>
              <img src={manufacturer.logo} alt="" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section className="systemSelector" id="systems" aria-labelledby="systems-heading">
        <div className="sectionTopline">
          <div className="sectionLabel"><span>02</span>Find your system</div>
          <p>Choose where the system needs to work.</p>
        </div>
        <h2 id="systems-heading">What are we building around?</h2>

        <div className="selectorTabs" role="tablist" aria-label="Project type">
          {systems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeSystem === index}
              onClick={() => setActiveSystem(index)}
            >
              <span>{item.number}</span>{item.label}
            </button>
          ))}
        </div>

        <div className="lanePanel" role="tabpanel">
          <div className="laneImage" key={system.image}>
            <img src={system.image} alt={system.alt} />
            <span className="imageIndex">LIFTX / {system.number}</span>
          </div>
          <div className="laneCopy">
            <p className="laneKicker">{system.label}</p>
            <h3>{system.title}</h3>
            <p className="laneDescription">{system.copy}</p>
            <ul>{system.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            <a className="outlineButton" href={system.href}>
              Explore {system.label.toLowerCase()} <ArrowIcon direction="up-right" />
            </a>
          </div>
        </div>
      </section>

      <section className="archiveSection" id="archive">
        <div className="sectionTopline archiveTopline">
          <div className="sectionLabel lightLabel"><span>03</span>Field archive</div>
          <p><strong>32</strong> PHOTOS / <strong>01</strong> VIDEO / ALL LIFTX</p>
        </div>

        <div className="archiveHeading">
          <h2>Not a stock photo<br />in the room.</h2>
          <p>Finished systems, jobsite details, repairs, failures, and the work between them.</p>
        </div>

        <div className="archiveFilters" role="tablist" aria-label="Filter project media">
          {filterLabels.map((item) => {
            const count = item.id === "all" ? archive.length : archive.filter((media) => media.category === item.id).length;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                onClick={() => chooseFilter(item.id)}
              >
                {item.label}<span>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <div className="archiveStage">
          <button className="mediaOpen" type="button" onClick={() => setViewerOpen(true)} aria-label={`Open ${selected.title} full screen`}>
            {renderSelectedMedia()}
            <span className="openCue">EXPAND <ArrowIcon direction="up-right" /></span>
          </button>
          <div className="archiveMeta" aria-live="polite">
            <div>
              <p>{selected.eyebrow}</p>
              <h3>{selected.title}</h3>
              <span>{selected.detail}</span>
            </div>
            <div className="archiveControls">
              <span>{String(selectedIndex + 1).padStart(2, "0")} / {String(visibleMedia.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => moveGallery(-1)} aria-label="Previous project"><ArrowIcon direction="left" /></button>
              <button type="button" onClick={() => moveGallery(1)} aria-label="Next project"><ArrowIcon direction="right" /></button>
            </div>
          </div>
        </div>

        <div className="thumbnailRail" role="tablist" aria-label="Project media thumbnails">
          {visibleMedia.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              role="tab"
              aria-selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View ${item.title}`}
            >
              <img src={item.src} alt="" loading="lazy" />
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.video && <b>PLAY</b>}
            </button>
          ))}
        </div>
      </section>

      <section className="comparisonSection" id="service">
        <div className="comparisonCopy">
          <div className="sectionLabel"><span>04</span>Service, documented</div>
          <h2>See the condition.<br />See the correction.</h2>
          <p>An off-track system does not need a sales pitch. It needs the cause identified, the damage documented, and the door safely reset.</p>
          <a className="outlineButton" href="/garage-door-repair-boise">Explore service <ArrowIcon direction="up-right" /></a>
        </div>

        <div className="comparisonTool" style={{ "--compare": `${compare}%` } as React.CSSProperties}>
          <img className="comparisonBefore" src="/gallery/off-track-garage-door-before-01.webp" alt="Garage door off track before repair" />
          <div className="comparisonAfterWrap">
            <img className="comparisonAfter" src="/gallery/off-track-garage-door-after-01.webp" alt="Garage door reset after repair" />
          </div>
          <span className="compareLabel beforeLabel">BEFORE</span>
          <span className="compareLabel afterLabel">RESET</span>
          <div className="comparisonHandle"><span><DragHorizontalIcon /></span></div>
          <input
            type="range"
            min="5"
            max="95"
            value={compare}
            onChange={(event) => setCompare(Number(event.target.value))}
            aria-label="Compare before and after repair"
          />
        </div>
      </section>

      <section className="processSection" id="process">
        <div className="processImage">
          <img src="/images/measuring-commercial-door.jpeg" alt="LIFTX technician measuring a commercial door" />
          <div className="processStamp"><strong>LIFTX</strong><span>MEASURED, NOT GUESSED.</span></div>
        </div>
        <div className="processContent">
          <div className="sectionLabel"><span>05</span>How we work</div>
          <h2>Clarity before commitment.</h2>
          <p className="processIntro">The details get handled in the right order, with no pressure layered on top.</p>
          <ol className="processList">
            <li><span>01</span><div><h3>Inspect</h3><p>Opening, clearance, use, condition, and safety.</p></div></li>
            <li><span>02</span><div><h3>Explain</h3><p>What matters, what can wait, and what each option changes.</p></div></li>
            <li><span>03</span><div><h3>Execute</h3><p>Clean coordination, precise installation, clear closeout.</p></div></li>
          </ol>
        </div>
      </section>

      <DedicatedCta />

      <footer>
        <div className="footerBrand">
          <img src="/images/liftx-wordmark.png" alt="LIFTX" />
          <p>Door systems for the way the building actually works.</p>
        </div>
        <div className="footerLinks">
          <div><span>Services</span><a href="/residential">Residential</a><a href="/commercial">Commercial</a><a href="/full-view-garage-doors-treasure-valley">Full-View experts</a><a href="/garage-door-repair-boise">Repair</a></div>
          <div><span>Explore</span><a href="/projects">Projects</a><a href="/garage-door-brands">Brands + builders</a><a href="/builders-contractors">Builders</a><a href="/common-questions">FAQ</a></div>
          <div><span>Contact</span><a href="/contact">Start a project</a><a href="tel:+12089954321">208-995-4321</a><a href="/warranty">Warranty</a></div>
        </div>
        <div className="footerBottom"><span>© 2026 LIFTX</span><span>Idaho Contractor #1971051</span><a href="#top">Back to top <ArrowIcon direction="up" /></a></div>
      </footer>

      <TextChase withDesktopRail />

      <a className="mobileContactBar" href="/contact">Start a project <ArrowIcon direction="up-right" /></a>

      {viewerOpen && (
        <div className="mediaViewer" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setViewerOpen(false)}>
          <button type="button" className="viewerClose" onClick={() => setViewerOpen(false)}>CLOSE ×</button>
          <div className="viewerCanvas" onClick={(event) => event.stopPropagation()}>{renderSelectedMedia(true)}</div>
          <div className="viewerMeta"><span>{selected.eyebrow}</span><strong>{selected.title}</strong></div>
        </div>
      )}
    </main>
  );
}
