import {
  Get,
  Patch,
  Delete,
  JsonController,
  HttpError,
  Body,
  Post,
  Param,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import {
  CreateBookingSaga,
  DeleteBookingSaga,
  DeleteUserSaga,
  UpdateBookingSaga,
} from "../sagas";
import {
  CreateBookingDTO,
  DeleteBookingDTO,
  DeleteUserDTO,
  UpdateBookingDTO,
  UpdateHostDTO,
} from "../dtos";
import { UpdateHostSaga } from "../sagas/UpdateHostSaga";

@Service()
@JsonController("/hosts")
export class HostController {
  constructor(
    @Inject() private _deleteUserSaga: DeleteUserSaga,
    @Inject() private _updateHostSaga: UpdateHostSaga,
  ) {}

  @Get()
  async getHosts(): Promise<void> {
    throw new HttpError(500, "HostController GET / not implemented");
  }

  @Get("/me")
  async getMe(): Promise<void> {
    throw new HttpError(500, "HostController GET /me not implemented");
  }

  @Patch("/me")
  async updateHost(@Body() updateHostDTO: UpdateHostDTO): Promise<void> {
    this._updateHostSaga.execute(updateHostDTO);
  }

  @Delete("/me")
  async deleteHost(@Body() deleteUserDTO: DeleteUserDTO): Promise<void> {
    await this._deleteUserSaga.execute(deleteUserDTO);
  }

  @Get("/me/bookings")
  public async getMyBookings(): Promise<void> {
    throw new HttpError(500, "HostController GET /me/bookings not implemented");
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

  @Get("/:id")
  async getHost(): Promise<void> {
    throw new HttpError(500, "HostController GET /:id not implemented");
  }

  @Get("/:id/bookings")
  public async getHostBookings(): Promise<void> {
    throw new HttpError(
      500,
      "HostController GET /:id/bookings not implemented",
    );
  }
}
