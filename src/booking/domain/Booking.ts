import { shared } from "../imports";

export class Booking {
  id: string;
  clientId: string;
  hostId: string;
  fromDateTime: string;
  toDateTime: string;
  deleted: boolean;

  constructor(data: shared.types.GetInterface<Booking>) {
    this.id = data.id;
    this.clientId = data.clientId;
    this.hostId = data.hostId;
    this.fromDateTime = data.fromDateTime;
    this.toDateTime = data.toDateTime;
    this.deleted = Boolean(data.deleted);
  }
}
