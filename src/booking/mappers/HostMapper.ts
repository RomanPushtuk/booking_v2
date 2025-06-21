import { Booking, Host } from "../domain";
import { HostDbModel } from "../sql/saveHost";

export class HostMapper {
  static toDomain(data: {
    id: string;
    forwardBooking: string;
    workHours: string;
    workDays: string;
    bookings: Booking[];
    role: string,
    deleted: boolean;
  }): Host {
    return new Host({
      ...data,
      workHours: JSON.parse(data.workHours) as {
        from: string;
        to: string;
      }[],
      workDays: JSON.parse(data.workDays) as string[],
    });
  }
  static toDbModel(host: Host): HostDbModel {
    return {
      id: host.id,
      forwardBooking: host.forwardBooking,
      workDays: JSON.stringify(host.workDays),
      workHours: JSON.stringify(host.workHours),
    };
  }
}
