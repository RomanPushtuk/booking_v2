export interface BookingDbModel {
  id: string;
  clientId: string;
  hostId: string;
  fromDateTime: string;
  toDateTime: string;
  deleted: boolean;
}

export const saveBooking = (bookingModel: BookingDbModel): string => {
  const { id, clientId, hostId, fromDateTime, toDateTime, deleted } =
    bookingModel;
  return `
    INSERT OR REPLACE INTO \`bookings\` (
      \`id\`,
      \`clientId\`,
      \`hostId\`,
      \`fromDateTime\`,
      \`toDateTime\`,
      \`deleted\`
    ) values (
     '${id}', 
     '${clientId}', 
     '${hostId}', 
     '${fromDateTime}', 
     '${toDateTime}', 
     ${Number(deleted)}
    );
  `;
};
