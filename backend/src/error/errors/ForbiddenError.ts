import { BaseError } from "../classes";
import { IBaseConstructorError } from "../types";

export class ForbiddenError extends BaseError {
  statusCode = 403;

  constructor(params: IBaseConstructorError) {
    super(params);
  }
}
