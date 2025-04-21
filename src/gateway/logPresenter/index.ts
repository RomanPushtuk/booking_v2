import { Express, Response, NextFunction } from "express";

export const useLogPresenter = (app: Express) => {
  app.get("/logs", (_, res: Response, next: NextFunction) => {
    const filePath = "/logs/output.log";

    res.sendFile(filePath, { root: process.cwd() }, (err) => {
      if (err) {
        next(err);
      } else {
        console.log("Sent the logs..");
      }
    });
  });
};
