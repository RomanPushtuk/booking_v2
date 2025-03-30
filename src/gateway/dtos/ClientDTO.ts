import {
  MaxLength,
  IsString,
  ValidateNested,
} from "class-validator";
import { shared } from "../imports";

class _Info {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class ClientDTO {
  @MaxLength(36)
  id: string;

  @ValidateNested()
  info: _Info;

  constructor(data: shared.types.GetInterface<ClientDTO>) {
    this.id = data.id;
    this.info = data.info;
  }
}
