export class Controller {
  constructor(model) {
    this.model = model;
  }

  addSystemLog = (data) => {
    this.model.addSystemLog(data);
  };

  getSystemLogs = () => {
    return this.model.getSystemLogs();
  };
}
