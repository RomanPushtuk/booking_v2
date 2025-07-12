Error.stackTraceLimit = Infinity;
import "reflect-metadata";
import { Socket } from "net";

import * as gateway from "./gateway/exports";
import * as shared from "./shared/exports";
import * as monitoring from "./monitoring/exports";

let connections: Socket[] = [];

const timeoutId = monitoring.start();
const server = gateway.start();

server.on("connection", (connection) => {
  connections.push(connection);
  connection.on("close", () => {
    connections = connections.filter((curr) => curr !== connection);
  });
});

process.on("uncaughtException", (err, origin) => {
  shared.logger.fatal(err, `Exception origin: ${origin}`);

  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGINT", () => {
  shared.logger.info("Received kill signal, shutting down gracefully\n");
  clearInterval(timeoutId);

  server.close(() => {
    shared.logger.info("Closed out remaining connections\n");
    process.exit(0);
  });

  connections.forEach((curr) => curr.end());

  setTimeout(() => {
    shared.logger.error(
      "Could not close connections in time, forcefully shutting down\n",
    );

    connections.forEach((curr) => curr.destroy());
    process.exit(1);
  }, 1000);
});
