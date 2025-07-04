import { shared } from "../imports";

export class User {
  id: string;
  login: string;
  password: string;
  role: shared.enums.Roles;
  deleted: boolean;

  constructor(data: shared.types.GetInterface<User>) {
    this.id = data.id;
    this.login = data.login;
    this.password = data.password;
    this.role = data.role;
    this.deleted = Boolean(data.deleted);
  }
}
