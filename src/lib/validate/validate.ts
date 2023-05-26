import { ZodType } from 'zod'

export const validate = <T>(value: unknown, schema: ZodType<T>) => {
  const result = schema.safeParse(value)
  if (!result.success) {
    console.log(result.error)
  }

  return result.success ? result.data : undefined
}
