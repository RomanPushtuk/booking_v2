import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  BadRequestError,
} from "routing-controllers";
import { logger } from "../logger";
import { Service } from "typedi";
import { Response } from "express";
import { asyncLocalStorage } from "../../context";
import { classValidatorErrorFormat } from "../../shared/utils";
import { BaseException } from "../../shared/errors";
import { ExceptionGroup } from "../../shared/errors";
import { InternalServerException, ValidationException } from "../exceptions";

const mappedExceptionToHttpCode: Record<string, number> = {
  [ExceptionGroup.BAD_REQUEST]: 400,
  [ExceptionGroup.UNAUTHORIZED]: 401,
  [ExceptionGroup.FORBIDDEN]: 403,
  [ExceptionGroup.NOT_FOUND]: 404,
  [ExceptionGroup.SERVER_ERROR]: 500,
};

@Middleware({ type: "after" })
@Service()
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(exception: unknown, _request: Request, _response: Response) {
    logger.error(exception);

    let rootException = exception as Error;

    while (rootException?.cause) rootException = rootException.cause as Error;

    const store = asyncLocalStorage.getStore() as Map<string, string>;
    const traceId = store.get("traceId");

    if (rootException instanceof BaseException) {
      const statusCode = mappedExceptionToHttpCode[rootException.group];

      const error = {
        message: rootException.message,
        code: rootException.code,
        statusCode,
        traceId,
        details: {},
      };

      logger.error({ ...error });

      return _response.status(statusCode).json(error);
    }

    if (
      rootException instanceof BadRequestError &&
      Array.isArray(rootException.errors)
    ) {
      const formattedDetails = classValidatorErrorFormat(rootException.errors);
      const statusCode = mappedExceptionToHttpCode[ExceptionGroup.BAD_REQUEST];

      const error = {
        message: ValidationException.DEFAULT_MESSAGE,
        code: ValidationException.CODE,
        statusCode,
        traceId,
        details: formattedDetails,
      };

      logger.error({ ...error });

      _response.status(statusCode).json(error);
    }

    const statusCode = mappedExceptionToHttpCode[ExceptionGroup.SERVER_ERROR];

    return _response.status(statusCode).json({
      message: InternalServerException.DEFAULT_MESSAGE,
      code: InternalServerException.CODE,
      statusCode,
      traceId,
      details: {},
    });
  }
}
