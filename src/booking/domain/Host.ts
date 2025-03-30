import { shared } from "../imports";

export class Host {
  id: string;
  forwardBooking: string;
  workHours: {
    from: string;
    to: string;
  }[];
  workDays: string[];
  deleted: boolean;

  constructor(data: shared.types.GetInterface<Host>) {
    this.id = data.id;
    this.forwardBooking = data.forwardBooking;
    this.workHours = data.workHours;
    this.workDays = data.workDays;
    this.deleted = data.deleted;
  }
}
