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
  googleMapsLinks?: { reviewsUri?: string };
  googleMapsUri?: string;
  rating?: number;
  reviews?: GoogleReview[];
  userRatingCount?: number;
};

const fieldMask = [
  "displayName",
  "googleMapsLinks.reviewsUri",
  "googleMapsUri",
  "rating",
  "reviews.authorAttribution",
  "reviews.publishTime",
  "reviews.rating",
  "reviews.relativePublishTimeDescription",
  "reviews.text",
  "userRatingCount",
].join(",");

const expectedPlaceName = "liftx door systems";

function exactGoogleMapsUrl(placeId: string) {
  const query = encodeURIComponent("LIFTX Door Systems, Eagle, Idaho");
  return `https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=${encodeURIComponent(placeId)}`;
}

function isExpectedPlace(displayName?: string) {
  return displayName?.trim().toLowerCase() === expectedPlaceName;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!placeId) {
    return NextResponse.json(
      { configured: false, reviews: [] },
      { headers: { "Cache-Control": "public, max-age=300" } },
    );
  }

  const fallbackMapsUrl = exactGoogleMapsUrl(placeId);

  if (!apiKey) {
    return NextResponse.json(
      { configured: false, mapsUrl: fallbackMapsUrl, reviews: [] },
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
        { configured: true, mapsUrl: fallbackMapsUrl, reviews: [], unavailable: true },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const place = (await response.json()) as GooglePlace;
    const placeName = place.displayName?.text;

    if (!isExpectedPlace(placeName)) {
      return NextResponse.json(
        { configured: true, reviews: [], unavailable: true, configurationError: "place_id_mismatch" },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const reviews = (place.reviews ?? []).slice(0, 5).map((review) => ({
      author: review.authorAttribution?.displayName ?? "Google customer",
      date: review.relativePublishTimeDescription ?? review.publishTime ?? "",
      rating: review.rating ?? 5,
      text: review.text?.text ?? "",
    }));

    return NextResponse.json(
      {
        configured: true,
        mapsUrl: place.googleMapsLinks?.reviewsUri ?? place.googleMapsUri ?? fallbackMapsUrl,
        name: placeName,
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
      { configured: true, mapsUrl: fallbackMapsUrl, reviews: [], unavailable: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
