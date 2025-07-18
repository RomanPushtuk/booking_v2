import swaggerUi, { JsonObject } from "swagger-ui-express";
import { Express, Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import basicAuth from "basic-auth";
import dotenv from "dotenv";

dotenv.config();

const yamlFilePath = path.join(__dirname, "./BookingYml.openapi.yaml");

const swaggerDocument = yaml.load(
  fs.readFileSync(yamlFilePath, "utf8"),
) as JsonObject;

const auth = (req: Request, res: Response, next: NextFunction) => {
  const user = basicAuth(req);
  if (
    user &&
    user.name === "swagger" &&
    user.pass === process.env["SWAGGER_PASSWORD"]
  ) {
    return next();
  }

  res.setHeader("WWW-Authenticate", 'Basic realm="Swagger UI"');
  res.status(401).send("Access denied");
  return Promise.resolve();
};

export const useSwagger = (app: Express) => {
  app.use("/api-docs", auth, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
