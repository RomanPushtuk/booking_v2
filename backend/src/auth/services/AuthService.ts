import { Inject, Service } from "typedi";
import jwt from "jsonwebtoken";
import { gateway } from "../imports";
import { logger } from "../logger";
import { AuthRepository } from "../repositories";
import { User } from "../domain";
import {
  UserNotFoundException,
  InvalidCredentialsException,
} from "../exceptions";

@Service()
export class AuthService {
  constructor(@Inject() private _authRepository: AuthRepository) {
    this.createUser = this.createUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.restoreUser = this.restoreUser.bind(this);
    this.login = this.login.bind(this);
  }

  async getUserById(userId: string): Promise<User> {
    logger.info({ userId }, this.constructor.name + " getUserById");
    const user = await this._authRepository.findById(userId);
    if (!user)
      throw new UserNotFoundException({
        context: { userId },
      });
    return user;
  }

  async login(
    loginUserDTO: gateway.dtos.LogInUserDTO,
  ): Promise<gateway.dtos.UserLoggedInDTO> {
    logger.info({ loginUserDTO }, this.constructor.name + " login");

    const user = await this._authRepository.findByLoginAndPassword(
      loginUserDTO.login,
      loginUserDTO.password,
    );
    if (!user)
      throw new InvalidCredentialsException({
        context: { login: loginUserDTO.login },
      });
    const payload = { id: user.id, login: user.login, role: user.role };
    const token = jwt.sign(payload, "secret", { expiresIn: "1h" });

    return new gateway.dtos.UserLoggedInDTO({
      accessToken: token,
    });
  }

  async createUser(userDTO: gateway.dtos.UserDTO): Promise<{ id: string }> {
    logger.info({ userDTO }, this.constructor.name + " createUser");
    const user = new User({ ...userDTO, deleted: false });
    return this._authRepository.save(user);
  }

  async deleteUser(userId: string): Promise<{ id: string }> {
    logger.info({ userId }, this.constructor.name + " deleteUser");
    const user = await this._authRepository.findById(userId);
    if (!user)
      throw new UserNotFoundException({
        context: { userId },
      });
    user.deleted = true;
    const deletedUser = await this._authRepository.save(user);
    return new gateway.dtos.UserDeletedDTO({ id: deletedUser.id });
  }

  async restoreUser(userId: string): Promise<{ id: string }> {
    logger.info({ userId }, this.constructor.name + " restoreUser");
    const user = await this._authRepository.findById(userId);
    if (!user)
      throw new UserNotFoundException({
        context: { userId },
      });
    user.deleted = false;
    return this._authRepository.save(user);
  }
}
