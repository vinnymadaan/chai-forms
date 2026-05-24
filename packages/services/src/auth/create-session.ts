import { db } from "@repo/database/src/client";
import { sessions } from "@repo/database/src/schema";

import { addDays } from "date-fns";

import { generateSessionToken } from "./generate-session-token";

export async function createSession(userId: string) {
  const sessionToken = generateSessionToken();

  const expiresAt = addDays(new Date(), 30);

  const [session] = await db
    .insert(sessions)
    .values({
      userId,
      sessionToken,
      expiresAt,
    })
    .returning();

  return session;
}