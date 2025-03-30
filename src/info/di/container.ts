import { Container } from "typedi";
import { Database, DatabaseConfig } from '../db';
import { UserService } from '../services/UserService';
import { BookingService } from '../services/BookingService';
import { UserRepository } from '../repositories';
import { BookingRepository } from '../repositories';

export const diContainer = Container.of('info');

const dbConfig: DatabaseConfig = {
  filename: 'data/info.db',
  autoload: true,
};

diContainer.set(Database, new Database(dbConfig));
diContainer.set(UserRepository, new UserRepository());
diContainer.set(UserService, new UserService());
diContainer.set(BookingRepository, new BookingRepository());
diContainer.set(BookingService, new BookingService());
