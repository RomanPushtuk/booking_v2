import crypto from "crypto";

export const generateId = (length = 12, prefix = "") => {
  return `${prefix}${crypto.randomBytes(length / 2).toString("hex")}`;
};
