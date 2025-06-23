import { Inject, Service } from "typedi";
import { gateway } from "../imports";
import { logger } from "../logger";
import { UnitOfWork } from "./UnitOfWork";
import { Booking } from "../domain";

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

  async getClientById(clientId: string) {
    const client = this._uow.clientRepository.getById(clientId);
    if (!client) throw new Error('client not found');
    return {
      id: client.getId(),
      role: client.getRole(),
      deleted: client.getDeleted(),
      bookings: await this.getClientBookings(clientId),
    }
  }

  async getClientBookings(clientId: string) {
    const client = this._uow.clientRepository.getById(clientId);
    if (!client) throw new Error('client not found');

    const clientBookings = client.getBookings();
    return clientBookings.map((booking) => ({
      id: booking.getId(),
      clientId: booking.getClientId(),
      hostId: booking.getHostId(),
      fromDateTime: booking.getFromDateTime(),
      toDateTime: booking.getToDateTime(),
      deleted: booking.getDeleted(),
    }))
  }

  async createBooking(bookingDTO: gateway.dtos.BookingDTO) {
    logger.info({ bookingDTO }, this.constructor.name + " createBooking");
    const hostId = bookingDTO.hostId;

    this._uow.begin();
    const host = this._uow.hostRepository.getById(hostId);
    if (!host) throw new Error("host not found");

    const booking = new Booking({ ...bookingDTO, deleted: false });
    host.addBooking(booking);

    this._uow.hostRepository.save(host);
    this._uow.commit();
  }

  async deleteBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " deleteBooking");

    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("booking not found");

    const hostId = booking?.getHostId();
    const host = this._uow.hostRepository.getById(hostId);
    if (!host) throw new Error("host not found");

    host.deleteBooking(booking);
    this._uow.hostRepository.save(host);
  }

  async restoreBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " restoreBooking");
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("booking not found");
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
    logger.info({ bookingId }, this.constructor.name + " revertBookingVersion");
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("booking not found");
    // TODO Make update revert
    this._uow.bookingRepository.save(booking);
  }

  async updateClient(
    updateClientDTO: gateway.dtos.UpdateClientDTO,
    clientId: string,
  ) {
    logger.info(
      { updateClientDTO, clientId },
      this.constructor.name + " updateClient",
    );
    const client = this._uow.bookingRepository.getById(clientId);
    if (!client) throw new Error("client not found");
    // TODO Make update
    this._uow.bookingRepository.save(client);
  }

  async revertClient(clientId: string) {
    logger.info({ clientId }, this.constructor.name + " revertClient");
    const client = this._uow.bookingRepository.getById(clientId);
    if (!client) throw new Error("client not found");
    // TODO Make update revenrt
    this._uow.bookingRepository.save(client);
  }
}
