import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = process.env.DATA_FILE_PATH
  ? path.resolve(process.env.DATA_FILE_PATH)
  : path.resolve(__dirname, "../data/db.json");

const emptyState = {
  contacts: [],
  appointments: []
};

async function ensureDbFile() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(emptyState, null, 2), "utf8");
  }
}

export async function readDb() {
  await ensureDbFile();
  const raw = await fs.readFile(DB_PATH, "utf8");
  const parsed = JSON.parse(raw || "{}");

  return {
    contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
    appointments: Array.isArray(parsed.appointments) ? parsed.appointments : []
  };
}

export async function writeDb(nextState) {
  const state = {
    contacts: Array.isArray(nextState.contacts) ? nextState.contacts : [],
    appointments: Array.isArray(nextState.appointments) ? nextState.appointments : []
  };

  await fs.writeFile(DB_PATH, JSON.stringify(state, null, 2), "utf8");
}
