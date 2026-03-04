import { protectedProcedure, publicProcedure, router } from "../index";
import { inviteRouter } from "./invite";
import { todoRouter } from "./todo";
import { usersRouter } from "./users";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  todo: todoRouter,
  invite: inviteRouter,
  users: usersRouter,
});
export type AppRouter = typeof appRouter;
