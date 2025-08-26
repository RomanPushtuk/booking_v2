import { BaseError } from "../classes";
import { IBaseConstructorError } from "../types";

export class UnauthorizedError extends BaseError {
  statusCode = 401;

  constructor(params: IBaseConstructorError) {
    super(params);
  }
}
