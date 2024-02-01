import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().min(5),
  GOOGLE_CLIENT_ID: zod.string().min(5),
  GOOGLE_CLIENT_SECRET: zod.string().min(5),
  NEXTAUTH_URL: zod.string().min(5),
  NEXTAUTH_SECRET: zod.string().min(5),
});

export const env = envSchema.parse(process.env);
