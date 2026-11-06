import { getCoordinates } from "../services/geocoding.js";
import { getWeather } from "../services/weather.js";

export async function showWeather(city) {
  const location = await getCoordinates(city);

  const weather = await getWeather(location.latitude, location.longitude);

  console.log(`\nWeather in ${location.name}, ${location.country}`);
  console.log(`Temperature: ${weather.temperature_2m}°C`);
  console.log(`Feels like: ${weather.apparent_temperature}°C`);
  console.log(`Humidity: ${weather.relative_humidity_2m}%`);
  console.log(`Wind speed: ${weather.wind_speed_10m} km/h`);
  console.log(`Precipitation: ${weather.precipitation} mm`);
}
