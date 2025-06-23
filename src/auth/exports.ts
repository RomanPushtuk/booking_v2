import { diContainer } from "./di";
import * as domain from "./domain";
import { AuthService } from "./services";

export const services = {
  authService: diContainer.get<AuthService>(AuthService),
};

export { domain };
