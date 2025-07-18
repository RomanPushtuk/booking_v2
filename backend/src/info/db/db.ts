import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("src/info/db/database.db");

export { db };
