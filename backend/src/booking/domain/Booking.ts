import { BookingProperties, UpdateBookingData } from "../types";

export class Booking {
  private _id: string;
  private _clientId: string;
  private _hostId: string;
  private _fromDateTime: string;
  private _toDateTime: string;
  private _deleted: boolean;

  constructor(data: BookingProperties) {
    this._id = data.id;
    this._clientId = data.clientId;
    this._hostId = data.hostId;
    this._fromDateTime = data.fromDateTime;
    this._toDateTime = data.toDateTime;
    this._deleted = Boolean(data.deleted);
  }

  static update(booking: Booking, updateData: UpdateBookingData) {
    const entries = Object.entries(updateData);

    for (const [key, value] of entries) {
      switch (key) {
        case "clientId":
          booking.setFromDateTime(value);
          break;
        case "hostId":
          booking.setToDateTime(value);
          break;
        case "fromDateTime":
          booking.setFromDateTime(value);
          break;
        case "toDateTime":
          booking.setToDateTime(value);
          break;
      }
    }
  }

  getId() {
    return this._id;
  }

  getClientId() {
    return this._clientId;
  }

  getHostId() {
    return this._hostId;
  }

  getFromDateTime() {
    return this._fromDateTime;
  }

  getToDateTime() {
    return this._toDateTime;
  }

  getDeleted() {
    return this._deleted;
  }

  setDeleted(flag: boolean) {
    this._deleted = flag;
  }

  setFromDateTime(fromDateTime: string) {
    this._fromDateTime = fromDateTime;
  }

  setToDateTime(toDateTime: string) {
    this._toDateTime = toDateTime;
  }
}
