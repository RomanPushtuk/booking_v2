import { StatementSync } from "node:sqlite";
import { db } from "../db";

export const getUserByLoginAndPassword = (data: {
  login: string;
  password: string;
}): StatementSync => {
  const { login, password } = data;
  return db.prepare(
    `select * from \`users\` where \`login\` = '${login}' and \`password\` = '${password}';`,
  );
};
