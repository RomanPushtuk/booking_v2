import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class BookingTransferNotAllowedException extends BaseException {
  static readonly CODE = "BOOKING_TRANSFER_NOT_ALLOWED";
  static readonly GROUP = ExceptionGroup.BAD_REQUEST;
  static readonly DEFAULT_MESSAGE = "Booking transfer is not allowed";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: BookingTransferNotAllowedException.CODE,
      group: BookingTransferNotAllowedException.GROUP,
      message: message || BookingTransferNotAllowedException.DEFAULT_MESSAGE,
    });
  }
}
