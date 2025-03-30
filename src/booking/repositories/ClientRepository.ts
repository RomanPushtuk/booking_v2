import { logger } from "../logger";
import { db } from "../db";
import { saveClient, getClientById } from "../sql";
import { Client } from "../domain";

export class ClientRepository {
  save(client: Client) {
    logger.info(this.constructor.name + " save");
    const sql = saveClient(client);
    db.exec(sql);
    return { id: client.id };
  }

  getById(clientId: string) {
    logger.info(this.constructor.name + " getById");
    const sql = getClientById(clientId);
    const data = db.prepare(sql).get(sql) as Client | undefined;
    if (!data) return null;
    return new Client(data);
  }
}
