const path = require("path");
const http = require("http");

const Datastore = require("@seald-io/nedb");
const throttle = require("lodash.throttle");
const WebSocket = require("ws");

const {
  cleanOldestFileInFolder,
  createArchive,
  getFolderSize,
  getFileSize,
  createFileIfNotExists,
  createFolderIfNotExists,
  mapDataToMessage,
} = require("./utils");

const MAX_DB_SIZE_BYTES = 0.01 * 1024 * 1024; // 1 MB
const MAX_LOG_FOLDER_SIZE_BYTES = 0.03 * 1024 * 1024; // 10 MB

// When the database archiving process begins,
// we need to wait a certain amount of time until
// the process is over. To do this, we save all
// the data to a temporary buffer during archiving.
let bufferMode = false;
let buffer = [];

const DB_FILE_PATH = path.resolve(__dirname, "./monitoring.db");
createFileIfNotExists(DB_FILE_PATH);
const LOG_ARCHIVES_FOLDER = path.resolve(__dirname, "./logs");
createFolderIfNotExists(LOG_ARCHIVES_FOLDER);
const HTML_PAGE_PATH = path.resolve(__dirname, "./index.html");
const MONITORING_SERVER_PORT = 3001;

let db = new Datastore({ filename: DB_FILE_PATH, autoload: true });

let connections = [];

const checkDbSizeAndArchive = throttle(() => {
  const size = getFileSize(DB_FILE_PATH);
  if (size < MAX_DB_SIZE_BYTES) return;
  bufferMode = true;
  createArchive(DB_FILE_PATH, LOG_ARCHIVES_FOLDER);
  db.dropDatabase();
  db = new Datastore({ filename: DB_FILE_PATH, autoload: true });
  bufferMode = false;
}, 500);

const checkFolderSizeAndCleanOldestFile = throttle(() => {
  const folderSize = getFolderSize(LOG_ARCHIVES_FOLDER);
  if (folderSize < MAX_LOG_FOLDER_SIZE_BYTES) return;
  cleanOldestFileInFolder(LOG_ARCHIVES_FOLDER);
}, 500);

const insert = async (data) => {
  if (!data) return;
  if (!data.time) return;

  if (bufferMode) {
    buffer.push(data);
    return data;
  }

  if (buffer.length) {
    buffer.forEach(insert);
    buffer = [];
  }

  checkDbSizeAndArchive();
  checkFolderSizeAndCleanOldestFile();

  await db.insertAsync(data);

  connections.forEach((ws) => {
    const message = mapDataToMessage(data);
    ws.send(message);
  });
};

const useMonitoring = (app) => {
  const server = http.createServer();
  const wss = new WebSocket.Server({ server });

  app.get("/analytics", (_, res, next) => {
    res.sendFile(HTML_PAGE_PATH, (err) => {
      if (err) next(err);
    });
  });

  app.get("/logs", async (req, res) => {
    if (!req.query.filter) return res.json([]);
    const filter = JSON.parse(req.query.filter);
    const docs = await db.findAsync(filter).execAsync();
    const messages = docs.map((doc) => ({
      time: doc.time,
      text: JSON.stringify(doc),
    }));
    res.json(messages);
  });

  wss.on("connection", (ws) => {
    connections.push(ws);

    ws.on("close", () => {
      connections.filter((cws) => cws !== ws);
    });
  });

  server.listen(MONITORING_SERVER_PORT, () => {
    console.log(
      `Monitoring server running at http://localhost:${MONITORING_SERVER_PORT}`,
    );
  });
};

module.exports = {
  useMonitoring,
  insert,
};
