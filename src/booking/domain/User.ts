import { shared } from "../imports";
import { UserProperties } from "../types";

export class User {
  id: string;
  role: shared.enums.Roles;
  deleted: boolean;

  constructor(data: UserProperties) {
    this.id = data.id;
    this.role = data.role as shared.enums.Roles;
    this.deleted = data.deleted;
  }

  getId() {
    return this.id;
  }

  getRole() {
    return this.role;
  }

  setDeleted(flag: boolean) {
    this.deleted = flag;
  }

  getDeleted() {
    return this.deleted;
  }
}
