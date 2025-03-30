import { logger } from "../logger";
import { db } from "../db";
import { saveHost, getHostById, getAllHosts } from "../sql";
import { Host } from "../domain";

export class HostRepository {
  save(host: Host) {
    logger.info(this.constructor.name + " save");
    const sql = saveHost({
      ...host,
      workDays: JSON.stringify(host.workDays),
      workHours: JSON.stringify(host.workHours),
    });
    db.exec(sql);
    return { id: host.id };
  }
  getById(hostId: string) {
    logger.info(this.constructor.name + " getById");
    const sql = getHostById(hostId);
    const data = db.prepare(sql).get() as
      | {
          id: string;
          forwardBooking: string;
          workHours: string;
          workDays: string;
          deleted: boolean;
        }
      | undefined;

    if (!data) return null;
    return new Host({
      ...data,
      workDays: JSON.parse(data.workDays),
      workHours: JSON.parse(data.workHours),
    });
  }
  saveAll(hosts: Host[]) {
    logger.info(this.constructor.name + " saveAll");
    return hosts.map(this.save);
  }
  getAll() {
    logger.info(this.constructor.name + " getAll");
    const sql = getAllHosts();
    const data = db.prepare(sql).all() as
      | {
          id: string;
          forwardBooking: string;
          workHours: string;
          workDays: string;
          deleted: boolean;
        }[]
      | undefined;
    if (!data) return null;
    return data.map(
      (host) =>
        new Host({
          ...host,
          workDays: JSON.parse(host.workDays),
          workHours: JSON.parse(host.workHours),
        }),
    );
  }
}
