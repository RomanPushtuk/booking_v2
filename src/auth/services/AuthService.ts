import { Inject, Service } from "typedi";
import { gateway } from "../imports";
import { logger } from "../logger";
import { AuthRepository } from "../repositories";
import { User } from "../domain";

@Service()
export class AuthService {
  constructor(@Inject() private _authRepository: AuthRepository) {
    this.createUser = this.createUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.restoreUser = this.restoreUser.bind(this);
  }
  async createUser(userDTO: gateway.dtos.UserDTO): Promise<{ id: string }> {
    logger.info({ userDTO }, this.constructor.name + " createUser");
    const user = new User({ ...userDTO, deleted: false });
    return this._authRepository.save(user);
  }

  async deleteUser(userId: string): Promise<{ id: string }> {
    logger.info({ userId }, this.constructor.name + " deleteUser");
    const user = await this._authRepository.findById(userId);
    if (!user) throw new Error("User not found");
    user.deleted = true;
    return this._authRepository.save(user);
  }

  async restoreUser(userId: string): Promise<{ id: string }> {
    logger.info({ userId }, this.constructor.name + " restoreUser");
    const user = await this._authRepository.findById(userId);
    if (!user) throw new Error("User not found");
    user.deleted = false;
    return this._authRepository.save(user);
  }
}
