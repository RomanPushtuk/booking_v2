import { Service } from "typedi";
import { db } from "../db";
import { getUserById, getUserByLoginAndPassword, saveUser } from "../sql";
import { User } from "../domain";

@Service()
export class AuthRepository {
  async findByLoginAndPassword(
    login: string,
    password: string,
  ): Promise<User | null> {
    const sql = getUserByLoginAndPassword({
      login,
      password,
    });
    const data = db.prepare(sql).get() as User | undefined;
    if (!data) return null;
    return new User(data);
  }

  async findById(userId: string): Promise<User | null> {
    const sql = getUserById({ id: userId });
    const data = db.prepare(sql).get() as User | undefined;
    if (!data) return null;
    return new User(data);
  }

  async save(userDto: User): Promise<{ id: string }> {
    const sql = saveUser(userDto);
    db.exec(sql);
    return { id: userDto.id };
  }
}
