import { error } from "../imports";

export class BookingDeletedAccessException extends error.classes.BaseException {
  static readonly CODE = "BOOKING_DELETED_ACCESS";
  static readonly GROUP = error.enums.ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "Cannot access deleted booking";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: BookingDeletedAccessException.CODE,
      group: BookingDeletedAccessException.GROUP,
      message: message || BookingDeletedAccessException.DEFAULT_MESSAGE,
    });
  }
}
