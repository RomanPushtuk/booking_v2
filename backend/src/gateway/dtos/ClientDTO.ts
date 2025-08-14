import {
  MaxLength,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { shared } from "../imports";
import { Type } from "class-transformer";

class _Info {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}

export class ClientDTO {
  @MaxLength(36)
  id: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => _Info)
  info?: _Info;

  constructor(data: shared.types.GetInterface<ClientDTO>) {
    this.id = data.id;
    this.info = data.info;
  }
}
