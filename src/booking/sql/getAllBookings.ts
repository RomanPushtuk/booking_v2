import { StatementSync } from "node:sqlite";
import { db } from "../db";
import { shared } from "../imports";

export const getAllBookings = (data: {
  sorting?: shared.application.BookingSorting;
  filters?: shared.application.BookingFilters;
}): StatementSync => {
  const { sorting, filters } = data;

  let orderBySql = "";
  let filtersSql: string[] = [];

  if (sorting) {
    orderBySql += `ORDER BY \`${sorting.property}\` ${sorting.direction}`;
  }

  if (filters) {
    if (filters.clientId) {
      filtersSql.push(`\`clientId\` = '${filters.clientId}'`);
    }
    if (filters.hostId) {
      filtersSql.push(`\`hostId\` = '${filters.hostId}'`);
    }
    if (filters.dateTimeFrom) {
      filtersSql.push(`\`dateTimeFrom\` >= '${filters.dateTimeFrom}'`);
    }
    if (filters.dateTimeTo) {
      filtersSql.push(`\`dateTimeTo\` <=  '${filters.dateTimeTo}'`);
    }

    filtersSql = filtersSql.map((statement, index) => {
      if (index === 0) return "where " + statement;
      return "and " + statement;
    });
  }

  return db.prepare(
    `select * from \`bookings\` ${filtersSql.join(" ")} ${orderBySql};`,
  );
};
