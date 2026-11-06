const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function getCoordinates(city) {

  if (!city || !city.trim()) {
    throw new Error("Please provide a valid city name.");
  }

  const url = `${GEOCODING_URL}?name=${encodeURIComponent(city.trim())}&count=1&language=en&format=json`;

  let response;

  try {
    response = await fetch(url, {
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    if (error.name === "TimeoutError") {
      throw new Error("The geocoding request timed out. Please try again.");
    }

    throw new Error(
      "Unable to connect. Please check your internet connection.",
    );
  }

  if (!response.ok) {
    throw new Error("The geocoding service is temporarily unavailable.");
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Unable to process the geocoding service response. Please try again later.",
    );
  }

  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${city}" was not found. Please check the spelling.`);
  }

  const location = data.results[0];
  return {
    name: location.name,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
  };
}
