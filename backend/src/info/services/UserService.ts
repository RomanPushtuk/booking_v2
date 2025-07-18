import { Service } from "typedi";
import { gateway } from "../imports";
import { logger } from "../logger";

@Service()
export class UserService {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.restoreUser = this.restoreUser.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.revertClient = this.revertClient.bind(this);
    this.updateHost = this.updateHost.bind(this);
    this.revertHost = this.revertHost.bind(this);
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

  async updateClient(
    updateClientDTO: gateway.dtos.UpdateClientDTO,
    clientId: string,
  ) {
    logger.info(
      { updateClientDTO, clientId },
      this.constructor.name + " updateClient",
    );
  }

  async revertClient(clientId: string) {
    logger.info({ clientId }, this.constructor.name + " revertClient");
  }

  async updateHost(
    updateHostDTO: gateway.dtos.UpdateClientDTO,
    hostId: string,
  ) {
    logger.info(
      { updateHostDTO, hostId },
      this.constructor.name + " updateHost",
    );
  }

  async revertHost(hostId: string) {
    logger.info({ hostId }, this.constructor.name + " revertHost");
  }
}
