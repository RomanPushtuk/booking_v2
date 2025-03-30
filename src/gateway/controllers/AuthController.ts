import { Service } from "typedi";
import { Body, JsonController, Post } from "routing-controllers";
import { shared } from "../imports";
import { CreateUserSaga } from "../sagas";
import {
  CreateUserDTO,
  UserCreatedDTO,
  UserDTO,
  UserLoggedInDTO,
} from "../dtos";
import {
  CreateUserInAuthServiceStep,
  CreateUserInBookingServiceStep,
  CreateUserInInfoServiceStep,
} from "../steps";

@Service()
@JsonController("/auth")
export class AuthController {
  constructor() {}

  // public
  @Post("/register")
  async register(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserCreatedDTO> {
    const userDTO = new UserDTO({
      id: shared.utils.generateId(),
      ...createUserDTO,
      login: "test_login",
      password: "test_password_123456!@",
      role: "HOST",
    });

    const createUserSaga = new CreateUserSaga(
      new CreateUserInAuthServiceStep(),
      new CreateUserInBookingServiceStep(),
      new CreateUserInInfoServiceStep(),
    );
    await createUserSaga.execute(userDTO);
    return new UserCreatedDTO({ id: "test_id" });
  }

  // public
  @Post("/login")
  async login(): Promise<UserLoggedInDTO> {
    return new UserLoggedInDTO({
      id: "test_id",
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
    });
  }
}
