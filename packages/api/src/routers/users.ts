import { userBanSchema, userUnbanSchema } from "@streeio-core/schemas/user";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../index";
import { UserService } from "../services/user";

export const usersRouter = router({
  banUser: protectedProcedure
    .input(userBanSchema)
    .mutation(async ({ input, ctx }) => {
      // Allow only internal staff to ban users (or "admin" if that's what better auth defaults to)
      if (
        ctx.session.user.role !== "internal_staff" &&
        ctx.session.user.role !== "admin"
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only internal staff can ban users",
        });
      }

      try {
        await UserService.banUser(input);
        return { success: true };
      } catch (error) {
        console.error("Failed to ban user", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to ban user",
        });
      }
    }),
  unbanUser: protectedProcedure
    .input(userUnbanSchema)
    .mutation(async ({ input, ctx }) => {
      // Allow only internal staff to unban users
      if (
        ctx.session.user.role !== "internal_staff" &&
        ctx.session.user.role !== "admin"
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only internal staff can unban users",
        });
      }

      try {
        await UserService.unbanUser(input);
        return { success: true };
      } catch (error) {
        console.error("Failed to unban user", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to unban user",
        });
      }
    }),
});
