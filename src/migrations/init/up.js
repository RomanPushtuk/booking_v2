const createAuthModuleUserTable = `
    CREATE TABLE users (
        id TEXT PRIMARY KEY,
        login TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        deleted INTEGER NOT NULL DEFAULT 0
    );
`;

const createBookingModuleUserTable = `
    CREATE TABLE users (
        id TEXT PRIMARY KEY,
        role TEXT NOT NULL,
        deleted INTEGER NOT NULL DEFAULT 0
    );
`;

const createBookingModuleClientsTable = `
    CREATE TABLE clients (
        id TEXT PRIMARY KEY,
        FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
    );
`;

const createBookingModuleHostsTable = `
    CREATE TABLE hosts (
        id TEXT PRIMARY KEY,
        forwardBooking TEXT NOT NULL,
        workHours TEXT NOT NULL, -- JSON строка
        workDays TEXT NOT NULL, -- JSON строка
        FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
    );
`;

const createBookingModuleBookingsTable = `
    CREATE TABLE bookings (
        id TEXT PRIMARY KEY,
        clientId TEXT NOT NULL,
        hostId TEXT NOT NULL,
        fromDateTime TEXT NOT NULL, -- ISO8601
        toDateTime TEXT NOT NULL, -- ISO8601
        FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE,
        FOREIGN KEY (hostId) REFERENCES specialists(id) ON DELETE CASCADE
    );
`;

module.exports = {
  createAuthModuleUserTable,
  createBookingModuleUserTable,
  createBookingModuleClientsTable,
  createBookingModuleHostsTable,
  createBookingModuleBookingsTable,
};
