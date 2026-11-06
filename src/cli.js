#!/usr/bin/env node

import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({
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

if (!values.city) {
  console.log("Please provide a city name.");
  console.log("Example: ikirere --city Kigali");
  process.exit(1);
}

console.log(`Getting weather information for ${values.city}...`);
