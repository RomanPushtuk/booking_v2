import { Service } from "typedi";
import {
  ClientRepository,
  HostRepository,
  BookingRepository,
  UserRepository,
} from "../repositories";

@Service()
export class UnitOfWork {
  constructor() { }

  async begin() { }

  get clientRepository() {
    return new ClientRepository();
  }

  get hostRepository() {
    return new HostRepository(this);
  }

  get bookingRepository() {
    return new BookingRepository();
  }

  get userRepository() {
    return new UserRepository();
  }

  async commit() { }
}
