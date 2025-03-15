import { Service } from "typedi";
import { JsonController, Post } from "routing-controllers";

@JsonController("/auth")
@Service()
export class AuthController {
  constructor() {}

  @Post("/register")
  async register(): Promise<void> {
    throw new Error("AuthController POST /register not implemented.");
  }

  @Post("/login")
  async login(): Promise<void> {
    throw new Error("AuthController POST /login not implemented.");
  }
}
