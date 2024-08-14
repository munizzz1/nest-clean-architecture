import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  JWT__PRIVATE_KEY: z.string(),
  JWT__PUBLIC_KEY: z.string(),
})

export type Env = z.infer<typeof envSchema>
