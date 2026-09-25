import { Instance } from '../models/instance'

export default defineEventHandler(() => Instance.find().sort({ name: 1 }).lean())
