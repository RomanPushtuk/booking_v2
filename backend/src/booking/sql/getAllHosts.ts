import { shared } from "../imports";

export const getAllHosts = (data?: {
  sorting?: shared.application.HostSorting;
  filters?: shared.application.HostFilters;
}): string => {
  const { sorting, filters } = data || {};

  let orderBySql = "";
  let filtersSql: string[] = [];

  if (sorting) {
    orderBySql += `ORDER BY \`${sorting.property}\` ${sorting.direction}`;
  }

  if (filters) {
    if (filters.workDays) {
      const workDaysConditions = filters.workDays.map(
        (day) => `\`workDays\` LIKE '%"${day}"%'`,
      );
      filtersSql.push(`(${workDaysConditions.join(" OR ")})`);
    }

    if (filters.workHours) {
      const workHoursConditions = filters.workHours.map(
        (hour) =>
          `\`workHours\` LIKE '%"from":"${hour.from}"%' AND \`workHours\` LIKE '%"to":"${hour.to}"%'`,
      );
      filtersSql.push(`(${workHoursConditions.join(" OR ")})`);
    }

    if (filters.forwardBooking) {
      filtersSql.push(`\`forwardBooking\` = '${filters.forwardBooking}'`);
    }

    if (typeof filters.deleted === "boolean") {
      filtersSql.push(`users.\`deleted\` = ${filters.deleted}`);
    }

    filtersSql = filtersSql.map((statement, index) => {
      if (index === 0) return "where " + statement;
      return "and " + statement;
    });
  }

  return `select hosts.*, users.role, users.deleted from \`hosts\` join \`users\` on hosts.id = users.id ${filtersSql.join(" ")} ${orderBySql};`;
};
