import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";

import { shared } from "./imports";
import { diContainer } from "./di";

useContainer(diContainer);

import {
  AuthController,
  ClientController,
  HostController,
} from "./controllers";
import { ErrorHandlerMiddleware, TrackApiMiddleware } from "./middlewares";

const app = express();

const start = () => {
  useExpressServer(app, {
    classTransformer: false,
    defaultErrorHandler: false,
    controllers: [AuthController, ClientController, HostController],
    middlewares: [TrackApiMiddleware, ErrorHandlerMiddleware],
  });

  return app.listen(3000, () => {
    shared.logger.info("BackEnd started on 3000 port");
  });
};

export { start };
