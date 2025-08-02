import { ValidationError } from "class-validator";

export function classValidatorErrorFormat(
  errors: ValidationError[] | undefined,
): Record<string, string[]> {
  if (!errors) return {};

  const formatted: Record<string, string[]> = {};

  for (const error of errors) {
    if (error.constraints) {
      formatted[error.property] = Object.values(error.constraints);
    }

    if (error.children?.length) {
      const childErrors = classValidatorErrorFormat(error.children);
      for (const [key, messages] of Object.entries(childErrors)) {
        formatted[`${error.property}.${key}`] = messages;
      }
    }
  }

  return formatted;
}
