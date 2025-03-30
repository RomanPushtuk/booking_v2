import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";

import { diContainer } from "./di";
import { logger } from "./logger";

export * as dtos from "./dtos";

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
import { setupSwagger } from "./swagger";

const app = express();

const args = process.argv.slice(2);
const enableSwagger = args.includes("swagger");


if (enableSwagger) setupSwagger(app);

const start = () => {
  useExpressServer(app, {
    classTransformer: true,
    validation: true,
    defaultErrorHandler: false,
    controllers: [AuthController, ClientController, HostController],
    middlewares: [
      TrackBeforeMiddleware,
      TrackAfterMiddleware,
      ErrorHandlerMiddleware,
    ],
  });
  return app.listen(3000, () => {
    logger.info("BackEnd started on 3000 port");
  });
};

export { start };
