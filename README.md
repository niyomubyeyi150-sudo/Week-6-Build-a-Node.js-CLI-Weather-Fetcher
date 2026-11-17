
# Ikirere 🌦️

### A Node.js Interactive Weather CLI

Ikirere is a command-line weather application built with Node.js that allows users to retrieve current weather information for cities around the world directly from their terminal.

The application uses the **Open-Meteo Geocoding API** to find a city's geographical coordinates and the **Open-Meteo Weather API** to retrieve its current weather information.

Ikirere provides two ways to interact with the application:

- **Interactive Mode:** Navigate through a menu to check weather, manage favourite cities, view search history, and update application settings.
- **Command Mode:** Use terminal options to perform specific actions directly without opening the interactive menu.

The project was developed as part of the **Week 6 Personal Workshop – Build a Node.js CLI Weather Fetcher** to practise asynchronous JavaScript, API integration, error handling, Node.js built-in modules, JSON persistence, and environment variables.

---

## Project Objectives

- Build an installable command-line application using Node.js.
- Retrieve weather information through HTTP requests.
- Connect a geocoding API to a weather API.
- Handle invalid input, network errors, timeouts, and unavailable cities.
- Save favourite cities and weather search history.
- Store and manage application settings using JSON.
- Use environment variables for application configuration.
- Practise asynchronous JavaScript and Node.js built-in modules.
- Build an interactive command-line experience.

## Features

### Weather Information

- Search for current weather information using a city name.
- Convert city names into geographical coordinates through geocoding.
- Display temperature, feels-like temperature, humidity, wind speed, and precipitation.
- Display the local time and timezone of the searched city.

### Interactive Menu

- Navigate through application features using arrow keys.
- Check weather for different cities.
- Add and view favourite cities.
- View previous weather searches.
- Change the default city.
- Update temperature and wind speed preferences.
- Change time format, language, and weather details preferences.
- Exit the application through the menu.

### Favourite Cities

- Add cities to favourites.
- Display saved favourite cities.
- Prevent duplicate favourite entries.

### Weather History

- Automatically save weather searches.
- Display previously searched cities.
- Keep search history between application runs.

### Application Settings

- Configure the default city.
- Select a temperature unit preference.
- Select a wind speed unit preference.
- Choose a 12-hour or 24-hour time format.
- Choose English or Kinyarwanda.
- Select basic or detailed weather information.

### Additional Features

- JSON persistence for favourites, history, and settings.
- Environment-variable configuration.
- Friendly error messages for common problems.
- Traditional command-line options for direct execution.

---

## Technologies

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| JavaScript (ES Modules) | Application logic and modular code |
| Node.js Fetch API | Making HTTP requests |
| Open-Meteo Geocoding API | Finding geographical coordinates |
| Open-Meteo Weather API | Retrieving weather information |
| `@inquirer/prompts` | Interactive terminal menus |
| `ora` | Terminal loading indicators, where used |
| JSON | Persistent data storage |
| `node:util` | Parsing command-line arguments |
| `node:fs/promises` | Reading and writing files |
| `node:path` | Managing file paths |
| `node:os` | Accessing operating system information |
| Git and GitHub | Version control and collaboration |

## Project Structure

```text
ikirere/
├── src/
│   ├── commands/
│   │   ├── weather.js
│   │   ├── favorites.js
│   │   └── settings.js
│   ├── services/
│   │   ├── geocoding.js
│   │   └── weather.js
│   ├── storage/
│   │   └── storage.js
│   └── utils/
│       ├── cli.js
│       └── menu.js
├── data/
│   ├── favorites.json
│   ├── history.json
│   └── settings.json
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

**Note:** The `menu.js` file contains the interactive menu, while `cli.js` handles command-line arguments and decides whether to launch the menu or execute a direct command.

---

## Installation

### Prerequisites

Before installing Ikirere, make sure you have:

- [Node.js](https://nodejs.org/) version 20.6 or later.
- npm (included with Node.js).
- Git.

### 1. Clone the repository

```bash
git clone https://github.com/niyomubyeyi150-sudo/Week-6-Build-a-Node.js-CLI-Weather-Fetcher.git
```

### 2. Navigate to the project directory

```bash
cd Week-6-Build-a-Node.js-CLI-Weather-Fetcher
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add:

```env
DEFAULT_CITY=Kigali
TEMPERATURE_UNIT=celsius
WIND_SPEED_UNIT=kmh
WEATHER_TIMEOUT=10000
```

The `.env.example` file provides a configuration template.

**Important:** Keep your `.env` file private and do not commit it to GitHub. The `.gitignore` file should exclude it.

Saved settings in `data/settings.json` are combined with the environment-variable defaults.

### 5. Run Ikirere locally

```bash
npm start
```

### 6. Install the CLI globally

To make the `ikirere` command available in your terminal, run:

```bash
npm link
```

After linking, you can launch Ikirere from the terminal using:

```bash
ikirere
```

---

