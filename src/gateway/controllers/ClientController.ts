import { Service } from "typedi";
import {
  Get,
  Post,
  Delete,
  JsonController,
  Body,
  Param,
  Patch,
} from "routing-controllers";
import {
  DeleteUserSaga,
  CreateBookingSaga,
  DeleteBookingSaga,
  UpdateBookingSaga,
  UpdateClientSaga,
} from "../sagas";
import {
  ClientDTO,
  CreateBookingDTO,
  DeleteBookingDTO,
  DeleteUserDTO,
  UpdateBookingDTO,
  UpdateClientDTO,
  ClientDeletedDTO,
  ClientUpdatedDTO,
  BookingCreatedDTO,
  BookingDTO,
  BookingUpdatedDTO,
  BookingDeletedDTO,
} from "../dtos";

@Service()
@JsonController("/clients")
export class ClientController {
  constructor() {}

  @Get("/me")
  async getMe(): Promise<ClientDTO> {
    return new ClientDTO({
      id: "test_id",
      info: { firstName: "first_name", lastName: "last_name" },
    });
  }

  @Delete("/me")
  async deleteClient(
    @Body() deleteUserDTO: DeleteUserDTO,
  ): Promise<ClientDeletedDTO> {
    const deleteUserSaga = new DeleteUserSaga();
    await deleteUserSaga.execute(deleteUserDTO);
    return new ClientDeletedDTO({ id: "test_id" });
  }

  @Patch("/me")
  async updateClient(
    @Body() updateClientDTO: UpdateClientDTO,
  ): Promise<ClientUpdatedDTO> {
    const updateClientSaga = new UpdateClientSaga();
    await updateClientSaga.execute(updateClientDTO);
    return new ClientUpdatedDTO({ id: "test_id" });
  }

  @Get("/me/bookings")
  async getBookings(): Promise<BookingDTO[]> {
    return [];
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
        description: "description"
      }
     });
  }

  @Post("/me/bookings")
  public async createBooking(
    @Body() createBookingDTO: CreateBookingDTO,
  ): Promise<BookingCreatedDTO> {
    const createBookingSaga = new CreateBookingSaga();
    await createBookingSaga.execute(createBookingDTO);
    return new BookingCreatedDTO({ id: "test_id" });
  }

  @Patch("/me/bookings/:bookingId")
  public async updateBooking(
    @Body() updateBookingDTO: UpdateBookingDTO,
  ): Promise<BookingUpdatedDTO> {
    const updateBookingSaga = new UpdateBookingSaga();
    await updateBookingSaga.execute(updateBookingDTO);
    return new BookingUpdatedDTO({ id: "test_id" })
  }

  @Delete("/me/bookings/:bookingId")
  async cancelBooking(@Param("bookingId") bookingId: string): Promise<BookingDeletedDTO> {
    const deleteBookingSaga = new DeleteBookingSaga();
    await deleteBookingSaga.execute(new DeleteBookingDTO({ id: bookingId }));
    return new BookingDeletedDTO({ id: "test_id" })
  }
}
