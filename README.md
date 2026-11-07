
# Ikirere 🌦️
### A Node.js CLI Weather Fetcher

Ikirere is a command-line weather application built with Node.js. It allows users to retrieve current weather information for different cities directly from their terminal.
The application uses the Open-Meteo Geocoding API to find a city's geographical coordinates and the Open-Meteo Weather API to retrieve its current weather information.
This project was developed as part of the **Week 6 Personal Workshop – Build a Node.js CLI Weather Fetcher** to practise asynchronous JavaScript, API integration, error handling, Node.js built-in modules, JSON persistence and environment variables.

## Project Objectives

- Build an installable command-line application using Node.js.
- Retrieve weather information through HTTP requests.
- Connect a geocoding API to a weather API.
- Handle invalid input, network errors, timeouts and unavailable cities.
- Save favourite cities and weather search history.
- Store and manage application settings using JSON.
- Use environment variables for application configuration.
- Practise Node.js built-in modules.

## Features

- **Weather Search:** Retrieve current weather information by city name.
- **Geocoding:** Convert city names into geographical coordinates.
- **Weather Information:** Display temperature, feels-like temperature, humidity, wind speed and precipitation.
- **Local Time:** Display the local time and timezone of the searched city.
- **Default City:** Automatically use the saved default city when no city is provided.
- **Favourite Cities:** Add and display favourite cities.
- **Weather History:** Save and view previous weather searches.
- **Application Settings:** Configure the default city and temperature unit.
- **JSON Persistence:** Keep favourites, history and settings saved between application runs.
- **Environment Variables:** Load application configuration from a `.env` file.
- **Error Handling:** Display friendly messages for invalid cities, network problems and request timeouts.
- **Command-Line Interface:** Run the application using terminal commands.

## Technologies

- **Node.js** – JavaScript runtime.
- **JavaScript (ES Modules)** – Application logic and modular code.
- **Fetch API** – Making HTTP requests.
- **Open-Meteo Geocoding API** – Retrieving geographical coordinates.
- **Open-Meteo Weather API** – Retrieving current weather information.
- **JSON** – Storing favourites, weather history and settings.
- **Node.js Built-in Modules** – `process`, `util`, `fs/promises`, `path`, `os` and `url`.
- **Environment Variables** – Managing application configuration.
- **Git and GitHub** – Version control and project collaboration.

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
│       └── cli.js
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

Ikirere uses Node.js built-in Fetch and core modules, so it does not require an external HTTP library.

### 4. Configure environment variables

Create a `.env` file in the project root and add:

```env
DEFAULT_CITY=Kigali
TEMPERATURE_UNIT=celsius
WIND_SPEED_UNIT=kmh
WEATHER_TIMEOUT=10000
```

The `.env.example` file provides a configuration template.

**Note:** The application uses saved settings in `data/settings.json` in preference to environment-variable defaults. Keep `.env` private and do not commit it to GitHub.

### 5. Install the CLI globally

Run:

```bash
npm link
```

This makes the `ikirere` command available in your terminal.

You can also run the application locally without a global installation:

```bash
npm start
```

## Usage

### Display help information

```bash
ikirere --help
```

### Search weather by city

```bash
ikirere --city Kigali
```

You can also use the short option:

```bash
ikirere -c Kigali
```

### Use the saved default city

```bash
ikirere
```

If no city is provided, Ikirere uses the saved default city.

### Manage favourite cities

Add a city:

```bash
ikirere --favorite-add Nairobi
```

Display favourite cities:

```bash
ikirere --favorites
```

### View weather search history

```bash
ikirere --history
```

### Manage application settings

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

## Walkthrough: How Ikirere Works

Ikirere follows a sequence of steps to retrieve and display weather information.

### Step 1: User enters a command

The user enters a city name in the terminal:

```bash
ikirere --city Kigali
```

### Step 2: Command-line argument parsing

The application uses Node.js `util.parseArgs()` to read and interpret the user's command-line options.

It checks whether the user requested weather information, favourites, history, settings or help.

### Step 3: Geocoding request

The geocoding service sends a request to the Open-Meteo Geocoding API.

The API searches for the requested city and returns information such as:

- City name
- Country
- Latitude
- Longitude

### Step 4: Weather request

The weather service uses the returned latitude and longitude to make a second HTTP request to the Open-Meteo Weather API.

It retrieves current weather information for the requested location.

### Step 5: Display weather information

The application displays the retrieved information in the terminal, including temperature, feels-like temperature, humidity, wind speed, precipitation and local time.

### Step 6: Save weather history

The application reads the existing history from `data/history.json`, adds the latest search and saves the updated information.

### Step 7: Persistent storage

Favourite cities, weather history and application settings are stored in JSON files.

This allows saved information to remain available even after the application is closed and restarted.

### Application Flow

```text
User Command
     |
     v
CLI Argument Parsing
     |
     v
Validate Input / Read Settings
     |
     v
Geocoding API
     |
     v
Get Latitude and Longitude
     |
     v
Weather API
     |
     v
Retrieve Current Weather
     |
     v
Display Weather Information
     |
     v
Save Search to JSON History
```

## Environment Variables

Ikirere uses environment variables to manage application configuration.

| Variable | Description | Example |
|---|---|---|
| `DEFAULT_CITY` | Default city | Kigali |
| `TEMPERATURE_UNIT` | Temperature preference | celsius |
| `WIND_SPEED_UNIT` | Wind speed preference | kmh |
| `WEATHER_TIMEOUT` | API request timeout in milliseconds | 10000 |

The application loads these variables from `.env` using Node.js built-in environment-variable support.

The `.env` file is excluded from Git using `.gitignore`, while `.env.example` is included as a configuration template.

## JSON Persistence

Ikirere uses JSON files to store application data.

| File | Purpose |
|---|---|
| `favorites.json` | Stores favourite cities. |
| `history.json` | Stores previous weather searches. |
| `settings.json` | Stores application preferences. |

The application uses Node.js `fs/promises` and `path` to read and write JSON data.

## Error Handling

Ikirere provides friendly error messages for common problems, including:

- Missing or empty city names.
- Invalid city names or cities that cannot be found.
- Network connection failures.
- Request timeouts.
- Unavailable API services.
- Unexpected API responses.
- Invalid command-line options.

The application also uses appropriate process exit codes to indicate successful and unsuccessful command execution.

## Learning Outcomes

Through this project, I practised:

- Creating and configuring a Node.js CLI application.
- Using ES modules to organise JavaScript code.
- Making asynchronous HTTP requests with `fetch()` and `async/await`.
- Connecting multiple APIs to retrieve information.
- Handling errors and request timeouts.
- Working with Node.js built-in modules.
- Reading and writing JSON files.
- Managing environment variables.
- Building persistent command-line application features.
- Using Git and GitHub for version control.


**Nadine Niyomubyeyi**
Week 6 Personal Workshop – Node.js CLI Weather Fetcher.


