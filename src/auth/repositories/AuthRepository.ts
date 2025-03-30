import { Service } from "typedi";
import { getUserById, getUserByLoginAndPassword, saveUser } from "../sql";
import { User } from "../domain";

@Service()
export class AuthRepository {
  async findByLoginAndPassword(
    login: string,
    password: string,
  ): Promise<User | null> {
    const statement = getUserByLoginAndPassword({
      login,
      password,
    });
    const data = statement.get() as User | undefined;
    if (!data) return null;
    return new User(data);
  }

  async findById(userId: string): Promise<User | null> {
    const statement = getUserById({ id: userId });
    const data = statement.get() as User | undefined;
    if (!data) return null;
    return new User(data);
  }

  async save(userDto: User): Promise<{ id: string }> {
    const statement = saveUser(userDto);
    statement.run();
    return { id: userDto.id };
  }
}
