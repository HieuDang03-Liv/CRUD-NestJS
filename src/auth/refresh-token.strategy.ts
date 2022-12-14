import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { UsersService } from 'src/app/users/users.service'
dotenv.config()

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET
    })
  }

  async validate(payload: any) {
    const isUser = this.usersService.findUserByProps({ username: payload.username })
    if (!isUser) {
      throw new UnauthorizedException()
    }
    return isUser
  }
}
