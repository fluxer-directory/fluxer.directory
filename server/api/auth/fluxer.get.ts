import { randomUUID } from 'node:crypto'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const fluxer = config.oauth.fluxer

  const state = randomUUID()

  await setUserSession(event, {
    secure: { oauthState: state }
  })

  const authorizeUrl = new URL(`${fluxer.apiBase}/v1/oauth2/authorize`)
  authorizeUrl.searchParams.set('response_type', 'code')
  authorizeUrl.searchParams.set('client_id', fluxer.clientId)
  authorizeUrl.searchParams.set('redirect_uri', fluxer.redirectUrl)
  authorizeUrl.searchParams.set('scope', 'identify')
  authorizeUrl.searchParams.set('state', state)

  return sendRedirect(event, authorizeUrl.toString())
})
