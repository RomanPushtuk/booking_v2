import {
  Authorized,
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Patch,
  Post,
} from "routing-controllers";
import { Service } from "typedi";

import { booking, shared } from "../imports";

import {
  ClientDTO,
  HostDTO,
  BookingDTO,
  CreateHostDTO,
  UpdateHostDTO,
  CreateClientDTO,
  UpdateClientDTO,
  ClientUpdatedDTO,
  ClientDeletedDTO,
  UserDeletedDTO,
  CreateBookingDTO,
  BookingCreatedDTO,
  BookingDeletedDTO,
  UpdateBookingDTO,
  BookingUpdatedDTO,
  ClientCreatedDTO,
  HostCreatedDTO,
} from "../dtos";
import {
  CreateBookingSaga,
  CreateClientSaga,
  CreateHostSaga,
  DeleteBookingSaga,
  DeleteUserSaga,
  UpdateBookingSaga,
  UpdateClientSaga,
} from "../sagas";
import {
  CreateBookingInBookingServiceStep,
  CreateClientInBookingServiceStep,
  CreateHostInBookingServiceStep,
  CreateUserInAuthServiceStep,
  CreateUserInInfoServiceStep,
  DeleteBookingInBookingServiceStep,
  DeleteUserInAuthServiceStep,
  DeleteUserInBookingServiceStep,
  DeleteUserInInfoServiceStep,
  UpdateBookingInBookingServiceStep,
  UpdateClientInBookingServiceStep,
  UpdateClientInInfoServiceStep,
  UpdateHostInBookingServiceStep,
} from "../steps";
import { UpdateHostSaga } from "../sagas/UpdateHostSaga";

@Service()
@JsonController("/admin")
export class AdminController {
  // --- Client ---

  @Authorized([shared.enums.Permissions.ADMIN_READ_CLIENT])
  @Get("/clients")
  async getClients() {
    const clients = await booking.services.clientService.getClients();

    return clients.map((client) => {
      return new ClientDTO({ ...client });
    });
  }

  @Authorized([shared.enums.Permissions.ADMIN_READ_CLIENT])
  @Get("/clients/:clientId")
  async getClientById(@Param("clientId") clientId: string) {
    const client = await booking.services.clientService.getClientById(clientId);
    return new ClientDTO({ ...client });
  }

  @Authorized([shared.enums.Permissions.ADMIN_CREATE_CLIENT])
  @HttpCode(201)
  @Post("/clients")
  async createClient(@Body() createClientDTO: CreateClientDTO) {
    const clientDTO: CreateClientDTO & { id: string } = {
      id: shared.utils.generateId(),
      ...createClientDTO,
    };

    const createUserSaga = new CreateClientSaga(
      new CreateUserInAuthServiceStep(),
      new CreateClientInBookingServiceStep(),
      new CreateUserInInfoServiceStep(),
    );

    await createUserSaga.execute(clientDTO);

    return new ClientCreatedDTO({ id: clientDTO.id });
  }

  @Authorized([shared.enums.Permissions.ADMIN_UPDATE_CLIENT])
  @Patch("/clients/:clientId")
  async updateClient(
    @Param("clientId") clientId: string,
    @Body() updateClientDTO: UpdateClientDTO,
  ) {
    const updateClientSaga = new UpdateClientSaga(
      new UpdateClientInBookingServiceStep(
        booking.services.clientService.updateClient,
        booking.services.clientService.revertClient,
      ),
      new UpdateClientInInfoServiceStep(),
    );
    const versionId = shared.utils.generateId();
    await updateClientSaga.execute(updateClientDTO, clientId, versionId);
    return new ClientUpdatedDTO({ id: clientId });
  }

  @Authorized([shared.enums.Permissions.ADMIN_DELETE_CLIENT])
  @Delete("/clients/:clientId")
  async deleteClient(
    @Param("clientId") clientId: string,
  ): Promise<ClientDeletedDTO> {
    const deleteUserSaga = new DeleteUserSaga(
      new DeleteUserInAuthServiceStep(),
      new DeleteUserInBookingServiceStep(),
      new DeleteUserInInfoServiceStep(),
    );
    await deleteUserSaga.execute(clientId);
    return new ClientDeletedDTO({ id: clientId });
  }

  // --- Host ---

  @Authorized([shared.enums.Permissions.ADMIN_READ_HOST])
  @Get("/hosts")
  async getHosts() {
    const hosts = await booking.services.hostService.getAllHosts();

    return hosts.map((host) => {
      return new HostDTO({ ...host });
    });
  }

