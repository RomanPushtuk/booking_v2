import { shared } from "../imports";
import { UserProperties } from "../types";

export class User {
  _id: string;
  _role: shared.enums.Roles;
  _deleted: boolean;

  constructor(data: UserProperties) {
    this._id = data.id;
    this._role = data.role as shared.enums.Roles;
    this._deleted = data.deleted;
  }

  getId() {
    return this._id;
  }

  getRole() {
    return this._role;
  }

  setDeleted(flag: boolean) {
    this._deleted = flag;
  }

  getDeleted() {
    return this._deleted;
  }
}
