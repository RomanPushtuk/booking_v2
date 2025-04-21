import os from "os";

export const getCPUUsage = (): string => {
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((core) => {
    const times = core.times;
    totalMs += Object.values(times).reduce((acc, tv) => acc + tv, 0);
    idleMs += times.idle;
  });

  const avgIdle = idleMs / cpus.length;
  const avgTotal = totalMs / cpus.length;
  const usage = ((1 - avgIdle / avgTotal) * 100).toFixed(2);

  return `${usage}%`;
};
