#!/usr/bin/env node

import { parseArgs } from "node:util";
import { showWeather } from "../commands/weather.js";

const { values } = parseArgs({
  options: {
    city: {
      type: "string",
      short: "c",
    },
    help: {
      type: "boolean",
      short: "h",
    },
  },
  allowPositionals: true,
});

if (values.help) {
  console.log(`
Welcome to Ikirere Weather CLI!

Usage:
  ikirere --city <city>
  ikirere -c <city>
  ikirere --help

Options:
  -c, --city    Enter a city name
  -h, --help    Display help information
  `);
  process.exit(0);
}

if (!values.city || !values.city.trim()) {
  console.log("Please provide a city name.");
  console.log("Example: ikirere --city Kigali");
  process.exit(1);
}

try {
  console.log(`Getting weather information for ${values.city}...`);

  await showWeather(values.city);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
