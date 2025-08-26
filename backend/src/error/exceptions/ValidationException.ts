import { BaseException } from "../classes";
import { ExceptionGroup } from "../enums";
import { IConstructorException } from "../types";

export class ValidationException extends BaseException {
  static readonly DEFAULT_MESSAGE = "Validation error";
  static readonly CODE = "VALIDATION_ERROR";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: ValidationException.CODE,
      group: ValidationException.GROUP,
      message: message || ValidationException.DEFAULT_MESSAGE,
    });
  }
}
