import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";

import { monitoring } from "./imports";
import { swagger } from "./swagger";
import { cors } from "./cors";

import { diContainer } from "./di";
import { logger } from "./logger";
import { authorizationChecker, currentUserChecker } from "./utils";

export * as dtos from "./dtos";
export * as enums from "./enums";

useContainer(diContainer);

import {
  AuthController,
  ClientController,
  HostController,
} from "./controllers";
import {
  ErrorHandlerMiddleware,
  TrackBeforeMiddleware,
  TrackAfterMiddleware,
} from "./middlewares";
import path from "path";

const APP_PORT = process.env["NODE_ENV"] === "production" ? 80 : 3000;

const app = express();

const start = () => {
  cors.useCors(app);
  swagger.useSwagger(app);
  monitoring.useMonitoring(app);

  useExpressServer(app, {
    authorizationChecker,
    currentUserChecker,
    classTransformer: true,
    validation: true,
    defaultErrorHandler: false,
    routePrefix: "/api",
    controllers: [AuthController, ClientController, HostController],
    middlewares: [
      TrackBeforeMiddleware,
      TrackAfterMiddleware,
      ErrorHandlerMiddleware,
    ],
  });

  app.use("/", express.static(path.join(__dirname, "client")));
  app.get("/*", (_req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
  });

  return app.listen(APP_PORT, () => {
    logger.info(`BackEnd started on ${APP_PORT} port`);
  });
};

export { start };
