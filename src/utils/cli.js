#!/usr/bin/env node
import { parseArgs } from "node:util";
import os from "node:os";
import {showWeather,listHistory,} from "../commands/weather.js";
import {addFavorite,listFavorites,} from "../commands/favorites.js";
import {getSettings,showSettings,updateDefaultCity,updateTemperatureUnit,} from "../commands/settings.js";

async function main() {
  let values;

  try {
    const args = parseArgs({
      args: process.argv.slice(2),

      options: {
        city: {
          type: "string",
          short: "c",
        },
        help: {
          type: "boolean",
          short: "h",
        },
        "favorite-add": {
          type: "string",
        },
        favorites: {
          type: "boolean",
        },
        history: {
          type: "boolean",
          short: "H",
        },
        settings: {
          type: "boolean",
        },
        "set-city": {
          type: "string",
        },
        unit: {
          type: "string",
        },
      },

      allowPositionals: true,
    });

    values = args.values;

  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error("Run 'ikirere --help' to see available options.");
    process.exitCode = 1;
    return;
  }

  if (values.help) {
    console.log(`
Welcome to Ikirere Weather CLI!

Platform: ${os.platform()}

Usage:
  ikirere --city <city>
  ikirere -c <city>
  ikirere --favorite-add <city>
  ikirere --favorites
  ikirere --history
  ikirere --settings
  ikirere --set-city <city>
  ikirere --unit <celsius|fahrenheit>
  ikirere --help

Options:
  -c, --city          Enter a city name
  -h, --help          Display help information
      --favorite-add  Save a city to favourites
      --favorites     Display favourite cities
  -H, --history       Display weather search history
      --settings      Display saved settings
      --set-city      Change the default city
      --unit          Change temperature unit
    `);

    return;
  }

  if (values["favorite-add"] !== undefined) {
    try {
      await addFavorite(values["favorite-add"]);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  if (values.favorites) {
    try {
      await listFavorites();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  if (values.history) {
    try {
      await listHistory();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  if (values.settings) {
    try {
      await showSettings();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  if (values["set-city"] !== undefined) {
    try {
      await updateDefaultCity(values["set-city"]);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  if (values.unit !== undefined) {
    try {
      await updateTemperatureUnit(values.unit);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  try {
    const settings = await getSettings();

    const city = values.city?.trim() || settings.defaultCity;

    console.log(`Getting weather information for ${city}...`);

    await showWeather(city);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

await main();
