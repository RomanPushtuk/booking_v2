import { DatabaseSync } from "node:sqlite";
import path from "path";

const pathToDbFile = path.join(__dirname, 'auth.db');
const db = new DatabaseSync(pathToDbFile);

export { db };
