import { StatementSync } from "node:sqlite";
import { db } from "../db";

export const getClientById = (data: { id: string }): StatementSync => {
  const { id } = data;
  return db.prepare(`SELECT * from \`clients\` WHERE \`id\` = '${id}';`);
};
