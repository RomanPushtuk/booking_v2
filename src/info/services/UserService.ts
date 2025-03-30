import { Service } from 'typedi';
import { gateway } from '../imports';
import { logger } from '../logger';
import { UserRepository } from '../repositories';

@Service()
export class UserService {
	private userRepo: UserRepository;

	constructor() {
		this.userRepo = new UserRepository();
		this.createUser = this.createUser.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		this.restoreUser = this.restoreUser.bind(this);
		this.updateClient = this.updateClient.bind(this);
		this.revertClient = this.revertClient.bind(this);
		this.updateHost = this.updateHost.bind(this);
		this.revertHost = this.revertHost.bind(this);
	}

	async createUser(userDTO: gateway.dtos.UserDTO) {
		logger.info({ userDTO }, `${this.constructor.name} createUser`);
		return this.userRepo.saveUser(userDTO);
	}

	async deleteUser(userId: string) {
		logger.info({ userId }, `${this.constructor.name} deleteUser`);
		return this.userRepo.deleteUser(userId);
	}

	async restoreUser(userId: string) {
		logger.info({ userId }, `${this.constructor.name} restoreUser`);
		return this.userRepo.update({ id: userId }, { $set: { deleted: false } }, {});
	}

	async updateClient(updateClientDTO: gateway.dtos.UpdateClientDTO, clientId: string) {
		logger.info({ updateClientDTO, clientId }, `${this.constructor.name} updateClient`);
		return this.userRepo.update({ id: clientId }, { $set: updateClientDTO }, {});
	}

	async revertClient(clientId: string) {
		logger.info({ clientId }, `${this.constructor.name} revertClient`);
		return this.userRepo.getUserById(clientId);
	}

	async updateHost(updateHostDTO: gateway.dtos.UpdateClientDTO, hostId: string) {
		logger.info({ updateHostDTO, hostId }, `${this.constructor.name} updateHost`);
		return this.userRepo.update({ id: hostId }, { $set: updateHostDTO }, {});
	}

	async revertHost(hostId: string) {
		logger.info({ hostId }, `${this.constructor.name} revertHost`);
		return this.userRepo.getUserById(hostId); // Get curr version
	}
}
