"use client";

import { useEffect, useRef, useState } from "react";

export default function HomeFlipperReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / distance)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const afterOpacity = Math.min(1, Math.max(0, (progress - 0.2) / 0.6));
  const showingAfter = afterOpacity >= 0.5;

  return (
    <section ref={sectionRef} className="homeFlipperReveal" aria-label="Home flipper project transformation">
      <div className="homeFlipperSticky">
        <div className="homeFlipperCopy">
          <p className="interiorEyebrow"><span />Home flippers</p>
          <h2>One opening can change the whole property.</h2>
          <p>Fast field verification, practical product choices, and installation coordinated around the renovation schedule.</p>
          <div className="homeFlipperStatus" aria-live="polite">
            <span className={!showingAfter ? "active" : ""}>Before</span>
            <i aria-hidden="true"><b style={{ width: `${progress * 100}%` }} /></i>
            <span className={showingAfter ? "active" : ""}>After</span>
          </div>
        </div>

        <div className="homeFlipperStage">
          <figure className="homeFlipperFrame">
            <img
              className="homeFlipperBefore"
              src="/images/home-flipper-before.webp"
              alt="Damaged residential garage door before replacement"
            />
            <img
              className="homeFlipperAfter"
              src="/images/home-flipper-after.webp"
              alt="Finished full-view garage doors on a renovated home"
              style={{ opacity: afterOpacity }}
            />
            <figcaption className={showingAfter ? "after" : "before"}>
              {showingAfter ? "AFTER" : "BEFORE"}
            </figcaption>
          </figure>
          <p className="homeFlipperHint">Scroll to reveal</p>
        </div>
      </div>
    </section>
  );
}
