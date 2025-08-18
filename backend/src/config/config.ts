import path from "node:path";

const isProdMode = process.env["NODE_ENV"] === "production";
const cwd = process.cwd();

export const APP_PORT = isProdMode ? 80 : 3000;

export const AUTH_DB_PATH = isProdMode
	? path.resolve(cwd, 'dist', 'auth.db')
	: path.resolve(cwd, 'src', 'auth', 'db', 'auth.db')

export const BOOKING_DB_PATH = isProdMode
	? path.resolve(cwd, 'dist', 'booking.db')
	: path.resolve(cwd, 'src', 'booking', 'db', 'booking.db');

export const INFO_DB_PATH = isProdMode
	? path.resolve(cwd, 'dist', 'info.db')
	: path.resolve(cwd, 'src', 'info', 'db', 'info.db');

export const MONITORING_DB_PATH = isProdMode
	? path.resolve(cwd, 'dist', 'monitoring.db')
	: path.resolve(cwd, 'src', 'monitoring', 'monitoring.db');

export const VERION_STORAGE_DB_PATH = isProdMode
	? path.resolve(cwd, 'dist', 'versions.db')
	: path.resolve(cwd, 'src', 'booking', 'vs', 'versions.db');

