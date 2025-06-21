import { User } from "../domain";
import { logger } from "../logger";
import { UserMapper } from "../mappers";
import { UnitOfWork } from "../services";
import { getUserById, saveUser } from "../sql";

export class UserRepository {
  constructor(private _uow: UnitOfWork) {}
  save(user: User) {
    logger.info(this.constructor.name + " save");

    const userDbModel = UserMapper.toDbModel(user);
    const sql = saveUser(userDbModel);
    logger.info(this._uow.db.exec(sql), "saving User to DB");
    return { id: user.getId() };
  }
  getById(userId: string) {
    logger.info(this.constructor.name + " getById");

    const sql = getUserById(userId);
    const userData = this._uow.db.prepare(sql).get() as
      | {
          id: string;
          role: string;
          deleted: boolean;
        }
      | undefined;
    if (!userData) return null;

    return UserMapper.toDomain(userData);
  }
  saveAll() {
    logger.info(this.constructor.name + " saveAll");
  }
  getAll() {
    logger.info(this.constructor.name + " getAll(");
  }
}
