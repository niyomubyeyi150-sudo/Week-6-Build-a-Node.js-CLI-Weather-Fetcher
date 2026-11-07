import { getCoordinates } from "../services/geocoding.js";
import { getWeather } from "../services/weather.js";
import { readJSON, writeJSON } from "../storage/storage.js";

export async function showWeather(city) {
  const location = await getCoordinates(city);
  const weather = await getWeather(location.latitude, location.longitude);
  const localTime = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: weather.timezone,
  }).format(new Date());

  console.log(`\nWeather in ${location.name}, ${location.country}`);
  console.log(`Local time: ${localTime}`);
  console.log(`Timezone: ${weather.timezone}`);
  console.log("------------------------------");

  console.log(`Temperature: ${weather.temperature_2m}°C`);
  console.log(`Feels like: ${weather.apparent_temperature}°C`);
  console.log(`Humidity: ${weather.relative_humidity_2m}%`);
  console.log(`Wind speed: ${weather.wind_speed_10m} km/h`);
  console.log(`Precipitation: ${weather.precipitation} mm`);
  console.log("------------------------------");

  const history = await readJSON("history.json", []);
  const searchRecord = {
    city: location.name,
    country: location.country,
    temperature: weather.temperature_2m,
    searchedAt: localTime,
    timezone: weather.timezone,
  };

  history.push(searchRecord);

  await writeJSON("history.json", history);

  console.log("Weather search saved to history.");
}

export async function listHistory() {
  const history = await readJSON("history.json", []);

  if (history.length === 0) {
    console.log("You have no weather search history yet.");
    return;
  }

  console.log("\nWeather Search History:");

  history.forEach((record, index) => {
    console.log(`\n${index + 1}. ${record.city}, ${record.country}`);
    console.log(`   Temperature: ${record.temperature}°C`);
    console.log(`   Searched at: ${record.searchedAt}`);

    if (record.timezone) {
      console.log(`   Timezone: ${record.timezone}`);
    }
  });
}
