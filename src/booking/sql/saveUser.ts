import { StatementSync } from "node:sqlite";
import { db } from "../db";

interface UserDbModel {
  id: string;
  email: string;
  password: string;
  role: string;
}

export const saveUser = (userModel: UserDbModel): StatementSync => {
  const { id, email, password, role } = userModel;
  return db.prepare(`MERGE into \`users\` (
    \`id\`, \`email\`, \`password\`, \`role\`
  ) values ('${id}', '${email}', '${password}', '${role}');`);
};
