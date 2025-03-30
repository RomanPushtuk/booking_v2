import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("src/booking/db/booking.db");

export { db };
