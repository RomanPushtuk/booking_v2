import { Saga } from "../application";
import { DeleteBookingDTO } from "../dtos";

export class DeleteBookingSaga extends Saga<DeleteBookingDTO, void> {}
