import fs from "fs";
import path from "path";
import zlib from "zlib";

const createArchive = (filePath: string, folderPath: string = __dirname): void => {
  const date = Date.now();
  const archiveName = `${date}.log.gz`;

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
    .on("error", (err: Error) => {
      console.error("Ошибка во время архивации:", err);
    });
};

export { createArchive };
