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
  ClientUpdatedDTO,
  BookingCreatedDTO,
  BookingDTO,
  BookingUpdatedDTO,
  BookingDeletedDTO,
  ClientDTO,
  UserDeletedDTO,
} from "../dtos";
import {
  CreateClientBookingInBookingServiceStep,
  DeleteClientBookingInBookingServiceStep,
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
    return await booking.services.clientService.getClientById(user.id);
  }

  @Authorized([shared.enums.Permissions.CLIENT_DELETE_PROFILE])
  @Delete("/me")
  async deleteClient(
    @CurrentUser() user: auth.domain.User,
  ): Promise<UserDeletedDTO> {
    const deleteUserSaga = new DeleteUserSaga(
      new DeleteUserInAuthServiceStep(),
      new DeleteUserInBookingServiceStep(),
      new DeleteUserInInfoServiceStep(),
    );
    return await deleteUserSaga.execute(user.id);
  }

  @Authorized([shared.enums.Permissions.CLIENT_UPDATE_PROFILE])
  @Patch("/me")
  async updateClient(
    @CurrentUser() user: auth.domain.User,
    @Body() updateClientDTO: UpdateClientDTO,
  ): Promise<ClientUpdatedDTO> {
    const updateClientSaga = new UpdateClientSaga(
      new UpdateClientInBookingServiceStep(
        booking.services.clientService.updateClient,
        booking.services.clientService.revertClient,
      ),
      new UpdateClientInInfoServiceStep(),
    );
    const versionId = shared.utils.generateId();
    return await updateClientSaga.execute(updateClientDTO, user.id, versionId);
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

    return await booking.services.clientService.getClientBookings(user.id, {
      sorting,
      filters,
    });
  }

  @Authorized([shared.enums.Permissions.CLIENT_READ_BOOKINGS])
  @Get("/me/bookings/:bookingId")
  async getBookingById(
    @CurrentUser() user: auth.domain.User,
    @Param("bookingId") bookingId: string,
  ): Promise<BookingDTO> {
    return await booking.services.clientService.getClientBookingById(
      user.id,
      bookingId,
    );
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
    return await createClientBookingSaga.execute(
      createClientBookingDTO,
      user.id,
      bookingId,
    );
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
    return await updateClientBookingSaga.execute(updateClientBookingDTO, bookingId, versionId);
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
      new DeleteClientBookingInBookingServiceStep(
        booking.services.clientService.deleteBooking,
        booking.services.clientService.restoreBooking,
      ),
    );
    return await deleteBookingSaga.execute(bookingId);
  }
}
