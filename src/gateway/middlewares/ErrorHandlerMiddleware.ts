import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import { Service } from "typedi";

@Middleware({ type: "after" })
@Service()
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: unknown,
    _request: Request,
    _response: Response,
    next: NextFunction,
  ) {
    logger.error(error);
    next(error);
  }
}
