import { shared } from "../imports";

export class BookingSorting {
  direction: shared.enums.SortDirection;
  property: string;

  constructor(direction: shared.enums.SortDirection, property: string) {
    this.direction = direction;
    this.property = property;
  }
}
