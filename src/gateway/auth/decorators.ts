import { Authorized } from "routing-controllers";
import { shared } from "../imports";

export function Public() {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    // For public endpoints checks are not needed
    return descriptor;
  };
}

export function HostOnly() {
  return Authorized([shared.enums.Roles.HOST]);
}

export function ClientOnly() {
  return Authorized([shared.enums.Roles.CLIENT]);
}

export function Authenticated() {
  return Authorized();
}
