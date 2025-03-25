import { StatementSync } from "node:sqlite";
import { db } from "../db";

export const getUserByEmailAndPassword = (data: {
  email: string;
  password: string;
}): StatementSync => {
  const { email, password } = data;
  return db.prepare(
    `select * from \`users\` where \`email\` = '${email}' and \`password\` = '${password}';`,
  );
};
