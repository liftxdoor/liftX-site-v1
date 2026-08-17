"use client";

import { useEffect, useState } from "react";
import { brandResources } from "./site-data";
import { ArrowIcon, ChevronDownIcon } from "./UiIcons";

const featuredBrands = [
  {
    name: "Amarr",
    slug: "amarr",
    image: "/gallery/amarr-northwoods-onyx-finished-04.webp",
    imageAlt: "Black Amarr Northwoods garage door installed by LIFTX",
    identityTreatment: false,
    statement: "Design range without losing sight of the complete system.",
    detail: "Traditional, carriage, plank, insulated, commercial, and Full-View collections give us a strong starting point for nearly any opening.",
    notes: ["Northwoods + Vista", "Residential + commercial", "LIFTX dealer brand"],
  },
  {
    name: "Clopay",
    slug: "clopay",
    image: "/catalog/clopay/avante.webp",
    imageAlt: "Clopay Avante aluminum and glass garage door",
    identityTreatment: false,
    statement: "A deep catalog and a visualizer built for exploration.",
    detail: "Compare classic steel, composite carriage, modern plank, Avante, VertiStack, and specialty systems before LIFTX verifies the build.",
    notes: ["Avante + VertiStack", "Steel + composite", "LIFTX dealer brand"],
  },
  {
    name: "Wayne Dalton",
    slug: "wayne-dalton",
    image: "/brands/wayne-dalton.png",
    imageAlt: "Wayne Dalton logo",
    identityTreatment: true,
    statement: "Distinct options for residential, commercial, and specialty work.",
    detail: "We help match the design center result to the right construction, glass, track, operator, and opening conditions.",
    notes: ["Modern + traditional", "Commercial options", "LIFTX dealer brand"],
  },
  {
    name: "Garaga",
    slug: "garaga",
    image: "/catalog/garaga/california.webp",
    imageAlt: "Garaga California aluminum and glass garage door",
    identityTreatment: false,
    statement: "Design-forward collections with practical construction choices.",
    detail: "Explore California Full-View, carriage-house overlays, modern steel, and insulated systems—then let LIFTX resolve the details.",
    notes: ["California Full-View", "Carriage + modern", "Manufacturer collections"],
  },
];

export default function BrandJourney() {
  const [activeBrand, setActiveBrand] = useState(featuredBrands[0].slug);

  useEffect(() => {
    const sections = featuredBrands
      .map((brand) => document.getElementById(`brand-${brand.slug}`))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveBrand(visible.target.id.replace("brand-", ""));
      },
      { rootMargin: "-18% 0px -58%", threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const activeIndex = Math.max(0, featuredBrands.findIndex((brand) => brand.slug === activeBrand));

  return (
    <>
      <section className="brandJourneyHero" aria-labelledby="brand-journey-title">
        <div className="brandJourneyHeroCopy">
          <p className="interiorEyebrow"><span />Brands + design tools</p>
          <h1 id="brand-journey-title">Find the look.<br />Build the right system.</h1>
          <p>Move through four core door brands, compare their strengths, and use the manufacturer tools to narrow your direction. LIFTX verifies what belongs in the opening.</p>
          <a className="brandScrollCue" href="#brand-amarr">
            <span><small>Start the guide</small><strong>Meet the four door brands</strong></span>
            <ChevronDownIcon />
          </a>
        </div>
        <div className="brandJourneyHeroMosaic" aria-label="Preview of LIFTX brand collections">
          {featuredBrands.map((brand, index) => (
            <a
              className={brand.identityTreatment ? "brandIdentityTile" : undefined}
              key={brand.slug}
              href={`#brand-${brand.slug}`}
            >
              <img src={brand.image} alt="" />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{brand.name}</strong>
            </a>
          ))}
        </div>
      </section>

      <nav className="brandJourneyNav" aria-label="Jump to a garage door brand">
        <div className="brandJourneyProgress" aria-hidden="true">
          <span style={{ width: `${((activeIndex + 1) / featuredBrands.length) * 100}%` }} />
        </div>
        <span className="brandJourneyNavLabel">Brand guide</span>
        <div className="brandJourneyNavLinks">
          {featuredBrands.map((brand, index) => (
            <a
              key={brand.slug}
              href={`#brand-${brand.slug}`}
              aria-current={activeBrand === brand.slug ? "true" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {brand.name}
            </a>
          ))}
        </div>
        <span className="brandJourneyCount">{String(activeIndex + 1).padStart(2, "0")} / 04</span>
      </nav>

      <section className="brandChapters" aria-label="Featured garage door brands">
        {featuredBrands.map((brand, index) => {
          const resource = brandResources.find((item) => item.name === brand.name);
          const nextBrand = featuredBrands[index + 1];

          if (!resource) return null;

          return (
            <article
              className={`brandChapter${index % 2 === 1 ? " brandChapterReverse" : ""}`}
              id={`brand-${brand.slug}`}
              data-brand-chapter
              key={brand.slug}
            >
              <div className={`brandChapterMedia${brand.identityTreatment ? " brandChapterIdentityMedia" : ""}`}>
                <img src={brand.image} alt={brand.imageAlt} />
                <span>0{index + 1} · {brand.name}</span>
              </div>
              <div className="brandChapterBody">
                <div className="brandChapterTopline">
                  <span>0{index + 1}</span>
                  <small>{resource.label}</small>
                </div>
                <div className="brandChapterLogo">
                  {resource.logo ? <img src={resource.logo} alt={`${brand.name} logo`} /> : <strong>{brand.name}</strong>}
                </div>
                <h2>{brand.statement}</h2>
                <p>{brand.detail}</p>
                <ul>
                  {brand.notes.map((note) => <li key={note}>{note}</li>)}
                </ul>
                <div className="brandChapterActions">
                  <a className="primaryButton" href={resource.page}>View {brand.name} collections <ArrowIcon direction="right" /></a>
                  <a className="brandBuilderLink" href={resource.builder} target="_blank" rel="noopener">
                    Open design tool <ArrowIcon direction="up-right" />
                  </a>
                </div>
                {nextBrand ? (
                  <a className="brandNextCue" href={`#brand-${nextBrand.slug}`}>
                    <span><small>Continue the guide</small><strong>Next: {nextBrand.name}</strong></span>
                    <ChevronDownIcon />
                  </a>
                ) : (
                  <a className="brandNextCue" href="#more-brand-resources">
                    <span><small>One more stop</small><strong>Additional systems + resources</strong></span>
                    <ChevronDownIcon />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="additionalBrands" id="more-brand-resources">
        <div className="additionalBrandsIntro">
          <p className="interiorEyebrow"><span />More system resources</p>
          <h2>The right answer may live outside the four-brand guide.</h2>
          <p>Hörmann, Haas Door, and LiftMaster extend the conversation into high-performance doors, additional design choices, operators, controls, and access.</p>
        </div>
        <div className="additionalBrandGrid">
          {brandResources.filter((brand) => !featuredBrands.some((featured) => featured.name === brand.name)).map((brand) => (
            <article key={brand.name}>
              <small>{brand.label}</small>
              <div>
                {brand.logo ? <img src={brand.logo} alt={`${brand.name} logo`} /> : <h3>{brand.name}</h3>}
              </div>
              <p>{brand.description}</p>
              <a
                href={brand.page}
                target={brand.page.startsWith("http") ? "_blank" : undefined}
                rel={brand.page.startsWith("http") ? "noopener" : undefined}
              >
                View resource <ArrowIcon direction={brand.page.startsWith("http") ? "up-right" : "right"} />
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
