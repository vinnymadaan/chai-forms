import { eq, gt } from "drizzle-orm";

import { db } from "@repo/database/src/client";

import { sessions, users } from "@repo/database";

export async function validateSession(sessionToken: string) {
  const session = await db.query.sessions.findFirst({
    where: (sessionsTable, { and }) =>
      and(
        eq(sessionsTable.sessionToken, sessionToken),
        gt(sessionsTable.expiresAt, new Date()),
      ),

    with: {
      user: true,
    },
  });

  return session;
}