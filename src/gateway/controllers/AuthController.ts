import { Service } from "typedi";
import {
  HttpError,
  JsonController,
  Post,
} from "routing-controllers";

@Service()
@JsonController("/auth")
export class AuthController {
  constructor() {}

  @Post("/register")
  async register(): Promise<void> {
    throw new HttpError(500, "AuthController POST /register not implemented.");
  }

  @Post("/login")
  async login(): Promise<void> {
    throw new HttpError(500, "AuthController POST /login not implemented.");
  }
}
