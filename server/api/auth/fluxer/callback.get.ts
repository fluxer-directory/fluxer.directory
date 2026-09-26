interface FluxerTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

interface FluxerUserInfo {
  id: string
  username: string
  discriminator: string
  global_name: string | null
  avatar: string | null
  email?: string | null
  verified?: boolean
}

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const config = useRuntimeConfig(event)
  const fluxer = config.oauth.fluxer
  const session = await getUserSession(event)

  if (query.error) {
    return sendRedirect(event, '/')
  }

  if (typeof query.code !== 'string' || typeof query.state !== 'string' || query.state !== session.secure?.oauthState) {
    throw createError({ statusCode: 400 })
  }

  const redirectUri = fluxer.redirectUrl || new URL('/api/auth/fluxer/callback', getRequestURL(event)).toString()
  const token = await $fetch<FluxerTokenResponse>(`${fluxer.apiBase}/v1/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: query.code,
      redirect_uri: redirectUri,
      client_id: fluxer.clientId,
      client_secret: fluxer.clientSecret
    })
  })

  const user = await $fetch<FluxerUserInfo>(`${fluxer.apiBase}/v1/oauth2/userinfo`, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  })

  await replaceUserSession(event, {
    user: {
      fluxerId: user.id,
      username: user.username,
      globalName: user.global_name,
      avatar: user.avatar,
      email: user.email,
      emailVerified: user.verified
    }
  })

  return sendRedirect(event, '/')
})
