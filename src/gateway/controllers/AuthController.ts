import { Inject, Service } from "typedi";
import { Body, HttpError, JsonController, Post } from "routing-controllers";
import { CreateUserSaga } from "../sagas";
import { CreateUserDTO } from "../dtos";

@Service()
@JsonController("/auth")
export class AuthController {
  constructor(@Inject() private _createUserSaga: CreateUserSaga) {}

  @Post("/register")
  async register(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    await this._createUserSaga.execute(createUserDTO);
  }

  @Post("/login")
  async login(): Promise<void> {
    throw new HttpError(500, "AuthController POST /login not implemented.");
  }
}
