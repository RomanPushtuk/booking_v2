const fs = require("fs");
const path = require("path");

const getOldestFileByDateName = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((name) => fs.statSync(path.join(folderPath, name)).isFile());

  if (files.length === 0) return null;

  const timestampedFiles = files
    .map((name) => {
      const match = name.match(/^(\d{13})/); // timestamp из 13 цифр в начале
      const timestamp = match ? Number(match[1]) : null;
      return { name, timestamp };
    })
    .filter((f) => typeof f.timestamp === "number" && !isNaN(f.timestamp));

  if (timestampedFiles.length === 0) return null;

  timestampedFiles.sort((a, b) => a.timestamp - b.timestamp);
  return timestampedFiles[0].name;
};

module.exports = getOldestFileByDateName;
