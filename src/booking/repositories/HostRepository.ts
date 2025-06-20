// import { Inject } from "typedi";
import { logger } from "../logger";
import { db } from "../db";
import { saveHost, getHostById, getAllHosts } from "../sql";
import { Booking, Host } from "../domain";
import { UnitOfWork } from "../services";
import { HostMapper } from "../mappers";

export class HostRepository {
  constructor(private _uow: UnitOfWork) { 
    this.save = this.save.bind(this);
    this.getById = this.getById.bind(this);
    this.getAll = this.getAll.bind(this);
    this.saveAll = this.saveAll.bind(this);
  }

  save(host: Host) {
    logger.info(this.constructor.name + " save");
    const bookings = host.getBookings();
    this._uow.bookingRepository.saveAll(bookings);
    const hostDbModel = HostMapper.toDbModel(host);
    const sql = saveHost(hostDbModel);
    db.exec(sql);
    return { id: host.id };
  }

  getById(hostId: string) {
    logger.info(this.constructor.name + " getById");
    const sql = getHostById(hostId);
    const hostData = db.prepare(sql).get() as
      | {
        id: string;
        forwardBooking: string;
        workHours: string;
        workDays: string;
        deleted: boolean;
      }
      | undefined;
    if (!hostData) return null;

    const bookings = this._uow.bookingRepository.getAll({
      filters: { hostId },
    });
    if (!bookings) return null;

    return HostMapper.toDomain({
      ...hostData,
      bookings,
    });
  }

  saveAll(hosts: Host[]) {
    logger.info(this.constructor.name + " saveAll");
    return hosts.map(this.save);
  }

  getAll() {
    logger.info(this.constructor.name + " getAll");
    const sql = getAllHosts();
    const hostsData = db.prepare(sql).all() as
      | {
        id: string;
        forwardBooking: string;
        workHours: string;
        workDays: string;
        deleted: boolean;
      }[]
      | undefined;
    if (!hostsData) return null;

    let hostsDataWithBookings = [] as {
      id: string;
      forwardBooking: string;
      workHours: string;
      workDays: string;
      deleted: boolean;
      bookings: Booking[];
    }[];

    try {
      hostsDataWithBookings = hostsData.map((hostData) => {
        const filter = { filters: { hostId: hostData.id } };
        const bookings = this._uow.bookingRepository.getAll(filter);
        if (!bookings) throw new Error();
        return { ...hostData, bookings };
      });
    } catch {
      return null;
    }

    return hostsDataWithBookings.map(HostMapper.toDomain);
  }
}
