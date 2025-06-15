import { Service } from "typedi";
import { Body, JsonController, Post } from "routing-controllers";
import { shared, auth } from "../imports";
import { CreateUserSaga } from "../sagas";
import { CreateUserDTO, LogInUserDTO, UserDTO, UserLoggedInDTO } from "../dtos";
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
  ): Promise<UserLoggedInDTO> {
    const userDTO = new UserDTO({
      id: shared.utils.generateId(),
      ...createUserDTO,
    });

    const createUserSaga = new CreateUserSaga(
      new CreateUserInAuthServiceStep(),
      new CreateUserInBookingServiceStep(),
      new CreateUserInInfoServiceStep(),
    );

    await createUserSaga.execute(userDTO);

    const loginUserDTO: LogInUserDTO = {
      login: createUserDTO.login,
      password: createUserDTO.password,
    };

    return this.login(loginUserDTO);
  }

  // public
  @Post("/login")
  async login(@Body() loginUserDTO: LogInUserDTO): Promise<UserLoggedInDTO> {
    return auth.services.authService.login(loginUserDTO);
  }
}
