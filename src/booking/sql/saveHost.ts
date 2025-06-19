export interface HostDbModel {
  id: string;
  forwardBooking: string;
  workHours: string;
  workDays: string;
  deleted: boolean;
}

export const saveHost = (hostModel: HostDbModel): string => {
  const { id, forwardBooking, workDays, workHours, deleted } = hostModel;
  return `INSERT OR REPLACE INTO \`hosts\` (
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
  );`;
};
