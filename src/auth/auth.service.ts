import { UsersService } from './../app/users/users.service'
import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

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

  login(username: string): string {
    const payload = { username }
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '60s'
    })
    return accessToken
  }

  getRefreshToken(payload: { username: string }): string {
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '1h'
    })
    return refreshToken
  }

  getAccessToken(payload: { username: string }): string {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '60s'
    })
    return accessToken
  }
}
