import { ValidationError } from "class-validator";

export class DTOValidationError extends Error {
  errors: ValidationError[];

  constructor(name: string, errors: ValidationError[]) {
    super(`Validation error for ${name}`);
    this.errors = errors;
  }
}
