import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { UsersService } from './../app/users/users.service'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { RenewAccessToken, VerifiedUser } from 'src/app/users/users.dto'
import * as moment from 'moment'
import { REFRESH_TOKEN_EXPIRES_MSG, TOKEN_AVAILABLE_TIME } from 'src/app/common/constants'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findUserLogin({ username, password })
      if (user) {
        const dataPassword = user.password
        const isMatchedPassword = await compare(password, dataPassword)
        if (isMatchedPassword) {
          const { password, ...data } = user
          return data
        }
      }
    } catch (err) {
      return null
    }
  }

  login(username: string): VerifiedUser {
    const accessToken = this.getAccessToken({ username })
    const refreshToken = this.getRefreshToken({ username })
    const currentTime = moment().toDate()
    const expiresAccessDate = this.getTokenExpireDate(currentTime, TOKEN_AVAILABLE_TIME.ACCESS_TOKEN)
    const expiresRefreshDate = this.getTokenExpireDate(currentTime, TOKEN_AVAILABLE_TIME.REFRESH_TOKEN)
    return {
      username,
      accessToken,
      refreshToken,
      expiresAccessDate,
      expiresRefreshDate
    }
  }

  renewToken(refreshTokenInfo: RenewAccessToken): HttpException | string {
    const newAccessToken = this.getNewAccessToken(refreshTokenInfo)
    if (!newAccessToken) {
      throw new HttpException(REFRESH_TOKEN_EXPIRES_MSG, HttpStatus.FORBIDDEN)
    }
    return newAccessToken
  }

  getNewAccessToken(refreshTokenInfo: RenewAccessToken): string | null {
    let newAccessToken = null
    const originExpireRefreshTime = moment(refreshTokenInfo.expiresRefreshToken)
    const currentTime = moment().toDate()
    const isRefreshTokenExpired = moment(currentTime).diff(originExpireRefreshTime) >= 0
    if (!isRefreshTokenExpired) {
      newAccessToken = this.getAccessToken({ username: refreshTokenInfo.username })
    }
    return newAccessToken
  }

  getAccessToken(payload: { username: string }): string {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: TOKEN_AVAILABLE_TIME.ACCESS_TOKEN
    })
    return accessToken
  }

  getRefreshToken(payload: { username: string }): string {
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: TOKEN_AVAILABLE_TIME.REFRESH_TOKEN
    })
    return refreshToken
  }

  getTokenExpireDate(createdTime: Date, timeSpan: string): Date {
    //get numeric value
    const timeAmount = timeSpan.replace(/\D/g, '')
    //get non-numeric value
    const timeUnit = timeSpan.replace(/\d/g, '')
    //plus time to get expire day
    const expireDay = moment(createdTime)
      .add(timeAmount as any, timeUnit as any)
      .toDate()
    return expireDay
  }
}
