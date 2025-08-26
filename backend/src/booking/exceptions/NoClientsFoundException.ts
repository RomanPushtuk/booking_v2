import { error } from "../imports";
export class NoClientsFoundException extends error.classes.BaseException {
  static readonly CODE = "NO_CLIENTS_FOUND";
  static readonly GROUP = error.enums.ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "No clients found matching the criteria";

  constructor({
    message,
    cause,
    context,
  }: error.types.IConstructorException = {}) {
    super({
      cause,
      context,
      code: NoClientsFoundException.CODE,
      group: NoClientsFoundException.GROUP,
      message: message || NoClientsFoundException.DEFAULT_MESSAGE,
    });
  }
}
