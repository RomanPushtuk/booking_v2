import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { Request, Response } from "express";
import { logger } from "../logger";
import { Service } from "typedi";

@Middleware({ type: "after" })
@Service()
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: unknown,
    _request: Request,
    response: Response,
  ) {
    logger.error(error);

    const status = (error as any).status || 500;
    const message = (error as any).message || "Internal Server Error";

    const errors = (error as any).errors ? this.formatErrors((error as any).errors) : undefined;

    response.status(status).json({
      status: "error",
      message,
      errors,
    });
  }

  private formatErrors(errors: any[]) {
    return errors.map((err: any) => ({
      property: err.property,
      constraints: err.constraints,
    }));
  }
}
