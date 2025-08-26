import { error } from "../imports";

export class NoBookingsFoundException extends error.classes.BaseException {
  static readonly CODE = "NO_BOOKINGS_FOUND";
  static readonly GROUP = error.enums.ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "No bookings found matching the criteria";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: NoBookingsFoundException.CODE,
      group: NoBookingsFoundException.GROUP,
      message: message || NoBookingsFoundException.DEFAULT_MESSAGE,
    });
  }
}
