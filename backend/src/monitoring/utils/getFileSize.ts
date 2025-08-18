import fs from "fs";

const getFileSize = (filePath: string): number => {
  const stats = fs.statSync(filePath);
  return stats.size;
};

export { getFileSize };
