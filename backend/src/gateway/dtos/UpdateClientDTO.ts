import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class _Info {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}

export class UpdateClientDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => _Info)
  info?: _Info;
}
