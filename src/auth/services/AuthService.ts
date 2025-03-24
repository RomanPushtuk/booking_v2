import { Service } from "typedi";
import { gateway } from "../imports";
import { logger } from "../logger";

@Service()
export class AuthService {
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
