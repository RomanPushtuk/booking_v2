import path from "path";
import http from "http";
import { BroadcastChannel } from "worker_threads";
import * as ws from "ws";

import Datastore from "@seald-io/nedb";
import throttle from "lodash.throttle";
import { Application, Request, Response } from "express";

import { config } from "./imports";

import {
  cleanOldestFileInFolder,
  createArchive,
  getFolderSize,
  getFileSize,
  createFileIfNotExists,
  createFolderIfNotExists,
  mapDataToMessage,
} from "./utils";
import { MAX_DB_SIZE_BYTES, MAX_LOG_FOLDER_SIZE_BYTES } from "./config";

import type { Data } from "./types";

// The buffer is used during database archiving.
// While the database is being archived with a subsequent reset,
// it is not writable, for this purpose a temporary buffer was created
// in which the data is stored. After the archiving is completed,
// the data from the buffer fills the database again.
let bufferMode = false;
let buffer: Data[] = [];

createFileIfNotExists(config.MONITORING_DB_PATH);
const LOG_ARCHIVES_FOLDER = path.resolve(__dirname, "./logs");
createFolderIfNotExists(LOG_ARCHIVES_FOLDER);

const MONITORING_SERVER_PORT = 3001;

let db = new Datastore({ filename: config.MONITORING_DB_PATH, autoload: true });

let connections: ws.WebSocket[] = [];

const checkDbSizeAndArchive = throttle(() => {
  const size = getFileSize(config.MONITORING_DB_PATH);
  if (size < MAX_DB_SIZE_BYTES) return;
  bufferMode = true;
  createArchive(config.MONITORING_DB_PATH, LOG_ARCHIVES_FOLDER);
  db.dropDatabase();
  db = new Datastore({ filename: config.MONITORING_DB_PATH, autoload: true });
  bufferMode = false;
}, 500);

const checkFolderSizeAndCleanOldestFile = throttle(() => {
  const folderSize = getFolderSize(LOG_ARCHIVES_FOLDER);
  if (folderSize < MAX_LOG_FOLDER_SIZE_BYTES) return;
  cleanOldestFileInFolder(LOG_ARCHIVES_FOLDER);
}, 500);

const insert = async (data?: Data): Promise<Data | void> => {
  if (!data || !data.time) return;

  if (bufferMode) {
    buffer.push(data);
    return data;
  }

  if (buffer.length) {
    // flush buffer
    for (const bufferedData of buffer) {
      await insert(bufferedData);
    }
    buffer = [];
  }

  checkDbSizeAndArchive();
  checkFolderSizeAndCleanOldestFile();

  // @ts-ignore: Nedb typings don't have insertAsync, you might need to promisify
  await db.insertAsync(data);

  connections.forEach((ws) => {
    ws.send(mapDataToMessage(data));
  });
};

const useMonitoring = (app: Application): void => {
  const server = http.createServer();
  const wss = new ws.WebSocketServer({ server });

  app.get("/logs", async (req: Request, res: Response) => {
    if (!req.query["filter"]) return res.json([]);

    let filter: any;

    try {
      filter = JSON.parse(req.query["filter"] as string);
    } catch {
      return res.status(400).json({ error: "Invalid filter JSON" });
    }

    const docs = await db.findAsync(filter).execAsync();

    const messages = docs.map((doc: any) => ({
      time: doc.time,
      text: JSON.stringify(doc),
    }));

    return res.json(messages);
  });

  wss.on("connection", (ws) => {
    connections.push(ws);

    ws.on("close", () => {
      connections = connections.filter((cws) => cws !== ws);
    });
  });

  server.listen(MONITORING_SERVER_PORT, () => {
    console.log(
      `Monitoring server running at http://localhost:${MONITORING_SERVER_PORT}`,
    );
  });
};

// BroadcastChannel
const bus = new BroadcastChannel("monitoring");
bus.onmessage = (event: unknown) => {
  if (typeof event === "object" && event !== null && "data" in event) {
    insert(event.data as Data);
  }
};

export { useMonitoring, insert };
