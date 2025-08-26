import { error } from "../imports";

export class HostNotFoundException extends error.classes.BaseException {
  static readonly CODE = "HOST_NOT_FOUND";
  static readonly GROUP = error.enums.ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "Host not found";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: HostNotFoundException.CODE,
      group: HostNotFoundException.GROUP,
      message: message || HostNotFoundException.DEFAULT_MESSAGE,
    });
  }
}
