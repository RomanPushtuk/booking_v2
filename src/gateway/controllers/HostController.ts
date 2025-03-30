import {
  Get,
  Patch,
  Delete,
  JsonController,
  Body,
  Post,
  Param,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import { booking, shared } from "../imports";
import {
  CreateBookingSaga,
  DeleteBookingSaga,
  DeleteUserSaga,
  UpdateBookingSaga,
} from "../sagas";
import {
  BookingCreatedDTO,
  BookingDeletedDTO,
  BookingDTO,
  BookingUpdatedDTO,
  CreateBookingDTO,
  // DeleteBookingDTO,
  // DeleteUserDTO,
  HostDeletedDTO,
  HostDTO,
  HostUpdatedDTO,
  UpdateBookingDTO,
  UpdateHostDTO,
} from "../dtos";
import { UpdateHostSaga } from "../sagas/UpdateHostSaga";
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
  UpdateHostInBookingServiceStep,
  UpdateHostInInfoServiceStep,
} from "../steps";

@Service()
@JsonController("/hosts")
export class HostController {
  constructor() {}

  @Get()
  async getHosts(): Promise<HostDTO[]> {
    return [];
  }

  @Get("/me")
  async getMe(): Promise<HostDTO> {
    return new HostDTO({
      id: "test_id",
      forwardBooking: "2 weeks",
      workHours: [
        { from: "09:00", to: "13:00" },
        { from: "14:00", to: "18:00" },
      ],
      workDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
      info: { firstName: "first_name", lastName: "last_name " },
    });
  }

  @Patch("/me")
  async updateHost(
    @Body() updateHostDTO: UpdateHostDTO,
  ): Promise<HostUpdatedDTO> {
    console.log(updateHostDTO);
    const userId = "test_id";
    const updateHostSaga = new UpdateHostSaga(
      new UpdateHostInBookingServiceStep(
        booking.services.hostService.updateHost,
        booking.services.hostService.revertHost,
      ),
      new UpdateHostInInfoServiceStep(),
    );
    await updateHostSaga.execute(updateHostDTO, userId);
    return new HostUpdatedDTO({ id: "test_id" });
  }

  @Delete("/me")
  async deleteHost() // @Body() deleteUserDTO: DeleteUserDTO,
  : Promise<HostDeletedDTO> {
    const deleteUserSaga = new DeleteUserSaga(
      new DeleteUserInAuthServiceStep(),
      new DeleteUserInBookingServiceStep(),
      new DeleteUserInInfoServiceStep(),
    );
    await deleteUserSaga.execute("test_id");
    return new HostDeletedDTO({ id: "test_id" });
  }

  @Get("/me/bookings")
  public async getMyBookings(
    @QueryParam("sortDirection") sortDirection:  shared.enums.SortDirection = shared.enums.SortDirection.DESC,
    @QueryParam("sortProperty") sortProperty: string = "dateTimeFrom",
    @QueryParam("dateTimeFrom") dateTimeFrom: string,
    @QueryParam("dateTimeTo") dateTimeTo: string,
    @QueryParam("clientId") clientId: string,
  ): Promise<BookingDTO[]> {
    new shared.application.BookingSorting(sortDirection, sortProperty);
    new shared.application.BookingFilters({
      clientId,
      hostId: "test_id",
      dateTimeFrom,
      dateTimeTo,
    });
    return [];
  }

  @Post("/me/bookings")
  public async createBooking(
    @Body() createBookingDTO: CreateBookingDTO,
  ): Promise<BookingCreatedDTO> {
    const bookingDTO = new BookingDTO({
      id: shared.utils.generateId(),
      ...createBookingDTO,
      clientId: "test_client_id",
      hostId: "test_host_id",
      fromDateTime: "2025-03-23T19:42:22.327Z",
      toDateTime: "2025-03-23T19:42:22.327Z",
      info: {
        title: "title",
        description: "description",
      },
    });
    const createBookingSaga = new CreateBookingSaga(
      new CreateBookingInBookingServiceStep(
        booking.services.hostService.createBooking,
        booking.services.hostService.deleteBooking,
      ),
      new CreateBookingInInfoServiceStep(),
    );
    await createBookingSaga.execute(bookingDTO);
    return new BookingCreatedDTO({ id: "test_id" });
  }

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

  @Patch("/me/bookings/:bookingId")
  public async updateBooking(
    @Param("bookingId") bookingId: string,
    @Body() updateBookingDTO: UpdateBookingDTO,
  ): Promise<BookingUpdatedDTO> {
    const updateBookingSaga = new UpdateBookingSaga(
      new UpdateBookingInBookingServiceStep(
        booking.services.hostService.updateBooking,
        booking.services.hostService.revertBooking,
      ),
      new UpdateBookingInInfoServiceStep(),
    );
    await updateBookingSaga.execute(updateBookingDTO, bookingId);
    return new BookingUpdatedDTO({ id: "test_id" });
  }

  @Delete("/me/bookings/:bookingId")
  async cancelBooking(
    @Param("bookingId") bookingId: string,
  ): Promise<BookingDeletedDTO> {
    const deleteBookingSaga = new DeleteBookingSaga(
      new DeleteBookingInBookingServiceStep(
        booking.services.hostService.deleteBooking,
        booking.services.hostService.restoreBooking,
      ),
      new DeleteBookingInInfoServiceStep(),
    );
    await deleteBookingSaga.execute(bookingId);
    return new BookingDeletedDTO({ id: "test_id" });
  }

  // Public
  @Get("/:id")
  async getHost(): Promise<HostDTO> {
    return new HostDTO({
      id: "test_id",
      forwardBooking: "2 weeks",
      workHours: [
        { from: "09:00", to: "13:00" },
        { from: "14:00", to: "18:00" },
      ],
      workDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
      info: { firstName: "first_name", lastName: "last_name " },
    });
  }

  @Get("/:id/bookings")
  public async getHostBookings(
    @QueryParam("sortDirection") sortDirection: shared.enums.SortDirection = shared.enums.SortDirection.DESC,
    @QueryParam("sortProperty") sortProperty: string = "dateTimeFrom",
    @QueryParam("dateTimeFrom") dateTimeFrom: string,
    @QueryParam("dateTimeTo") dateTimeTo: string,
    @QueryParam("clientId") clientId: string,
    @QueryParam("hostId") hostId: string,
  ): Promise<BookingDTO[]> {
    new shared.application.BookingSorting(sortDirection, sortProperty);
    new shared.application.BookingFilters({
      clientId,
      hostId,
      dateTimeFrom,
      dateTimeTo,
    });
    return [];
  }
}
