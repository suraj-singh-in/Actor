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
});

export const verseShema = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .describe("name")
    .min(6, "Theater Name must be minimum 6 characters"),
  httpCode: z.coerce.number().describe("httpCode"),
  responseType: z.string().describe("responseType").nonempty(),
  description: z.string().describe("description").nonempty(),
  response: z.string().describe("response").nonempty(),
  isActive: z.boolean().optional(),
});

export const createActSchema = z.object({
  name: z
    .string()
    .describe("name")
    .min(6, "Theater Name must be minimum 6 characters"),
  endPoint: z.string().describe("endPoint").nonempty(),
  method: z.string().describe("method").nonempty(),
  description: z.string().describe("description").nonempty(),
  verses: z.array(verseShema).min(1, "Atleast one verse is requried"),
});

export const changeActiveVerseSchema = z.object({
  verseId: z.string(),
});

export const createRoleFormSchema = z.object({
  name: z.string().describe("name").min(2, "Role must be minimum 2 characters"),
  description: z.string().describe("description"),
  permissions: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one permission.",
    }),
});
