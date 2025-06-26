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
} from "routing-controllers";
import { shared, booking, auth } from "../imports";
import {
  DeleteUserSaga,
  CreateBookingSaga,
  DeleteBookingSaga,
  UpdateBookingSaga,
  UpdateClientSaga,
} from "../sagas";
import {
  CreateBookingDTO,
  UpdateBookingDTO,
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
  CreateBookingInBookingServiceStep,
  CreateBookingInInfoServiceStep,
  DeleteBookingInBookingServiceStep,
  DeleteBookingInInfoServiceStep,
  DeleteUserInAuthServiceStep,
  DeleteUserInBookingServiceStep,
  DeleteUserInInfoServiceStep,
  UpdateBookingInBookingServiceStep,
  UpdateBookingInInfoServiceStep,
  UpdateClientInBookingServiceStep,
  UpdateClientInInfoServiceStep,
} from "../steps";

@Service()
@JsonController("/clients")
export class ClientController {
  constructor() {}

  @Authorized([shared.enums.Roles.CLIENT])
  @Get("/me")
  async getMe(@CurrentUser() user: auth.domain.User): Promise<ClientDTO> {
    const client = await booking.services.clientService.getClientById(user.id);

    return new ClientDTO({ ...client });
  }

  @Authorized([shared.enums.Roles.CLIENT])
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

  @Authorized([shared.enums.Roles.CLIENT])
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

  // private
  @Authorized([shared.enums.Roles.CLIENT])
  @Get("/me/bookings")
  async getBookings(
    @QueryParam("sortDirection")
    sortDirection: shared.enums.SortDirection = shared.enums.SortDirection.DESC,
    @QueryParam("sortProperty") sortProperty: string = "dateTimeFrom",
    @QueryParam("dateTimeFrom") dateTimeFrom: string,
    @QueryParam("dateTimeTo") dateTimeTo: string,
    @QueryParam("hostId") hostId: string,
  ): Promise<BookingDTO[]> {
    new shared.application.BookingSorting(sortDirection, sortProperty);
    new shared.application.BookingFilters({
      hostId,
      clientId: "test_id",
      dateTimeFrom,
      dateTimeTo,
    });
    return [];
  }

  // private
  @Authorized([shared.enums.Roles.CLIENT])
  @Get("/me/bookings/:bookingId")
  async getBookingById(): Promise<BookingDTO> {
    return new BookingDTO({
      id: "test_id",
      clientId: "client_id",
      hostId: "host_id",
      fromDateTime: "2025-03-23T14:58:00.289Z",
      toDateTime: "2025-03-23T14:58:00.289Z",
      info: {
        title: "title",
        description: "description",
      },
    });
  }

  // private
  @Authorized([shared.enums.Roles.CLIENT])
  @Post("/me/bookings")
  public async createBooking(
    @Body() createBookingDTO: CreateBookingDTO,
  ): Promise<BookingCreatedDTO> {
    const bookingDTO = new BookingDTO({
      id: shared.utils.generateId(),
      ...createBookingDTO,
    });
    const createBookingSaga = new CreateBookingSaga(
      new CreateBookingInBookingServiceStep(
        booking.services.clientService.createBooking,
        booking.services.clientService.deleteBooking,
      ),
      new CreateBookingInInfoServiceStep(),
    );
    await createBookingSaga.execute(bookingDTO);
    return new BookingCreatedDTO({ id: bookingDTO.id });
  }

  // private
  @Authorized([shared.enums.Roles.CLIENT])
  @Patch("/me/bookings/:bookingId")
  public async updateBooking(
    @Param("bookingId") bookingId: string,
    @Body() updateBookingDTO: UpdateBookingDTO,
  ): Promise<BookingUpdatedDTO> {
    const updateBookingSaga = new UpdateBookingSaga(
      new UpdateBookingInBookingServiceStep(
        booking.services.clientService.updateBooking,
        booking.services.clientService.revertBooking,
      ),
      new UpdateBookingInInfoServiceStep(),
    );
    await updateBookingSaga.execute(updateBookingDTO, bookingId);
    return new BookingUpdatedDTO({ id: "test_id" });
  }

  // private
  @Authorized([shared.enums.Roles.CLIENT])
  @Delete("/me/bookings/:bookingId")
  async cancelBooking(
    @Param("bookingId") bookingId: string,
  ): Promise<BookingDeletedDTO> {
    const deleteBookingSaga = new DeleteBookingSaga(
      new DeleteBookingInBookingServiceStep(
        booking.services.clientService.deleteBooking,
        booking.services.clientService.restoreBooking,
      ),
      new DeleteBookingInInfoServiceStep(),
    );
    await deleteBookingSaga.execute(bookingId);
    return new BookingDeletedDTO({ id: "test_id" });
  }
}
