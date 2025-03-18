import pino from "pino";
import { asyncLocalStorage } from "../../context";

const logger = pino({
  base: null,
  hooks: {
    logMethod(args, method) {
      const store = asyncLocalStorage.getStore() as Map<string, string>;
      if (!store) return method.apply(this, args);

      const traceId = store.get("traceId");
      const userIp = store.get("userIp");

      if (typeof args[0] === "object") {
        (args[0] as { traceId: string; userIp: string }).traceId =
          traceId || "";
        (args[0] as { traceId: string; userIp: string }).userIp = userIp || "";
      } else {
        args.unshift({ traceId });
      }
      return method.apply(this, args);
    },
  },
  transport: {
    targets: [
      {
        level: "trace",
        target: "pino/file",
        options: {
          destination: "./logs/output.log",
          mkdir: true,
          colorize: false,
        },
      },
      {
        level: "info",
        target: "pino-pretty",
        options: { destination: process.stdout.fd, colorize: true },
      },
    ],
  },
});

export { logger };
