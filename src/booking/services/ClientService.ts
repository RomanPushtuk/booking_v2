import { Inject, Service } from "typedi";
import { gateway, shared } from "../imports";
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
    this.revertBooking = this.revertBooking.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.revertClient = this.revertClient.bind(this);
  }

  async getClientById(clientId: string) {
    const client = this._uow.clientRepository.getById(clientId);

    if (!client) throw new Error("Client not found");

    const bookings = client.getBookings().map((booking) => ({
      id: booking.getId(),
      clientId: booking.getClientId(),
      hostId: booking.getHostId(),
      fromDateTime: booking.getFromDateTime(),
      toDateTime: booking.getToDateTime(),
      deleted: booking.getDeleted(),
    }));

    return {
      id: client.getId(),
      role: client.getRole(),
      deleted: client.getDeleted(),
      bookings,
    };
  }

  async getClientBookings(
    clientId: string,
    options?: {
      sorting?: shared.application.BookingSorting;
      filters?: shared.application.BookingFilters;
    },
  ) {
    const client = this._uow.clientRepository.getById(clientId);

    if (!client) throw new Error("Client not found");

    const bookings = client.getBookings(options);

    if (!bookings) return [];

    return bookings.map((booking) => ({
      id: booking.getId(),
      clientId: booking.getClientId(),
      hostId: booking.getHostId(),
      fromDateTime: booking.getFromDateTime(),
      toDateTime: booking.getToDateTime(),
      deleted: booking.getDeleted(),
    }));
  }

  async getClientBookingById(clientId: string, bookingId: string) {
    const client = this._uow.clientRepository.getById(clientId);

    if (!client) throw new Error("Client not found");

    const booking = client.getBookingById(bookingId);

    return {
      id: booking.getId(),
      clientId: booking.getClientId(),
      hostId: booking.getHostId(),
      fromDateTime: booking.getFromDateTime(),
      toDateTime: booking.getToDateTime(),
      deleted: booking.getDeleted(),
    };
  }

  async createBooking(
    createClientBookingDTO: gateway.dtos.CreateClientBookingDTO,
    clientId: string,
    bookingId: string,
  ) {
    logger.info(
      { createClientBookingDTO },
      this.constructor.name + " createBooking",
    );

    try {
      this._uow.begin();

      const hostId = createClientBookingDTO.hostId;
      const host = this._uow.hostRepository.getById(hostId);
      if (!host) throw new Error("Host not found");

      const booking = new Booking({
        id: bookingId,
        clientId,
        ...createClientBookingDTO,
        deleted: false,
      });

      host.addBooking(booking);
      this._uow.hostRepository.save(host);

      this._uow.commit();
    } catch (error) {
      this._uow.rollback();
      throw error;
    }
  }

  async deleteBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " deleteBooking");

    try {
      this._uow.begin();

      const booking = this._uow.bookingRepository.getById(bookingId);
      if (!booking) throw new Error("Booking not found");

      const hostId = booking.getHostId();
      const host = this._uow.hostRepository.getById(hostId);
      if (!host) throw new Error("Host not found");

      host.deleteBooking(booking);

      this._uow.hostRepository.save(host);

      this._uow.commit();
    } catch (error) {
      this._uow.rollback();
      throw error;
    }
  }

  async restoreBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " restoreBooking");
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("booking not found");
    booking.setDeleted(false);
    this._uow.bookingRepository.save(booking);
  }

  async updateBooking(
    updateClientBookingDTO: gateway.dtos.UpdateClientBookingDTO,
    bookingId: string,
  ) {
    logger.info(
      { updateClientBookingDTO, bookingId },
      this.constructor.name + " updateBooking",
    );

    try {
      this._uow.begin();

      const booking = this._uow.bookingRepository.getById(bookingId);
      if (!booking) throw new Error("Booking not found");

      const hostId = booking.getHostId();
      const host = this._uow.hostRepository.getById(hostId);
      if (!host) throw new Error("Host not found");

      if (updateClientBookingDTO.fromDateTime) {
        booking.setFromDateTime(updateClientBookingDTO.fromDateTime);
      }

      if (updateClientBookingDTO.toDateTime) {
        booking.setToDateTime(updateClientBookingDTO.toDateTime);
      }

      host.updateBooking(booking);
      this._uow.bookingRepository.save(booking);

      this._uow.commit();
    } catch (error) {
      this._uow.rollback();
      throw error;
    }
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
    const client = this._uow.clientRepository.getById(clientId);
    if (!client) throw new Error("client not found");
    // TODO Make update
    this._uow.clientRepository.save(client);
  }

  async revertClient(clientId: string) {
    logger.info({ clientId }, this.constructor.name + " revertClient");
    const client = this._uow.clientRepository.getById(clientId);

    if (!client) throw new Error("Client not found");

    // TODO Make update revert
    this._uow.clientRepository.save(client);
  }
}
