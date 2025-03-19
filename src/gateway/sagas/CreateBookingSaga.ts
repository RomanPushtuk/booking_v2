import { Saga } from "../application";
import { CreateBookingDTO } from "../dtos";

export class CreateBookingSaga extends Saga<CreateBookingDTO, void> {}
