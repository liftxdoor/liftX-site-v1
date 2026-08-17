/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
"use client";

import { FormEvent, useMemo, useState } from "react";
import BrandJourney from "./BrandJourney";
import { DedicatedCta } from "./ConversionCta";
import SiteChrome from "./SiteChrome";
import { ArrowIcon } from "./UiIcons";
import {
  amarrCollections,
  clopayCollections,
  garagaCollections,
  Collection,
  faqGroups,
  interiorPages,
  projectMedia,
} from "./site-data";

function Arrow() {
  return <ArrowIcon direction="up-right" />;
}

function PageCta({ title, copy, label = "Start a project" }: { title: string; copy: string; label?: string }) {
  return (
    <DedicatedCta
      copy={copy}
      eyebrow="Next step · Direct to LIFTX"
      secondaryHref="/contact"
      secondaryLabel={label}
      title={title}
    />
  );
}

function GenericPage({ slug }: { slug: string }) {
  const page = interiorPages[slug];

  return (
    <>
      <section className="interiorHero">
        <div className="interiorHeroCopy">
          <p className="interiorEyebrow"><span />{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <div className="interiorHeroActions">
            <a className="primaryButton" href="/contact">Start here <Arrow /></a>
            <a className="darkTextLink" href="tel:+12089954321">Call LIFTX <ArrowIcon direction="right" /></a>
          </div>
        </div>
        <div className="interiorHeroImage">
          <img src={page.image} alt={page.imageAlt} />
          <span>REAL LIFTX WORK</span>
        </div>
      </section>

      <section className="interiorOverview">
        <div className="interiorSectionHeader">
          <p className="interiorEyebrow"><span />{page.sectionEyebrow}</p>
          <h2>{page.sectionTitle}</h2>
          <p>{page.sectionCopy}</p>
        </div>
        <div className="interiorCards">
          {page.cards.map((card, index) => (
            <article key={card.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
        {page.note && <aside className="interiorNote"><strong>Important</strong><p>{page.note}</p></aside>}
      </section>

      {slug === "commercial" && (
        <section className="commercialFullViewGateway">
          <div>
            <p className="interiorEyebrow"><span />Primary commercial specialty</p>
            <h2>The Full-View Experts of the Treasure Valley.</h2>
          </div>
          <div>
            <p>One comparison page for Avante, VertiStack Avante, Avante Sleek, Vista, Amarr 3552, California, Wayne Dalton 8850, glass choices, opening conditions, and real LIFTX work.</p>
            <a className="primaryButton" href="/full-view-garage-doors-treasure-valley">Explore every Full-View system <Arrow /></a>
          </div>
        </section>
      )}

      {slug === "commercial" ? (
        <section className="inspectionBand">
          <div className="inspectionImage"><img src="/images/tidal-wave-high-speed-door.jpeg" alt="Specialty car-wash door installed by LIFTX" /></div>
          <div className="inspectionCopy">
            <p className="interiorEyebrow"><span />Beyond Full-View</p>
            <h2>Specialty systems still start with the operation.</h2>
            <ol>
              <li><span>01</span><div><strong>Traffic + environment</strong><p>Cycles, moisture, washdown, wind, people, vehicles, and exposure.</p></div></li>
              <li><span>02</span><div><strong>Clearance + structure</strong><p>Opening, track path, equipment, power, controls, and attachment.</p></div></li>
              <li><span>03</span><div><strong>Complete closeout</strong><p>Installation, monitored safety, testing, documentation, and turnover.</p></div></li>
            </ol>
          </div>
        </section>
      ) : (
      <section className="inspectionBand">
        <div className="inspectionImage"><img src="/images/measuring-commercial-door.jpeg" alt="LIFTX technician measuring a door system" /></div>
        <div className="inspectionCopy">
          <p className="interiorEyebrow"><span />The LIFTX standard</p>
          <h2>Inspect. Explain. Execute.</h2>
          <ol>
            <li><span>01</span><div><strong>Inspect first</strong><p>Opening, use, condition, clearance, structure, and safety.</p></div></li>
            <li><span>02</span><div><strong>Explain the options</strong><p>What matters now, what can wait, and what each path changes.</p></div></li>
            <li><span>03</span><div><strong>Do the work cleanly</strong><p>Precise coordination, installation, testing, and closeout.</p></div></li>
          </ol>
        </div>
      </section>
      )}

      <PageCta title={page.ctaTitle} copy={page.ctaCopy} label={page.ctaLabel} />
    </>
  );
}

const fullViewSystems = [
  {
    brand: "Clopay",
    name: "Avante",
    type: "Signature aluminum + glass",
    image: "/catalog/clopay/avante.webp",
    copy: "The modern reference point: broad glass and panel choices in an aluminum frame for homes, studios, and architectural openings.",
    best: "Best starting point for the classic Full-View look.",
    travel: "Overhead travel",
    href: "https://www.clopaydoor.com/avante",
  },
  {
    brand: "Clopay",
    name: "Avante Sleek",
    type: "Minimal frame expression",
    image: "/catalog/clopay/avante-sleek.webp",
    copy: "Reduced vertical framing and clean horizontal lines create a quieter, more uninterrupted glass composition.",
    best: "Best when minimal framing is the design priority.",
    travel: "Overhead travel",
    href: "https://www.clopaydoor.com/avantesleek",
  },
  {
    brand: "Clopay",
    name: "VertiStack Avante",
    type: "Wall-stacking Full-View",
    image: "/catalog/clopay/vertistack-avante.webp",
    copy: "Sections stack compactly above the opening, keeping the ceiling clear of exposed horizontal track, hinges, and cables.",
    best: "Best for clear ceilings, lighting, storage, and clean interiors.",
    travel: "Vertical wall stack",
    href: "https://www.clopaydoor.com/vertistack-avante",
  },
  {
    brand: "Amarr",
    name: "Vista",
    type: "Residential Full-View aluminum",
    image: "/catalog/amarr/vista.webp",
    copy: "Large glass areas, multiple anodized or coated frame finishes, and broad glazing choices for modern residential and mixed-use spaces.",
    best: "Best for flexible frame-and-glass design combinations.",
    travel: "Overhead travel",
    href: "https://www.amarr.com/us/en/garage-doors/explore-products/view-all-doors/vista",
  },
  {
    brand: "Amarr",
    name: "3552",
    type: "Heavy-duty commercial Full-View",
    image: "/gallery/full-view-commercial-door-interior-03.webp",
    copy: "A two-inch commercial-grade extruded aluminum system for showrooms, service centers, car washes, restaurants, and demanding architectural openings.",
    best: "Best for large or high-use commercial openings.",
    travel: "Track selected to building",
    href: "https://www.amarr.com/us/en/commercial-doors/explore-commercial-products/aluminum-sectional-doors/amarr-3552",
  },
  {
    brand: "Garaga",
    name: "California",
    type: "Panoramic aluminum + glass",
    image: "/catalog/garaga/california.webp",
    copy: "A full-vision aluminum door with clean proportions and privacy, color, and glazing directions for residential or lifestyle spaces.",
    best: "Best for bright indoor-outdoor rooms and design-led homes.",
    travel: "Overhead travel",
    href: "https://www.garaga.com/garage-doors/residential/california",
  },
  {
    brand: "Wayne Dalton",
    name: "Model 8850",
    type: "Modern aluminum + glass",
    image: "/images/white-full-view-residential.jpeg",
    copy: "Straight-line aluminum framing with anodized, painted, and powder-coated finish directions plus clear, tinted, obscure, satin, or laminated glass.",
    best: "Best for a broad finish and privacy palette.",
    travel: "Overhead travel",
    href: "https://www.wayne-dalton.com/garage-doors/detail/glass-garage-doors-8850",
  },
];

const fullViewProof = [
  { image: "/gallery/car-wash-full-view-door-01 2.webp", title: "Car-wash opening", note: "High-moisture specialty application" },
  { image: "/images/full-view-studio-interior.jpeg", title: "Studio pair", note: "Light, access, and a clean interior" },
  { image: "/gallery/full-view-commercial-door-installation-01.webp", title: "During installation", note: "Track, structure, and sequencing" },
  { image: "/gallery/full-view-door-sections-staged-01.webp", title: "Sections staged", note: "Protected and planned before assembly" },
  { image: "/images/full-view-new-construction.jpeg", title: "New construction", note: "Openings coordinated early" },
  { image: "/gallery/full-view-garage-door-interior-finished-01.webp", title: "Finished from inside", note: "Daylight without surrendering the opening" },
];

function FullViewPage() {
  return (
    <>
      <section className="fullViewHero">
        <div className="fullViewHeroCopy">
          <p className="interiorEyebrow"><span />Aluminum + glass · Boise and the Treasure Valley</p>
          <h1>The Full-View Experts of the Treasure Valley.</h1>
          <p>Residential, commercial, architectural, stacking, and specialty aluminum-and-glass door systems—measured, configured, and installed by people who genuinely love this work.</p>
          <div className="interiorHeroActions">
            <a className="primaryButton" href="/contact">Plan a Full-View project <Arrow /></a>
            <a className="darkTextLink" href="#full-view-systems">Compare systems <ArrowIcon direction="down" /></a>
          </div>
          <div className="fullViewHeroIndex">
            <div><strong>11</strong><span>systems + directions</span></div>
            <div><strong>01</strong><span>opening-specific plan</span></div>
            <div><strong>208</strong><span>local area code</span></div>
          </div>
        </div>
        <figure className="fullViewHeroImage">
          <img src="/gallery/full-view-github-hero.jpg" alt="Black Full-View aluminum and glass door installed by LIFTX" />
          <figcaption><b>REAL LIFTX WORK</b><span>Aluminum frame · dark glass · finished opening</span></figcaption>
        </figure>
      </section>

      <section className="fullViewManifesto">
        <p className="interiorEyebrow"><span />Why LIFTX</p>
        <div>
          <h2>Not a glass door dropped into an opening.</h2>
          <p>The glass, frame, track path, counterbalance, operator, structure, controls, weather exposure, and daily traffic all affect one another. LIFTX starts with the opening and the way the space needs to work—then narrows the right system.</p>
        </div>
        <div className="fullViewManifestoSteps">
          <span>Inspect the opening</span><span>Compare the systems</span><span>Configure the glass</span><span>Install the complete assembly</span>
        </div>
      </section>

      <section className="fullViewSystems" id="full-view-systems">
        <header className="fullViewSectionHead">
          <p className="interiorEyebrow"><span />The Full-View field guide</p>
          <h2>One page. Every serious direction.</h2>
          <p>These are not interchangeable products. The opening, ceiling, use, desired sightline, glazing, size, and finish determine which path makes sense.</p>
        </header>
        <div className="fullViewSystemGrid">
          {fullViewSystems.map((system, index) => (
            <article key={system.name} className={system.name === "VertiStack Avante" ? "isFeatured" : ""}>
              <div className="fullViewSystemImage">
                <img src={system.image} alt={`${system.brand} ${system.name} Full-View system`} loading="lazy" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="fullViewSystemBody">
                <small>{system.brand} · {system.type}</small>
                <h3>{system.name}</h3>
                <p>{system.copy}</p>
                <dl><div><dt>Use it when</dt><dd>{system.best}</dd></div><div><dt>Door path</dt><dd>{system.travel}</dd></div></dl>
                <a href={system.href} target="_blank" rel="noopener">Manufacturer details <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
        <div className="fullViewExtended">
          <div className="fullViewExtendedIntro">
            <p className="interiorEyebrow"><span />Go wider when the opening calls for it</p>
            <h3>Four more directions worth comparing.</h3>
          </div>
          <div className="fullViewExtendedGrid">
            {[
              ["Amarr", "3582 MultiView", "Wider uninterrupted expanses of glass in a commercial-grade aluminum frame.", "https://www.amarr.com/us/en/commercial-doors/explore-commercial-products/aluminum-sectional-doors/amarr-3582"],
              ["Clopay", "VertiStack Clear", "The commercial stacking path for hospitality, retail, education, office, and open-ceiling applications.", "https://www.clopaydoor.com/vertistack-clear"],
              ["Wayne Dalton", "Model 8800", "A contemporary aluminum-and-glass option with a distinct frame expression.", "https://www.wayne-dalton.com/garage-doors/detail/aluminum-glass-garage-door-8800"],
              ["Wayne Dalton", "Luminous 8450", "A frameless, glass-first façade with panels mounted over the aluminum structure.", "https://www.wayne-dalton.com/garage-doors/detail/frameless-glass-garage-doors-8450"],
            ].map(([brand, name, copy, href], index) => (
              <article key={name}>
                <span>{String(index + 8).padStart(2, "0")}</span><small>{brand}</small><h4>{name}</h4><p>{copy}</p><a href={href} target="_blank" rel="noopener">Compare details <Arrow /></a>
              </article>
            ))}
          </div>
        </div>
        <p className="fullViewDisclosure">Manufacturer imagery identifies the named collection. LIFTX field imagery demonstrates our installation work and may not identify a specific product line. Final manufacturer, model, construction, glazing, and options are confirmed before ordering.</p>
      </section>

      <section className="fullViewGlass">
        <div className="fullViewGlassIntro">
          <p className="interiorEyebrow"><span />Glass + panel strategy</p>
          <h2>Control the view, light, privacy, and performance.</h2>
          <p>Availability varies by manufacturer, model, opening size, and frame construction. LIFTX compares what is actually available for the selected system—not just what looks good on a screen.</p>
        </div>
        <div className="fullViewGlassMatrix">
          {[
            ["Clear", "Maximum visibility and daylight"],
            ["Tinted", "Gray, bronze, green, or darker visual control"],
            ["Frosted / satin", "Diffuse light with increased privacy"],
            ["Obscure", "Texture and privacy without going opaque"],
            ["Laminated", "White, black, or specialty architectural expression"],
            ["Acrylic / polycarbonate", "Lightweight or impact-conscious panel choices"],
            ["Insulated glass", "Improved thermal performance where the model allows"],
            ["Switchable privacy", "Clopay C-Power clear-to-private compatible configurations"],
          ].map(([name, copy], index) => (
            <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="fullViewStackFeature">
        <div className="fullViewStackImage"><img src="/catalog/clopay/vertistack-avante-02.webp" alt="VertiStack Avante sections stacked above a modern opening" loading="lazy" /></div>
        <div className="fullViewStackCopy">
          <p className="interiorEyebrow"><span />Avante Stack · correctly, VertiStack Avante</p>
          <h2>Keep the ceiling clear.</h2>
          <p>VertiStack Avante moves the sections into a compact wall stack above the opening. That can preserve lighting, storage, tall-vehicle clearance, and the clean interior sightline that makes a Full-View project feel intentional.</p>
          <ul><li>No horizontal track traveling across the ceiling</li><li>Compact stack above the opening</li><li>Glass, acrylic, polycarbonate, or solid-panel directions</li><li>Opening and soffit coordination before ordering</li></ul>
          <a className="primaryButton" href="/contact">Ask LIFTX about VertiStack <Arrow /></a>
        </div>
      </section>

      <section className="fullViewProof">
        <header className="fullViewSectionHead light">
          <p className="interiorEyebrow"><span />Installed proof</p>
          <h2>Different openings. Different photographs.</h2>
          <p>No repeated stock tile and no anonymous catalog filler—this is the range already present in the LIFTX project library.</p>
        </header>
        <div className="fullViewProofGrid">
          {fullViewProof.map((item, index) => (
            <figure key={item.image}>
              <img src={item.image} alt={`${item.title} by LIFTX`} loading="lazy" />
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span><div><b>{item.title}</b><small>{item.note}</small></div></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="fullViewPlanning">
        <div className="fullViewPlanningCopy">
          <p className="interiorEyebrow"><span />Before the order</p>
          <h2>Six decisions that make the install.</h2>
          <p>Straight answers, solid work, and no pressure. LIFTX verifies the constraints first, explains the practical options, and documents the selected direction.</p>
        </div>
        <ol>
          {[
            ["Opening", "Finished width, height, jambs, floor, and structure"],
            ["Ceiling", "Headroom, track path, lights, storage, and utilities"],
            ["Glass", "Visibility, privacy, safety, weight, and thermal needs"],
            ["Use", "Traffic, cycles, weather, vehicles, people, and access"],
            ["Operation", "Counterbalance, operator, controls, and monitored safety"],
            ["Sequence", "Lead time, delivery, protection, installation, and closeout"],
          ].map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}
        </ol>
      </section>

      <PageCta title="Bring us the opening. We’ll narrow the Full-View system." copy="Send photos, rough dimensions, plans, and what you want the space to do. LIFTX will compare the viable products, glass, track, operator, and installed scope." label="Plan a Full-View project" />
    </>
  );
}

function CollectionCard({ collection }: { collection: Collection }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = collection.images.length > 1;
  const collectionId = `collection-${collection.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

  const move = (direction: number) => {
    setIndex((current) => (current + direction + collection.images.length) % collection.images.length);
  };

  return (
    <article className="collectionCard" id={collectionId}>
      <div className="collectionStage">
        <img src={collection.images[index]} alt={`${collection.name} example ${index + 1}`} loading="lazy" />
        {hasMultiple && (
          <>
            <button className="collectionPrev" type="button" onClick={() => move(-1)} aria-label={`Previous ${collection.name} image`}><ArrowIcon direction="left" /></button>
            <button className="collectionNext" type="button" onClick={() => move(1)} aria-label={`Next ${collection.name} image`}><ArrowIcon direction="right" /></button>
            <span className="collectionCount">{String(index + 1).padStart(2, "0")} / {String(collection.images.length).padStart(2, "0")}</span>
          </>
        )}
      </div>
      <div className="collectionBody">
        <small>{collection.type}</small>
        <h2>{collection.name}</h2>
        <p>{collection.description}</p>
        <a href={collection.href} target="_blank" rel="noopener">Manufacturer details <Arrow /></a>
      </div>
    </article>
  );
}

function ManufacturerPage({ brand }: { brand: "amarr" | "clopay" | "garaga" }) {
  const isAmarr = brand === "amarr";
  const isClopay = brand === "clopay";
  const isGaraga = brand === "garaga";
  const brandName = isAmarr ? "Amarr" : isClopay ? "Clopay" : "Garaga";
  const collections = isAmarr ? amarrCollections : isClopay ? clopayCollections : garagaCollections;
  const designLink = isAmarr
    ? "https://www.amarr.com/us/en/design-your-garage-door"
    : isClopay ? "https://www.clopaydoor.com/ezdoor" : "https://designcentre.garaga.com/ca";
  const logo = isAmarr ? "/catalog/brands/amarr.png" : isClopay ? "/catalog/brands/clopay.png" : "/brands/garaga.webp";
  const heroImage = isAmarr ? "/gallery/amarr-northwoods-onyx-finished-04.webp" : isClopay ? "/catalog/clopay/avante.webp" : "/catalog/garaga/princeton.webp";
  const [cpowerState, setCpowerState] = useState<"clear" | "private">("clear");

  return (
    <>
      <section className={`manufacturerHero${isGaraga ? " garagaHero" : ""}`}>
        <div className="manufacturerHeroLogo">
          <img src={logo} alt={brandName} />
          <span>{isGaraga ? "COLLECTION GUIDE" : "AUTHORIZED DEALER"}</span>
        </div>
        <div className="manufacturerHeroCopy">
          <p className="interiorEyebrow"><span />Collections + design tools</p>
          <h1>{brandName} garage doors in Boise.</h1>
          <p>
            Compare the complete LIFTX collection guide, use the manufacturer door builder,
            and send us the design or collection you like. LIFTX will verify the opening,
            construction, options, track, operator, lead time, and installed scope.
          </p>
          <div className="interiorHeroActions">
            <a className="primaryButton" href="#collections">Explore collections <ArrowIcon direction="down" /></a>
            <a className="darkTextLink" href={designLink} target="_blank" rel="noopener">Open door builder <Arrow /></a>
          </div>
        </div>
        <div className="manufacturerHeroImage">
          <img
            src={heroImage}
            alt={`${brandName} garage door collection`}
          />
        </div>
      </section>

      {isGaraga && (
        <section className="garagaRunway" aria-label="Explore Garaga by design direction">
          <div className="garagaRunwayIntro">
            <p className="interiorEyebrow"><span />Design direction</p>
            <h2>Four ways into the collection.</h2>
            <p>Start with the architectural language, then use Garaga’s Design Centre to narrow the panel, color, glass, and hardware.</p>
            <a className="darkTextLink" href={designLink} target="_blank" rel="noopener">Build your door <Arrow /></a>
          </div>
          <div className="garagaRunwayGrid">
            {[
              { label: "Modern", name: "Vantage", image: "/catalog/garaga/vantage.webp", href: "#collection-vantage" },
              { label: "Carriage", name: "Princeton", image: "/catalog/garaga/princeton.webp", href: "#collection-princeton" },
              { label: "Full-view", name: "California", image: "/catalog/garaga/california.webp", href: "#collection-california" },
              { label: "Traditional", name: "Village", image: "/catalog/garaga/village-collection.webp", href: "#collection-village-collection" },
            ].map((direction, index) => (
              <a href={direction.href} key={direction.label}>
                <img src={direction.image} alt={`${direction.name} garage door`} loading="lazy" />
                <span>{String(index + 1).padStart(2, "0")} / {direction.label}</span>
                <strong>{direction.name}</strong>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="collectionsSection" id="collections">
        <div className="collectionsHeader">
          <p className="interiorEyebrow"><span />{String(collections.length).padStart(2, "0")} featured collections</p>
          <h2>Start with what looks right.</h2>
          <p>Every available image from the current LIFTX collection library is included here. Use the arrows on each card to compare the complete set.</p>
        </div>
        <div className="collectionGrid">
          {collections.map((collection) => <CollectionCard key={collection.name} collection={collection} />)}
        </div>
      </section>

      {isClopay && (
        <section className="cpowerSection">
          <div className="cpowerCopy">
            <p className="interiorEyebrow"><span />C-Power™ technology</p>
            <h2>Clear when you want the view. Private when you do not.</h2>
            <p>Click-to-Conceal™ panels switch from transparent to opaque. LIFTX confirms the door, glass, power, controls, operator, and site requirements as one system.</p>
            <div className="cpowerButtons" role="group" aria-label="Choose C-Power glass state">
              <button type="button" aria-pressed={cpowerState === "clear"} onClick={() => setCpowerState("clear")}>Clear</button>
              <button type="button" aria-pressed={cpowerState === "private"} onClick={() => setCpowerState("private")}>Private</button>
            </div>
            <a href="https://www.clopaydoor.com/c-power-technology" target="_blank" rel="noopener">C-Power details <Arrow /></a>
          </div>
          <div className="cpowerVisual">
            <img
              src={cpowerState === "clear" ? "/catalog/clopay/c-power-clear.webp" : "/catalog/clopay/c-power-private.webp"}
              alt={`Clopay C-Power glass in its ${cpowerState} state`}
            />
            <span>{cpowerState.toUpperCase()} STATE</span>
          </div>
        </section>
      )}

      <PageCta
        title="Found the collection? Send it to LIFTX."
        copy="A saved door-builder design, collection name, screenshot, or inspiration photo is enough to start."
        label="Request an estimate"
      />
    </>
  );
}

function BrandsPage() {
  return (
    <>
      <BrandJourney />
      <PageCta title="Found a design? Send it to LIFTX." copy="We will verify the exact product, options, measurements, installation requirements, and current availability." label="Send your design" />
    </>
  );
}

function WayneDaltonPage() {
  return (
    <>
      <section className="simpleBrandHero">
        <img src="/brands/wayne-dalton.png" alt="Wayne Dalton" />
        <p className="interiorEyebrow"><span />LIFTX dealer brand</p>
        <h1>Explore Wayne Dalton with LIFTX.</h1>
        <p>Start with the Wayne Dalton design center, then let LIFTX confirm construction, insulation, windows, glass, finish, track, hardware, operator, warranty, lead time, and installation requirements.</p>
        <div className="interiorHeroActions">
          <a className="primaryButton" href="https://www.wayne-dalton.com/garage-door-design-center" target="_blank" rel="noopener">Open door builder <Arrow /></a>
          <a className="darkTextLink" href="/contact">Request a quote <ArrowIcon direction="right" /></a>
        </div>
      </section>
      <section className="interiorOverview">
        <div className="interiorSectionHeader"><p className="interiorEyebrow"><span />Product guidance</p><h2>Choose the appearance and construction together.</h2><p>The right product depends on more than the panel design. LIFTX helps compare the whole system before the order is released.</p></div>
        <div className="interiorCards">
          <article><span>01</span><h3>Design + appearance</h3><p>Panel design, color, windows, glass, overlays, hardware, and architectural fit.</p></article>
          <article><span>02</span><h3>Construction + performance</h3><p>Materials, insulation, section construction, weather exposure, durability, and warranty.</p></article>
          <article><span>03</span><h3>Installation + operation</h3><p>Track, hardware, counterbalance, operator, controls, framing, clearance, power, and access.</p></article>
        </div>
      </section>
      <PageCta title="Send the design or product reference." copy="LIFTX will confirm the available model, options, measurements, and installation requirements." label="Ask about Wayne Dalton" />
    </>
  );
}

function ProjectsPage() {
  const filters = ["All", "Residential", "Commercial", "Behind the build", "Service"];
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const visible = filter === "All" ? projectMedia : projectMedia.filter((item) => item.type === filter);

  return (
    <>
      <section className="projectsHero">
        <p className="interiorEyebrow"><span />Field archive</p>
        <h1>Real work.<br />No stock filler.</h1>
        <p>Finished systems, repairs, failures, jobsite details, and the work between them—every photo and video from the current LIFTX project library.</p>
      </section>
      <section className="projectsArchive">
        <div className="projectsFilters" role="tablist" aria-label="Filter project archive">
          {filters.map((item) => (
            <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)}>
              {item}<span>{String(item === "All" ? projectMedia.length : projectMedia.filter((media) => media.type === item).length).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div className="projectsGrid">
          <button className="projectVideo" type="button" onClick={() => setSelected(-1)}>
            <video src="/gallery/amarr-northwoods-onyx-finished-01.mp4" poster="/gallery/amarr-northwoods-onyx-finished-01-poster.webp" autoPlay muted loop playsInline />
            <span><b>VIDEO</b> Northwoods Onyx in motion</span>
          </button>
          {visible.map((item, index) => (
            <button key={`${item.src}-${index}`} type="button" onClick={() => setSelected(index)}>
              <img src={item.src} alt={`${item.title} by LIFTX`} loading="lazy" />
              <span><b>{item.type}</b>{item.title}</span>
            </button>
          ))}
        </div>
      </section>
      <PageCta title="Have an opening like one of these?" copy="Send the project image, your opening, and what you want the system to do." />
      {selected !== null && (
        <div className="projectLightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <button type="button" onClick={() => setSelected(null)}>CLOSE ×</button>
          {selected === -1 ? (
            <video src="/gallery/amarr-northwoods-onyx-finished-01.mp4" controls autoPlay playsInline onClick={(event) => event.stopPropagation()} />
          ) : (
            <img src={visible[selected]?.src} alt={visible[selected]?.title ?? "LIFTX project"} onClick={(event) => event.stopPropagation()} />
          )}
        </div>
      )}
    </>
  );
}

function FaqPage() {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return faqGroups.map((group) => ({
      ...group,
      items: normalized
        ? group.items.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(normalized))
        : group.items,
    })).filter((group) => group.items.length);
  }, [query]);

  return (
    <>
      <section className="faqHero">
        <p className="interiorEyebrow"><span />Straight answers · no pressure</p>
        <h1>Common questions.</h1>
        <p>Clear answers about repair, safety, new doors, design, pricing, deposits, warranties, operators, and recommendations.</p>
        <label className="faqSearch">
          <span>Search the answers</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “spring,” “deposit,” or “warranty”" />
        </label>
      </section>
      <section className="faqContent">
        {matches.length ? matches.map((group) => (
          <div className="faqGroup" key={group.title}>
            <h2>{group.title}</h2>
            <div>
              {group.items.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span>+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        )) : <p className="noFaqResults">No exact match. Text or call LIFTX and ask directly.</p>}
      </section>
      <PageCta title="Still unsure? Send us what you’re seeing." copy="Photos or a short video can help narrow down the issue and prepare the right parts." label="Ask LIFTX" />
    </>
  );
}

function ContactPage() {
  const [status, setStatus] = useState<{ type: "" | "success" | "error"; message: string }>({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setSending(true);
    setStatus({ type: "", message: "" });
    try {
      const response = await fetch("https://formspree.io/f/mgogpvwg", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus({ type: "success", message: "Request sent. LIFTX will review it and follow up as soon as possible." });
    } catch {
      setStatus({ type: "error", message: "The request could not be sent. Please try again, call, or text LIFTX." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contactPage">
      <div className="contactIntro">
        <p className="interiorEyebrow"><span />Contact LIFTX</p>
        <h1>Tell us what you need.</h1>
        <p>Photos, video, opening sizes, plans, and project requirements help us understand the job before recommending the next step.</p>
        <div className="contactActions">
          <a className="primaryButton" href="tel:+12089954321">Call LIFTX <Arrow /></a>
          <a className="contactOutline" href="sms:+12089954321">Text photos <ArrowIcon direction="right" /></a>
        </div>
        <div className="contactDirect">
          <div><span>Phone</span><a href="tel:+12089954321">208-995-4321</a></div>
          <div><span>Email</span><a href="mailto:josh@liftxdoor.com">josh@liftxdoor.com</a></div>
          <div><span>Service area</span><p>Boise · Treasure Valley · Valley County</p></div>
        </div>
      </div>

      <div className="contactFormCard">
        <div className="contactFormHead">
          <p className="interiorEyebrow"><span />Project details</p>
          <h2>Send a request.</h2>
          <p>Tell us what is happening, where the project is located, and the best way to reach you.</p>
        </div>
        <form onSubmit={submitForm}>
          <input type="hidden" name="subject" value="New LIFTX Website Inquiry" />
          <label className="formHoneypot">Leave this field empty<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
          <div className="contactFormGrid">
            <label>Name<input type="text" name="name" autoComplete="name" required /></label>
            <label>Phone<input type="tel" name="phone" autoComplete="tel" required /></label>
            <label>Email<input type="email" name="email" autoComplete="email" /></label>
            <label>City<input type="text" name="city" autoComplete="address-level2" /></label>
            <label>Client type<select name="customer_type"><option>Homeowner</option><option>Business / Commercial</option><option>Builder / Contractor</option><option>Property Manager</option></select></label>
            <label>Service needed<select name="service"><option>Repair</option><option>New Door / Replacement</option><option>Full-View Door</option><option>Commercial Door</option><option>Builder / New Construction</option><option>Operator / Opener</option><option>Maintenance</option><option>Other</option></select></label>
            <label className="full">Message<textarea name="message" required /></label>
            {status.message && <p className={`formStatus ${status.type}`}>{status.message}</p>}
            <button className="primaryButton formSubmit" type="submit" disabled={sending}>{sending ? "Sending…" : "Send request"}<Arrow /></button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function InteriorPage({ slug }: { slug: string }) {
  let content: React.ReactNode;
  if (slug === "full-view-garage-doors-treasure-valley") content = <FullViewPage />;
  else if (interiorPages[slug]) content = <GenericPage slug={slug} />;
  else if (slug === "amarr-garage-doors-boise") content = <ManufacturerPage brand="amarr" />;
  else if (slug === "clopay-garage-doors-boise") content = <ManufacturerPage brand="clopay" />;
  else if (slug === "garaga-garage-doors-boise") content = <ManufacturerPage brand="garaga" />;
  else if (slug === "wayne-dalton-garage-doors-boise") content = <WayneDaltonPage />;
  else if (slug === "garage-door-brands") content = <BrandsPage />;
  else if (slug === "projects") content = <ProjectsPage />;
  else if (slug === "common-questions") content = <FaqPage />;
  else if (slug === "contact") content = <ContactPage />;
  else content = <GenericPage slug="residential" />;

  return <SiteChrome><main className="interiorMain">{content}</main></SiteChrome>;
}
