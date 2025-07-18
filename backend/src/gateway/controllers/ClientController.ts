import { Service } from "typedi";
import {
  Get,
  Post,
  Delete,
  JsonController,
  Body,
  Param,
  Patch,
  QueryParam,
  Authorized,
  CurrentUser,
  HttpCode,
} from "routing-controllers";
import { shared, booking, auth } from "../imports";
import {
  DeleteUserSaga,
  CreateClientBookingSaga,
  DeleteBookingSaga,
  UpdateClientBookingSaga,
  UpdateClientSaga,
} from "../sagas";
import {
  CreateClientBookingDTO,
  UpdateClientBookingDTO,
  UpdateClientDTO,
  ClientDeletedDTO,
  ClientUpdatedDTO,
  BookingCreatedDTO,
  BookingDTO,
  BookingUpdatedDTO,
  BookingDeletedDTO,
  ClientDTO,
} from "../dtos";
import {
  CreateClientBookingInBookingServiceStep,
  DeleteBookingInBookingServiceStep,
  DeleteBookingInInfoServiceStep,
  DeleteUserInAuthServiceStep,
  DeleteUserInBookingServiceStep,
  DeleteUserInInfoServiceStep,
  UpdateClientBookingInBookingServiceStep,
  UpdateClientInBookingServiceStep,
  UpdateClientInInfoServiceStep,
} from "../steps";

@Service()
@JsonController("/clients")
export class ClientController {
  constructor() {}

  @Authorized([shared.enums.Permissions.CLIENT_READ_PROFILE])
  @Get("/me")
  async getMe(@CurrentUser() user: auth.domain.User): Promise<ClientDTO> {
    const client = await booking.services.clientService.getClientById(user.id);

    return new ClientDTO({ ...client });
  }

  @Authorized([shared.enums.Permissions.CLIENT_DELETE_PROFILE])
  @Delete("/me")
  async deleteClient(
    @CurrentUser() user: auth.domain.User,
  ): Promise<ClientDeletedDTO> {
    const deleteUserSaga = new DeleteUserSaga(
      new DeleteUserInAuthServiceStep(),
      new DeleteUserInBookingServiceStep(),
      new DeleteUserInInfoServiceStep(),
    );
    await deleteUserSaga.execute(user.id);
    return new ClientDeletedDTO({ id: user.id });
  }

  @Authorized([shared.enums.Permissions.CLIENT_UPDATE_PROFILE])
  @Patch("/me")
  async updateClient(
    @CurrentUser() user: auth.domain.User,
    @Body() updateClientDTO: UpdateClientDTO,
  ): Promise<ClientUpdatedDTO> {
    const userId = user.id;
    const updateClientSaga = new UpdateClientSaga(
      new UpdateClientInBookingServiceStep(
        booking.services.clientService.updateClient,
        booking.services.clientService.revertClient,
      ),
      new UpdateClientInInfoServiceStep(),
    );
    await updateClientSaga.execute(updateClientDTO, userId);
    return new ClientUpdatedDTO({ id: user.id });
  }

  @Authorized([shared.enums.Permissions.CLIENT_READ_BOOKINGS])
  @Get("/me/bookings")
  async getBookings(
    @CurrentUser() user: auth.domain.User,
    @QueryParam("sortDirection")
    sortDirection: shared.enums.SortDirection = shared.enums.SortDirection.ASC,
    @QueryParam("sortProperty") sortProperty: string = "fromDateTime",
    @QueryParam("fromDateTime") fromDateTime: string = new Date().toISOString(),
    @QueryParam("toDateTime") toDateTime: string = new Date().toISOString(),
  ): Promise<BookingDTO[]> {
    const sorting = new shared.application.BookingSorting(
      sortDirection,
      sortProperty,
    );

    const filters = new shared.application.BookingFilters({
      clientId: user.id,
      fromDateTime,
      toDateTime,
      deleted: false,
    });

    const clientBookings =
      await booking.services.clientService.getClientBookings(user.id, {
        sorting,
        filters,
      });

    return clientBookings.map(
      (booking) =>
        new BookingDTO({
          id: booking.id,
          clientId: booking.clientId,
          hostId: booking.hostId,
          fromDateTime: booking.fromDateTime,
          toDateTime: booking.toDateTime,
        }),
    );
  }

  @Authorized([shared.enums.Permissions.CLIENT_READ_BOOKINGS])
  @Get("/me/bookings/:bookingId")
  async getBookingById(
    @CurrentUser() user: auth.domain.User,
    @Param("bookingId") bookingId: string,
  ): Promise<BookingDTO> {
    const clientBooking =
      await booking.services.clientService.getClientBookingById(
        user.id,
        bookingId,
      );

    return new BookingDTO({
      id: clientBooking.id,
      clientId: clientBooking.clientId,
      hostId: clientBooking.hostId,
      fromDateTime: clientBooking.fromDateTime,
      toDateTime: clientBooking.toDateTime,
    });
  }

  @Authorized([shared.enums.Permissions.CLIENT_CREATE_BOOKING])
  @Post("/me/bookings")
  @HttpCode(201)
  public async createBooking(
    @CurrentUser() user: auth.domain.User,
    @Body() createClientBookingDTO: CreateClientBookingDTO,
  ): Promise<BookingCreatedDTO> {
    const bookingId = shared.utils.generateId();

    const createClientBookingSaga = new CreateClientBookingSaga(
      new CreateClientBookingInBookingServiceStep(
        booking.services.clientService.createBooking,
        booking.services.clientService.deleteBooking,
      ),
    );
    await createClientBookingSaga.execute(
      createClientBookingDTO,
      user.id,
      bookingId,
    );
    return new BookingCreatedDTO({ id: bookingId });
  }

  @Authorized([shared.enums.Permissions.CLIENT_UPDATE_BOOKING])
  @Patch("/me/bookings/:bookingId")
  public async updateBooking(
    @CurrentUser() user: auth.domain.User,
    @Param("bookingId") bookingId: string,
    @Body() updateClientBookingDTO: UpdateClientBookingDTO,
  ): Promise<BookingUpdatedDTO> {
    await booking.services.clientService.getClientBookingById(
      user.id,
      bookingId,
    );

    const updateClientBookingSaga = new UpdateClientBookingSaga(
      new UpdateClientBookingInBookingServiceStep(
        booking.services.clientService.updateBooking,
        booking.services.clientService.revertBooking,
      ),
    );

    const versionId = shared.utils.generateId();
    await updateClientBookingSaga.execute(
      updateClientBookingDTO,
      bookingId,
      versionId,
    );
    return new BookingUpdatedDTO({ id: bookingId });
  }

  @Authorized([shared.enums.Permissions.CLIENT_CANCEL_BOOKING])
  @Delete("/me/bookings/:bookingId")
  async cancelBooking(
    @CurrentUser() user: auth.domain.User,
    @Param("bookingId") bookingId: string,
  ): Promise<BookingDeletedDTO> {
    await booking.services.clientService.getClientBookingById(
      user.id,
      bookingId,
    );

    const deleteBookingSaga = new DeleteBookingSaga(
      new DeleteBookingInBookingServiceStep(
        booking.services.clientService.deleteBooking,
        booking.services.clientService.restoreBooking,
      ),
      new DeleteBookingInInfoServiceStep(),
    );
    await deleteBookingSaga.execute(bookingId);
    return new BookingDeletedDTO({ id: bookingId });
  }
}
