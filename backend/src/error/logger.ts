import { shared } from "./imports";

const logger = shared.logger.child({ module: "error" });

export { logger };
