import { Inject, Service } from "typedi";
import { gateway } from "../imports";
import { logger } from "../logger";
import { UnitOfWork } from "./UnitOfWork";

@Service()
export class ClientService {
  constructor(@Inject() private _uow: UnitOfWork) {
    this.createBooking = this.createBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
    this.restoreBooking = this.restoreBooking.bind(this);
    this.updateBooking = this.updateBooking.bind(this);
    this.updateBooking = this.updateBooking.bind(this);
    this.revertBooking = this.revertBooking.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.revertClient = this.revertClient.bind(this);
  }

  async createBooking(bookingDTO: gateway.dtos.BookingDTO) {
    logger.info({ bookingDTO }, this.constructor.name + " createBooking");
    this._uow.bookingRepository.save();
  }

  async deleteBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " deleteBooking");
    this._uow.bookingRepository.getById();
    this._uow.bookingRepository.save();
  }

  async restoreBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " restoreBooking");
    this._uow.bookingRepository.getById();
    this._uow.bookingRepository.save();
  }

  async updateBooking(
    updateBookingDTO: gateway.dtos.UpdateBookingDTO,
    bookingId: string,
  ) {
    logger.info(
      { updateBookingDTO, bookingId },
      this.constructor.name + " updateBooking",
    );
    this._uow.bookingRepository.getById();
    this._uow.bookingRepository.save();
  }

  async revertBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " revertBookingVersion");
    this._uow.bookingRepository.getById();
    this._uow.bookingRepository.save();
  }

  async updateClient(
    updateClientDTO: gateway.dtos.UpdateClientDTO,
    clientId: string,
  ) {
    logger.info(
      { updateClientDTO, clientId },
      this.constructor.name + " updateClient",
    );
    this._uow.bookingRepository.getById();
    this._uow.bookingRepository.save();
  }

  async revertClient(clientId: string) {
    logger.info({ clientId }, this.constructor.name + " revertClient");
    this._uow.bookingRepository.getById();
    this._uow.bookingRepository.save();
  }
}
