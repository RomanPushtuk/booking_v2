import process from "process";
const { useMonitoring, insert } = require('./server/dist/index.js');
import { getCPUUsage, getMemoryUsage } from "./utils";
import { logger } from "./logger";

const monitor = (): void => {
  const uptime = `${(process.uptime() / 60).toFixed(2)} min`;
  const memory = getMemoryUsage();
  const cpu = getCPUUsage();
  // @ts-expect-error experimental undocumented feature of Node.js
  const handles = process._getActiveHandles().length;

  logger.info({ uptime, memory, cpu, handles }, "Node.js App Metrics");
};

const start = (): NodeJS.Timeout => {
  return setTimeout(monitor, 5000);
};

export { start, useMonitoring, insert };
