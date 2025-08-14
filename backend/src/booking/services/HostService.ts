import { Inject, Service } from "typedi";
import { gateway, shared } from "../imports";
import { logger } from "../logger";
import { UnitOfWork } from "./UnitOfWork";
import { Booking, Host } from "../domain";
import { vs } from "../vs";
import { UpdateBookingData, UpdateHostData } from "../types";
import {
  HostNotFoundException,
  ClientNotFoundException,
  BookingNotFoundException,
  VersionNotFoundException,
  VersionRemovalFailedException,
} from "../exceptions";

@Service()
export class HostService {
  constructor(
    @Inject() private _uow: UnitOfWork,
    @Inject("vs") private _vs: typeof vs,
  ) {
    this.updateHost = this.updateHost.bind(this);
    this.revertHost = this.revertHost.bind(this);
    this.createBooking = this.createBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
    this.restoreBooking = this.restoreBooking.bind(this);
    this.updateBooking = this.updateBooking.bind(this);
    this.revertBooking = this.revertBooking.bind(this);
  }

  async createHost(createHostDTO: gateway.dtos.CreateHostDTO & { id: string }) {
    const host = new Host({
      ...createHostDTO,
      bookings: [],
      deleted: false,
    });
    try {
      this._uow.begin();
      this._uow.hostRepository.save(host);
      this._uow.commit();
      return new gateway.dtos.UserCreatedDTO({ id: createHostDTO.id });
    } catch (error) {
      this._uow.rollback();
      throw error;
    }
  }

  async deleteHost(hostId: string) {
    logger.info({ hostId }, this.constructor.name + " deleteHost");
  }

  async getAllHosts(options?: {
    sorting?: shared.application.HostSorting;
    filters?: shared.application.HostFilters;
  }) {
    const hosts = this._uow.hostRepository.getAll(options);

    if (!hosts) return [];

    return hosts.map(
      (host) =>
        new gateway.dtos.HostDTO({
          id: host.getId(),
          forwardBooking: host.getForwardBooking(),
          workHours: host.getWorkHours(),
          workDays: host.getWorkDays(),
        }),
    );
  }

  async getHostById(hostId: string) {
    const host = this._uow.hostRepository.getById(hostId);

    if (!host || host.getDeleted())
      throw new HostNotFoundException({
        context: { hostId },
      });

    return new gateway.dtos.HostDTO({
      id: host.getId(),
      forwardBooking: host.getForwardBooking(),
      workHours: host.getWorkHours(),
      workDays: host.getWorkDays(),
    });
  }

  async updateHost(
    updateHostDTO: gateway.dtos.UpdateHostDTO,
    hostId: string,
    versionId: string,
  ) {
    logger.info(
      { updateHostDTO, hostId },
      this.constructor.name + " updateHost",
    );

    try {
      this._uow.begin();

      const host = this._uow.hostRepository.getById(hostId);
      if (!host)
        throw new HostNotFoundException({
          context: { hostId },
        });

      Host.update(host, updateHostDTO);
      this._uow.hostRepository.save(host);

      await this._vs.insertAsync({
        id: hostId,
        versionId,
        data: {
          forwardBooking: updateHostDTO.forwardBooking,
          workHours: updateHostDTO.workHours,
          workDays: updateHostDTO.workDays,
        },
      });

      this._uow.commit();

      return new gateway.dtos.HostUpdatedDTO({ id: hostId });
    } catch (error) {
      this._uow.rollback();
      throw error;
    }
  }

  async revertHost(hostId: string, versionId: string) {
    logger.info({ hostId, versionId }, this.constructor.name + " revertHost");

    const host = this._uow.hostRepository.getById(hostId);
    if (!host)
      throw new HostNotFoundException({
        context: { hostId },
      });

    const version = await this._vs
      .findOneAsync({ id: hostId, versionId })
      .execAsync();
    if (!version)
      throw new VersionNotFoundException({
        context: { hostId, versionId },
      });

    const updateData = version["data"] as UpdateHostData;
    const numRemoved = await this._vs.removeAsync(
      { id: hostId, versionId },
      {},
    );
    if (!numRemoved)
      throw new VersionRemovalFailedException({
        context: { hostId, versionId },
      });

    Host.update(host, updateData);
    this._uow.hostRepository.save(host);

    return new gateway.dtos.HostUpdatedDTO({ id: hostId });
  }

  async getHostBookings(
    hostId: string,
    options?: {
      sorting?: shared.application.BookingSorting;
      filters?: shared.application.BookingFilters;
    },
  ) {
    logger.info({ hostId }, "HostService getHostBookings");
    const host = this._uow.hostRepository.getById(hostId);
    logger.info(
      { host: host ? "found" : "not found", hostId },
      "HostService getHostBookings result",
    );

    if (!host)
      throw new HostNotFoundException({
        context: { hostId },
      });

    const bookings = host.getBookings(options);

    if (!bookings) return [];

    return bookings.map(
      (booking) =>
        new gateway.dtos.BookingDTO({
          id: booking.getId(),
          clientId: booking.getClientId(),
          hostId: booking.getHostId(),
          fromDateTime: booking.getFromDateTime(),
          toDateTime: booking.getToDateTime(),
        }),
    );
  }

