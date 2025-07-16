import { SortDirection } from "../enums";

export class HostSorting {
  direction: SortDirection;
  property: string;

  constructor(direction: SortDirection, property: string) {
    this.direction = direction;
    this.property = property;
  }
}
