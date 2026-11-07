#!/usr/bin/env node

import { parseArgs } from "node:util";
import os from "node:os";
import { showWeather, listHistory } from "../commands/weather.js";
import {addFavorite,listFavorites,} from "../commands/favorites.js";
import {showSettings,updateDefaultCity,updateTemperatureUnit,} from "../commands/settings.js";

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

  // 6. Display help information.
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

  // 7. Add a city to favourites.
  if (values["favorite-add"] !== undefined) {
    try {
      await addFavorite(values["favorite-add"]);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  // 8. Display favourite cities.
  if (values.favorites) {
    try {
      await listFavorites();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  // 9. Display weather search history.
  if (values.history) {
    try {
      await listHistory();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  // 10. Display saved settings.
  if (values.settings) {
    try {
      await showSettings();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  // 11. Update the default city.
  if (values["set-city"] !== undefined) {
    try {
      await updateDefaultCity(values["set-city"]);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  // 12. Update the temperature unit.
  if (values.unit !== undefined) {
    try {
      await updateTemperatureUnit(values.unit);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }

    return;
  }

  // 13. Check whether a weather city was provided.
  if (!values.city || !values.city.trim()) {
    console.error("Please provide a city name.");
    console.error("Example: ikirere --city Kigali");
    process.exitCode = 1;
    return;
  }

  // 14. Retrieve and display weather information.
  try {
    console.log(`Getting weather information for ${values.city}...`);

    await showWeather(values.city);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

// 15. Run the CLI application.
await main();
