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

const googleSearchUrl = "https://www.google.com/maps/search/?api=1&query=LIFTX+Garage+Doors+Boise+Idaho";

function Stars({ rating = 5 }: { rating?: number }) {
  return <span className="googleReviewStars" aria-label={`${rating} out of 5 stars`}>{"★★★★★"}</span>;
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

  const mapsUrl = feed.mapsUrl || googleSearchUrl;
  const hasReviews = feed.reviews.length > 0;

  return (
    <section className={`googleReviews googleReviews-${placement}`} aria-label="LIFTX Google reviews">
      <div className="googleReviewsSummary">
        <span className="googleMark" aria-hidden="true">G</span>
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
              <Stars />
              <span>See what customers say about LIFTX</span>
            </div>
          )}
        </div>
        <a href={mapsUrl} target="_blank" rel="noreferrer">
          {hasReviews ? "See all reviews" : "View on Google"} <ArrowIcon direction="up-right" />
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
