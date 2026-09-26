import { defineMongooseModel } from '#nuxt/mongoose'
import { z } from 'zod'

export const instanceSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  banner_url: z.string().url(),
  description: z.string().min(1),
  language: z.string().min(1),
  tags: z.array(z.string()).optional(),
  contact_mail: z.string().email(),
  approved: z.boolean().optional()
})

export type InstanceDocument = z.infer<typeof instanceSchema>

export const Instance = defineMongooseModel<InstanceDocument>('Instance', {
  name: { type: String, required: true },
  url: { type: String, required: true },
  banner_url: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, required: true },
  tags: { type: [String], required: true },
  contact_mail: { type: String, required: true},
  approved: { type: Boolean, required: false }
})
