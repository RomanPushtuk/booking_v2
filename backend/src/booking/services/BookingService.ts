import { Inject, Service } from "typedi";
import { UnitOfWork } from "./UnitOfWork";
import { gateway } from "../imports";
import { Booking } from "../domain";
import { vs } from "../vs";
import { UpdateBookingData } from "../types";

@Service()
export class BookingService {
  constructor(
    @Inject() private _uow: UnitOfWork,
    @Inject("vs") private _vs: typeof vs,
  ) {
    this.getBookings = this.getBookings.bind(this);
    this.getBookingById = this.getBookingById.bind(this);
    this.createBooking = this.createBooking.bind(this);
    this.updateBooking = this.updateBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
  }

  async getBookings() {
    const bookings = this._uow.bookingRepository.getAll();
    if (!bookings) throw new Error("Bookings not found");

    return bookings.map((booking) => {
      return new gateway.dtos.BookingDTO({
        id: booking.getId(),
        clientId: booking.getClientId(),
        hostId: booking.getHostId(),
        fromDateTime: booking.getFromDateTime(),
        toDateTime: booking.getToDateTime(),
      });
    });
  }

  async getBookingById(bookingId: string) {
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("Booking not found");

    return new gateway.dtos.BookingDTO({
      id: booking.getId(),
      clientId: booking.getClientId(),
      hostId: booking.getHostId(),
      fromDateTime: booking.getFromDateTime(),
      toDateTime: booking.getToDateTime(),
    });
  }

  async createBooking(
    bookingDto: gateway.dtos.BookingDTO,
  ): Promise<gateway.dtos.BookingCreatedDTO> {
    const booking = new Booking({
      ...bookingDto,
      deleted: false,
    });

    this._uow.bookingRepository.save(booking);

    this._uow.commit();
    return new gateway.dtos.BookingCreatedDTO({ id: booking.getId() });
  }

  async updateBooking(
    updateBookingDTO: gateway.dtos.UpdateBookingDTO & { id: string },
    versionId: string,
  ) {
    try {
      this._uow.begin();

      const booking = this._uow.bookingRepository.getById(updateBookingDTO.id);
      if (!booking) throw new Error("Booking not found");

      Booking.update(booking, updateBookingDTO);
      this._uow.bookingRepository.save(booking);

      await this._vs.insertAsync({
        id: updateBookingDTO.id,
        versionId,
        data: updateBookingDTO,
      });

      this._uow.commit();

      return new gateway.dtos.BookingUpdatedDTO({ id: booking.getId() });
    } catch (error) {
      this._uow.rollback();
      throw error;
    }
  }

  async deleteBooking(
    bookingId: string,
  ): Promise<gateway.dtos.BookingDeletedDTO> {
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("No booking found");
    booking.setDeleted(true);
    this._uow.bookingRepository.save(booking);
    return new gateway.dtos.BookingDeletedDTO({ id: bookingId });
  }

  async restoreBooking(
    bookingId: string,
  ): Promise<gateway.dtos.BookingRestoredDTO> {
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("No booking found");
    booking.setDeleted(false);
    this._uow.bookingRepository.save(booking);
    return new gateway.dtos.BookingRestoredDTO({ id: bookingId });
  }

  async revertBooking(bookingId: string, versionId: string) {
    const booking = this._uow.bookingRepository.getById(bookingId);
    if (!booking) throw new Error("booking not found");
    const version = await this._vs
      .findOneAsync({ id: bookingId, versionId })
      .execAsync();
    if (!version) throw new Error("version not found");
    const updateData = version["data"] as UpdateBookingData;
    const numRemoved = await this._vs.removeAsync(
      { id: bookingId, versionId },
      {},
    );
    if (!numRemoved)
      throw new Error("version was not removed from version storage");
    Booking.update(booking, updateData);
    this._uow.bookingRepository.save(booking);

    return new gateway.dtos.BookingRevertedDTO({ id: booking.getId() });
  }
}
