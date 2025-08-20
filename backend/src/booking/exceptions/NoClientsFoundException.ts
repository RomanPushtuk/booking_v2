import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class NoClientsFoundException extends BaseException {
  static readonly CODE = "NO_CLIENTS_FOUND";
  static readonly GROUP = ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "No clients found matching the criteria";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: NoClientsFoundException.CODE,
      group: NoClientsFoundException.GROUP,
      message: message || NoClientsFoundException.DEFAULT_MESSAGE,
    });
  }
}
