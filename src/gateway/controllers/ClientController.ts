import { Service } from "typedi";
import { Get, Post, Delete, JsonController } from "routing-controllers";

@JsonController("/clients")
@Service()
export class ClientController {
  constructor() {}

  @Get("/me")
  async getMe(): Promise<void> {
    throw new Error("ClientController GET /me not implemented");
  }

  @Delete("/me")
  async deleteClient(): Promise<void> {
    throw new Error("ClientController DELETE /me not implemented");
  }

  @Get("/me/bookings")
  async getBookings(): Promise<void> {
    throw new Error("ClientController GET /me/bookings not implemented");
  }

  @Post("/me/bookings")
  public async createBooking(): Promise<void> {
    throw new Error("ClientController POST /me/bookings not implemented");
  }

  @Delete("/me/bookins/:bookingId")
  async cancelBooking(): Promise<void> {
    throw new Error(
      "ClientController DELETE /me/bookins/:bookingId not implemented",
    );
  }
}