  @Authorized([shared.enums.Permissions.ADMIN_READ_HOST])
  @Get("/hosts/:hostId")
  async getHostById(@Param("hostId") hostId: string) {
    const host = await booking.services.hostService.getHostById(hostId);
    return new HostDTO({ ...host });
  }

  @Authorized([shared.enums.Permissions.ADMIN_CREATE_HOST])
  @HttpCode(201)
  @Post("/hosts")
  async createHost(@Body() createHostDTO: CreateHostDTO) {
    const hostDTO: CreateHostDTO & { id: string } = {
      id: shared.utils.generateId(),
      ...createHostDTO,
    };

    const createUserSaga = new CreateHostSaga(
      new CreateUserInAuthServiceStep(),
      new CreateHostInBookingServiceStep(),
      new CreateUserInInfoServiceStep(),
    );

    await createUserSaga.execute(hostDTO);

    return new HostCreatedDTO({ id: hostDTO.id });
  }

  @Authorized([shared.enums.Permissions.ADMIN_UPDATE_HOST])
  @Patch("/hosts/:hostId")
  async updateHost(
    @Param("hostId") hostId: string,
    @Body() updateHostDTO: UpdateHostDTO,
  ) {
    const updateHostSaga = new UpdateHostSaga(
      new UpdateHostInBookingServiceStep(
        booking.services.hostService.updateHost,
        booking.services.hostService.revertHost,
      ),
    );
    const versionId = shared.utils.generateId();
    return await updateHostSaga.execute(updateHostDTO, hostId, versionId);
  }

  @Authorized([shared.enums.Permissions.ADMIN_DELETE_HOST])
  @Delete("/hosts/:hostId")
  async deleteHost(@Param("hostId") hostId: string): Promise<UserDeletedDTO> {
    const deleteUserSaga = new DeleteUserSaga(
      new DeleteUserInAuthServiceStep(),
      new DeleteUserInBookingServiceStep(),
      new DeleteUserInInfoServiceStep(),
    );
    return await deleteUserSaga.execute(hostId);
  }

  // --- Bookings ---

  @Authorized([shared.enums.Permissions.ADMIN_READ_BOOKING])
  @Get("/bookings")
  async getBookings() {
    const bookings = await booking.services.bookingService.getBookings();

    return bookings.map((booking) => {
      return new BookingDTO({ ...booking });
    });
  }

  @Authorized([shared.enums.Permissions.ADMIN_READ_BOOKING])
  @Get("/bookings/:bookingId")
  async getBookingById(@Param("bookingId") bookingId: string) {
    const bookingDto =
      await booking.services.bookingService.getBookingById(bookingId);
    return new BookingDTO({ ...bookingDto });
  }

  @Authorized([shared.enums.Permissions.ADMIN_CREATE_BOOKING])
  @Post("/bookings")
  public async createBooking(
    @Body() createBookingDTO: CreateBookingDTO,
  ): Promise<BookingCreatedDTO> {
    const bookingDto = {
      id: shared.utils.generateId(),
      ...createBookingDTO,
    };

    const createClientBookingSaga = new CreateBookingSaga(
      new CreateBookingInBookingServiceStep(
        booking.services.bookingService.createBooking,
        booking.services.bookingService.deleteBooking,
      ),
    );
    await createClientBookingSaga.execute(bookingDto);
    return new BookingCreatedDTO({ id: bookingDto.id });
  }

  @Authorized([shared.enums.Permissions.ADMIN_UPDATE_BOOKING])
  @Patch("/bookings/:bookingId")
  async updateBooking(
    @Body() updateBookingDTO: UpdateBookingDTO,
    @Param("bookingId") bookingId: string,
  ) {
    const bookingDTO = { id: bookingId, ...updateBookingDTO };

    const updateBookingSaga = new UpdateBookingSaga(
      new UpdateBookingInBookingServiceStep(
        booking.services.bookingService.updateBooking,
        booking.services.bookingService.revertBooking,
      ),
    );

    const versionId = shared.utils.generateId();
    await updateBookingSaga.execute(bookingDTO, versionId);
    return new BookingUpdatedDTO({ id: bookingId });
  }

  @Authorized([shared.enums.Permissions.ADMIN_DELETE_BOOKING])
  @Delete("/bookings/:bookingId")
  async deleteBooking(@Param("bookingId") bookingId: string) {
    const deleteBookingSaga = new DeleteBookingSaga(
      new DeleteBookingInBookingServiceStep(
        booking.services.bookingService.deleteBooking,
        booking.services.bookingService.restoreBooking,
      ),
    );
    await deleteBookingSaga.execute(bookingId);
    return new BookingDeletedDTO({ id: bookingId });
  }
}
