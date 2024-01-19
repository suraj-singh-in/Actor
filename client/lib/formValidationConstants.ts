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

export const createTheaterScheam = z.object({
  name: z
    .string()
    .describe("name")
    .min(6, "Theater Name must be minimum 6 characters"),

  logo: z.string().describe("logo"),

  description: z.string().describe("description"),
  viewerList: z.array(z.record(z.string().trim())),
  editorList: z.array(z.record(z.string().trim())),
});
