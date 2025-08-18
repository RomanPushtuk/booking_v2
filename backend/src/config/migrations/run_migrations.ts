import { DatabaseSync } from "node:sqlite";
import { BOOKING_DB_PATH, AUTH_DB_PATH } from "../config";

const authDb = new DatabaseSync(AUTH_DB_PATH);
const bookingDb = new DatabaseSync(BOOKING_DB_PATH);

import {
  createAuthModuleUserTable,
  createBookingModuleUserTable,
  createBookingModuleClientsTable,
  createBookingModuleHostsTable,
  createBookingModuleBookingsTable,
} from "./init/up";

import {
  dropAuthModuleUsersTable,
  dropBookingModuleUsersTable,
  dropBookingModuleClientsTable,
  dropBookingModuleHostsTable,
  dropBookingModuleBookingsTable
} from "./init/down";

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
