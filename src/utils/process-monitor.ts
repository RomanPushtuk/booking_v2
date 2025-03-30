import pidusage from 'pidusage';
import * as fs from 'fs';
import * as os from 'os';

interface PidUsageStats {
	cpu: number;       // CPU in %
	memory: number;    // Memory in bytes
	ppid: number;      // Parent PID
	pid: number;       // Process PID
	ctime: number;     // CPU time in ticks
	elapsed: number;   // Time since start in ms
	timestamp: number; // Measurement timestamp in ms
}

export function startProcessMonitoring(processId: number, logFile: string = 'process_metrics.log') {
	// Get network traffic (Only for linux)
	const getNetworkTraffic = (pid: number) => {
		if (os.platform() !== 'linux') return { received: 0, sent: 0 };
		try {
			const netStats = fs.readFileSync(`/proc/${pid}/net/dev`, 'utf8');
			const lines = netStats.split('\n');
			let totalBytesReceived = 0;
			let totalBytesSent = 0;

			for (const line of lines) {
				if (line.includes('eth0') || line.includes('wlan0')) {
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
		pidusage(processId, (err: Error | null, stats: PidUsageStats) => {
			if (err) {
				console.error('Monitoring error:', err);
				return;
			}

			const metrics = {
				timestamp: new Date().toISOString(),              // ISO timestamp
				cpu: Number(stats.cpu.toFixed(2)),                // CPU in %
				memory_mb: Number((stats.memory / (1024 * 1024)).toFixed(2)), // Memory in MB
				network: getNetworkTraffic(processId),            // Network in bytes
				uptime: Math.floor(process.uptime()),             // Uptime in seconds
			};

			// Write to file in json format
			fs.appendFileSync(logFile, JSON.stringify(metrics) + '\n');
		});
	}, 1000);

	// Return stop function
	return () => clearInterval(intervalId);
}
