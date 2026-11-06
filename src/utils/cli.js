#!/usr/bin/env node

import { parseArgs } from "node:util";
import { showWeather } from "../commands/weather.js";
import os from "node:os";

const systemPlatform = os.platform();
let values;

try {
  const args = parseArgs({
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

  values = args.values;
} catch (error) {
  console.error(`Error: ${error.message}`);
  console.error("Run 'ikirere --help' to see available options.");
  process.exit(1);
}

if (values.help) {
  console.log(`
Welcome to Ikirere Weather CLI!

 Platform: ${systemPlatform}
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
  console.error("Please provide a city name.");
  console.error("Example: ikirere --city Kigali");
  process.exit(1);
}

try {
  console.log(`Getting weather information for ${values.city}...`);

  await showWeather(values.city);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
