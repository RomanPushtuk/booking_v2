import { error } from "../imports";

export class BookingTransferNotAllowedException extends error.classes
  .BaseException {
  static readonly CODE = "BOOKING_TRANSFER_NOT_ALLOWED";
  static readonly GROUP = error.enums.ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Booking transfer is not allowed";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: BookingTransferNotAllowedException.CODE,
      group: BookingTransferNotAllowedException.GROUP,
      message: message || BookingTransferNotAllowedException.DEFAULT_MESSAGE,
    });
  }
}
