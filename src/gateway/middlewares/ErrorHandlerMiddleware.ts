import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { shared } from "../imports";
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
    if (error instanceof HttpError) {
      shared.logger.error(error);
    }
    next(error);
  }
}
