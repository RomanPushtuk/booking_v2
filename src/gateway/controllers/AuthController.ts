import { Service } from "typedi";
import { Body, JsonController, Post } from "routing-controllers";
import { CreateUserSaga } from "../sagas";
import { CreateUserDTO, UserCreatedDTO, UserLoggedInDTO } from "../dtos";

@Service()
@JsonController("/auth")
export class AuthController {
  constructor() {}

  @Post("/register")
  async register(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserCreatedDTO> {
    const createUserSaga = new CreateUserSaga();
    await createUserSaga.execute(createUserDTO);
    return new UserCreatedDTO({ id: "test_id" });
  }

  @Post("/login")
  async login(): Promise<UserLoggedInDTO> {
    return new UserLoggedInDTO({
      id: "test_id",
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
    });
  }
}