  async getPublicHostBookings(
    hostId: string,
    options?: {
      sorting?: shared.application.BookingSorting;
      filters?: shared.application.BookingFilters;
    },
  ) {
    logger.info({ hostId }, "HostService getPublicHostBookings");
    const host = this._uow.hostRepository.getById(hostId);

    if (!host)
      throw new HostNotFoundException({
        context: { hostId },
      });

    const bookings = host.getBookings(options);

    if (!bookings) return [];

    return bookings.map(
      (booking) =>
        new gateway.dtos.PublicBookingDTO({
          id: booking.getId(),
          fromDateTime: booking.getFromDateTime(),
          toDateTime: booking.getToDateTime(),
        }),
    );
  }

  async getHostBookingById(hostId: string, bookingId: string) {
    const host = this._uow.hostRepository.getById(hostId);

    if (!host)
      throw new HostNotFoundException({
        context: { hostId },
      });

    const booking = host.getBookingById(bookingId);

    return new gateway.dtos.BookingDTO({
      id: booking.getId(),
      clientId: booking.getClientId(),
      hostId: booking.getHostId(),
      fromDateTime: booking.getFromDateTime(),
      toDateTime: booking.getToDateTime(),
    });
  }

  async createBooking(
    createHostBookingDTO: gateway.dtos.CreateHostBookingDTO,
    hostId: string,
    bookingId: string,
  ) {
    logger.info(
      { createHostBookingDTO },
      this.constructor.name + " createBooking",
    );

    try {
      this._uow.begin();

      const host = this._uow.hostRepository.getById(hostId);
      if (!host)
        throw new HostNotFoundException({
          context: { hostId },
        });

      const client = this._uow.clientRepository.getById(
        createHostBookingDTO.clientId,
      );
      if (!client)
        throw new ClientNotFoundException({
          context: { clientId: createHostBookingDTO.clientId },
        });

      const booking = new Booking({
        id: bookingId,
        hostId: hostId,
        ...createHostBookingDTO,
        deleted: false,
      });

      host.addBookingByHost(booking);
      this._uow.hostRepository.save(host);

      this._uow.commit();

      return new gateway.dtos.BookingCreatedDTO({ id: booking.getId() });
    } catch (error) {
      this._uow.rollback();
      throw error;
    }
  }

  async updateBooking(
    updateHostBookingDTO: gateway.dtos.UpdateHostBookingDTO,
    hostId: string,
    bookingId: string,
    versionId: string,
  ) {
    logger.info(
      { updateHostBookingDTO, bookingId },
      this.constructor.name + " updateBooking",
    );

    try {
      this._uow.begin();

      const booking = this._uow.bookingRepository.getById(bookingId);
      if (!booking)
        throw new BookingNotFoundException({
          context: { bookingId },
        });

      const host = this._uow.hostRepository.getById(hostId);
      if (!host)
        throw new HostNotFoundException({
          context: { hostId },
        });

      host.updateBookingByHost(booking, updateHostBookingDTO);
      this._uow.bookingRepository.save(booking);

      await this._vs.insertAsync({
        id: bookingId,
        versionId,
        data: updateHostBookingDTO,
      });

      this._uow.commit();

      return new gateway.dtos.BookingUpdatedDTO({ id: booking.getId() });
    } catch (error) {
      this._uow.rollback();
      throw error;
    }
  }

  async revertBooking(bookingId: string, versionId: string) {
    logger.info({ bookingId }, this.constructor.name + " revertBookingVersion");
    const booking = this._uow.bookingRepository.getById(bookingId);

    if (!booking)
      throw new BookingNotFoundException({
        context: { bookingId },
      });

    const version = await this._vs
      .findOneAsync({ id: bookingId, versionId })
      .execAsync();

    if (!version)
      throw new VersionNotFoundException({
        context: { bookingId, versionId },
      });

    const updateData = version["data"] as UpdateBookingData;
    const numRemoved = await this._vs.removeAsync(
      { id: bookingId, versionId },
      {},
    );

    if (!numRemoved)
      throw new VersionRemovalFailedException({
        context: { bookingId, versionId },
      });

    Booking.update(booking, updateData);
    this._uow.bookingRepository.save(booking);

    return new gateway.dtos.BookingUpdatedDTO({ id: booking.getId() });
  }

  async deleteBooking(bookingId: string, hostId: string) {
    logger.info({ bookingId }, this.constructor.name + " deleteBooking");

    try {
      this._uow.begin();

      const booking = this._uow.bookingRepository.getById(bookingId);
      if (!booking)
        throw new BookingNotFoundException({
          context: { bookingId },
        });

      const host = this._uow.hostRepository.getById(hostId);
      if (!host)
        throw new HostNotFoundException({
          context: { hostId },
        });

      host.deleteBooking(booking);

      this._uow.hostRepository.save(host);

      this._uow.commit();

      return new gateway.dtos.BookingDeletedDTO({ id: booking.getId() });
    } catch (error) {
      this._uow.rollback();
      throw error;
    }
  }

  async restoreBooking(bookingId: string) {
    logger.info({ bookingId }, this.constructor.name + " restoreBooking");
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking)
      throw new BookingNotFoundException({
        context: { bookingId },
      });
    booking.setDeleted(false);
    this._uow.bookingRepository.save(booking);

    return new gateway.dtos.BookingDeletedDTO({ id: bookingId });
  }
}
