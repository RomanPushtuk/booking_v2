import fs from "fs";
import { DatabaseSync } from "node:sqlite";

import {
	AUTH_DB_PATH,
	BOOKING_DB_PATH,
	INFO_DB_PATH,
	MONITORING_DB_PATH,
	VERION_STORAGE_DB_PATH
} from './config'

import {
	createAuthModuleUserTable,
	createBookingModuleUserTable,
	createBookingModuleClientsTable,
	createBookingModuleHostsTable,
	createBookingModuleBookingsTable,
} from "./migrations/init/up";
import { logger } from "./logger";

export const init = () => {
	if (!fs.existsSync(AUTH_DB_PATH)) {
		logger.info("The database for the auth module was not found. Creating...");
		fs.writeFileSync(AUTH_DB_PATH, '', "utf8");
		logger.info("The database for the Auth module has been created.");
		const authDb = new DatabaseSync(AUTH_DB_PATH);
		logger.info("Need to apply migrations for Auth module. Applying...");
		authDb.exec(createAuthModuleUserTable);
		logger.info("Migrations for Auth module applied.")
	}

	if (!fs.existsSync(BOOKING_DB_PATH)) {
		logger.info("The database for the Booking module was not found. Creating...");
		fs.writeFileSync(BOOKING_DB_PATH, '', "utf8");
		logger.info("The database for the Booking module has been created.");
		const bookingDb = new DatabaseSync(BOOKING_DB_PATH);
		logger.info("Need to apply migrations for Booking module. Applying...");
		bookingDb.exec(createBookingModuleUserTable);
		bookingDb.exec(createBookingModuleClientsTable);
		bookingDb.exec(createBookingModuleHostsTable);
		bookingDb.exec(createBookingModuleBookingsTable);
		logger.info("Migrations for Booking module applied.")
	}

	if (!fs.existsSync(INFO_DB_PATH)) {
		logger.info("The database for the Info module was not found. Creating...");
		fs.writeFileSync(INFO_DB_PATH, '', "utf8");
		logger.info("The database for the Info module has been created.");
	}

	if (!fs.existsSync(MONITORING_DB_PATH)) {
		logger.info("The database for the Monitoring module was not found. Creating...");
		fs.writeFileSync(MONITORING_DB_PATH, '', "utf8");
		logger.info("The database for the Monitoring module has been created.");
	}

	if (!fs.existsSync(VERION_STORAGE_DB_PATH)) {
		logger.info("The database for the VersionStorage feature of Booking module was not found. Creating...");
		fs.writeFileSync(VERION_STORAGE_DB_PATH, '', "utf8");
		logger.info("The database for the VersionStorage has been created.");
	}
}
