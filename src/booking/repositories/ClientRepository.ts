import { logger } from "../logger";
import { saveClient, getClientById } from "../sql";
import { Client } from "../domain";
import { UnitOfWork } from "../services";
import { ClientMapper } from "../mappers";

export class ClientRepository {
  constructor(private _uow: UnitOfWork) {
    this.save = this.save.bind(this);
    this.getById = this.getById.bind(this);
  }

  save(client: Client) {
    logger.info(this.constructor.name + " save");
    const clientdbModel = ClientMapper.toDbModel(client);
    const sql = saveClient(clientdbModel);
    logger.info(this._uow.db.exec(sql), 'saving client to DB');
    return { id: client.id };
  }

  getById(clientId: string) {
    logger.info(this.constructor.name + " getById");
    const user = this._uow.userRepository.getById(clientId);
    if (!user) return null;

    const bookings = this._uow.bookingRepository.getAll({
      filters: { clientId },
    });
    if (!bookings) return null;

    const sql = getClientById(clientId);
    const data = this._uow.db.prepare(sql).get() as
      | {
        id: string;
      }
      | undefined;
    if (!data) return null;

    return ClientMapper.toDomain({
      ...data,
      bookings,
      role: user.getRole(),
      deleted: user.getDeleted(),
    });
  }
}