## Usage

Ikirere supports interactive and command-line modes.

### 1. Interactive Mode

Start the application without additional arguments:

```bash
npm start
```

Or, after installing the CLI globally:

```bash
ikirere
```

The application displays an interactive menu with options such as:

1. Check weather
2. Add a favourite city
3. View favourite cities
4. View weather history
5. Change default city
6. Change temperature unit
7. Change wind speed unit
8. Change time format
9. Change language
10. Change weather details
11. View settings
12. Exit

Use the arrow keys to navigate and press Enter to select an option.

### 2. Command Mode

You can also execute individual actions directly from the terminal.

#### Display help information

```bash
ikirere --help
```

#### Search weather by city

```bash
ikirere --city Kigali
```

Short option:

```bash
ikirere -c Kigali
```

#### Use the saved default city

When no city is specified, the application uses the saved default city and opens the interactive menu. Select **Check weather** to retrieve its weather information.

#### Manage favourite cities

Add a city:

```bash
ikirere --favorite-add Nairobi
```

Display favourite cities:

```bash
ikirere --favorites
```

#### View weather search history

```bash
ikirere --history
```

#### Manage application settings

Display saved settings:

```bash
ikirere --settings
```

Change the default city:

```bash
ikirere --set-city Musanze
```

Change the temperature unit preference:

```bash
ikirere --unit fahrenheit
```

Supported temperature unit values:

- `celsius`
- `fahrenheit`

---

## How Ikirere Works

Ikirere uses a modular structure that separates command handling, API requests, and data storage.

### Step 1: Application Entry Point

When the user starts Ikirere, the application executes `cli.js`.

It checks whether the user provided command-line arguments.

- Without additional arguments, it launches the interactive menu.
- With additional arguments, it uses Node.js `util.parseArgs()` to interpret the requested options.

### Step 2: User Selects an Action

In interactive mode, `menu.js` displays available actions using `@inquirer/prompts`.

The selected action determines which existing application function should execute.

For example, choosing **Check weather** calls the `showWeather()` function.

### Step 3: Geocoding Request

The geocoding service sends a request to the Open-Meteo Geocoding API.

It searches for the requested city and retrieves information such as:

- City name
- Country
- Latitude
- Longitude

### Step 4: Weather Request

The weather service uses the returned latitude and longitude to make a second request to the Open-Meteo Weather API.

It retrieves current weather information for the requested location.

### Step 5: Display Weather Information

The application displays the retrieved weather information in the terminal, including:

- Temperature
- Feels-like temperature
- Humidity
- Wind speed
- Precipitation
- Local time
- Timezone

### Step 6: Save Weather History

After retrieving weather information, the application reads the existing records from `history.json`.

It adds the latest search and writes the updated history back to the JSON file.

### Step 7: Manage Persistent Data

Ikirere uses JSON files to store favourites, search history, and application settings.

This allows information to remain available even after the application is closed and restarted.

---

## Application Flow

```text
                 User
                  |
                  v
             Ikirere CLI
                  |
                  v
          Check User Arguments
                  |
          +-------+-------+
          |               |
          v               v
    No Arguments     Has Arguments
          |               |
          v               v
    Interactive       Parse Options
       Menu                |
          |                v
          |          Execute Command
          |                |
          +-------+--------+
                  |
                  v
          Selected Action
                  |
          +-------+--------+
          |                |
          v                v
      Weather         Other Actions
          |          (Favourites,
          v           History,
      Geocoding        Settings)
          |
          v
      Weather API
          |
          v
    Display Results
          |
          v
     Save History
          |
          v
       JSON Files
```

## Environment Variables

Ikirere uses environment variables to manage default application configuration.

| Variable | Description | Example |
|---|---|---|
| `DEFAULT_CITY` | Default city | Kigali |
| `TEMPERATURE_UNIT` | Default temperature preference | celsius |
| `WIND_SPEED_UNIT` | Default wind speed preference | kmh |
| `WEATHER_TIMEOUT` | API request timeout in milliseconds | 10000 |

The application loads configuration from `.env`.

The `.env` file is excluded from Git using `.gitignore`, while `.env.example` is included as a configuration template.

## JSON Persistence

Ikirere uses JSON files to store application data.

| File | Purpose |
|---|---|
| `favorites.json` | Stores favourite cities |
| `history.json` | Stores previous weather searches |
| `settings.json` | Stores application preferences |

The application uses Node.js `fs/promises` and `path` to read and write JSON data.

## Error Handling

Ikirere provides error handling for common problems, including:

- Missing or empty city names.
- Invalid city names or cities that cannot be found.
- Network connection failures.
- Request timeouts.
- Unavailable API services.
- Unexpected API responses.
- Invalid command-line options.
- Invalid application settings.

The application also uses appropriate process exit codes to indicate unsuccessful command execution.

---

## Author

**Nadine Niyomubyeyi**

Week 6 Personal Workshop – Node.js CLI Weather Fetcher.
