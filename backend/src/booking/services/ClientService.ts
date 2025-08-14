import { Inject, Service } from "typedi";
import { gateway, shared } from "../imports";
import { logger } from "../logger";
import { UnitOfWork } from "./UnitOfWork";
import { Booking, Client } from "../domain";
import { vs } from "../vs";
import { UpdateBookingData, UpdateClientData } from "../types";
import {
  ClientNotFoundException,
  HostNotFoundException,
  BookingNotFoundException,
  VersionNotFoundException,
  VersionRemovalFailedException,
  NoClientsFoundException,
} from "../exceptions";

@Service()
export class ClientService {
  constructor(
    @Inject() private _uow: UnitOfWork,
    @Inject("vs") private _vs: typeof vs,
  ) {
    this.createBooking = this.createBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
    this.restoreBooking = this.restoreBooking.bind(this);
    this.updateBooking = this.updateBooking.bind(this);
    this.revertBooking = this.revertBooking.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.revertClient = this.revertClient.bind(this);
    this.getClients = this.getClients.bind(this);
    this.createClient = this.createClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
  }

  async createClient(
    createClientDto: gateway.dtos.CreateClientDTO & { id: string },
  ) {
    const client = new Client({
      ...createClientDto,
      bookings: [],
      deleted: false,
    });
    this._uow.clientRepository.save(client);
    return new gateway.dtos.UserCreatedDTO({ id: createClientDto.id });
  }

  async deleteClient(clientId: string) {
    const client = this._uow.clientRepository.getById(clientId);
    if (!client)
      throw new ClientNotFoundException({
        context: { clientId },
      });
    client.setDeleted(true);
    this._uow.clientRepository.save(client);
  }

  async getClients() {
    const clients = this._uow.clientRepository.getAll();

    if (!clients) throw new NoClientsFoundException();

    return clients.map((client) => {
      return new gateway.dtos.ClientDTO({
        id: client.getId(),
      });
    });
  }

  async getClientById(clientId: string) {
    const client = this._uow.clientRepository.getById(clientId);

    if (!client)
      throw new ClientNotFoundException({
        context: { clientId },
      });

    return new gateway.dtos.ClientDTO({
      id: client.getId(),
    });
  }

  async getClientBookings(
    clientId: string,
    options?: {
      sorting?: shared.application.BookingSorting;
      filters?: shared.application.BookingFilters;
    },
  ) {
    const client = this._uow.clientRepository.getById(clientId);

    if (!client)
      throw new ClientNotFoundException({
        context: { clientId },
      });

    const bookings = client.getBookings(options);

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

  async getClientBookingById(clientId: string, bookingId: string) {
    const client = this._uow.clientRepository.getById(clientId);

    if (!client)
      throw new ClientNotFoundException({
        context: { clientId },
      });

    const booking = client.getBookingById(bookingId);

    return new gateway.dtos.BookingDTO({
      id: booking.getId(),
      clientId: booking.getClientId(),
      hostId: booking.getHostId(),
      fromDateTime: booking.getFromDateTime(),
      toDateTime: booking.getToDateTime(),
    });
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
      if (!host)
        throw new HostNotFoundException({
          context: { hostId },
        });

      const booking = new Booking({
        id: bookingId,
        clientId,
        ...createClientBookingDTO,
        deleted: false,
      });

      host.addBookingByClient(booking);
      this._uow.hostRepository.save(host);

      this._uow.commit();

      return new gateway.dtos.BookingCreatedDTO({ id: booking.getId() });
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
      if (!booking)
        throw new BookingNotFoundException({
          context: { bookingId },
        });

      const hostId = booking.getHostId();
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

    return new gateway.dtos.BookingUpdatedDTO({ id: booking.getId() });
  }

  async updateBooking(
    updateClientBookingDTO: gateway.dtos.UpdateClientBookingDTO,
    bookingId: string,
    versionId: string,
  ) {
    logger.info(
      { updateClientBookingDTO, bookingId },
      this.constructor.name + " updateBooking",
    );

    try {
      this._uow.begin();

      const booking = this._uow.bookingRepository.getById(bookingId);
      if (!booking)
        throw new BookingNotFoundException({
          context: { bookingId },
        });

      const hostId = booking.getHostId();
      const host = this._uow.hostRepository.getById(hostId);
      if (!host)
        throw new HostNotFoundException({
          context: { hostId },
        });

      host.updateBookingByClient(booking, updateClientBookingDTO);
      this._uow.bookingRepository.save(booking);

      await this._vs.insertAsync({
        id: bookingId,
        versionId,
        data: updateClientBookingDTO,
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

    return new gateway.dtos.BookingRevertedDTO({ id: booking.getId() });
  }

  async updateClient(
    updateClientDTO: gateway.dtos.UpdateClientDTO,
    clientId: string,
    versionId: string,
  ) {
    logger.info(
      { updateClientDTO, clientId },
      this.constructor.name + " updateClient",
    );

    try {
      this._uow.begin();

      const client = this._uow.clientRepository.getById(clientId);
      if (!client)
        throw new ClientNotFoundException({
          context: { clientId },
        });

      Client.update(client, updateClientDTO);

      this._uow.clientRepository.save(client);

      await this._vs.insertAsync({
        id: clientId,
        versionId,
        data: updateClientDTO,
      });

      this._uow.commit();

      return new gateway.dtos.ClientUpdatedDTO({ id: clientId });
    } catch (error) {
      this._uow.rollback();
      throw error;
    }
  }

  async revertClient(clientId: string, versionId: string) {
    logger.info(
      { clientId, versionId },
      this.constructor.name + " revertClient",
    );

    const client = this._uow.clientRepository.getById(clientId);
    if (!client)
      throw new ClientNotFoundException({
        context: { clientId },
      });

    const version = await this._vs
      .findOneAsync({ id: clientId, versionId })
      .execAsync();
    if (!version)
      throw new VersionNotFoundException({
        context: { clientId, versionId },
      });

    const updateData = version["data"] as UpdateClientData;
    const numRemoved = await this._vs.removeAsync(
      { id: clientId, versionId },
      {},
    );
    if (!numRemoved)
      throw new VersionRemovalFailedException({
        context: { clientId, versionId },
      });

    Client.update(client, updateData);
    this._uow.clientRepository.save(client);

    return new gateway.dtos.ClientUpdatedDTO({ id: clientId });
  }
}
