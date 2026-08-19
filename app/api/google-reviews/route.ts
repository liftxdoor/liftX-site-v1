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
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  googleMapsLinks?: { reviewsUri?: string };
  googleMapsUri?: string;
  rating?: number;
  reviews?: GoogleReview[];
  userRatingCount?: number;
};

type GoogleTextSearchResponse = {
  places?: GooglePlace[];
};

const detailsFieldMask = [
  "id",
  "displayName",
  "formattedAddress",
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
const placeSearchQuery = "LIFTX Door Systems Eagle Idaho";

function exactGoogleMapsUrl(placeId: string) {
  const query = encodeURIComponent("LIFTX Door Systems, Eagle, Idaho");
  return `https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=${encodeURIComponent(placeId)}`;
}

function isExpectedPlace(displayName?: string) {
  return displayName?.trim().toLowerCase() === expectedPlaceName;
}

async function discoverPlaceId(apiKey: string) {
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({
      textQuery: placeSearchQuery,
      includePureServiceAreaBusinesses: true,
      pageSize: 5,
    }),
  });

  if (!response.ok) return null;

  const result = (await response.json()) as GoogleTextSearchResponse;
  const exactMatch = (result.places ?? []).find((place) => isExpectedPlace(place.displayName?.text));
  return exactMatch?.id ?? null;
}

async function fetchPlaceDetails(apiKey: string, placeId: string) {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": detailsFieldMask,
      },
    },
  );

  if (!response.ok) return null;
  return (await response.json()) as GooglePlace;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        configured: false,
        reviews: [],
        configurationError: "missing_api_key",
      },
      { headers: { "Cache-Control": "public, max-age=300" } },
    );
  }

  try {
    const configuredPlaceId = process.env.GOOGLE_PLACE_ID?.trim();
    const placeId = configuredPlaceId || (await discoverPlaceId(apiKey));

    if (!placeId) {
      return NextResponse.json(
        {
          configured: true,
          reviews: [],
          unavailable: true,
          configurationError: "place_not_found",
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const fallbackMapsUrl = exactGoogleMapsUrl(placeId);
    const place = await fetchPlaceDetails(apiKey, placeId);

    if (!place) {
      return NextResponse.json(
        {
          configured: true,
          mapsUrl: fallbackMapsUrl,
          reviews: [],
          unavailable: true,
          configurationError: "places_api_error",
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const placeName = place.displayName?.text;

    if (!isExpectedPlace(placeName)) {
      return NextResponse.json(
        {
          configured: true,
          reviews: [],
          unavailable: true,
          configurationError: "place_id_mismatch",
        },
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
        placeId,
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
      {
        configured: true,
        reviews: [],
        unavailable: true,
        configurationError: "unexpected_error",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
