import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class BookingDeletedAccessException extends BaseException {
  static readonly CODE = "BOOKING_DELETED_ACCESS";
  static readonly GROUP = ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "Cannot access deleted booking";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: BookingDeletedAccessException.CODE,
      group: BookingDeletedAccessException.GROUP,
      message: message || BookingDeletedAccessException.DEFAULT_MESSAGE,
    });
  }
}
