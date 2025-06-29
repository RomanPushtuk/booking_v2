import { Inject, Service } from "typedi";
import { gateway, shared } from "../imports";
import { logger } from "../logger";
import { UnitOfWork } from "./UnitOfWork";
import { Booking, Host } from "../domain";
import config from "../../config.json";
import { intervalsOverlap } from "../../shared/utils";

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
    if (!client) throw new Error("client not found");
    return {
      id: client.getId(),
      role: client.getRole(),
      deleted: client.getDeleted(),
      bookings: await this.getClientBookings(clientId),
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
    if (!client) throw new Error("client not found");

    const bookings = this._uow.bookingRepository.getAll(options);
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
    if (!client) throw new Error("client not found");

    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("booking not found");

    if (booking.getClientId() !== clientId) {
      throw new Error("booking does not belong to this client");
    }

    if (booking.getDeleted()) {
      throw new Error("booking is deleted");
    }

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
  ) {
    logger.info(
      { createClientBookingDTO },
      this.constructor.name + " createBooking",
    );
    const hostId = createClientBookingDTO.hostId;

    this._uow.begin();
    const host = this._uow.hostRepository.getById(hostId);

    if (!host) throw new Error("host not found");

    // TODO: discuss with Roman
    // this.validateWorkingHoursBooking();

    this.validateExistClientBooking(
      host,
      clientId,
      createClientBookingDTO.fromDateTime,
      createClientBookingDTO.toDateTime,
    );

    this.validateOverlapBooking(
      host,
      createClientBookingDTO.fromDateTime,
      createClientBookingDTO.toDateTime,
    );

    const booking = new Booking({
      id: shared.utils.generateId(),
      clientId: clientId,
      ...createClientBookingDTO,
      deleted: false,
    });

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
    updateClientBookingDTO: gateway.dtos.UpdateClientBookingDTO,
    bookingId: string,
  ) {
    logger.info(
      { updateClientBookingDTO, bookingId },
      this.constructor.name + " updateBooking",
    );
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("booking not found");

    const hostId = booking?.getHostId();

    const host = this._uow.hostRepository.getById(hostId);
    if (!host) throw new Error("host not found");

    if (updateClientBookingDTO.fromDateTime) {
      booking.setFromDateTime(updateClientBookingDTO.fromDateTime);
    }

    if (updateClientBookingDTO.toDateTime) {
      booking.setToDateTime(updateClientBookingDTO.toDateTime);
    }

    // TODO: discuss with Roman
    // this.validateWorkingHoursBooking();

    this.validateExistClientBooking(
      host,
      booking.getClientId(),
      booking.getFromDateTime(),
      booking.getToDateTime(),
    );

    this.validateOverlapBooking(
      host,
      booking.getFromDateTime(),
      booking.getToDateTime(),
    );

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
    const client = this._uow.clientRepository.getById(clientId);
    if (!client) throw new Error("client not found");
    // TODO Make update
    this._uow.clientRepository.save(client);
  }

  async revertClient(clientId: string) {
    logger.info({ clientId }, this.constructor.name + " revertClient");
    const client = this._uow.clientRepository.getById(clientId);
    if (!client) throw new Error("client not found");
    // TODO Make update revert
    this._uow.clientRepository.save(client);
  }

  private validateOverlapBooking(
    host: Host,
    fromDateTime: string,
    toDateTime: string,
  ) {
    if (config.allowOverlappingBookings) return;

    const hostBookings = host.getBookings();
    for (const booking of hostBookings) {
      if (booking.getDeleted()) continue;

      const isOverlap = intervalsOverlap(
        booking.getFromDateTime(),
        booking.getToDateTime(),
        fromDateTime,
        toDateTime,
      );

      if (isOverlap) throw new Error("Booking overlaps with existing booking");
    }
  }

  private validateExistClientBooking(
    host: Host,
    clientId: string,
    fromDateTime: string,
    toDateTime: string,
  ) {
    const bookings = host.getBookings();

    for (const booking of bookings) {
      if (
        booking.getClientId() === clientId &&
        !booking.getDeleted() &&
        booking.getFromDateTime() === toDateTime &&
        booking.getToDateTime() === fromDateTime
      ) {
        throw new Error("Booking already exists");
      }
    }
  }
}
