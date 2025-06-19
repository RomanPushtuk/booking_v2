import { BookingProperties } from "../types";

export class Booking {
  id: string;
  clientId: string;
  hostId: string;
  fromDateTime: string;
  toDateTime: string;
  deleted: boolean;

  constructor(data: BookingProperties) {
    this.id = data.id;
    this.clientId = data.clientId;
    this.hostId = data.hostId;
    this.fromDateTime = data.fromDateTime;
    this.toDateTime = data.toDateTime;
    this.deleted = Boolean(data.deleted);
  }

  getId() {
    return this.id;
  }

  getHostId() {
    return this.hostId;
  }

  setDeleted(flag: boolean) {
    this.deleted = flag;
  }
}
