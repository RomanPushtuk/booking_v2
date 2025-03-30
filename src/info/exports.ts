import { Database } from "./db";
import { diContainer } from "./di";

import { BookingService, UserService } from "./services";

export const services = {
	userService: diContainer.get(UserService),
	bookingService: diContainer.get(BookingService),
	database: diContainer.get(Database)
};
