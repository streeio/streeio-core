import type { UserBanInput, UserUnbanInput } from "@streeio-core/schemas/user";
import { UserRepository } from "../repositories/user";

export const UserService = {
  async banUser(input: UserBanInput) {
    return await UserRepository.ban(input);
  },

  async unbanUser(input: UserUnbanInput) {
    return await UserRepository.unban(input);
  },
};
