import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { Service } from "typedi";
import { Response } from "express";

import { error } from "../imports";
import { logger } from "../logger";

@Middleware({ type: "after" })
@Service()
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(exception: unknown, _request: Request, _response: Response) {
    logger.error(exception);

    const errorInstance = error.handler(exception);

    logger.error({ ...errorInstance });

    return _response.status(errorInstance.statusCode).json(errorInstance);
  }
}
