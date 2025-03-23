import { diContainer } from "./di";

import { AuthService } from "./services";

export const services = {
  authService: diContainer.get<AuthService>(AuthService),
};
