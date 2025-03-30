import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync("src/auth/db/database.db");

export { db };
