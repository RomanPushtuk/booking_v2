const settings = {
	amount: 5000,
}

export class Model {
	constructor() {
		this.systemLogs = [];
	}

	addSystemLog = (data) => {
		if (this.systemLogs.length > settings.amount) this.systemLogs.pop();
		this.systemLogs.unshift(data);
	}

	getSystemLogs = () => {
		return this.systemLogs;
	}
}
