import fs from "fs";
import path from "path";

const getFolderSize = (folderPath: string): number => {
  const files = fs.readdirSync(folderPath);
  let totalSize = 0;

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      totalSize += stat.size;
    }
  }

  return totalSize;
};

export { getFolderSize };
