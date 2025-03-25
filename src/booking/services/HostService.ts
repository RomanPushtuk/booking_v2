import { Inject, Service } from "typedi";
import { gateway } from "../imports";
import { logger } from "../logger";
import { UnitOfWork } from "./UnitOfWork";

@Service()
export class HostService {
  constructor(@Inject() private _uow: UnitOfWork) {
    this.createBooking = this.createBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
    this.restoreBooking = this.restoreBooking.bind(this);
    this.updateBooking = this.updateBooking.bind(this);
    this.revertBooking = this.revertBooking.bind(this);
    this.updateHost = this.updateHost.bind(this);
    this.revertHost = this.revertHost.bind(this);
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

  async updateHost(updateHostDTO: gateway.dtos.UpdateHostDTO, hostId: string) {
    logger.info(
      { updateHostDTO, hostId },
      this.constructor.name + " updateHost",
    );
    this._uow.bookingRepository.getById();
    this._uow.bookingRepository.save();
  }

  async revertHost(hostId: string) {
    logger.info({ hostId }, this.constructor.name + " revertHost");
    this._uow.bookingRepository.getById();
    this._uow.bookingRepository.save();
  }
}
