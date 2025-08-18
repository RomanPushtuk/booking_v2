import { DatabaseSync } from "node:sqlite";
import { config } from "../imports";

const db = new DatabaseSync(config.BOOKING_DB_PATH);

export { db };
