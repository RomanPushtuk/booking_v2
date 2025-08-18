const dropAuthModuleUsersTable = `
    DROP TABLE IF EXISTS users;
`;

const dropBookingModuleUsersTable = `
    DROP TABLE IF EXISTS users;
`;

const dropBookingModuleClientsTable = `
    DROP TABLE IF EXISTS clients;
`;

const dropBookingModuleHostsTable = `
    DROP TABLE IF EXISTS hosts;
`;

const dropBookingModuleBookingsTable = `
    DROP TABLE IF EXISTS bookings;
`;

export {
  dropAuthModuleUsersTable,
  dropBookingModuleUsersTable,
  dropBookingModuleClientsTable,
  dropBookingModuleHostsTable,
  dropBookingModuleBookingsTable,
};
