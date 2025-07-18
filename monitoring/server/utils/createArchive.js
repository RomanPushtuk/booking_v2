const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const createArchive = (filePath, folderPath = __dirname) => {
  const date = Date.now();
  const archiveName = date + ".log.gz";

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const archivePath = path.join(folderPath, archiveName);

  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(archivePath);
  const gzip = zlib.createGzip();

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on("error", (err) => {
      console.error("Ошибка во время архивации:", err);
    });
};

module.exports = createArchive;
