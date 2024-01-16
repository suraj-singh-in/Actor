import { z } from "zod";

export const loginFormSchema = z.object({
  userName: z
    .string()
    .describe("UserName")
    .min(6, "User Name must be minimum 6 characters"),

  password: z
    .string()
    .describe("Password")
    .min(6, "Password must be minimum 6 characters"),
});
