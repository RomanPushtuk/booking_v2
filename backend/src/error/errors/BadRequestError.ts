import { BaseError } from "../classes";
import { IBaseConstructorError } from "../types";

export class BadRequestError extends BaseError {
  statusCode = 400;

  constructor(params: IBaseConstructorError) {
    super(params);
  }
}
