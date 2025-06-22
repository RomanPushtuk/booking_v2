import { Inject, Service } from "typedi";
import { gateway, shared } from "../imports";
import { logger } from "../logger";
import { UnitOfWork } from "./UnitOfWork";
import { Client, Host, User } from "../domain";

@Service()
export class UserService {
  constructor(@Inject() private _uow: UnitOfWork) {
    this.createUser = this.createUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.restoreUser = this.restoreUser.bind(this);
  }
  async createUser(userDTO: gateway.dtos.UserDTO) {
    logger.info({ userDTO }, this.constructor.name + " createUser");

    this._uow.begin();
    const user = new User({
      id: userDTO.id,
      role: userDTO.role,
      deleted: false,
    });

    this._uow.userRepository.save(user);

    if (user.role === shared.enums.Roles.CLIENT) {
      const client = new Client({
        id: userDTO.id,
        bookings: [],
        role: shared.enums.Roles.CLIENT,
        deleted: false,
      });
      this._uow.clientRepository.save(client);
    }

    if (user.role === shared.enums.Roles.HOST) {
      const host = new Host({
        id: userDTO.id,
        forwardBooking: "1 week",
        workHours: [
          { from: "09:00", to: "13:00" },
          { from: "14:00", to: "18:00" },
        ],
        workDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
        bookings: [],
        role: shared.enums.Roles.HOST,
        deleted: false,
      });
      this._uow.hostRepository.save(host);
    }
    this._uow.commit();
  }

  async deleteUser(userId: string) {
    logger.info({ userId }, this.constructor.name + " deleteUser");
    const user = this._uow.userRepository.getById(userId);
    if (!user) throw new Error("user not found");
    user.setDeleted(true);
    this._uow.userRepository.save(user);
  }

  async restoreUser(userId: string) {
    logger.info({ userId }, this.constructor.name + " restoreUser");
    const user = this._uow.userRepository.getById(userId);
    if (!user) throw new Error("user not found");
    user.setDeleted(false);
    this._uow.userRepository.save(user);
  }
}
