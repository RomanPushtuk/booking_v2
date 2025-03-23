import { Step } from "./Step";
import { SagaFailedError } from "../errors";
import { logger } from "../logger";

export class Saga<T, R> {
  protected steps: Step<T, R>[] = [];
  protected successfulSteps: Step<T, R>[] = [];

  constructor() {}

  async execute(payload: T, ...args: unknown[]) {
    logger.info(`Start execute saga - ${this.constructor.name}`);
    for (const step of this.steps) {
      try {
        await step.invoke(payload, ...args);
        this.successfulSteps.unshift(step);
      } catch (err) {
        this.successfulSteps.forEach(async (step) => {
          await step.withCompenstation(payload, ...args);
        });
        throw new SagaFailedError(this.constructor.name, err as Error);
      }
    }
    logger.info(`Saga execution finished - ${this.constructor.name}`);
  }
}
