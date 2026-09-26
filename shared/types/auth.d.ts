declare module '#auth-utils' {
  interface User {
    fluxerId: string
    username: string
    globalName: string | null
    avatar: string | null
    email?: string | null
    emailVerified?: boolean
  }

  interface SecureSessionData {
    oauthState?: string
  }
}

export {}