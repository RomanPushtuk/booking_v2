import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";
import { shared } from "../imports";

@Middleware({ type: "after" })
@Service()
export class TrackAfterMiddleware implements ExpressMiddlewareInterface {
  use(): void {
    shared.logger.info("Request has been processed");
  }
}
