import { StatementSync } from "node:sqlite";
import { db } from "../db";

export const getHostById = (data: { id: string }): StatementSync => {
  const { id } = data;
  return db.prepare(`SELECT * FROM \`hosts\` WHERE \`id\` = '${id}';`);
};
