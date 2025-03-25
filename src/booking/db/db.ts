import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./booking.db");

export { db };
