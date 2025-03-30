export const saveBooking = (bookingModel: {
  id: string;
  clientId: string;
  hostId: string;
  fromDateTime: string;
  toDateTime: string;
  deleted: boolean;
}): string => {
  const { id, clientId, hostId, fromDateTime, toDateTime, deleted } =
    bookingModel;
  return `
    INSERT OR REPLACE INTO
      \`bookings\` (
      \`id\`,
      \`clientId\`,
      \`hostId\`,
      \`fromDateTime\`,
      \`toDateTime\`,
      \`deleted\`,
    ) values (
     '${id}', 
     '${clientId}', 
     '${hostId}', 
     '${fromDateTime}', 
     '${toDateTime}', 
     ${Number(deleted)},
    );
  `;
};
