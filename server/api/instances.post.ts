import { Instance, instanceSchema, type InstanceDocument } from '../models/instance'

export default defineEventHandler(async (event) => {
  const result = instanceSchema.safeParse(await readBody<Partial<InstanceDocument>>(event))

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid instance data',
      data: result.error.flatten()
    })
  }

  const instance = await Instance.create(result.data)
  setResponseStatus(event, 201)

  return instance
})