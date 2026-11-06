
# Ikirere 🌦️
### A Node.js CLI Weather Fetcher

Ikirere is a command-line weather application built with Node.js. It allows users to check weather information for different cities directly from their terminal.

The project is being developed as part of the **Week 6 Personal Workshop** to practise Node.js, asynchronous JavaScript, API integration, error handling, and file management.

##  Project Objectives

- Build an installable command-line application using Node.js.
- Retrieve weather information using HTTP requests.
- Connect a geocoding API to a weather forecast API.
- Handle invalid input, network errors, timeouts, and unavailable cities.
- Save favourite cities and weather search history.
- Use environment variables for application configuration.
- Practise Node.js built-in modules.

##  Technologies

- **Node.js** – JavaScript runtime.
- **JavaScript (ES Modules)** – Application logic.
- **Fetch API** – Making HTTP requests.
- **Open-Meteo API** – Geocoding and weather forecast data.
- **JSON** – Storing favourites, history, and settings.
- **Git and GitHub** – Version control.

##  Planned Features

- Search for weather by city name.
- Display current weather information.
- Retrieve weather forecasts.
- Save favourite cities.
- View previous weather searches.
- Store application settings.
- Display friendly error messages.
- Run commands directly from the terminal.

##  Project Structure

```text
ikirere/
├── src/
│   ├── cli.js
│   ├── commands/
│   │   └── weather.js
│   ├── services/
│   │   ├── geocoding.js
│   │   └── weather.js
│   ├── storage/
│   │   └── storage.js
│   └── utils/
├── data/
│   ├── favorites.json
│   ├── history.json
│   └── settings.json
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

##  Installation

- Node.js (a modern version with built-in Fetch support).
- npm.

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root and add the configuration required by the application.

See `.env.example` for the configuration template.

##  Usage

The CLI commands will be documented here as they are implemented.

Planned examples:

```bash
ikirere --help
ikirere --city Kigali
```

## 🔄 How Ikirere Works

The application follows a simple sequence:

1. The user enters a city name in the terminal.
2. The CLI validates the user's input.
3. The geocoding service searches for the city's geographical coordinates.
4. The weather service uses those coordinates to request forecast information.
5. The application displays the weather information.
6. The search can be saved in the user's history.

## 🧪 Error Handling

Ikirere will handle:

- Empty or invalid city names.
- Cities that cannot be found.
- Network connection failures.
- Request timeouts.
- Unexpected API responses.

## 🎓 Learning Outcomes

Through this project, I aim to strengthen my understanding of Node.js, asynchronous programming, API integration, command-line applications, error handling, and persistent data storage.

## Author

**Nadine Niyomubyeyi**

Week 6 Personal Workshop – Node.js CLI Weather Fetcher.

## 📄 License

This project is licensed under the MIT License.
```
