const { DatabaseSync } = require("node:sqlite");
const authDb = new DatabaseSync("src/auth/db/database.db");

const { createAuthModuleUserTable } = require("./init/up");
const { dropAuthModuleUsersTable } = require("./init/down");

const mode = process.argv[2];

if (mode == "up") {
  authDb.exec(createAuthModuleUserTable);
}

if (mode == "down") {
  authDb.exec(dropAuthModuleUsersTable);
}
