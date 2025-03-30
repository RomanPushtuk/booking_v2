import { Service } from 'typedi';
import { gateway } from '../imports';
import { logger } from '../logger';
import { BookingRepository } from '../repositories';

@Service()
export class BookingService {
	private bookingRepo: BookingRepository;

	constructor() {
		this.bookingRepo = new BookingRepository();
		this.createBooking = this.createBooking.bind(this);
		this.deleteBooking = this.deleteBooking.bind(this);
		this.restoreBooking = this.restoreBooking.bind(this);
		this.updateBooking = this.updateBooking.bind(this);
		this.revertBooking = this.revertBooking.bind(this);
	}

	async createBooking(bookingDTO: gateway.dtos.BookingDTO) {
		logger.info({ bookingDTO }, `${this.constructor.name} createBooking`);
		return this.bookingRepo.saveBooking(bookingDTO);
	}

	async deleteBooking(bookingId: string) {
		logger.info({ bookingId }, `${this.constructor.name} deleteBooking`);
		return this.bookingRepo.deleteBooking(bookingId);
	}

	async restoreBooking(bookingId: string) {
		logger.info({ bookingId }, `${this.constructor.name} restoreBooking`);
		return this.bookingRepo.update({ id: bookingId }, { $set: { deleted: false } }, {});
	}

	async updateBooking(updateBookingDTO: gateway.dtos.UpdateBookingDTO, bookingId: string) {
		logger.info({ updateBookingDTO, bookingId }, `${this.constructor.name} updateBooking`);
		return this.bookingRepo.update({ id: bookingId }, { $set: updateBookingDTO }, {});
	}

	async revertBooking(bookingId: string) {
		logger.info({ bookingId }, `${this.constructor.name} revertBooking`);
		return this.bookingRepo.getBookingById(bookingId); // Get curr version
	}
}
