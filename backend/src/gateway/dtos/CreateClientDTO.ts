import { Type } from "class-transformer";
import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { shared } from "../imports";

class _Info {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}

export class CreateClientDTO {
  @MaxLength(36)
  login: string;

  @IsString()
  password: string;

  @IsIn(Object.values(shared.enums.Roles))
  role: shared.enums.Roles = shared.enums.Roles.CLIENT;

  @IsOptional()
  @ValidateNested()
  @Type(() => _Info)
  info: _Info;
}
