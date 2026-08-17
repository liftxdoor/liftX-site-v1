/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
"use client";

import { useState } from "react";
import { TextChase } from "./ConversionCta";
import { brandNavigation, primaryNavigation } from "./site-data";
import { ArrowIcon, ChevronDownIcon } from "./UiIcons";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  return (
    <>
      <header className="fullHeader">
        <a className="fullBrand" href="/" aria-label="LIFTX home">
          <img src="/images/liftx-wordmark.png" alt="LIFTX" />
        </a>

        <nav className="fullDesktopNav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
          <div
            className={`brandsDropdown ${brandsOpen ? "isOpen" : ""}`}
            onMouseEnter={() => setBrandsOpen(true)}
            onMouseLeave={() => setBrandsOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={brandsOpen}
              onClick={() => setBrandsOpen((open) => !open)}
            >
              Brands <ChevronDownIcon />
            </button>
            <div className="brandsDropdownPanel">
              {brandNavigation.map((item, index) => (
                <a key={item.href} className={index === 0 ? "featured" : ""} href={item.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
                </a>
              ))}
            </div>
          </div>
          <a href="/common-questions">FAQ</a>
        </nav>

        <a className="headerCta fullHeaderCta" href="/contact">
          Start a project <ArrowIcon direction="up-right" />
        </a>

        <button
          className="fullMenuTrigger"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <img src="/images/liftx-mark.png" alt="" aria-hidden="true" />
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
        </button>
      </header>

      <div className={`fullMobileMenu ${menuOpen ? "isOpen" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {[...primaryNavigation, { label: "Brands + design tools", href: "/garage-door-brands" }, { label: "FAQ", href: "/common-questions" }, { label: "Builders + contractors", href: "/builders-contractors" }, { label: "Warranty", href: "/warranty" }, { label: "Contact", href: "/contact" }].map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
            </a>
          ))}
        </nav>
        <div className="fullMobileFooter">
          <p>Boise · Treasure Valley · Valley County</p>
          <a href="tel:+12089954321">208-995-4321</a>
        </div>
      </div>

      {children}

      <footer className="fullFooter">
        <div className="fullFooterTop">
          <div className="fullFooterBrand">
            <img src="/images/liftx-wordmark.png" alt="LIFTX" />
            <p>Residential, commercial, specialty, and premium Full-View overhead door systems across Boise and the Treasure Valley.</p>
          </div>
          <div className="fullFooterLinks">
            <div>
              <span>Services</span>
              <a href="/residential">Residential</a>
              <a href="/commercial">Commercial</a>
              <a href="/full-view-garage-doors-treasure-valley">Full-View experts</a>
              <a href="/garage-door-repair-boise">Repair</a>
              <a href="/garage-door-installation-boise">New doors</a>
              <a href="/garage-door-openers-boise">Openers</a>
            </div>
            <div>
              <span>Company</span>
              <a href="/projects">Projects</a>
              <a href="/builders-contractors">Builders</a>
              <a href="/warranty">Warranty</a>
              <a href="/common-questions">FAQ</a>
              <a href="/contact">Contact</a>
            </div>
            <div>
              <span>Brands</span>
              <a href="/amarr-garage-doors-boise">Amarr</a>
              <a href="/clopay-garage-doors-boise">Clopay</a>
              <a href="/wayne-dalton-garage-doors-boise">Wayne Dalton</a>
              <a href="/garaga-garage-doors-boise">Garaga</a>
              <a href="/garage-door-brands">All brands + builders</a>
            </div>
          </div>
        </div>
        <div className="fullFooterBottom">
          <span>© 2026 LIFTX</span>
          <span>Idaho GC License #1971051</span>
          <a href="tel:+12089954321">208-995-4321</a>
        </div>
      </footer>

      <TextChase />

      <div className="mobileQuickBar">
        <a href="tel:+12089954321">Call</a>
        <a href="sms:+12089954321">Text</a>
        <a href="/contact">Request</a>
      </div>
    </>
  );
}
