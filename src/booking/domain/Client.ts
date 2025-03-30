import { shared } from "../imports";

export class Client {
  id: string;
  deleted: boolean;

  constructor(data: shared.types.GetInterface<Client>) {
    this.id = data.id;
    this.deleted = data.deleted;
  }
}
