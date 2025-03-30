import {
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { _WorkHour } from "./HostDTO";
// import { shared } from "../imports";

class _Info {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
}

export class UpdateClientDTO {
  @ValidateNested()
  @IsOptional()
  @Type(() => _WorkHour)
  info?: _Info;


}
