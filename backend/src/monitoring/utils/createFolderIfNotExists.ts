import fs from "fs";

const createFolderIfNotExists = (folderPath: string): void => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

export { createFolderIfNotExists };
