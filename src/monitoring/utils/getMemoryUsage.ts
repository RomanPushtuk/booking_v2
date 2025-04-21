import { formatBytes } from "./formatBytes";

export const getMemoryUsage = (): Record<string, string> => {
  const mem = process.memoryUsage();
  return {
    rss: formatBytes(mem.rss),
    heapTotal: formatBytes(mem.heapTotal),
    heapUsed: formatBytes(mem.heapUsed),
    external: formatBytes(mem.external),
    arrayBuffers: formatBytes(mem.arrayBuffers),
  };
};
