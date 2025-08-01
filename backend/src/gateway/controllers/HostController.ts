import {
  Get,
  Patch,
  Delete,
  JsonController,
  Body,
  Post,
  Param,
  QueryParam,
  CurrentUser,
  Authorized,
  HttpCode,
} from "routing-controllers";
import { Service } from "typedi";
import { booking, shared, auth } from "../imports";
import {
  CreateHostBookingSaga,
  DeleteHostBookingSaga,
  DeleteUserSaga,
  UpdateHostBookingSaga,
} from "../sagas";
import {
  BookingCreatedDTO,
  BookingDeletedDTO,
  BookingDTO,
  BookingUpdatedDTO,
  CreateHostBookingDTO,
  HostDTO,
  HostUpdatedDTO,
  PublicBookingDTO,
  UpdateHostBookingDTO,
  UpdateHostDTO,
  UserDeletedDTO,
} from "../dtos";
import { UpdateHostSaga } from "../sagas/UpdateHostSaga";
import {
  CreateHostBookingInBookingServiceStep,
  DeleteHostBookingInBookingServiceStep,
  DeleteUserInAuthServiceStep,
  DeleteUserInBookingServiceStep,
  DeleteUserInInfoServiceStep,
  UpdateHostBookingInBookingServiceStep,
  UpdateHostInBookingServiceStep,
} from "../steps";

@Service()
@JsonController("/hosts")
export class HostController {
  constructor() {}

  @Get()
  async getHosts(): Promise<HostDTO[]> {
    const filters = new shared.application.HostFilters({
      deleted: false,
    });

    return await booking.services.hostService.getAllHosts({ filters });
  }

  @Authorized([shared.enums.Permissions.HOST_READ_PROFILE])
  @Get("/me")
  async getMe(@CurrentUser() user: auth.domain.User): Promise<HostDTO> {
    return await booking.services.hostService.getHostById(user.id);
  }

  @Get("/:id")
  async getHost(@Param("id") id: string): Promise<HostDTO> {
    return await booking.services.hostService.getHostById(id);
  }

  @Authorized([shared.enums.Permissions.HOST_READ_BOOKINGS])
  @Get("/me/bookings")
  public async getMyBookings(
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
      hostId: user.id,
      fromDateTime,
      toDateTime,
      deleted: false,
    });

    return await booking.services.hostService.getHostBookings(user.id, {
      sorting,
      filters,
    });
  }

  @Get("/:id/bookings")
  public async getHostBookings(
    @Param("id") hostId: string,
    @QueryParam("sortDirection")
    sortDirection: shared.enums.SortDirection = shared.enums.SortDirection.ASC,
    @QueryParam("sortProperty") sortProperty: string = "fromDateTime",
  ): Promise<PublicBookingDTO[]> {
    const host = await booking.services.hostService.getHostById(hostId);

    const fromDateTime = new Date().toISOString();
    const toDateTime = shared.utils.addDurationToDate(host.forwardBooking);

    const sorting = new shared.application.BookingSorting(
      sortDirection,
      sortProperty,
    );
    const filters = new shared.application.BookingFilters({
      hostId: hostId,
      fromDateTime,
      toDateTime,
      deleted: false,
    });

    return await booking.services.hostService.getHostBookings(hostId, {
      sorting,
      filters,
    });
  }

  @Authorized([shared.enums.Permissions.HOST_DELETE_PROFILE])
  @Delete("/me")
  async deleteHost(
    @CurrentUser() user: auth.domain.User,
  ): Promise<UserDeletedDTO> {
    const deleteUserSaga = new DeleteUserSaga(
      new DeleteUserInAuthServiceStep(),
      new DeleteUserInBookingServiceStep(),
      new DeleteUserInInfoServiceStep(),
    );
    return await deleteUserSaga.execute(user.id);
  }

  @Authorized([shared.enums.Permissions.HOST_UPDATE_PROFILE])
  @Patch("/me")
  async updateHost(
    @CurrentUser() user: auth.domain.User,
    @Body() updateHostDTO: UpdateHostDTO,
  ): Promise<HostUpdatedDTO> {
    const updateHostSaga = new UpdateHostSaga(
      new UpdateHostInBookingServiceStep(
        booking.services.hostService.updateHost,
        booking.services.hostService.revertHost,
      ),
    );
    const versionId = shared.utils.generateId();
    return await updateHostSaga.execute(updateHostDTO, user.id, versionId);
  }

  @Authorized([shared.enums.Permissions.HOST_CREATE_BOOKING])
  @HttpCode(201)
  @Post("/me/bookings")
  public async createBooking(
    @CurrentUser() user: auth.domain.User,
    @Body() createHostBookingDTO: CreateHostBookingDTO,
  ): Promise<BookingCreatedDTO> {
    const bookingId = shared.utils.generateId();

    const createHostBookingSaga = new CreateHostBookingSaga(
      new CreateHostBookingInBookingServiceStep(
        booking.services.hostService.createBooking,
        booking.services.hostService.deleteBooking,
      ),
    );
    return await createHostBookingSaga.execute(
      createHostBookingDTO,
      user.id,
      bookingId,
    );
  }

  @Authorized([shared.enums.Permissions.HOST_READ_BOOKINGS])
  @Get("/me/bookings/:bookingId")
  async getBookingById(
    @CurrentUser() user: auth.domain.User,
    @Param("bookingId") bookingId: string,
  ): Promise<BookingDTO> {
    return await booking.services.hostService.getHostBookingById(
      user.id,
      bookingId,
    );
  }

  @Authorized([shared.enums.Permissions.HOST_UPDATE_BOOKING])
  @Patch("/me/bookings/:bookingId")
  public async updateBooking(
    @CurrentUser() user: auth.domain.User,
    @Param("bookingId") bookingId: string,
    @Body() updateHostBookingDTO: UpdateHostBookingDTO,
  ): Promise<BookingUpdatedDTO> {
    await booking.services.hostService.getHostBookingById(user.id, bookingId);

    const updateHostBookingSaga = new UpdateHostBookingSaga(
      new UpdateHostBookingInBookingServiceStep(
        booking.services.hostService.updateBooking,
        booking.services.hostService.revertBooking,
      ),
    );

    const versionId = shared.utils.generateId();
    return await updateHostBookingSaga.execute(
      updateHostBookingDTO,
      user.id,
      bookingId,
      versionId,
    );
  }

  @Authorized([shared.enums.Permissions.HOST_CANCEL_BOOKING])
  @Delete("/me/bookings/:bookingId")
  async cancelBooking(
    @CurrentUser() user: auth.domain.User,
    @Param("bookingId") bookingId: string,
  ): Promise<BookingDeletedDTO> {
    await booking.services.hostService.getHostBookingById(user.id, bookingId);

    const deleteHostBookingSaga = new DeleteHostBookingSaga(
      new DeleteHostBookingInBookingServiceStep(
        booking.services.hostService.deleteBooking,
        booking.services.hostService.restoreBooking,
      ),
    );
    return await deleteHostBookingSaga.execute(bookingId, user.id);
  }
}
