import { initTRPC, TRPCError } from "@trpc/server";

import type { Context } from "./context";

export const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      success: false,
      error: {
        code: error.code,
        message: shape.message,
        statusCode: shape.data.httpStatus,
      },
      // Maintain TRPC spec properties to avoid breaking the TRPC React client
      message: shape.message,
      code: shape.code,
      data: shape.data,
    };
  },
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
      cause: "No session",
    });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});
