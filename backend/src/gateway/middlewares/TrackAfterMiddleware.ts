import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";
import { logger } from "../logger";

@Middleware({ type: "after" })
@Service()
export class TrackAfterMiddleware implements ExpressMiddlewareInterface {
  use(): void {
    logger.info("Request has been processed");
  }
}
