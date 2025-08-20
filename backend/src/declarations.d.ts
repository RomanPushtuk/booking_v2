import { ValidationError } from "class-validator";

declare module "routing-controllers" {
  interface BadRequestError {
    errors?: ValidationError[];
  }
}
