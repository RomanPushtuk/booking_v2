import { Step } from "./Step";
import { SagaFailedError } from "../errors";
import { shared } from "../imports";

export class Saga<T, R> {
  private steps: Step<T, R>[] = [];
  private successfulSteps: Step<T, R>[] = [];

  constructor() {}

  async execute(payload: T) {
    shared.logger.info(`Start execute saga - ${this.constructor.name}`)
    for (const step of this.steps) {
      try {
        await step.invoke(payload);
        this.successfulSteps.unshift(step);
      } catch (err) {
        this.successfulSteps.forEach(async (step) => {
          await step.withCompenstation(payload);
        });
        throw new SagaFailedError(this.constructor.name, err as Error);
      }
    }
    shared.logger.info(`Saga execution finished - ${this.constructor.name}`)
  }
}
