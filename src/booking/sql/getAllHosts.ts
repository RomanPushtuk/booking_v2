import { StatementSync } from "node:sqlite";
import { db } from "../db";

export const getAllHosts = (): StatementSync => {
  return db.prepare(`SELECT * from \`hosts\`;`);
};
