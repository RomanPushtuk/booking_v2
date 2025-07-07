const path = require("path");
const fs = require("fs");
const getOldestFileByDateName = require("./getOldestFileByDateName");

const cleanOldestFileInFolder = (folderPath) => {
  const oldestFile = getOldestFileByDateName(folderPath);
  if (!oldestFile) return;
  const filePath = path.join(folderPath, oldestFile);
  fs.unlinkSync(filePath);
};

module.exports = cleanOldestFileInFolder;
