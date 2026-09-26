import { Instance } from '../models/instance'

export default defineEventHandler(() => Instance.find({ approved: true }).sort({ name: 1 }).lean())
