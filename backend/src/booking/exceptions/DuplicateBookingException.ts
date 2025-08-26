import { error } from "../imports";

export class DuplicateBookingException extends error.classes.BaseException {
  static readonly CODE = "DUPLICATE_BOOKING";
  static readonly GROUP = error.enums.ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Duplicate booking already exists";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: DuplicateBookingException.CODE,
      group: DuplicateBookingException.GROUP,
      message: message || DuplicateBookingException.DEFAULT_MESSAGE,
    });
  }
}
