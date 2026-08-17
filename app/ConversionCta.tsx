import type { ReactNode } from "react";
import { ArrowIcon, MessageIcon } from "./UiIcons";

type DedicatedCtaProps = {
  copy?: string;
  eyebrow?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  title?: ReactNode;
};

export function DedicatedCta({
  copy = "Send a photo of the door or opening, your city, and what it is doing. LIFTX will reply with a practical path forward.",
  eyebrow = "Straight answers. Solid work.",
  secondaryHref = "/projects",
  secondaryLabel = "View projects",
  title = <>Text us the opening.<br />Get the right next step.</>,
}: DedicatedCtaProps = {}) {
  return (
    <section className="dedicatedCta" aria-labelledby="dedicated-cta-heading">
      <div className="dedicatedCtaLead">
        <p><span />{eyebrow}</p>
        <h2 id="dedicated-cta-heading">{title}</h2>
      </div>
      <div className="dedicatedCtaAction">
        <p>{copy}</p>
        <div>
          <a className="dedicatedCtaPrimary" href="sms:+12089954321">
            <MessageIcon />
            <span>Text photos for service</span>
            <ArrowIcon direction="up-right" />
          </a>
          <a className="dedicatedCtaSecondary" href={secondaryHref}>
            {secondaryLabel}
            <ArrowIcon direction="right" />
          </a>
        </div>
        <small>Direct to LIFTX · 208-995-4321</small>
      </div>
    </section>
  );
}

export function TextChase({ withDesktopRail = false }: { withDesktopRail?: boolean } = {}) {
  return (
    <aside className={`textChase${withDesktopRail ? " textChaseWithDesktopRail" : ""}`} aria-label="Text LIFTX">
      <span className="textChasePrompt">Need help with a door?</span>
      <a className="textChaseLink" href="sms:+12089954321" aria-label="Text LIFTX at 208-995-4321">
        <span className="textChaseIcon"><MessageIcon /></span>
        <span className="textChaseCopy"><small>DIRECT TO LIFTX</small><strong>Text us</strong></span>
        <ArrowIcon direction="up-right" />
      </a>
    </aside>
  );
}
