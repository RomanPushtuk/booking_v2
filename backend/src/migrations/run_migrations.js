const { DatabaseSync } = require("node:sqlite");
const authDb = new DatabaseSync("src/auth/db/auth.db");
const bookingDb = new DatabaseSync("src/booking/db/booking.db");

const {
  createAuthModuleUserTable,
  createBookingModuleUserTable,
  createBookingModuleClientsTable,
  createBookingModuleHostsTable,
  createBookingModuleBookingsTable,
} = require("./init/up");

const {
  dropAuthModuleUsersTable,
  dropBookingModuleUsersTable,
  dropBookingModuleClientsTable,
  dropBookingModuleHostsTable,
  dropBookingModuleBookingsTable,
} = require("./init/down");

const mode = process.argv[2];

if (mode == "up") {
  authDb.exec(createAuthModuleUserTable);

  bookingDb.exec(createBookingModuleUserTable);
  bookingDb.exec(createBookingModuleClientsTable);
  bookingDb.exec(createBookingModuleHostsTable);
  bookingDb.exec(createBookingModuleBookingsTable);
}

if (mode == "down") {
  authDb.exec(dropAuthModuleUsersTable);

  bookingDb.exec(dropBookingModuleBookingsTable);
  bookingDb.exec(dropBookingModuleClientsTable);
  bookingDb.exec(dropBookingModuleHostsTable);
  bookingDb.exec(dropBookingModuleUsersTable);
}
