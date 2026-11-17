import { select, input } from "@inquirer/prompts";
import { showWeather, listHistory } from "../commands/weather.js";
import { addFavorite, listFavorites } from "../commands/favorites.js";
import {
  getSettings,
  showSettings,
  updateDefaultCity,
  updateTemperatureUnit,
  updateWindSpeedUnit,
  updateTimeFormat,
  updateLanguage,
  updateWeatherDetails,
} from "../commands/settings.js";

// Ask the user to enter a city.
async function askCity(message, defaultCity) {
  const city = await input({
    message,
    default: defaultCity,
    validate: (value) => value.trim().length > 0 || "Please enter a city name.",
  });

  return city.trim();
}

// Wait before showing the menu again.
async function pause() {
  await input({
    message: "Press Enter to return to the main menu.",
  });
}

// Display the interactive menu.
export async function runMenu() {
  let running = true;

  console.log("\n🌦️ Welcome to IKIRERE WEATHER CLI!");
  console.log("Your weather information\n");

  while (running) {
    const choice = await select({
      message: "What would you like to do?",
      choices: [
        { name: "🌤️ Check weather", value: "weather" },
        { name: "⭐ Add a favourite city", value: "add" },
        { name: "❤️ View favourite cities", value: "favorites" },
        { name: "📜 View weather history", value: "history" },
        { name: "📍 Change default city", value: "city" },
        { name: "🌡️ Change temperature unit", value: "temperature" },
        { name: "💨 Change wind speed unit", value: "wind" },
        { name: "🕒 Change time format", value: "time" },
        { name: "🌐 Change language", value: "language" },
        { name: "📊 Change weather details", value: "details" },
        { name: "⚙️ View settings", value: "settings" },
        { name: "🚪 Exit", value: "exit" },
      ],
    });

    if (choice === "exit") {
      console.log("\nThank you for using Ikirere. Goodbye! 👋");
      running = false;
      continue;
    }

    try {
      const settings = await getSettings();

      switch (choice) {
        case "weather": {
          const city = await askCity(
            "Enter a city to check its weather:",
            settings.defaultCity,
          );

          await showWeather(city);
          break;
        }

        case "add": {
          const city = await askCity("Which city would you like to save?");

          await addFavorite(city);
          break;
        }

        case "favorites": {
          await listFavorites();
          break;
        }

        case "history": {
          await listHistory();
          break;
        }

        case "city": {
          const city = await askCity(
            "Enter your new default city:",
            settings.defaultCity,
          );

          await updateDefaultCity(city);
          break;
        }

        case "temperature": {
          const unit = await select({
            message: "Choose your temperature unit:",
            choices: [
              { name: "Celsius (°C)", value: "celsius" },
              { name: "Fahrenheit (°F)", value: "fahrenheit" },
            ],
          });

          await updateTemperatureUnit(unit);
          break;
        }

        case "wind": {
          const unit = await select({
            message: "Choose your wind speed unit:",
            choices: [
              { name: "Kilometres per hour (km/h)", value: "kmh" },
              { name: "Miles per hour (mph)", value: "mph" },
            ],
          });

          await updateWindSpeedUnit(unit);
          break;
        }

        case "time": {
          const format = await select({
            message: "Choose your time format:",
            choices: [
              { name: "12-hour", value: "12-hour" },
              { name: "24-hour", value: "24-hour" },
            ],
          });

          await updateTimeFormat(format);
          break;
        }

        case "language": {
          const language = await select({
            message: "Choose your language:",
            choices: [
              { name: "English", value: "English" },
              { name: "Kinyarwanda", value: "Kinyarwanda" },
            ],
          });

          await updateLanguage(language);
          break;
        }

        case "details": {
          const level = await select({
            message: "Choose the weather information level:",
            choices: [
              { name: "Basic", value: "basic" },
              { name: "Detailed", value: "detailed" },
            ],
          });

          await updateWeatherDetails(level);
          break;
        }

        case "settings": {
          await showSettings();
          break;
        }
      }
    } catch (error) {
      console.error(`\nError: ${error.message}`);
    }

    if (running) {
      await pause();
      console.log("\n----------------------------------------\n");
    }
  }
}
