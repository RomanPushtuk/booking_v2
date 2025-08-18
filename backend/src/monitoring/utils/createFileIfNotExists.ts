import fs from "fs";

const createFileIfNotExists = (filePath: string, defaultContent: string = ""): void => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultContent, "utf8");
  }
};

export { createFileIfNotExists };
