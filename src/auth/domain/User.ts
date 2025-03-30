import { validateSync } from "class-validator";
import { shared } from "../imports";

export class User {
  id: string;
  login: string;
  password: string;
  role: string;
  deleted: boolean;

  constructor(data: shared.types.GetInterface<User>) {
    this.id = data.id;
    this.login = data.login;
    this.password = data.password;
    this.role = data.role;
    this.deleted = Boolean(data.deleted);

    const errors = validateSync(this);
    if (errors.length)
      throw new shared.errors.DTOValidationError(User.name, errors);
  }
}
