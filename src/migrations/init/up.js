const createAuthModuleUserTable = `
    CREATE TABLE users (
        id TEXT PRIMARY KEY,
        login TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        deleted INTEGER NOT NULL DEFAULT 0
    );
`;

module.exports = { createAuthModuleUserTable };
