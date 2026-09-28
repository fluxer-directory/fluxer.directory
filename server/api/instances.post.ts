import { Instance, instanceSchema, type InstanceDocument } from '../models/instance'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (!session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  const result = instanceSchema.safeParse(await readBody<Partial<InstanceDocument>>(event))

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid instance data',
      data: result.error.flatten()
    })
  }

  const instance = await Instance.create({
    ...result.data,
    user_id: `${session.user.fluxerId}`,
    approved: false
  })
  setResponseStatus(event, 201)

  if (process.env.NTFY_SERVER && process.env.NTFY_TOPIC && process.env.NTFY_TOKEN) {
    $fetch(`${process.env.NTFY_SERVER}/${process.env.NTFY_TOPIC}`, {
      method: 'POST',
      body: '',
      headers: {
          'Title': 'New instance ready for review!',
          'Click': 'https://fluxer.directory/',
          'Authorization': `Bearer ${process.env.NTFY_TOKEN}`
      }
    })
  }

  return instance
})