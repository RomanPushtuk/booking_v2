import { Inject, Service } from "typedi";
import { gateway } from "../imports";
import { logger } from "../logger";
import { UnitOfWork } from "./UnitOfWork";
import { Booking } from "../domain";

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
    const booking = new Booking({ ...bookingDTO, deleted: false });
    this._uow.bookingRepository.save(booking);
  }

  async deleteBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " deleteBooking");
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("booking not find");
    booking.setDeleted(true);
    this._uow.bookingRepository.save(booking);
  }

  async restoreBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " restoreBooking");
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("booking not find");
    booking.setDeleted(false);
    this._uow.bookingRepository.save(booking);
  }

  async updateBooking(
    updateBookingDTO: gateway.dtos.UpdateBookingDTO,
    bookingId: string,
  ) {
    logger.info(
      { updateBookingDTO, bookingId },
      this.constructor.name + " updateBooking",
    );
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("booking not found");
    // TODO Make update
    this._uow.bookingRepository.save(booking);
  }

  async revertBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " revertBooking");
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("booking not found");
    // TODO Make update revert
    this._uow.bookingRepository.save(booking);
  }

  async updateHost(updateHostDTO: gateway.dtos.UpdateHostDTO, hostId: string) {
    logger.info(
      { updateHostDTO, hostId },
      this.constructor.name + " updateHost",
    );
    const host = this._uow.hostRepository.getById(hostId);
    if (!host) throw new Error("host not found");
    // TODO Make update
    this._uow.hostRepository.save(host);
  }

  async revertHost(hostId: string) {
    logger.info({ hostId }, this.constructor.name + " revertHost");
    const host = this._uow.hostRepository.getById(hostId);
    if (!host) throw new Error("host not found");
    // TODO Make update revert
    this._uow.hostRepository.save(host);
  }
}
