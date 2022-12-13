export interface UserLogIn {
  username: string
  password: string
}

export interface UserData {
  username: string
  fullname: string
  isAdmin: boolean
  password: string
}

export interface VerifiedUser {
  username: string
  accessToken: string
  refreshToken: string
  expiresAccessDate: Date
  expiresRefreshDate: Date
}

export interface RenewAccessToken {
  expiresRefreshToken: Date
  refreshToken: string
  username: string
}
