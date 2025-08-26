import { error } from "../imports";

export class ClientNotFoundException extends error.classes.BaseException {
  static readonly CODE = "CLIENT_NOT_FOUND";
  static readonly GROUP = error.enums.ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "Client not found";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: ClientNotFoundException.CODE,
      group: ClientNotFoundException.GROUP,
      message: message || ClientNotFoundException.DEFAULT_MESSAGE,
    });
  }
}
