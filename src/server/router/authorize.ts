import { createRouter } from "./context";
import { z } from "zod";
import bcrypt from "bcrypt";

export const authorize = createRouter().mutation("register", {
  input: z
    .object({
      email: z.string(),
      password: z.string(),
    })
    .nullish(),
  async resolve({ ctx, input }) {
    if (!input || !input?.email || !input.password) {
      throw new Error("Email and password must be provided!");
    }

    const encryptedPassword = await bcrypt.hash(input.password, 10);

    console.log("encryptedPassword: ", encryptedPassword);

    return await ctx.prisma.user.create({
      data: {
        email: input.email,
        hash: encryptedPassword,
      },
    });
  },
});
