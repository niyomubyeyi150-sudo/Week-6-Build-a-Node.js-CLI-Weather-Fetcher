// 1. Open-Meteo Forecast API URL.
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

// 2. Create a function to retrieve weather information.
export async function getWeather(latitude, longitude) {
  // 3. Validate the location coordinates.
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error("Invalid location coordinates.");
  }

  // 4. Build the API URL.
  const url = `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;

  let response;

  // 5. Send the request and handle connection errors.
  try {
    response = await fetch(url, {
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    if (error.name === "TimeoutError") {
      throw new Error("The weather request timed out. Please try again.");
    }

    throw new Error(
      "Unable to connect to the weather service. Please check your internet connection.",
    );
  }

  // 6. Check whether the API request was successful.
  if (!response.ok) {
    throw new Error("The weather service is temporarily unavailable.");
  }

  // 7. Convert the API response into JavaScript data.
  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Unable to process the weather service response. Please try again later.",
    );
  }

  // 8. Check whether current weather information is available.
  if (!data.current) {
    throw new Error("Current weather information is unavailable.");
  }

  // 9. Return the current weather information.
  return data.current;
}
