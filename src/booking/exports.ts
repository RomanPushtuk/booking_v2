import { diContainer } from "./di";

import { UserService } from "./services";

export const services = {
  userService: diContainer.get(UserService),
};
