import { Service } from "typedi";
import { gateway } from "../imports";
import { logger } from "../logger";

@Service()
export class AuthService {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.restoreUser = this.restoreUser.bind(this);
  }
  async createUser(userDTO: gateway.dtos.UserDTO) {
    logger.info({ userDTO }, this.constructor.name + " createUser");
  }

  async deleteUser(userId: string) {
    logger.info({ userId }, this.constructor.name + " deleteUser");
  }

  async restoreUser(userId: string) {
    logger.info({ userId }, this.constructor.name + " restoreUser");
  }
}
