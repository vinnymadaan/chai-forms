import { z } from "zod";

import { getFormById } from "@repo/services/src/forms/get-form-by-id";

import { TRPCError } from "@trpc/server";

import { router, protectedProcedure } from "../../trpc";

import { createFormSchema } from "@repo/schemas";

import { createForm } from "@repo/services/src/forms/create-form";

import { getUserForms } from "@repo/services/src/forms/get-user-forms";

export const formsRouter = router({
  create: protectedProcedure
    .input(createFormSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await createForm(
          ctx.user.id,
          input,
        );
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create form",
        });
      }
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return getUserForms(ctx.user.id);
  }),
  getById: protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    return getFormById(input.id);
  }),
});