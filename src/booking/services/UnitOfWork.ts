import { Service } from "typedi";
import { db } from "../db";
import {
  ClientRepository,
  HostRepository,
  BookingRepository,
  UserRepository,
} from "../repositories";
import { logger } from "../logger";

@Service()
export class UnitOfWork {
  constructor() {
    logger.info("New UnitOfWork instance was created");
  }

  get db() {
    return db;
  }

  async begin() {
    db.exec("BEGIN TRANSACTION;");
    logger.info({}, "Begin Transaction");
  }

  get clientRepository() {
    return new ClientRepository(this);
  }

  get hostRepository() {
    return new HostRepository(this);
  }

  get bookingRepository() {
    return new BookingRepository(this);
  }

  get userRepository() {
    return new UserRepository(this);
  }

  async commit() {
    db.exec("COMMIT;");
    logger.info({}, "Commit Transaction");
  }

  async rollback() {
    db.exec("ROLLBACK;");
    logger.info({}, "Rollback Transaction");
  }
}
