export class View {
  constructor(controller) {
    this.showRealtimeLogs = true;

    this.controller = controller;
    this.filterInput = document.getElementById("filterInput");
    this.findButton = document.getElementById("filterButton");
    this.logContainer = document.getElementById("logContainer");
    this.realtimeModeCheckbox = document.getElementById("realtimeModeCheckbox");
    this.tabButtons = document.querySelectorAll(".tab-button");
    this.tabContents = document.querySelectorAll(".tab-content");

    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = this.handleSocketOpen;
    socket.onmessage = this.handleSocketMessage;
    socket.onclose = this.handleSocketClose;
    socket.onerror = this.handleSocketError;

    this.findButton.addEventListener("click", this.handleFilterClick);
    this.realtimeModeCheckbox.addEventListener(
      "change",
      this.handleRealtimeLogsClick
    );
    this.tabButtons.forEach((button) => {
      button.addEventListener("click", this.handleTabClick);
    });
  }

  setRealTimeMode = (flag) => {
    this.showRealtimeLogs = flag;
    this.realtimeModeCheckbox.checked = this.showRealtimeLogs;
  };

  handleSocketOpen = () => {
    console.log("[open] Connection established");
  };

  handleSocketMessage = (event) => {
    // format: { time: number, text: json.string }
    const data = JSON.parse(event.data);
    this.controller.addSystemLog(data);
    const systemLogs = this.controller.getSystemLogs();
    if (this.showRealtimeLogs) {
      this.renderLogItemsList(systemLogs);
    }
  };

  handleSocketClose = (event) => {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log("[close] Connection died");
    }
  };

  handleSocketError = () => {
    console.log(`[error]`);
  };

  handleFilterClick = async (event) => {
    event.preventDefault();

    const value = this.filterInput.value;
    if (value.length) {
      const queryString = new URLSearchParams({ filter: value }).toString();
      const response = await fetch(`http://localhost:3000/logs?${queryString}`);
      if (!response.ok) throw new Error("Network error");

      // format: Array<{ time: number, text: json.string }>
      const data = await response.json();
      this.setRealTimeMode(false);
      this.renderLogItemsList(data);
    } else {
    }
  };

  handleRealtimeLogsClick = (event) => {
    if (!this.showRealtimeLogs) {
      const systemLogs = this.controller.getSystemLogs();
      this.renderLogItemsList(systemLogs);
    }
    const flag = event.target.checked;
    this.setRealTimeMode(flag);
  };

  renderLogItemsList = (systemLogs) => {
    // save current elements
    const map = {};
    const logItems = Array.from(this.logContainer.children);

    for (const component of logItems) {
      const key = component.dataset.time;
      map[key] = component;
    }

    const resultList = [];

    systemLogs.forEach((log) => {
      const element = map[log.time]
        ? map[log.time]
        : this.createLogItem(log.time, log.text);
      resultList.push(element);
    });

    while (this.logContainer.lastElementChild) {
      this.logContainer.removeChild(this.logContainer.lastElementChild);
    }

    resultList.forEach((element) => {
      this.logContainer.appendChild(element);
    });
  };

  handleTabClick = (event) => {
    const tabId = event.target.getAttribute("data-tab");

    // Remove "active" from all buttons and content
    this.tabButtons.forEach((btn) => btn.classList.remove("active"));
    this.tabContents.forEach((content) => content.classList.remove("active"));

    // Add "active" to the clicked button and corresponding tab
    event.target.classList.add("active");
    document.getElementById(tabId).classList.add("active");
  };

  createLogItem = (time, text) => {
    // Create the container div
    const logItem = document.createElement("div");
    logItem.className = "log-item";
    logItem.dataset.component = "log-item";
    logItem.dataset.key = time;

    // Create the timestamp paragraph
    const timestamp = document.createElement("p");
    timestamp.className = "log-item_timeshtamp";
    timestamp.textContent = time;

    // Create the log content paragraph
    const logContent = document.createElement("p");
    logContent.className = "log-item_log-content";
    logContent.textContent = text;

    // Append paragraphs to the container div
    logItem.appendChild(timestamp);
    logItem.appendChild(logContent);

    return logItem;
  };
}
