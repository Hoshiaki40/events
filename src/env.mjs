import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_USER: z.string(),
    DB_NAME: z.string(),
    DB_PORT: z.string(),
    DB_HOST: z.string(),
    NODE_ENV: z.string(),
    DB_PASSWORD: z.string(),
    RESEND_API_KEY: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_SECRET: z.string(),
    API_PREFIX_URL: z.string().url(),
  },
  client: {},
  //   For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {},
});
