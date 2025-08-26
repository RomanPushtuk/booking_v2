import { error } from "../imports";

export class OverlappingBookingsException extends error.classes.BaseException {
  static readonly CODE = "OVERLAPPING_BOOKINGS";
  static readonly GROUP = error.enums.ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Booking overlaps with existing bookings";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: OverlappingBookingsException.CODE,
      group: OverlappingBookingsException.GROUP,
      message: message || OverlappingBookingsException.DEFAULT_MESSAGE,
    });
  }
}
