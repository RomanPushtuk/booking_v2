import { StatementSync } from "node:sqlite";
import { db } from "../db";

interface IBookingDatabaseModel {
  id: string;
  clientId: string;
  hostId: string;
  date: string;
  dateTimeFrom: string;
  dateTimeTo: string;
  deleted: boolean;
}

export const saveBooking = (
  bookingModel: IBookingDatabaseModel,
): StatementSync => {
  const { id, clientId, hostId, date, dateTimeFrom, dateTimeTo, deleted } =
    bookingModel;
  return db.prepare(`
    MERGE into
      \`bookings\` (
      \`id\`,
      \`clientId\`,
      \`hostId\`,
      \`dateTimeFrom\`,
      \`dateTimeTo\`,
      \`deleted\`,
    ) values (
     '${id}', 
     '${clientId}', 
     '${hostId}', 
     '${date}', 
     '${dateTimeFrom}', 
     '${dateTimeTo}', 
     ${deleted},
    );
  `);
};
