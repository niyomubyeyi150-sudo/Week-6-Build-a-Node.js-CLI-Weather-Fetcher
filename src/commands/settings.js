import { readJSON, writeJSON } from "../storage/storage.js";

const DEFAULT_SETTINGS = {temperatureUnit: "celsius",defaultCity: "Kigali",};

export async function getSettings() {
  const savedSettings = await readJSON("settings.json", {});

  const settings = {
    ...DEFAULT_SETTINGS,
    ...savedSettings,
  };

  if (
    !savedSettings.temperatureUnit ||
    !savedSettings.defaultCity
  ) {
    await writeJSON("settings.json", settings);
  }

  return settings;
}

export async function showSettings() {
  const settings = await getSettings();

  console.log("\nIkirere Settings:");
  console.log("------------------------------");
  console.log(`Temperature unit: ${settings.temperatureUnit}`);
  console.log(`Default city: ${settings.defaultCity}`);
  console.log("------------------------------");
}

export async function updateDefaultCity(city) {
  if (typeof city !== "string" || !city.trim()) {
    throw new Error("Please provide a valid city name.");
  }

  const settings = await getSettings();

  settings.defaultCity = city.trim();

  await writeJSON("settings.json", settings);

  console.log(`Default city updated to ${settings.defaultCity}.`);
}

export async function updateTemperatureUnit(unit) {
  if (typeof unit !== "string") {
    throw new Error("Please enter celsius or fahrenheit.");
  }

  const cleanUnit = unit.trim().toLowerCase();

  const validUnits = ["celsius", "fahrenheit"];

  if (!validUnits.includes(cleanUnit)) {
    throw new Error("Temperature unit must be celsius or fahrenheit.");
  }

  const settings = await getSettings();

  settings.temperatureUnit = cleanUnit;

  await writeJSON("settings.json", settings);

  console.log(`Temperature unit updated to ${settings.temperatureUnit}.`);
}
