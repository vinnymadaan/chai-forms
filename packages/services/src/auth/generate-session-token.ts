import crypto from "node:crypto";

export function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}