"use client";

import { useEffect, useState } from "react";
import { ArrowIcon } from "./UiIcons";

type Review = {
  author: string;
  date: string;
  rating: number;
  text: string;
};

type ReviewFeed = {
  configured: boolean;
  mapsUrl?: string;
  rating?: number;
  reviewCount?: number;
  reviews: Review[];
};

function Stars({ rating = 5 }: { rating?: number }) {
  return <span className="googleReviewStars" aria-label={`${rating} out of 5 stars`}>{"★★★★★"}</span>;
}

function GoogleLogo() {
  return (
    <svg className="googleLogo" viewBox="0 0 18 18" role="img" aria-label="Google">
      <path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.797 2.715v2.258h2.909c1.702-1.567 2.684-3.875 2.684-6.614Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.181l-2.909-2.258c-.806.54-1.835.859-3.047.859-2.344 0-4.328-1.585-5.036-3.715H.957v2.332A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.964 10.705A5.41 5.41 0 0 1 3.682 9c0-.592.102-1.168.282-1.705V4.963H.957A9 9 0 0 0 0 9c0 1.452.347 2.827.957 4.037l3.007-2.332Z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.507.454 3.441 1.346l2.582-2.582C13.463.891 11.426 0 9 0A9 9 0 0 0 .957 4.963l3.007 2.332C4.672 5.165 6.656 3.58 9 3.58Z" />
    </svg>
  );
}

export default function GoogleReviews({ placement = "interior" }: { placement?: "home" | "interior" }) {
  const [feed, setFeed] = useState<ReviewFeed>({ configured: false, reviews: [] });

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/google-reviews", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((data: ReviewFeed | null) => data && setFeed(data))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const hasReviews = feed.reviews.length > 0;

  return (
    <section id="google-reviews" className={`googleReviews googleReviews-${placement}`} aria-label="LIFTX Google reviews">
      <div className="googleReviewsSummary">
        <span className="googleMark"><GoogleLogo /></span>
        <div>
          <p>Google reviews</p>
          {feed.rating ? (
            <div className="googleRatingLine">
              <strong>{feed.rating.toFixed(1)}</strong>
              <Stars rating={feed.rating} />
              {feed.reviewCount ? <span>{feed.reviewCount} verified reviews</span> : null}
            </div>
          ) : (
            <div className="googleRatingLine googleRatingPending">
              <span>LiftX Door Systems · Google Business Profile</span>
            </div>
          )}
        </div>
        <a
          href="https://share.google/tVgk2hRaH6mbMb7kX"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read LIFTX reviews on Google"
        >
          {hasReviews ? "Read Google reviews" : "Google reviews"} <ArrowIcon direction="right" />
        </a>
      </div>

      {hasReviews && (
        <div className="googleReviewRail" aria-label="Recent Google reviews">
          {feed.reviews.slice(0, 3).map((review, index) => (
            <article className="googleReviewCard" key={`${review.author}-${index}`}>
              <div><Stars rating={review.rating} /><span>{review.date}</span></div>
              <blockquote>“{review.text}”</blockquote>
              <strong>{review.author}</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
