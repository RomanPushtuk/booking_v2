import { Inject, Service } from "typedi";
import {
  Get,
  Post,
  Delete,
  JsonController,
  HttpError,
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
  CreateBookingDTO,
  DeleteBookingDTO,
  DeleteUserDTO,
  UpdateBookingDTO,
  UpdateClientDTO,
} from "../dtos";

@Service()
@JsonController("/clients")
export class ClientController {
  constructor(
    @Inject() private _deleteUserSaga: DeleteUserSaga,
    @Inject() private _updateClientSaga: UpdateClientSaga,
  ) {}

  @Get("/me")
  async getMe(): Promise<void> {
    throw new HttpError(500, "ClientController GET /me not implemented");
  }

  @Delete("/me")
  async deleteClient(@Body() deleteUserDTO: DeleteUserDTO): Promise<void> {
    await this._deleteUserSaga.execute(deleteUserDTO);
  }

  @Patch("/me")
  async updateClient(@Body() updateClientDTO: UpdateClientDTO): Promise<void> {
    await this._updateClientSaga.execute(updateClientDTO);
  }

  @Get("/me/bookings")
  async getBookings(): Promise<void> {
    throw new HttpError(
      500,
      "ClientController GET /me/bookings not implemented",
    );
  }

  @Post("/me/bookings")
  public async createBooking(
    @Body() createBookingDTO: CreateBookingDTO,
  ): Promise<void> {
    const createBookingSaga = new CreateBookingSaga();
    await createBookingSaga.execute(createBookingDTO);
  }

  @Patch("/me/bookings/:bookingId")
  public async updateBooking(
    @Body() updateBookingDTO: UpdateBookingDTO,
  ): Promise<void> {
    const updateBookingSaga = new UpdateBookingSaga();
    await updateBookingSaga.execute(updateBookingDTO);
  }

  @Delete("/me/bookins/:bookingId")
  async cancelBooking(@Param("bookingId") bookingId: string): Promise<void> {
    const deleteBookingSaga = new DeleteBookingSaga();
    await deleteBookingSaga.execute(new DeleteBookingDTO({ id: bookingId }));
  }
}
