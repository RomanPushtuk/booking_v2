const cleanOldestFileInFolder = require("./cleanOldestFileInFolder");
const createArchive = require("./createArchive");
const getFileSize = require("./getFileSize");
const getFolderSize = require("./getFolderSize");
const createFileIfNotExists = require("./createFileIfNotExists");
const createFolderIfNotExists = require("./createFolderIfNotExists");
const mapDataToMessage = require("./mapDataToMessage");

module.exports = {
  cleanOldestFileInFolder,
  createArchive,
  getFileSize,
  getFolderSize,
  createFileIfNotExists,
  createFolderIfNotExists,
  mapDataToMessage,
};
