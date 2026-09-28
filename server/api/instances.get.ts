import { Instance } from '../models/instance'

export default defineEventHandler((event) => {
    const query = getQuery(event)

    let searchFilter: Record<string, any> = {}

    if (query.unapproved !== 'true') {
        searchFilter.approved = true
    }

    return Instance.find(searchFilter).sort({ name: 1 }).lean()
})
