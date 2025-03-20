import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { shared } from "../imports";
import { asyncLocalStorage } from "../../context";

@Middleware({ type: "before" })
@Service()
export class TrackBeforeMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: NextFunction): void {
    const traceId = shared.utils.generateId();

    const payload = {
      body: request.body,
      host: request.host,
      userIp: request.ip,
      method: request.method,
      url: request.url,
      params: request.params,
      query: request.query,
      protocol: request.protocol,
      traceId,
    };

    shared.logger.info(payload, "Received a new request");

    asyncLocalStorage.run(new Map(), () => {
      const store = asyncLocalStorage.getStore() as Map<string, string>;
      store.set("traceId", traceId);
      store.set("userIp", request.ip || "");
      response.setHeader("x-trace-id", traceId);
      next();
    });
  }
}
