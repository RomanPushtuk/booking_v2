import {
  Get,
  Patch,
  Delete,
  JsonController,
  HttpError,
} from "routing-controllers";
import { Service } from "typedi";

@Service()
@JsonController("/hosts")
export class HostController {
  constructor() {}

  @Get()
  async getHosts(): Promise<void> {
    throw new HttpError(500, "HostController GET / not implemented");
  }

  @Get("/me")
  async getMe(): Promise<void> {
    throw new HttpError(500, "HostController GET /me not implemented");
  }

  @Patch("/me")
  async updateHost(): Promise<void> {
    throw new HttpError(500, "HostController PATCH /me not implemented");
  }

  @Delete("/me")
  async deleteHost(): Promise<void> {
    throw new HttpError(500, "HostController DELETE /me not implemented");
  }

  @Get("/me/bookings")
  public async getMyBookings(): Promise<void> {
    throw new HttpError(500, "HostController GET /me/bookings not implemented");
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
