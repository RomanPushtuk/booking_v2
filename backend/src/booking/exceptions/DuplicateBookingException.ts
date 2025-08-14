import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class DuplicateBookingException extends BaseException {
  static readonly CODE = "DUPLICATE_BOOKING";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Duplicate booking already exists";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: DuplicateBookingException.CODE,
      group: DuplicateBookingException.GROUP,
      message: message || DuplicateBookingException.DEFAULT_MESSAGE,
    });
  }
}
