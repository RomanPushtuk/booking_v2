import { Saga } from "../application";
import { UpdateBookingDTO } from "../dtos";

export class UpdateBookingSaga extends Saga<UpdateBookingDTO, void> {}
