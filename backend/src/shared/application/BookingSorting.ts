import { SortDirection } from "../enums";

export class BookingSorting {
  direction: SortDirection;
  property: string;

  constructor(direction: SortDirection, property: string) {
    this.direction = direction;
    this.property = property;
  }
}
