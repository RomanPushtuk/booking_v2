import permissions from "../../config.json";

type PermissionKey = keyof typeof permissions;

export function AllowBookingPermission(permissionKey: PermissionKey) {
  return function (
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const hasPermission = permissions[permissionKey];

      if (!hasPermission) {
        throw new Error(`Permission denied: ${permissionKey} is not allowed.`);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
