import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("src/booking/db/database.db");

export { db };
