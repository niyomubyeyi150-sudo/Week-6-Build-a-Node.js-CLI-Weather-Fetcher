const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(latitude, longitude) {
 
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error("Invalid location coordinates.");
  }

  const url = `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;

  let response;

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

  if (!response.ok) {
    throw new Error("The weather service is temporarily unavailable.");
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Unable to process the weather service response. Please try again later.",
    );
  }

  if (!data.current) {
    throw new Error("Current weather information is unavailable.");
  }

  return data.current;
}
