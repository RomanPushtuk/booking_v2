import { StatementSync } from "node:sqlite";
import { db } from "../db";

export const getBookingById = (data: { id: string }): StatementSync => {
  const { id } = data;
  return db.prepare(`SELECT * FROM \`bookings\` WHERE \`id\` = '${id}';`);
};
