import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";
import { logger } from "../logger";

@Middleware({ type: "after" })
@Service()
export class TrackAfterMiddleware implements ExpressMiddlewareInterface {
  use(_request: Request, response: Response,): void {
    console.log(response.headers)
    logger.info("Request has been processed");
  }
}
