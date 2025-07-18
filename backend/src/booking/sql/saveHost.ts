export interface HostDbModel {
  id: string;
  forwardBooking: string;
  workHours: string;
  workDays: string;
}

export const saveHost = (hostModel: HostDbModel): string => {
  const { id, forwardBooking, workDays, workHours } = hostModel;
  return `INSERT OR REPLACE INTO \`hosts\` (
    \`id\`,
    \`forwardBooking\`,   
    \`workDays\`, 
    \`workHours\`
  ) values (
   '${id}',
   '${forwardBooking}',
   '${workDays}', 
   '${workHours}'
  );`;
};
