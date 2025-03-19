import { MaxLength } from "class-validator";

export class DeleteUserDTO {
  @MaxLength(36)
  id: string;
}
