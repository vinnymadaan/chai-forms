import { eq } from "drizzle-orm";

import { db } from "@repo/database/src/client";
import { forms } from "@repo/database/src/schema";

export async function getFormById(id: string) {
  return db.query.forms.findFirst({
    where: eq(forms.id, id),
  });
}