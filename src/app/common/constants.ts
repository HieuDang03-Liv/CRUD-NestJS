import * as dotenv from 'dotenv'
dotenv.config()

export const TOKEN_AVAILABLE_TIME = {
  ACCESS_TOKEN: process.env.EXPIRE_ACCESS_TIME,
  REFRESH_TOKEN: process.env.EXPIRE_REFRESH_TIME
}

export const REFRESH_TOKEN_EXPIRES_MSG = 'REFRESH TOKEN HAS EXPIRED.'

export const ACCESS_TOKEN_STILL_VALID = 'ACCESS TOKEN IS STILL VALID.'
