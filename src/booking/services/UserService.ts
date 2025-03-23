import { Service } from "typedi";
import { gateway } from "../imports";
import { logger } from "../logger";

@Service()
export class UserService {
  async createUser(userDTO: gateway.dtos.UserDTO) {
    logger.info({ userDTO }, this.constructor.name + " createUser");
  }

  async deleteUser(deleteUserDTO: gateway.dtos.DeleteUserDTO) {
    logger.info({ deleteUserDTO }, this.constructor.name + " deleteUser");
  }
}
