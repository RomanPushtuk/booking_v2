import { BroadcastChannel } from 'worker_threads';

import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";

import { monitoring } from './imports';

import { useSwagger } from "./swagger";
import { diContainer } from "./di";
import { logger } from "./logger";
import { authorizationChecker, currentUserChecker } from "./utils";

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

const app = express();

useSwagger(app);
monitoring.useMonitoring(app);

const bus = new BroadcastChannel("monitoring");

bus.onmessage = (event: unknown) => {
  // @ts-expect-error 123
  monitoring.insert(event.data)
}

const start = () => {
  useExpressServer(app, {
    cors: true,
    authorizationChecker,
    currentUserChecker,
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
