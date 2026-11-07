import { readJSON, writeJSON } from "../storage/storage.js";
import { loadEnvFile } from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env");

loadEnvFile(envPath);

export const DEFAULT_SETTINGS = {
  defaultCity: process.env.DEFAULT_CITY || "Kigali",
  temperatureUnit: process.env.TEMPERATURE_UNIT || "celsius",
  windSpeedUnit: process.env.WIND_SPEED_UNIT || "kmh",
  timeFormat: "24-hour",
  language: "English",
  weatherDetails: "detailed",
};

export async function getSettings() {
  const savedSettings = await readJSON("settings.json", {});

  const settings = {
    ...DEFAULT_SETTINGS,
    ...savedSettings,
  };

  await writeJSON("settings.json", settings);

  return settings;
}

export async function showSettings() {
  const settings = await getSettings();

  console.log("\nIkirere Settings");
  console.log("------------------------------");
  console.log(`Default city: ${settings.defaultCity}`);
  console.log(`Temperature unit: ${settings.temperatureUnit}`);
  console.log(`Wind speed unit: ${settings.windSpeedUnit}`);
  console.log(`Time format: ${settings.timeFormat}`);
  console.log(`Language: ${settings.language}`);
  console.log(`Weather details: ${settings.weatherDetails}`);
  console.log("------------------------------");
}

async function saveSetting(property, value) {
  const settings = await getSettings();

  settings[property] = value;

  await writeJSON("settings.json", settings);
}

export async function updateDefaultCity(city) {
  if (typeof city !== "string" || !city.trim()) {
    throw new Error("Please provide a valid city name.");
  }

  await saveSetting("defaultCity", city.trim());

  console.log(`Default city updated to ${city.trim()}.`);
}

export async function updateTemperatureUnit(unit) {
  const value = unit.toLowerCase();

  if (!["celsius", "fahrenheit"].includes(value)) {
    throw new Error("Use celsius or fahrenheit.");
  }

  await saveSetting("temperatureUnit", value);

  console.log(`Temperature unit updated to ${value}.`);
}

export async function updateWindSpeedUnit(unit) {
  const value = unit.toLowerCase();

  if (!["kmh", "mph"].includes(value)) {
    throw new Error("Use kmh or mph.");
  }

  await saveSetting("windSpeedUnit", value);

  console.log(`Wind speed unit updated to ${value}.`);
}

export async function updateTimeFormat(format) {
  const value = format.toLowerCase();

  if (!["12-hour", "24-hour"].includes(value)) {
    throw new Error("Use 12-hour or 24-hour.");
  }

  await saveSetting("timeFormat", value);

  console.log(`Time format updated to ${value}.`);
}

export async function updateLanguage(language) {
  const value = language.toLowerCase();

  const languages = {
    english: "English",
    kinyarwanda: "Kinyarwanda",
  };

  if (!languages[value]) {
    throw new Error("Use English or Kinyarwanda.");
  }

  await saveSetting("language", languages[value]);

  console.log(`Language updated to ${languages[value]}.`);
}

export async function updateWeatherDetails(level) {
  const value = level.toLowerCase();

  if (!["basic", "detailed"].includes(value)) {
    throw new Error("Use basic or detailed.");
  }

  await saveSetting("weatherDetails", value);

  console.log(`Weather details updated to ${value}.`);
}
