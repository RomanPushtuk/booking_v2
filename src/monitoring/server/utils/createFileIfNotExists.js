const fs = require("fs");

const createFileIfNotExists = (filePath, defaultContent = "") => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultContent, "utf8");
  }
};

module.exports = createFileIfNotExists;
