import { StatementSync } from "node:sqlite";
import { db } from "../db";

interface ClientDbModel {
  id: string;
  deleted: boolean;
}

export const saveClient = (clientModel: ClientDbModel): StatementSync => {
  const { id, deleted } = clientModel;
  return db.prepare(
    `MERGE INTO \`clients\` (\`id\`, \`deleted\`) VALUES ('${id}', ${deleted});`,
  );
};
