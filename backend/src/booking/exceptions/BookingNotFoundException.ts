import { error } from "../imports";

export class BookingNotFoundException extends error.classes.BaseException {
  static readonly CODE = "BOOKING_NOT_FOUND";
  static readonly GROUP = error.enums.ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "Booking not found";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: BookingNotFoundException.CODE,
      group: BookingNotFoundException.GROUP,
      message: message || BookingNotFoundException.DEFAULT_MESSAGE,
    });
  }
}
