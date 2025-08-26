import path from "path";
import fs from "fs";
import { getOldestFileByDateName } from "./getOldestFileByDateName";

const cleanOldestFileInFolder = (folderPath: string): void => {
  const oldestFile = getOldestFileByDateName(folderPath);
  if (!oldestFile) return;
  const filePath = path.join(folderPath, oldestFile);
  fs.unlinkSync(filePath);
};

export { cleanOldestFileInFolder };
