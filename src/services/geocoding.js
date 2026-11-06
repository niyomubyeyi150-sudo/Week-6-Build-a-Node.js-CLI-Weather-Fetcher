// 1. Open-Meteo Geocoding API URL.
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

// 2. Create a function to search for a city's coordinates.
export async function getCoordinates(city) {
  // 3. Validate the city name.
  if (!city || !city.trim()) {
    throw new Error("Please provide a valid city name.");
  }

  // 4. Build the API URL.
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(city.trim())}&count=1&language=en&format=json`;

  let response;

  // 5. Send the request and handle connection errors.
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

  // 6. Check whether the API request was successful.
  if (!response.ok) {
    throw new Error("The geocoding service is temporarily unavailable.");
  }

  // 7. Convert the API response into JavaScript data.
  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Unable to process the geocoding service response. Please try again later.",
    );
  }

  // 8. Check whether the requested city was found.
  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${city}" was not found. Please check the spelling.`);
  }

  // 9. Get the first matching city.
  const location = data.results[0];

  // 10. Return the location information.
  return {
    name: location.name,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
  };
}
