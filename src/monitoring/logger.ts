import { shared } from "./imports";

const logger = shared.logger.child({ module: "monitoring" });

export { logger };
