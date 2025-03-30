import { StatementSync } from "node:sqlite";
import { db } from "../db";

export const getUserById = (data: { id: string }): StatementSync => {
  const { id } = data;
  return db.prepare(`SELECT * FROM \`users\` WHERE \`id\` = '${id}';`);
};
