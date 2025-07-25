import { Step } from "./Step";
import { SagaFailedError } from "../errors";
import { logger } from "../logger";

export class Saga<T, R> {
  protected steps: Step<T, R>[] = [];
  protected successfulSteps: Step<T, R>[] = [];

  async execute(payload: T, ...args: unknown[]): Promise<R> {
    logger.info(`Start execute saga - ${this.constructor.name}`);

    let result: R;
    for (const step of this.steps) {
      try {
        result = await step.invoke(payload, ...args);
        this.successfulSteps.unshift(step);
      } catch (err) {
        this.successfulSteps.forEach(async (step) => {
          await step.withCompensation(payload, ...args);
        });
        throw new SagaFailedError(this.constructor.name, err as Error);
      }
    }
    logger.info(`Saga execution finished - ${this.constructor.name}`);
    return result!;
  }
}
