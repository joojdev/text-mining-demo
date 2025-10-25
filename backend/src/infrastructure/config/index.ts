import 'dotenv/config'
import z from 'zod'

const EnvSchema = z.object({
  PORT: z.coerce.number(),
})

const parsed = EnvSchema.parse(process.env)

export default parsed
