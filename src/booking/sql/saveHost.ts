import { StatementSync } from "node:sqlite";
import { db } from "../db";

interface HostDbModel {
  id: string;
  forwardBooking: string;
  workHours: string;
  workDays: string;
  deleted: boolean;
}

export const saveHost = (clientModel: HostDbModel): StatementSync => {
  const { id, forwardBooking, workDays, workHours, deleted } = clientModel;
  return db.prepare(`MERGE into \`hosts\` (
    \`id\`,
    \`forwardBooking\`,   
    \`workDays\`, 
    \`workHours\`,
    \`deleted\`
  ) values (
   '${id}',
   '${forwardBooking}',
   '${workDays}', 
   '${workHours}',
   ${deleted}, 
  );`);
};
