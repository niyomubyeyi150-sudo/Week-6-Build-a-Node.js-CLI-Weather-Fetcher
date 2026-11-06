// 1. Import file-handling functions.
import { readFile, writeFile, mkdir } from "node:fs/promises";

import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// 4. Get the absolute project data directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "../../data");

// 5. Read JSON data.
export async function readJSON(filename, defaultValue) {
  const filePath = path.join(DATA_DIR, filename);

  try {
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      return defaultValue;
    }

    throw error;
  }
}

// 6. Write JSON data.
export async function writeJSON(filename, data) {
  const filePath = path.join(DATA_DIR, filename);

  await mkdir(DATA_DIR, { recursive: true });

  const content = JSON.stringify(data, null, 2);

  await writeFile(filePath, content, "utf-8");
}
