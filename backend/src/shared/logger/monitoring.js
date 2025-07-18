const { BroadcastChannel } = require("node:worker_threads");
const build = require("pino-abstract-transport");

const bus = new BroadcastChannel("monitoring");

module.exports = function (opts) {
  return build(function (source) {
    source.on("data", function (obj) {
      bus.postMessage(obj);
    });
  });
};
