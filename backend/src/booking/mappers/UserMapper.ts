import { User } from "../domain";
import { UserDbModel } from "../sql/saveUser";

export class UserMapper {
  static toDomain(data: { id: string; role: string; deleted: boolean }): User {
    return new User(data);
  }

  static toDbModel(user: User): UserDbModel {
    return {
      id: user.getId(),
      role: user.getRole(),
      deleted: user.getDeleted(),
    };
  }
}
