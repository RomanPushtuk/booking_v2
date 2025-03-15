import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { diContainer } from "./di";

useContainer(diContainer);

import {
  AuthController,
  ClientController,
  HostController,
} from "./controllers";

export const start = async () => {
  const app = express();

  useExpressServer(app, {
    classTransformer: false,
    controllers: [AuthController, ClientController, HostController],
  });

  app.listen(3000, () => {
    console.log("BackEnd started on 3000 port");
  });
};
