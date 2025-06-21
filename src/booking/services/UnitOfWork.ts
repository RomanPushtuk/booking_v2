// import { DatabaseSync } from "node:sqlite";
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
  // db: DatabaseSync;
  // sqlStatements: string[] = [];
  // isTransaction: boolean = false;

  constructor() {
    logger.info('New UnitOfWork instance was created')
    // this.db = new DatabaseSync("src/booking/db/database.db");
  }

  get db() {
    return db;
  }

  async begin() {
    // this.isTransaction = true;
    db.exec('BEGIN TRANSACTION;')
    logger.info({}, 'Begin Transaction');
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
    // this.isTransaction = false;
    // const statements = this.sqlStatements.join('');
    // this.sqlStatements = [];
    // db.exec('BEGIN;')
    // db.prepare(statements).run();
    // logger.info('!!!!!' + statements)
    // logger.info({}, 'Commit Transaction');
    db.exec('COMMIT;');
    logger.info({}, 'Commit Transaction');
  }
}
