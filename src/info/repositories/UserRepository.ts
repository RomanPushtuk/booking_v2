import { Database } from '../db';
import { services } from '../exports';
import { gateway } from '../imports';

interface UserDTO extends gateway.dtos.UserDTO {
  deleted?: boolean;
}

export class UserRepository {
  private db: Database;

  constructor() {
    this.db = services.database;
  }

  async saveUser(user: UserDTO): Promise<UserDTO> {
    return this.db.insert({ ...user, deleted: user.deleted ?? false });
  }

  async getUserById(id: string): Promise<UserDTO | null> {
    return this.db.findOne({ id, deleted: { $ne: true } });
  }

  async getAllUsers(): Promise<UserDTO[]> {
    return this.db.find({ deleted: { $ne: true } });
  }

  async deleteUser(id: string): Promise<number> {
    return this.db.update({ id }, { $set: { deleted: true } }, {});
  }

  async update(
    query: Record<string, any>,
    update: Record<string, any>,
    options: { multi?: boolean; upsert?: boolean } = {}
  ): Promise<number> {
    return this.db.update(query, update, options);
  }
}
