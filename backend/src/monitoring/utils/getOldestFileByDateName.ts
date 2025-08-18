import fs from "fs";
import path from "path";

const getOldestFileByDateName = (folderPath: string): string | null => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((name) => fs.statSync(path.join(folderPath, name)).isFile());

  if (files.length === 0) return null;

  const timestampedFiles = files
    .map((name) => {
      const match = name.match(/^(\d{13})/); // 13-digit timestamp at start
      const timestamp = match ? Number(match[1]) : null;
      return { name, timestamp };
    })
    .filter(
      (f): f is { name: string; timestamp: number } =>
        typeof f.timestamp === "number" && !isNaN(f.timestamp)
    );

  if (timestampedFiles.length === 0) return null;

  timestampedFiles.sort((a, b) => a.timestamp - b.timestamp);
  return timestampedFiles[0].name;
};

export { getOldestFileByDateName };
