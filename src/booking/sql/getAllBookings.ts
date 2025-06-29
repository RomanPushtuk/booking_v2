import { shared } from "../imports";

export const getAllBookings = (data?: {
  sorting?: shared.application.BookingSorting;
  filters?: shared.application.BookingFilters;
}): string => {
  const { sorting, filters } = data || {};

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

    if (filters.fromDateTime) {
      filtersSql.push(`\`fromDateTime\` >= '${filters.fromDateTime}'`);
    }

    if (filters.toDateTime) {
      filtersSql.push(`\`toDateTime\` <=  '${filters.toDateTime}'`);
    }

    if (filters.deleted) {
      filtersSql.push(`\`deleted\` = ${filters.deleted}`);
    }

    filtersSql = filtersSql.map((statement, index) => {
      if (index === 0) return "where " + statement;
      return "and " + statement;
    });
  }

  return `select * from \`bookings\` ${filtersSql.join(" ")} ${orderBySql};`;
};
