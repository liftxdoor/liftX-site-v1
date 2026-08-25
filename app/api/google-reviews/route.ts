import { NextResponse } from "next/server";

export const runtime = "edge";

type GoogleReview = {
  authorAttribution?: { displayName?: string };
  publishTime?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
};

type GooglePlace = {
  displayName?: { text?: string };
  googleMapsUri?: string;
  rating?: number;
  reviews?: GoogleReview[];
  userRatingCount?: number;
};

const fieldMask = [
  "displayName",
  "googleMapsUri",
  "rating",
  "reviews.authorAttribution",
  "reviews.publishTime",
  "reviews.rating",
  "reviews.relativePublishTimeDescription",
  "reviews.text",
  "userRatingCount",
].join(",");

const fallbackMapsUrl = "https://share.google/tVgk2hRaH6mbMb7kX";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const directMapsUrl = placeId
    ? `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`
    : undefined;

  if (!placeId) {
    return NextResponse.json(
      { configured: false, mapsUrl: fallbackMapsUrl, reviews: [] },
      { headers: { "Cache-Control": "public, max-age=300" } },
    );
  }

  // A Place ID is enough to create an exact business-profile destination.
  // Keep the CTA useful even before the Places API key is configured.
  if (!apiKey) {
    return NextResponse.json(
      { configured: false, mapsUrl: directMapsUrl, reviews: [] },
      { headers: { "Cache-Control": "public, max-age=300" } },
    );
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": fieldMask,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { configured: true, mapsUrl: directMapsUrl, reviews: [], unavailable: true },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const place = (await response.json()) as GooglePlace;
    const reviews = (place.reviews ?? []).slice(0, 5).map((review) => ({
      author: review.authorAttribution?.displayName ?? "Google customer",
      date: review.relativePublishTimeDescription ?? review.publishTime ?? "",
      rating: review.rating ?? 5,
      text: review.text?.text ?? "",
    }));

    return NextResponse.json(
      {
        configured: true,
        mapsUrl: place.googleMapsUri ?? directMapsUrl,
        name: place.displayName?.text ?? "LiftX Door Systems",
        rating: place.rating,
        reviewCount: place.userRatingCount,
        reviews,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { configured: true, mapsUrl: directMapsUrl, reviews: [], unavailable: true },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
