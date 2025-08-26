import { registerDecorator, ValidationOptions } from "class-validator";

// TODO - resolve modularity conflict
import { validateDurationFormat, validateTimeIntervals } from "../../booking/utils";


export function IsDurationFormat(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: "isDurationFormat",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          if (typeof value !== "string") return false;
          try {
            validateDurationFormat(value);
            return true;
          } catch {
            return false;
          }
        },
        defaultMessage(): string {
          return `Property must be a valid ISO 8601 duration format (e.g., P1D, P1W, P1M, P1Y, PT1H)`;
        },
      },
    });
  };
}

export function IsValidTimeIntervals(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: "isValidTimeIntervals",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          if (!Array.isArray(value)) return false;
          try {
            validateTimeIntervals(value);
            return true;
          } catch {
            return false;
          }
        },
        defaultMessage(): string {
          return `Property must be valid time intervals with proper time format (HH:MM), chronological order, and no overlaps`;
        },
      },
    });
  };
}
