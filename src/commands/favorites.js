import { readJSON, writeJSON } from "../storage/storage.js";

export async function getFavorites() {
  return readJSON("favorites.json", []);
}


export async function addFavorite(city) {
 
  if (typeof city !== "string" || !city.trim()) {
    throw new Error("Please provide a valid city name.");
  }

  const cleanCity = city.trim();
  const favorites = await getFavorites();

  const cityExists = favorites.some(
    (favorite) => favorite.toLowerCase() === cleanCity.toLowerCase(),
  );

  if (cityExists) {
    console.log(`${cleanCity} is already in your favourites.`);
    return;
  }

  favorites.push(cleanCity);

  await writeJSON("favorites.json", favorites);

  console.log(`${cleanCity} has been added to your favourites.`);
}

export async function listFavorites() {
  const favorites = await getFavorites();

  if (favorites.length === 0) {
    console.log("You have no favourite cities yet.");
    return;
  }

  console.log("\nYour Favourite Cities:");

  favorites.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
  });
}
