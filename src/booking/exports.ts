import { diContainer } from "./di";

import { UserService, ClientService, HostService } from "./services";

export const services = {
  userService: diContainer.get(UserService),
  clientService: diContainer.get(ClientService),
  hostService: diContainer.get(HostService),
};
