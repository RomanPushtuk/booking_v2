import { BadRequestError } from "routing-controllers";

import { BaseException } from "./classes";
import { ExceptionGroup } from "./enums";
import {
  ForbiddenError,
  UnauthorizedError,
  BadRequestError as AppBadRequestError,
  NotFoundError,
  InternalServerError,
} from "./errors";
import { classValidatorErrorFormat } from "./utils";
import { InternalServerException, ValidationException } from "./exceptions";
import { asyncLocalStorage } from "../context";

const mappedExceptionToHttpError = {
  [ExceptionGroup.BAD_REQUEST]: AppBadRequestError,
  [ExceptionGroup.UNAUTHORIZED]: UnauthorizedError,
  [ExceptionGroup.FORBIDDEN]: ForbiddenError,
  [ExceptionGroup.NOT_FOUND]: NotFoundError,
  [ExceptionGroup.SERVER_ERROR]: InternalServerError,
};

export const handler = (exception: unknown) => {
  let rootException = exception as Error;

  while (rootException?.cause) rootException = rootException.cause as Error;

  const store = asyncLocalStorage.getStore() as Map<string, string>;
  const traceId = store.get("traceId");

  if (rootException instanceof BaseException) {
    const Error = mappedExceptionToHttpError[rootException.group];

    return new Error({
      message: rootException.message,
      code: rootException.code,
      traceId,
      details: {},
    });
  }

  if (
    rootException instanceof BadRequestError &&
    Array.isArray(rootException.errors)
  ) {
    const formattedDetails = classValidatorErrorFormat(rootException.errors);

    return new AppBadRequestError({
      message: ValidationException.DEFAULT_MESSAGE,
      code: ValidationException.CODE,
      traceId,
      details: formattedDetails,
    });
  }

  return new InternalServerError({
    message: InternalServerException.DEFAULT_MESSAGE,
    code: InternalServerException.CODE,
    traceId,
    details: {},
  });
};
