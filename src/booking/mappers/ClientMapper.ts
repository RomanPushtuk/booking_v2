import { Booking, Client } from "../domain";
import { ClientDbModel } from "../sql/saveClient";

export class ClientMapper {
	static toDomain(data: {
		id: string,
		bookings: Booking[],
		role: string,
		deleted: boolean
	}): Client {
		return new Client(data);
	}
	static toDbModel(client: Client): ClientDbModel {
		return {
			id: client.getId(),
		}
	}
}
