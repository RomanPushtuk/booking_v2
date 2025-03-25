import { logger } from "../logger";

export class ClientRepository {
  save() {
    logger.info(this.constructor.name + " save");
  }
  getById() {
    logger.info(this.constructor.name + " getById");
  }
  saveAll() {
    logger.info(this.constructor.name + " saveAll");
  }
  getAll() {
    logger.info(this.constructor.name + " getAll(");
  }
}
