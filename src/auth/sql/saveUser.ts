import { StatementSync } from "node:sqlite";
import { db } from "../db";

export const saveUser = (userModel: {
  id: string;
  login: string;
  password: string;
  role: string;
  deleted: boolean;
}): StatementSync => {
  const { id, login, password, role, deleted } = userModel;
  return db.prepare(`INSERT into \`users\` (
    \`id\`, \`email\`, \`password\`, \`role\`, \`deleted\`
  ) values ('${id}', '${login}', '${password}', '${role}', ${Number(deleted)});`);
};
