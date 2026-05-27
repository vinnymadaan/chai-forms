import { eq } from "drizzle-orm";
import { db } from "@repo/database/src/client";
import { users } from "@repo/database/src/schema/users";
import { createSession } from "./create-session";

export async function demoLogin(email: string, name: string) {
  let user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    const [createdUser] = await db
      .insert(users)
      .values({
        email,
        name,
        image: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
      })
      .returning();
    user = createdUser;
  }

  if (!user) {
    throw new Error('User creation failed');
  }

  const session = await createSession(user.id);
  
  return {
    user,
    session,
  };
}
