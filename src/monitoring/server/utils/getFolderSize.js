const fs = require("fs");
const path = require("path");

const getFolderSize = (folderPath) => {
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

module.exports = getFolderSize;
