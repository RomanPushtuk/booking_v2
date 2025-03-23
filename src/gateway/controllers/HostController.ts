import {
  Get,
  Patch,
  Delete,
  JsonController,
  Body,
  Post,
  Param,
} from "routing-controllers";
import { Service } from "typedi";
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
  DeleteBookingDTO,
  DeleteUserDTO,
  HostDeletedDTO,
  HostDTO,
  HostUpdatedDTO,
  UpdateBookingDTO,
  UpdateHostDTO,
} from "../dtos";
import { UpdateHostSaga } from "../sagas/UpdateHostSaga";
import {
  DeleteUserInAuthServiceStep,
  DeleteUserInBookingServiceStep,
  DeleteUserInInfoServiceStep,
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
    const updateHostSaga = new UpdateHostSaga();
    await updateHostSaga.execute(updateHostDTO);
    return new HostUpdatedDTO({ id: "test_id" });
  }

  @Delete("/me")
  async deleteHost(
    @Body() deleteUserDTO: DeleteUserDTO,
  ): Promise<HostDeletedDTO> {
    const deleteUserSaga = new DeleteUserSaga(
      new DeleteUserInAuthServiceStep(),
      new DeleteUserInBookingServiceStep(),
      new DeleteUserInInfoServiceStep(),
    );
    await deleteUserSaga.execute(deleteUserDTO);
    return new HostDeletedDTO({ id: "test_id" });
  }

  @Get("/me/bookings")
  public async getMyBookings(): Promise<BookingDTO[]> {
    return [];
  }

  @Post("/me/bookings")
  public async createBooking(
    @Body() createBookingDTO: CreateBookingDTO,
  ): Promise<BookingCreatedDTO> {
    const createBookingSaga = new CreateBookingSaga();
    await createBookingSaga.execute(createBookingDTO);
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
    @Body() updateBookingDTO: UpdateBookingDTO,
  ): Promise<BookingUpdatedDTO> {
    const updateBookingSaga = new UpdateBookingSaga();
    await updateBookingSaga.execute(updateBookingDTO);
    return new BookingUpdatedDTO({ id: "test_id" });
  }

  @Delete("/me/bookings/:bookingId")
  async cancelBooking(
    @Param("bookingId") bookingId: string,
  ): Promise<BookingDeletedDTO> {
    const deleteBookingSaga = new DeleteBookingSaga();
    await deleteBookingSaga.execute(new DeleteBookingDTO({ id: bookingId }));
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
  public async getHostBookings(): Promise<BookingDTO[]> {
    return [];
  }
}
