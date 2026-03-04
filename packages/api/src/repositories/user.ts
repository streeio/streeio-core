import { auth } from "@streeio-core/auth";
import type { UserBanInput, UserUnbanInput } from "@streeio-core/schemas/user";

export const UserRepository = {
  async ban(input: UserBanInput) {
    return await auth.api.banUser({
      body: {
        userId: input.userId,
        banReason: input.banReason,
      },
    });
  },

  async unban(input: UserUnbanInput) {
    return await auth.api.unbanUser({
      body: {
        userId: input.userId,
      },
    });
  },
};
