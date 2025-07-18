import { logger } from "../logger";
import { saveHost, getHostById } from "../sql";
import { Host } from "../domain";
import { UnitOfWork } from "../services";
import { HostMapper } from "../mappers";

export class HostRepository {
  constructor(private _uow: UnitOfWork) {
    this.save = this.save.bind(this);
    this.getById = this.getById.bind(this);
    this.saveAll = this.saveAll.bind(this);
  }

  save(host: Host) {
    logger.info(this.constructor.name + " save");

    const user = host.getUser();
    this._uow.userRepository.save(user);

    const hostDbModel = HostMapper.toDbModel(host);
    const sql = saveHost(hostDbModel);
    logger.info(this._uow.db.exec(sql), "saving Host to DB");

    const bookings = host.getBookings();
    this._uow.bookingRepository.saveAll(bookings);

    return { id: host.getId() };
  }

  getById(hostId: string) {
    logger.info(this.constructor.name + " getById");

    const user = this._uow.userRepository.getById(hostId);
    if (!user) return null;

    const bookings = this._uow.bookingRepository.getAll({
      filters: { hostId },
    });
    if (!bookings) return null;

    const sql = getHostById(hostId);
    const hostData = this._uow.db.prepare(sql).get() as
      | {
          id: string;
          forwardBooking: string;
          workHours: string;
          workDays: string;
        }
      | undefined;
    logger.info(hostData, " hostData");
    if (!hostData) return null;

    return HostMapper.toDomain({
      ...hostData,
      bookings,
      role: user.getRole(),
      deleted: user.getDeleted(),
    });
  }

  saveAll(hosts: Host[]) {
    logger.info(this.constructor.name + " saveAll");
    return hosts.map(this.save);
  }
}
