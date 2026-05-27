import { eq } from "drizzle-orm";
import { db } from "@repo/database/src/client";
import { users } from "@repo/database/src/schema/users";

export async function getMe(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  return user ?? null;
}
