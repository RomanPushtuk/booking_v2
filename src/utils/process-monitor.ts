import pidusage from "pidusage";
import * as fs from "fs";
import * as os from "os";

interface PidUsageStats {
  cpu: number; // CPU in %
  memory: number; // Memory in bytes
  ppid: number; // Parent PID
  pid: number; // Process PID
  ctime: number; // CPU time in ticks
  elapsed: number; // Time since start in ms
  timestamp: number; // Measurement timestamp in ms
}

export function checkLogFileSize(logFile: string): {
  exceededLimit: boolean;
  fileSize: number;
  maxSize: number;
} {
  try {
    const maxLogSizeMB = process.env["MAX_LOG_SIZE_MB"]
      ? parseInt(process.env["MAX_LOG_SIZE_MB"], 10)
      : 10;

    // Convert MB into bytes
    const maxLogSizeBytes = maxLogSizeMB * 1024 * 1024;

    // Checking, if file exists
    if (!fs.existsSync(logFile)) {
      return {
        exceededLimit: false,
        fileSize: 0,
        maxSize: maxLogSizeBytes,
      };
    }

    // Check size of file
    const stats = fs.statSync(logFile);
    const fileSizeBytes = stats.size;

    const exceededLimit = fileSizeBytes > maxLogSizeBytes;

    if (exceededLimit) {
      // Clean the whole file
      // fs.writeFileSync(logFile, '');
      // console.log(`Log file ${logFile} exceeded size limit (${maxLogSizeMB} MB) and was cleared.`);

      // Create new one and previons one rename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      fs.renameSync(logFile, `${logFile}.${timestamp}.backup`);
      fs.writeFileSync(logFile, "");
    }

    return {
      exceededLimit,
      fileSize: fileSizeBytes,
      maxSize: maxLogSizeBytes,
    };
  } catch (error) {
    console.error(`Error checking log file size for ${logFile}:`, error);
    return {
      exceededLimit: false,
      fileSize: 0,
      maxSize: 0,
    };
  }
}

export function startProcessMonitoring(
  processId: number,
  logFile: string = "process_metrics.log",
) {
  // Get network traffic (Only for linux)
  const getNetworkTraffic = (pid: number) => {
    if (os.platform() !== "linux") return { received: 0, sent: 0 };
    try {
      const netStats = fs.readFileSync(`/proc/${pid}/net/dev`, "utf8");
      const lines = netStats.split("\n");
      let totalBytesReceived = 0;
      let totalBytesSent = 0;

      for (const line of lines) {
        if (line.includes("eth0") || line.includes("wlan0")) {
          const parts = line.trim().split(/\s+/);
          totalBytesReceived += parseInt(parts[1]);
          totalBytesSent += parseInt(parts[9]);
        }
      }
      return { received: totalBytesReceived, sent: totalBytesSent };
    } catch (e) {
      return { received: 0, sent: 0 };
    }
  };

  // Monitoring itself
  const intervalId = setInterval(() => {
    checkLogFileSize(logFile);

    pidusage(processId, (err: Error | null, stats: PidUsageStats) => {
      if (err) {
        console.error("Monitoring error:", err);
        return;
      }

      const metrics = {
        timestamp: new Date().toISOString(), // ISO timestamp
        cpu: Number(stats.cpu.toFixed(2)), // CPU in %
        memory_mb: Number((stats.memory / (1024 * 1024)).toFixed(2)), // Memory in MB
        network: getNetworkTraffic(processId), // Network in bytes
        uptime: Math.floor(process.uptime()), // Uptime in seconds
      };

      // Write to file in json format
      fs.appendFileSync(logFile, JSON.stringify(metrics) + "\n");
    });
  }, 1000);

  // Return stop function
  return () => clearInterval(intervalId);
}
