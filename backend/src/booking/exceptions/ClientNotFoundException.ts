import {
  BaseException,
  ExceptionGroup,
  IConstructorException,
} from "../../shared/errors/BaseException";

export class ClientNotFoundException extends BaseException {
  static readonly CODE = "CLIENT_NOT_FOUND";
  static readonly GROUP = ExceptionGroup.NOT_FOUND;
  static readonly DEFAULT_MESSAGE = "Client not found";

  constructor({ message, cause, context }: IConstructorException = {}) {
    super({
      cause,
      context,
      code: ClientNotFoundException.CODE,
      group: ClientNotFoundException.GROUP,
      message: message || ClientNotFoundException.DEFAULT_MESSAGE,
    });
  }
}
